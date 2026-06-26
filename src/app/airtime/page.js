'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const CURRENCY = 'NGN';
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://ratelplus.net';
const OPAY_POST_URL = `${backendUrl}/payer.php`;

// Approved prefix list for validation
const APPROVED_PREFIXES = [
  '0206470', '0209701', '0209702', '0209703', '0209704', 
  '0209705', '0209706', '0209707', '0209708', '0209709', '0209710'
];

export default function BuyAirtime() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    fname: '',
    sname: '',
    email: '',
    amount: '',
    ratelnumber: ''
  });

  const [errors, setErrors] = useState({});
  const [rechargeType, setRechargeType] = useState('others'); // 'self' | 'others'
  const [savedUser, setSavedUser] = useState(null);
  const [saveDetailsOnPay, setSaveDetailsOnPay] = useState(true);
  const [generatedRef, setGeneratedRef] = useState('');

  // Overlay & Payment checkout states
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentPending, setPaymentPending] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [processingGateway, setProcessingGateway] = useState(null); // 'paystack' | 'opay' | null

  // Ref for OPay hidden form submit
  const opayFormRef = useRef(null);

  // Polls a status-check URL until it reports the airtime as credited, or gives up.
  // Used because crediting happens on the legacy backend and isn't guaranteed to be
  // confirmed the instant the payment popup closes.
  const pollCredit = async (url, { attempts = 5, delayMs = 4000 } = {}) => {
    for (let i = 0; i < attempts; i++) {
      try {
        const res = await fetch(url);
        const data = await res.json();
        if (data && data.credited) return true;
      } catch (err) {
        console.error('Credit check failed:', err);
      }
      if (i < attempts - 1) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }
    return false;
  };

  useEffect(() => {
    try {
      // Check parameters from url (quick widget query)
      const params = new URLSearchParams(window.location.search);
      const queryPhone = params.get('phone');
      const queryAmount = params.get('amount');
      const queryStatus = params.get('status');
      const queryReference = params.get('reference');

      // Returning from OPay's hosted checkout (status=success) does NOT mean the
      // airtime was actually credited yet - that happens async via OPay's webhook.
      // Confirm against the backend before showing a success message.
      if (queryStatus === 'success') {
        if (queryReference) {
          setProcessingGateway('verifying');
          pollCredit(`${backendUrl}/check_status.php?reference=${queryReference}`, { attempts: 6, delayMs: 4000 })
            .then(credited => {
              setProcessingGateway(null);
              if (credited) {
                setPaymentSuccess(true);
              } else {
                setPaymentPending(true);
              }
            });
        } else {
          setPaymentPending(true);
        }
      }

      const stored = localStorage.getItem('ratel_user');
      let user = null;
      if (stored) {
        user = JSON.parse(stored);
        setSavedUser(user);
      }

      if (queryPhone || queryAmount) {
        const cleanPhone = queryPhone || '';
        const cleanAmount = queryAmount || '';
        const isValid = cleanPhone.length === 11 && APPROVED_PREFIXES.some(pref => cleanPhone.startsWith(pref));
        const isAmtValid = parseInt(cleanAmount, 10) >= 100;

        setFormData({
          fname: user ? user.fname : '',
          sname: user ? user.lname : '',
          email: user ? user.email : '',
          amount: cleanAmount,
          ratelnumber: cleanPhone
        });

        if (isValid && isAmtValid) {
          if (user) {
            if (user.ratelnumber === cleanPhone) {
              setRechargeType('self');
            } else {
              setRechargeType('others');
            }
            const ref = Math.floor(10000000 + Math.random() * 90000000).toString();
            setGeneratedRef(ref);
            setShowCheckout(true);
          } else {
            setRechargeType('others');
          }
        } else {
          setRechargeType('others');
        }
      } else if (user) {
        setRechargeType('self');
        setFormData(prev => ({
          ...prev,
          fname: user.fname || '',
          sname: user.lname || '',
          email: user.email || '',
          ratelnumber: user.ratelnumber || ''
        }));
      } else {
        setRechargeType('others');
      }
    } catch (e) {
      console.error('Failed to parse query parameters or localStorage:', e);
    }
  }, []);

  // Validate number format based on Approved Prefix list
  const validateRatelNumber = (number) => {
    if (number.length !== 11) return false;
    return APPROVED_PREFIXES.some(pref => number.startsWith(pref));
  };

  const generateReference = () => {
    const ref = Math.floor(10000000 + Math.random() * 90000000).toString();
    setGeneratedRef(ref);
    return ref;
  };

  // ─── Input Handling ───────────────────────────────────────────────────────
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Reject non-numeric input for amount and phone
    if ((name === 'amount' || name === 'ratelnumber') && value !== '' && !/^\d+$/.test(value)) {
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));

    // Real-time validation
    if (name === 'ratelnumber') {
      if (value.length === 11 && !validateRatelNumber(value)) {
        setErrors(prev => ({
          ...prev,
          ratelnumber: 'Invalid prefix! Must start with: 0206470 or 0209701-0209710'
        }));
      } else {
        setErrors(prev => { const c = { ...prev }; delete c.ratelnumber; return c; });
      }
    }

    if (name === 'amount') {
      const amtVal = parseInt(value, 10);
      if (amtVal < 100) {
        setErrors(prev => ({ ...prev, amount: 'Minimum airtime amount is ₦100' }));
      } else {
        setErrors(prev => { const c = { ...prev }; delete c.amount; return c; });
      }
    }
  };

  // ─── Form Submission & Validation ─────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    const activeErrors = {};

    const amt = parseInt(formData.amount, 10);
    if (!formData.amount || isNaN(amt) || amt < 100) {
      activeErrors.amount = 'Minimum airtime amount is ₦100';
    }

    if (rechargeType === 'others') {
      if (!formData.fname.trim()) activeErrors.fname = 'First name is required';
      if (!formData.sname.trim()) activeErrors.sname = 'Surname is required';
      if (!formData.email.trim()) activeErrors.email = 'Email address is required';
      if (!validateRatelNumber(formData.ratelnumber)) {
        activeErrors.ratelnumber = 'Ratel Number must start with: 0206470 or 0209701-0209710';
      }
    }

    if (Object.keys(activeErrors).length > 0) {
      setErrors(activeErrors);
      return;
    }

    setErrors({});
    generateReference();

    // Cache profile details if user requested "save details"
    if (rechargeType === 'others' && saveDetailsOnPay) {
      try {
        const userData = {
          fname: formData.fname,
          lname: formData.sname,
          email: formData.email,
          ratelnumber: formData.ratelnumber
        };
        localStorage.setItem('ratel_user', JSON.stringify(userData));
        setSavedUser(userData);
      } catch (err) {
        console.error('Failed to save default profile:', err);
      }
    }

    setShowCheckout(true);
  };

  // ─── secure Paystack Checkout ──────────────────────────────────────────────
  const handlePayWithPaystack = async () => {
    setPaymentError('');
    setProcessingGateway('paystack');

    // Determine final billing details
    const finalPhone = rechargeType === 'self' && savedUser ? savedUser.ratelnumber : formData.ratelnumber;
    const finalEmail = rechargeType === 'self' && savedUser ? savedUser.email : formData.email;
    const finalFname = rechargeType === 'self' && savedUser ? savedUser.fname : formData.fname;
    const finalLname = rechargeType === 'self' && savedUser ? savedUser.lname : formData.sname;

    // 1. Initialize transaction in the PHP database opay_payment table
    const initData = new URLSearchParams();
    initData.append('reference', generatedRef);
    initData.append('ratelnumber', finalPhone);
    initData.append('source', 'Airtime');
    initData.append('paystack', 'paystack');
    initData.append('email', finalEmail);
    initData.append('fname', finalFname);
    initData.append('lname', finalLname);
    initData.append('amount', formData.amount);
    initData.append('redirect_origin', typeof window !== 'undefined' ? window.location.origin : '');

    try {
      const initResponse = await fetch(`${backendUrl}/payer.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: initData.toString(),
      });

      if (!initResponse.ok) {
        throw new Error('Failed to initialize database transaction.');
      }

      // 2. Open inline Paystack Pop-up
      const { default: PaystackPop } = await import('@paystack/inline-js');
      const popup = new PaystackPop();
      popup.newTransaction({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || 'pk_live_f794eddafa6e2897901b7b801b901188a9526863',
        email: finalEmail,
        amount: parseInt(formData.amount, 10) * 100, // in kobo
        currency: CURRENCY,
        ref: generatedRef,
        metadata: {
          custom_fields: [
            {
              display_name: 'Descriptions',
              variable_name: 'Airtime',
              value: generatedRef
            }
          ]
        },
        onSuccess: async (transaction) => {
          setProcessingGateway('verifying');
          // 3. Trigger backend verification + crediting, retrying a few times since
          // Paystack's own verify API can lag a moment behind the popup's success callback.
          const credited = await pollCredit(
            `${backendUrl}/ratelpay.php?reference=${generatedRef}&redirect_origin=${encodeURIComponent(window.location.origin)}&format=json`,
            { attempts: 5, delayMs: 4000 }
          );
          setProcessingGateway(null);
          setShowCheckout(false);
          if (credited) {
            setPaymentSuccess(true);
          } else {
            setPaymentPending(true);
          }
        },
        onCancel: () => {
          setProcessingGateway(null);
          setPaymentError('Payment cancelled.');
        }
      });
    } catch (err) {
      setProcessingGateway(null);
      setPaymentError('Failed to initialize payment: ' + err.message);
    }
  };

  // ─── secure OPay Checkout (using hidden HTML form POST submit) ─────────────
  const handlePayWithOpay = (e) => {
    e.preventDefault();
    setPaymentError('');
    setProcessingGateway('opay');

    if (opayFormRef.current) {
      opayFormRef.current.submit();
    }

    setTimeout(() => {
      setProcessingGateway(null);
    }, 2000);
  };

  const finalPhone = rechargeType === 'self' && savedUser ? savedUser.ratelnumber : formData.ratelnumber;
  const finalEmail = rechargeType === 'self' && savedUser ? savedUser.email : formData.email;
  const finalFname = rechargeType === 'self' && savedUser ? savedUser.fname : formData.fname;
  const finalLname = rechargeType === 'self' && savedUser ? savedUser.lname : formData.sname;

  // ─── SUCCESS SCREEN ───────────────────────────────────────────────────────
  if (paymentSuccess) {
    return (
      <div>


        <section className="section-padding">
          <div className="container">
            <div className="glass-panel form-card" style={{ maxWidth: '650px', margin: '0 auto', textAlign: 'center', padding: '50px 30px' }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.1)',
                color: 'var(--accent-green)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '42px',
                marginBottom: '24px',
                boxShadow: '0 0 20px rgba(16, 185, 129, 0.2)',
                animation: 'pulse 2s infinite ease-in-out'
              }}>
                <i className="bi bi-wallet2" />
              </div>

              <h2 style={{ fontSize: '30px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '14px' }}>
                {t('Recharge Confirmed!')}
              </h2>

              <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '30px' }}>
                {t('Thank you. Your payment of ₦{amount} for Ratel line {phone} has been successfully processed. The airtime credits will be loaded on your account in under 5 minutes.').replace('{amount}', parseInt(formData.amount, 10).toLocaleString()).replace('{phone}', finalPhone)}
              </p>

              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                <Link href="/" className="btn-primary" style={{ padding: '12px 30px' }}>
                  {t('Return Home')}
                </Link>
                <button onClick={() => { setPaymentSuccess(false); setFormData(p => ({ ...p, amount: '' })); }} className="btn-secondary" style={{ padding: '12px 30px' }}>
                  {t('Recharge Again')}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ─── PENDING SCREEN (paid, but credit not yet confirmed) ───────────────────
  if (paymentPending) {
    return (
      <div>
        <section className="section-padding">
          <div className="container">
            <div className="glass-panel form-card" style={{ maxWidth: '650px', margin: '0 auto', textAlign: 'center', padding: '50px 30px' }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'rgba(245, 158, 11, 0.1)',
                color: '#f59e0b',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '42px',
                marginBottom: '24px'
              }}>
                <i className="bi bi-hourglass-split" />
              </div>

              <h2 style={{ fontSize: '30px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '14px' }}>
                {t('Payment Received, Confirming Credit...')}
              </h2>

              <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '30px' }}>
                {t("We've received your payment but haven't been able to confirm the airtime credit yet. This can occasionally take a few extra minutes. If the credit hasn't arrived shortly, please contact support with this reference: {ref}").replace('{ref}', generatedRef)}
              </p>

              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                <Link href="/" className="btn-primary" style={{ padding: '12px 30px' }}>
                  {t('Return Home')}
                </Link>
                <button onClick={() => { setPaymentPending(false); setFormData(p => ({ ...p, amount: '' })); }} className="btn-secondary" style={{ padding: '12px 30px' }}>
                  {t('Recharge Again')}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background glow effects */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-10%',
        width: '50vw',
        height: '50vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(24, 73, 201, 0.03) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />



      <section className="section-padding" style={{ position: 'relative', zIndex: 1 }}>
        <div className="container">
          {/* Main Grid: Equal Height Desktop Layout */}
          <div className="airtime-layout">
            
            {/* Left Column - Guidelines (Equal Height) */}
            <div className="glass-panel form-card left-panel" style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '24px',
              height: '100%'
            }}>
              <div>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  background: 'var(--primary-glow)',
                  color: 'var(--primary)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  marginBottom: '16px'
                }}>
                  <i className="bi bi-credit-card" />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '8px' }}>
                  {t('Instant Recharge')}
                </h3>
                <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                  {t('Recharge your Ratel VoIP line instantly. Transactions connect directly to local secure payment networks.')}
                </p>
              </div>

              {/* illustrative image */}
              <div style={{
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-sm)',
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--bg-main)',
                minHeight: '180px'
              }}>
                <img src="/credit_cards.png" alt={t("Payment Cards")} style={{
                  width: '100%',
                  height: '100%',
                  maxHeight: '300px',
                  objectFit: 'contain',
                  display: 'block'
                }} />
              </div>

              <div style={{
                background: 'var(--bg-main)',
                padding: '16px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                fontSize: '12.5px',
                color: 'var(--text-muted)',
                lineHeight: '1.6'
              }}>
                <h4 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '6px', textTransform: 'uppercase' }}>
                  {t('Approved prefixes:')}
                </h4>
                <p style={{ fontSize: '11px', margin: 0, fontFamily: 'monospace', color: 'var(--primary)', fontWeight: '600', overflowWrap: 'break-word', wordBreak: 'break-all' }}>
                  0206470, 0209701, 0209702, 0209703, 0209704, 0209705, 0209706, 0209707, 0209708, 0209709, 0209710
                </p>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="glass-panel form-card">
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '24px' }}>
                  {t('Online Recharge Details')}
                </h3>

                {savedUser && rechargeType === 'others' && (
                  <div style={{ marginBottom: '24px' }}>
                    <button 
                      type="button" 
                      onClick={() => setRechargeType('self')}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--primary)',
                        cursor: 'pointer',
                        fontFamily: 'var(--font-title)',
                        fontWeight: '700',
                        fontSize: '13.5px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: 0
                      }}
                    >
                      <i className="bi bi-arrow-left-short" style={{ fontSize: '18px' }} /> {t('Switch back to recharging for myself')}
                    </button>
                  </div>
                )}

                {savedUser && rechargeType === 'self' ? (
                  /* Recharge Myself - Profile Box */
                  <div style={{
                    background: 'var(--primary-glow)',
                    border: '1px solid rgba(24, 73, 201, 0.15)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    marginBottom: '28px',
                    flexWrap: 'wrap'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '50%',
                        background: 'var(--primary)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'var(--font-title)',
                        fontSize: '18px',
                        fontWeight: '800'
                      }}>
                        {savedUser.fname ? savedUser.fname.charAt(0).toUpperCase() : 'R'}
                      </div>
                      <div style={{ textAlign: 'left' }}>
                        <h4 style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('Recharging for Myself')}</h4>
                        <p style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-main)', marginTop: '2px' }}>
                          {savedUser.fname} {savedUser.lname}
                        </p>
                        <p style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: '600', marginTop: '2px' }}>
                          <i className="bi bi-telephone-fill" style={{ fontSize: '11px', marginRight: '4px' }} /> {savedUser.ratelnumber}
                        </p>
                      </div>
                    </div>
                    
                    <button 
                      type="button" 
                      onClick={() => {
                        setRechargeType('others');
                        setFormData({
                          fname: '',
                          sname: '',
                          email: '',
                          amount: formData.amount,
                          ratelnumber: ''
                        });
                      }}
                      style={{
                        background: 'none',
                        border: '1px solid var(--border-color)',
                        padding: '8px 14px',
                        borderRadius: 'var(--radius-sm)',
                        color: 'var(--text-main)',
                        cursor: 'pointer',
                        fontSize: '12.5px',
                        fontWeight: '600',
                        transition: 'var(--transition)'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-card-hover)'; e.currentTarget.style.borderColor = 'var(--border-hover)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.borderColor = 'var(--border-color)'; }}
                    >
                      <i className="bi bi-person-plus-fill" style={{ marginRight: '4px' }} /> {t('Recharge others')}
                    </button>
                  </div>
                ) : null}

                {/* Amount input always visible */}
                <div style={{ marginBottom: '20px' }}>
                  <label className="formLabel" style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                    {t('Amount (₦) *')}
                  </label>
                  <input 
                    type="text" 
                    name="amount" 
                    value={formData.amount}
                    onChange={handleInputChange}
                    placeholder={t("Enter recharge amount (Min ₦100)")} 
                    className="form-input" 
                    style={{ fontSize: '17px', padding: '14px 18px', fontWeight: 'bold' }}
                    required 
                  />
                  {errors.amount && <span style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px', display: 'block' }}>{t(errors.amount)}</span>}
                </div>

                {/* Additional profile fields for first time / recharging others */}
                {rechargeType === 'others' && (
                  <>
                    <div className="content-grid" style={{ marginBottom: '20px' }}>
                      <div>
                        <label className="formLabel" style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>{t('First Name *')}</label>
                        <input type="text" name="fname" value={formData.fname} onChange={handleInputChange} className="form-input" required />
                        {errors.fname && <span style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px', display: 'block' }}>{t(errors.fname)}</span>}
                      </div>
                      <div>
                        <label className="formLabel" style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>{t('Surname *')}</label>
                        <input type="text" name="sname" value={formData.sname} onChange={handleInputChange} className="form-input" required />
                        {errors.sname && <span style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px', display: 'block' }}>{t(errors.sname)}</span>}
                      </div>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                      <label className="formLabel" style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>{t('Email Address *')}</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="form-input" required />
                      {errors.email && <span style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px', display: 'block' }}>{t(errors.email)}</span>}
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                      <label className="formLabel" style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>{t('Ratel Line Number *')}</label>
                      <input 
                        type="text" 
                        name="ratelnumber" 
                        value={formData.ratelnumber}
                        onChange={handleInputChange}
                        placeholder={t("11-digit number (starts with 0206470, 0209701...)")}
                        maxLength={11}
                        className="form-input" 
                        required 
                      />
                      {errors.ratelnumber && <span style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px', display: 'block' }}>{t(errors.ratelnumber)}</span>}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '30px' }}>
                      <input 
                        type="checkbox" 
                        id="saveDetails" 
                        checked={saveDetailsOnPay}
                        onChange={(e) => setSaveDetailsOnPay(e.target.checked)}
                        style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: 'var(--primary)' }}
                      />
                      <label htmlFor="saveDetails" style={{ fontSize: '13px', color: 'var(--text-muted)', cursor: 'pointer', userSelect: 'none' }}>
                        {t('Save details for faster future recharges')}
                      </label>
                    </div>
                  </>
                )}

                <div style={{ marginTop: '20px' }}>
                  <button type="submit" className="btn-primary" style={{ padding: '14px 45px', width: '100%', borderRadius: 'var(--radius-sm)' }}>
                    {t('Proceed to Payment')} <i className="bi bi-arrow-right-short" style={{ fontSize: '18px' }} />
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* ─── SECURE CHECKOUT OVERLAY DIALOG ────────────────────────────────── */}
      {showCheckout && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div className="glass-panel form-card animate-fadeIn" style={{
            maxWidth: '500px',
            width: '100%',
            background: 'var(--bg-card)',
            boxShadow: 'var(--shadow-lg), var(--shadow-glow)',
            position: 'relative'
          }}>
            <button
              onClick={() => setShowCheckout(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'var(--bg-main)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-main)',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '18px',
                transition: 'var(--transition)'
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--text-muted)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
            >
              <i className="bi bi-x" />
            </button>

            <h3 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '18px' }}>
              {t('Billing Summary')}
            </h3>

            {paymentError && (
              <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid #ef4444', color: '#ef4444', padding: '12px', borderRadius: 'var(--radius-sm)', fontSize: '13px', marginBottom: '20px', textAlign: 'center' }}>
                <i className="bi bi-exclamation-triangle-fill" style={{ marginRight: '6px' }} />
                {t(paymentError)}
              </div>
            )}

            {processingGateway === 'verifying' && (
              <div style={{ background: 'var(--primary-glow)', border: '1px solid var(--primary)', color: 'var(--primary)', padding: '12px', borderRadius: 'var(--radius-sm)', fontSize: '13px', marginBottom: '20px', textAlign: 'center' }}>
                <i className="bi bi-arrow-repeat spin" style={{ marginRight: '6px', animation: 'spin 1s linear infinite', display: 'inline-block' }} />
                {t('Verifying your payment, please wait...')}
              </div>
            )}

            <div style={{ background: 'var(--bg-main)', padding: '20px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '13.5px' }}>
                <span style={{ color: 'var(--text-muted)' }}>{t('Item:')}</span>
                <strong style={{ color: 'var(--text-main)' }}>{t('Airtime Recharge')}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '13.5px' }}>
                <span style={{ color: 'var(--text-muted)' }}>{t('Subscriber:')}</span>
                <strong style={{ color: 'var(--text-main)' }}>{rechargeType === 'self' && savedUser ? `${savedUser.fname} ${savedUser.lname}` : `${formData.fname} ${formData.sname}`}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '13.5px' }}>
                <span style={{ color: 'var(--text-muted)' }}>{t('Ratel Number:')}</span>
                <strong style={{ color: 'var(--text-main)' }}>{finalPhone}</strong>
              </div>
              <hr style={{ border: 'none', borderTop: '1px dashed var(--border-color)', margin: '14px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}>
                <span style={{ fontWeight: '700', color: 'var(--text-main)' }}>{t('Amount Due:')}</span>
                <strong style={{ fontSize: '18px', fontWeight: '800', color: 'var(--primary)' }}>
                  ₦{parseInt(formData.amount, 10).toLocaleString()}
                </strong>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <button
                onClick={handlePayWithPaystack}
                disabled={processingGateway !== null}
                style={{
                  padding: '14px',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  background: '#f97316',
                  color: '#fff',
                  fontWeight: '700',
                  fontSize: '14.5px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#ea6b0c'}
                onMouseLeave={e => e.currentTarget.style.background = '#f97316'}
              >
                <i className="bi bi-credit-card-fill" /> {t('Pay with Paystack')}
              </button>

              <button
                onClick={handlePayWithOpay}
                disabled={processingGateway !== null}
                style={{
                  padding: '14px',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  background: '#00d09c',
                  color: '#fff',
                  fontWeight: '700',
                  fontSize: '14.5px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#00b886'}
                onMouseLeave={e => e.currentTarget.style.background = '#00d09c'}
              >
                <i className="bi bi-wallet2" /> {t('Pay with OPay')}
              </button>
            </div>

            <div style={{ marginTop: '24px', borderTop: '1px solid var(--border-color)', paddingTop: '16px', textAlign: 'center' }}>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                {t('Paid successfully in the OPay cashier tab?')}
              </p>
              <button
                onClick={() => {
                  setPaymentSuccess(true);
                  setShowCheckout(false);
                }}
                style={{
                  background: 'none',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-main)',
                  padding: '8px 24px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'var(--transition)'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary-glow)'; e.currentTarget.style.borderColor = 'var(--primary)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.borderColor = 'var(--border-color)'; }}
              >
                {t('✓ I have completed the OPay payment')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HIDDEN HTML FORM FOR OPAY POST SUBMIT TO ROOT PAYER.PHP */}
      <form
        ref={opayFormRef}
        action={OPAY_POST_URL}
        method="POST"
        target="_blank"
        style={{ display: 'none' }}
      >
        <input type="hidden" name="email" value={finalEmail} />
        <input type="hidden" name="phone" value={finalPhone} />
        <input type="hidden" name="fname" value={finalFname} />
        <input type="hidden" name="lname" value={finalLname} />
        <input type="hidden" name="amount" value={formData.amount} />
        <input type="hidden" name="source" value="Airtime" />
        <input type="hidden" name="reference" value={generatedRef} />
        <input type="hidden" name="opay" value="opay" />
        <input type="hidden" name="redirect_origin" value={typeof window !== 'undefined' ? window.location.origin : ''} />
      </form>

      {/* Local responsive styling */}
      <style>{`
        .airtime-layout {
          display: grid;
          grid-template-columns: 1fr 2.2fr;
          gap: 40px;
          align-items: stretch;
        }
        .left-panel {
          min-height: 100%;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @media (max-width: 1024px) {
          .airtime-layout {
            grid-template-columns: 1fr;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
}
