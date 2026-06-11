'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const REGISTRATION_FEE = 1000;
const CURRENCY = 'NGN';
const OPAY_POST_URL = 'https://ratelplus.net/subs/payer.php';

export default function PersonalSubscribers() {
  const [formData, setFormData] = useState({
    fname: '',
    sname: '',
    email: '',
    mobile: '',
    nin: '',
    addr: ''
  });

  const [errors, setErrors] = useState({});
  const [generatedRef, setGeneratedRef] = useState('');

  // Explicit upload slots states
  const [idCardFile, setIdCardFile] = useState(null);
  const [portraitFile, setPortraitFile] = useState(null);

  // Drag states
  const [idDragActive, setIdDragActive] = useState(false);
  const [portraitDragActive, setPortraitDragActive] = useState(false);

  // Overlay states
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [processingGateway, setProcessingGateway] = useState(null);

  // File input references
  const idInputRef = useRef(null);
  const portraitInputRef = useRef(null);

  // Form reference for OPay POST submit
  const opayFormRef = useRef(null);

  const generateReference = () => {
    const ref = Math.floor(10000000 + Math.random() * 90000000).toString();
    setGeneratedRef(ref);
    return ref;
  };

  // ─── Input Handling ───────────────────────────────────────────────────────
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'mobile' || name === 'nin') {
      let cleanValue = value.replace(/\D/g, '');
      if (name === 'mobile' && cleanValue.startsWith('234') && cleanValue.length === 13) {
        cleanValue = '0' + cleanValue.slice(3);
      }
      if (cleanValue.length > 11) cleanValue = cleanValue.slice(0, 11);

      setFormData(prev => ({ ...prev, [name]: cleanValue }));

      if (name === 'mobile') {
        if (cleanValue.length > 0 && cleanValue.length !== 11) {
          setErrors(prev => ({ ...prev, mobile: 'Mobile number must be exactly 11 digits' }));
        } else {
          setErrors(prev => { const c = { ...prev }; delete c.mobile; return c; });
        }
      }
      if (name === 'nin') {
        if (cleanValue.length > 0 && cleanValue.length !== 11) {
          setErrors(prev => ({ ...prev, nin: 'NIN must be exactly 11 digits' }));
        } else {
          setErrors(prev => { const c = { ...prev }; delete c.nin; return c; });
        }
      }
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ─── File Select & Drop Handlers ─────────────────────────────────────────
  const handleFileSelect = (e, slotType) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0], slotType);
      e.target.value = null;
    }
  };

  const handleDrag = (e, slotType, activeStateSetter) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      activeStateSetter(true);
    } else if (e.type === 'dragleave' || e.type === 'drop') {
      activeStateSetter(false);
    }
  };

  const handleDrop = (e, slotType, activeStateSetter) => {
    e.preventDefault();
    e.stopPropagation();
    activeStateSetter(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0], slotType);
    }
  };

  const processFile = (file, slotType) => {
    if (!file.type.startsWith('image/')) {
      alert(`"${file.name}" is not an image file.`);
      return;
    }
    if (file.size > 14 * 1024 * 1024) {
      alert(`"${file.name}" exceeds the 14MB limit.`);
      return;
    }

    const stateSetter = slotType === 'idCard' ? setIdCardFile : setPortraitFile;
    const initialEntry = {
      name: file.name,
      url: URL.createObjectURL(file),
      progress: 0,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB'
    };

    stateSetter(initialEntry);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      if (progress >= 100) {
        clearInterval(interval);
        stateSetter(prev => prev ? { ...prev, progress: 100 } : null);
      } else {
        stateSetter(prev => prev ? { ...prev, progress } : null);
      }
    }, 100);
  };

  const handleRemoveFile = (slotType) => {
    const stateSetter = slotType === 'idCard' ? setIdCardFile : setPortraitFile;
    stateSetter(null);
  };

  // ─── Form Submission ──────────────────────────────────────────────────────
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const activeErrors = {};

    if (!formData.fname.trim()) activeErrors.fname = 'First name is required';
    if (!formData.sname.trim()) activeErrors.sname = 'Surname is required';
    if (!formData.email.trim()) activeErrors.email = 'Email address is required';
    if (formData.mobile.length !== 11) activeErrors.mobile = 'An 11-digit mobile number is required';
    if (formData.nin && formData.nin.length !== 11) activeErrors.nin = 'NIN must be exactly 11 digits';
    if (!formData.addr.trim()) activeErrors.addr = 'Residential address is required';

    if (!idCardFile || idCardFile.progress < 100) {
      activeErrors.idCard = 'ID card slip is required';
    }
    if (!portraitFile || portraitFile.progress < 100) {
      activeErrors.portrait = 'Portrait photo is required';
    }

    if (Object.keys(activeErrors).length > 0) {
      setErrors(activeErrors);
      return;
    }

    setErrors({});
    generateReference();
    setShowCheckout(true);
  };

  // ─── secure Paystack Checkout ──────────────────────────────────────────────
  const handlePayWithPaystack = async () => {
    setPaymentError('');
    setProcessingGateway('paystack');

    try {
      const { default: PaystackPop } = await import('@paystack/inline-js');
      const popup = new PaystackPop();
      popup.newTransaction({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || 'pk_live_f794eddafa6e2897901b7b801b901188a9526863',
        email: formData.email,
        amount: REGISTRATION_FEE * 100,
        currency: CURRENCY,
        ref: `REG-${formData.mobile}-${generatedRef}`,
        metadata: {
          custom_fields: [
            { display_name: 'Package', variable_name: 'package_title', value: 'Personal SIM Registration' },
            { display_name: 'Full Name', variable_name: 'full_name', value: `${formData.fname} ${formData.sname}` },
            { display_name: 'Mobile Number', variable_name: 'mobile', value: formData.mobile },
            { display_name: 'NIN', variable_name: 'nin', value: formData.nin || 'Not provided' },
            { display_name: 'Address', variable_name: 'address', value: formData.addr }
          ]
        },
        onSuccess: (transaction) => {
          setProcessingGateway(null);
          setPaymentSuccess(true);
          setShowCheckout(false);
        },
        onCancel: () => {
          setProcessingGateway(null);
          setPaymentError('Payment cancelled.');
        }
      });
    } catch (err) {
      setProcessingGateway(null);
      setPaymentError('Failed to load Paystack pop-up.');
    }
  };

  // ─── secure OPay Checkout ──────────────────────────────────────────────────
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
                <i className="bi bi-check-circle-fill" />
              </div>

              <h2 style={{ fontSize: '30px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '14px' }}>
                Registration Submitted!
              </h2>

              <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '30px' }}>
                Thank you, <strong>{formData.fname} {formData.sname}</strong>. Your SIM registration and NIN compliance linkage request has been successfully submitted and queued. NCC network agents will verify your uploaded credentials in under 5 minutes.
              </p>

              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                <Link href="/" className="btn-primary" style={{ padding: '12px 30px' }}>
                  Return Home
                </Link>
                <Link href="/airtime" className="btn-secondary" style={{ padding: '12px 30px' }}>
                  Buy Airtime
                </Link>
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
          <div className="subscribers-layout">

            {/* Left Column - Guidelines & Info (Equal Height) */}
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
                  <i className="bi bi-person-video3" />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '8px' }}>
                  SIM Compliance Linkage
                </h3>
                <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                  Complete your registration profile to link your National Identification Number (NIN) slip and activate your personal VoIP line.
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
                minHeight: '200px'
              }}>
                <img src="/phone_mockup.png" alt="Ratel Phone App" style={{
                  width: '100%',
                  height: '100%',
                  maxHeight: '340px',
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
                <i className="bi bi-clock-history" style={{ color: 'var(--primary)', marginRight: '6px' }} />
                NCC compliance agents review registrations within 5 minutes between 8:00 AM and 10:00 PM Nigerian time.
              </div>
            </div>

            {/* Right Column - Single Page Form */}
            <div className="glass-panel form-card">
              <form onSubmit={handleFormSubmit}>
                <h3 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '24px' }}>
                  Subscriber Registration Form
                </h3>

                <div className="content-grid" style={{ marginBottom: '20px' }}>
                  <div>
                    <label className="formLabel" style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>First Name *</label>
                    <input type="text" name="fname" value={formData.fname} onChange={handleInputChange} className="form-input" required />
                    {errors.fname && <span style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px', display: 'block' }}>{errors.fname}</span>}
                  </div>
                  <div>
                    <label className="formLabel" style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>Surname *</label>
                    <input type="text" name="sname" value={formData.sname} onChange={handleInputChange} className="form-input" required />
                    {errors.sname && <span style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px', display: 'block' }}>{errors.sname}</span>}
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label className="formLabel" style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>Email Address *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="form-input" required />
                  {errors.email && <span style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px', display: 'block' }}>{errors.email}</span>}
                </div>

                <div className="content-grid" style={{ marginBottom: '20px' }}>
                  <div>
                    <label className="formLabel" style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>Mobile Number *</label>
                    <input type="text" name="mobile" placeholder="e.g. 08031234567" maxLength={11} value={formData.mobile} onChange={handleInputChange} className="form-input" required />
                    {errors.mobile && <span style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px', display: 'block' }}>{errors.mobile}</span>}
                  </div>
                  <div>
                    <label className="formLabel" style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>NIN (11 digits)</label>
                    <input type="text" name="nin" placeholder="National Identity Number" maxLength={11} value={formData.nin} onChange={handleInputChange} className="form-input" />
                    {errors.nin && <span style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px', display: 'block' }}>{errors.nin}</span>}
                  </div>
                </div>

                <div style={{ marginBottom: '25px' }}>
                  <label className="formLabel" style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>Residential Address *</label>
                  <textarea name="addr" rows={3} value={formData.addr} onChange={handleInputChange} className="form-input" required style={{ resize: 'vertical' }} />
                  {errors.addr && <span style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px', display: 'block' }}>{errors.addr}</span>}
                </div>

                {/* RESPONSIVE VISUAL FILE UPLOADER */}
                <div style={{ marginBottom: '35px' }}>
                  <label className="formLabel" style={{ fontSize: '12.5px', fontWeight: '700', color: 'var(--text-main)', display: 'block', marginBottom: '12px' }}>
                    Compliance Documents (Upload Both) *
                  </label>

                  <div className="upload-slots-container">

                    {/* Slot 1: ID Slip */}
                    <div>
                      <span style={{ fontSize: '12px', fontWeight: '600', color: errors.idCard ? '#ef4444' : 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                        1. Government ID Slip *
                      </span>
                      <input ref={idInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleFileSelect(e, 'idCard')} />

                      <div
                        onClick={() => idInputRef.current.click()}
                        onDragEnter={(e) => handleDrag(e, 'idCard', setIdDragActive)}
                        onDragOver={(e) => handleDrag(e, 'idCard', setIdDragActive)}
                        onDragLeave={(e) => handleDrag(e, 'idCard', setIdDragActive)}
                        onDrop={(e) => handleDrop(e, 'idCard', setIdDragActive)}
                        style={{
                          border: idDragActive ? '2px dashed var(--primary)' : '2px dashed var(--border-color)',
                          borderRadius: 'var(--radius-sm)',
                          background: idDragActive ? 'var(--primary-glow)' : 'transparent',
                          padding: '24px 12px',
                          textAlign: 'center',
                          cursor: 'pointer',
                          minHeight: '170px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'var(--transition)',
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                      >
                        {idCardFile ? (
                          <>
                            {idCardFile.progress < 100 ? (
                              <div style={{ width: '100%', padding: '0 10px' }}>
                                <i className="bi bi-arrow-repeat spin" style={{ fontSize: '24px', color: 'var(--primary)', animation: 'spin 1s linear infinite', display: 'inline-block', marginBottom: '8px' }} />
                                <span style={{ fontSize: '12px', display: 'block', color: 'var(--text-main)', marginBottom: '4px' }}>Uploading ID...</span>
                                <div style={{ width: '100%', background: 'var(--border-color)', height: '4px', borderRadius: '2px', overflow: 'hidden' }}>
                                  <div style={{ width: `${idCardFile.progress}%`, background: 'var(--primary)', height: '100%' }} />
                                </div>
                              </div>
                            ) : (
                              <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <img src={idCardFile.url} alt="ID Preview" style={{ width: '60px', height: '60px', borderRadius: '4px', objectFit: 'cover', border: '1px solid var(--border-color)' }} />
                                <span style={{ fontSize: '11px', color: 'var(--text-main)', fontWeight: '600', marginTop: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '90%' }}>{idCardFile.name}</span>
                                <span style={{ fontSize: '10px', color: 'var(--accent-green)', fontWeight: '600', marginTop: '2px' }}><i className="bi bi-check-circle-fill" /> Loaded</span>
                                <button
                                  type="button"
                                  onClick={(e) => { e.stopPropagation(); handleRemoveFile('idCard'); }}
                                  style={{ position: 'absolute', top: '-10px', right: '-4px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}
                                >
                                  <i className="bi bi-x" />
                                </button>
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            <i className="bi bi-card-heading" style={{ fontSize: '28px', color: errors.idCard ? '#ef4444' : 'var(--primary)', marginBottom: '8px' }} />
                            <span style={{ fontSize: '12px', color: 'var(--text-main)', fontWeight: '700' }}>Select ID slip</span>
                            <span style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>NIN Slip, Passport, or License</span>
                            <span style={{ position: 'absolute', bottom: '8px', fontSize: '9px', textTransform: 'uppercase', fontWeight: '700', padding: '2px 8px', borderRadius: '8px', background: errors.idCard ? 'rgba(239, 68, 68, 0.1)' : 'var(--bg-main)', color: errors.idCard ? '#ef4444' : 'var(--text-muted)' }}>
                              {errors.idCard ? 'Required File' : 'Empty'}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Slot 2: Portrait Selfie */}
                    <div>
                      <span style={{ fontSize: '12px', fontWeight: '600', color: errors.portrait ? '#ef4444' : 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                        2. Recent Portrait Photo *
                      </span>
                      <input ref={portraitInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleFileSelect(e, 'portrait')} />

                      <div
                        onClick={() => portraitInputRef.current.click()}
                        onDragEnter={(e) => handleDrag(e, 'portrait', setPortraitDragActive)}
                        onDragOver={(e) => handleDrag(e, 'portrait', setPortraitDragActive)}
                        onDragLeave={(e) => handleDrag(e, 'portrait', setPortraitDragActive)}
                        onDrop={(e) => handleDrop(e, 'portrait', setPortraitDragActive)}
                        style={{
                          border: portraitDragActive ? '2px dashed var(--primary)' : '2px dashed var(--border-color)',
                          borderRadius: 'var(--radius-sm)',
                          background: portraitDragActive ? 'var(--primary-glow)' : 'transparent',
                          padding: '24px 12px',
                          textAlign: 'center',
                          cursor: 'pointer',
                          minHeight: '170px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'var(--transition)',
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                      >
                        {portraitFile ? (
                          <>
                            {portraitFile.progress < 100 ? (
                              <div style={{ width: '100%', padding: '0 10px' }}>
                                <i className="bi bi-arrow-repeat spin" style={{ fontSize: '24px', color: 'var(--primary)', animation: 'spin 1s linear infinite', display: 'inline-block', marginBottom: '8px' }} />
                                <span style={{ fontSize: '12px', display: 'block', color: 'var(--text-main)', marginBottom: '4px' }}>Uploading Selfie...</span>
                                <div style={{ width: '100%', background: 'var(--border-color)', height: '4px', borderRadius: '2px', overflow: 'hidden' }}>
                                  <div style={{ width: `${portraitFile.progress}%`, background: 'var(--primary)', height: '100%' }} />
                                </div>
                              </div>
                            ) : (
                              <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <img src={portraitFile.url} alt="Selfie Preview" style={{ width: '60px', height: '60px', borderRadius: '4px', objectFit: 'cover', border: '1px solid var(--border-color)' }} />
                                <span style={{ fontSize: '11px', color: 'var(--text-main)', fontWeight: '600', marginTop: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '90%' }}>{portraitFile.name}</span>
                                <span style={{ fontSize: '10px', color: 'var(--accent-green)', fontWeight: '600', marginTop: '2px' }}><i className="bi bi-check-circle-fill" /> Loaded</span>
                                <button
                                  type="button"
                                  onClick={(e) => { e.stopPropagation(); handleRemoveFile('portrait'); }}
                                  style={{ position: 'absolute', top: '-10px', right: '-4px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}
                                >
                                  <i className="bi bi-x" />
                                </button>
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            <i className="bi bi-person-bounding-box" style={{ fontSize: '28px', color: errors.portrait ? '#ef4444' : 'var(--primary)', marginBottom: '8px' }} />
                            <span style={{ fontSize: '12px', color: 'var(--text-main)', fontWeight: '700' }}>Select portrait photo</span>
                            <span style={{ fontspan: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>Clear face photo selfie</span>
                            <span style={{ position: 'absolute', bottom: '8px', fontSize: '9px', textTransform: 'uppercase', fontWeight: '700', padding: '2px 8px', borderRadius: '8px', background: errors.portrait ? 'rgba(239, 68, 68, 0.1)' : 'var(--bg-main)', color: errors.portrait ? '#ef4444' : 'var(--text-muted)' }}>
                              {errors.portrait ? 'Required File' : 'Empty'}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <button type="submit" className="btn-primary" style={{ padding: '14px 45px', width: '100%', borderRadius: 'var(--radius-sm)' }}>
                    Proceed to Secure Payment (₦{REGISTRATION_FEE.toLocaleString()}) <i className="bi bi-arrow-right-short" style={{ fontSize: '18px' }} />
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
              Billing Summary
            </h3>

            {paymentError && (
              <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid #ef4444', color: '#ef4444', padding: '12px', borderRadius: 'var(--radius-sm)', fontSize: '13px', marginBottom: '20px', textAlign: 'center' }}>
                <i className="bi bi-exclamation-triangle-fill" style={{ marginRight: '6px' }} />
                {paymentError}
              </div>
            )}

            <div style={{ background: 'var(--bg-main)', padding: '20px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '13.5px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Item:</span>
                <strong style={{ color: 'var(--text-main)' }}>SIM Registration Fee</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '13.5px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Subscriber:</span>
                <strong style={{ color: 'var(--text-main)' }}>{formData.fname} {formData.sname}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '13.5px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Mobile Line:</span>
                <strong style={{ color: 'var(--text-main)' }}>{formData.mobile}</strong>
              </div>
              <hr style={{ border: 'none', borderTop: '1px dashed var(--border-color)', margin: '14px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}>
                <span style={{ fontWeight: '700', color: 'var(--text-main)' }}>Amount Due:</span>
                <strong style={{ fontSize: '18px', fontWeight: '800', color: 'var(--primary)' }}>
                  ₦{REGISTRATION_FEE.toLocaleString()}
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
                <i className="bi bi-credit-card-fill" /> Pay with Paystack
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
                <i className="bi bi-wallet2" /> Pay with OPay
              </button>
            </div>

            <div style={{ marginTop: '24px', borderTop: '1px solid var(--border-color)', paddingTop: '16px', textAlign: 'center' }}>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                Paid successfully in the OPay cashier tab?
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
                ✓ I have completed the OPay payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HIDDEN HTML FORM FOR OPAY POST SUBMIT */}
      <form
        ref={opayFormRef}
        action={OPAY_POST_URL}
        method="POST"
        target="_blank"
        style={{ display: 'none' }}
      >
        <input type="hidden" name="email" value={formData.email} />
        <input type="hidden" name="phone" value={formData.mobile} />
        <input type="hidden" name="fname" value={formData.fname} />
        <input type="hidden" name="lname" value={formData.sname} />
        <input type="hidden" name="amount" value={REGISTRATION_FEE} />
        <input type="hidden" name="source" value="Personal Subscriber" />
        <input type="hidden" name="reference" value={generatedRef} />
        <input type="hidden" name="opay" value="opay" />
      </form>

      {/* Local custom responsive styles */}
      <style>{`
        .subscribers-layout {
          display: grid;
          grid-template-columns: 1fr 2.2fr;
          gap: 40px;
          align-items: stretch;
        }
        .left-panel {
          min-height: 100%;
        }
        .upload-slots-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
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
          .subscribers-layout {
            grid-template-columns: 1fr;
            align-items: flex-start;
          }
        }
        @media (max-width: 768px) {
          .upload-slots-container {
            grid-template-columns: 1fr;
            gap: 15px;
          }
        }
      `}</style>
    </div>
  );
}
