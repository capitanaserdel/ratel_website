'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function FiberDetails() {
  const { t } = useLanguage();

  const plans = [
    {
      name: "Home Starter",
      price: "15,000",
      speed: "25 Mbps",
      period: "Month",
      popular: false,
      color: "var(--text-muted)",
      desc: "Perfect for light browsing, emails, social media, and standard HD streaming.",
      features: [
        "Symmetric Upload/Download",
        "Truly Unlimited Data (No Cap)",
        "Standard Installation",
        "24/7 Customer Support"
      ]
    },
    {
      name: "Home Premium",
      price: "25,000",
      speed: "50 Mbps",
      period: "Month",
      popular: true,
      color: "var(--accent-green)",
      desc: "Best for families, remote work, smart homes, and buffer-free 4K streaming.",
      features: [
        "Symmetric Upload/Download",
        "Truly Unlimited Data (No Cap)",
        "Priority Installation Support",
        "24/7 Priority Helpline Support",
        "Multi-Device HD Streaming"
      ]
    },
    {
      name: "Office Premium",
      price: "45,000",
      speed: "100 Mbps",
      period: "Month",
      popular: false,
      color: "var(--primary)",
      desc: "Optimized for small offices, co-working spaces, and heavy cloud operations.",
      features: [
        "Symmetric Upload/Download",
        "Truly Unlimited Data (No Cap)",
        "Dedicated Fiber Drop Cable",
        "24/7 Priority Support SLA",
        "Static IP Option Available"
      ]
    },
    {
      name: "Enterprise Dedicated",
      price: "Custom",
      speed: "1 Gbps+",
      period: "SLA Contract",
      popular: false,
      color: "#f59e0b",
      desc: "Dedicated 1:1 optical transit channels for large corporations and data centers.",
      features: [
        "1:1 Fully Dedicated Bandwidth",
        "99.99% Guaranteed Uptime SLA",
        "Dedicated Account Manager",
        "Free Routed Block of /29 IP",
        "Proactive Jitter Monitoring"
      ]
    }
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <ul className="breadcrumbs">
            <li><Link href="/">{t('Home')}</Link></li>
            <li><Link href="/reg-options">{t('Registration Options')}</Link></li>
            <li>{t('Fiber Subscribers')}</li>
          </ul>
          <h1 className="page-title">{t('Fiber Broadband Plans')}</h1>
        </div>
      </div>

      {/* Main Section */}
      <section className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Decorative Background Auroras */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '-5%',
          width: '45vw',
          height: '45vw',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.03) 0%, transparent 60%)',
          pointerEvents: 'none',
          zIndex: 0
        }} />
        <div style={{
          position: 'absolute',
          bottom: '20%',
          right: '-10%',
          width: '50vw',
          height: '50vw',
          background: 'radial-gradient(circle, rgba(24, 73, 201, 0.02) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          
          {/* Header intro */}
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px' }}>
            <span style={{
              background: 'rgba(16, 185, 129, 0.08)',
              color: 'var(--accent-green)',
              textTransform: 'uppercase',
              fontSize: '12px',
              fontWeight: '800',
              padding: '6px 16px',
              borderRadius: '50px',
              letterSpacing: '0.05em',
              display: 'inline-block',
              marginBottom: '16px'
            }}>
              {t('High-Speed Fibre to the Home (FTTH)')}
            </span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: '800', marginBottom: '20px', color: 'var(--text-main)' }}>
              {t('Choose Your High-Speed Fiber Plan')}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: '1.8' }}>
              {t('Experience truly unlimited, symmetric broadband connections with zero data caps or throttled speeds. Choose a package below and proceed to our secure Fiber portal to activate your installation.')}
            </p>
          </div>

          {/* Pricing Grid */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '30px',
            justifyContent: 'center',
            marginBottom: '60px',
            alignItems: 'stretch'
          }}>
            {plans.map((plan, idx) => (
              <div 
                key={idx}
                className="glass-panel"
                style={{
                  flex: '1 1 280px',
                  maxWidth: '340px',
                  padding: '40px 30px',
                  borderRadius: 'var(--radius-lg)',
                  border: plan.popular ? '2px solid var(--accent-green)' : '1px solid var(--border-color)',
                  background: plan.popular ? 'var(--bg-card)' : 'var(--bg-card)',
                  boxShadow: plan.popular ? '0 20px 40px rgba(16, 185, 129, 0.1), var(--shadow-lg)' : 'var(--shadow-md)',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'var(--transition)'
                }}
              >
                {/* Popular Ribbon */}
                {plan.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    right: '-35px',
                    background: 'var(--accent-green)',
                    color: 'white',
                    fontSize: '10px',
                    fontWeight: '800',
                    textTransform: 'uppercase',
                    padding: '6px 40px',
                    transform: 'rotate(45deg)',
                    letterSpacing: '0.05em',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                  }}>
                    {t('Popular')}
                  </div>
                )}

                {/* Card Header */}
                <div style={{ marginBottom: '25px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-main)', margin: 0 }}>{t(plan.name)}</h3>
                  <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginTop: '8px', minHeight: '38px', lineHeight: '1.5' }}>{t(plan.desc)}</p>
                </div>

                {/* Plan Speed Display */}
                <div style={{ 
                  background: plan.popular ? 'rgba(16, 185, 129, 0.06)' : 'var(--bg-main)',
                  padding: '16px 20px',
                  borderRadius: 'var(--radius-sm)',
                  textAlign: 'center',
                  marginBottom: '25px',
                  border: plan.popular ? '1px solid rgba(16, 185, 129, 0.15)' : '1px solid var(--border-color)'
                }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.05em' }}>{t('Internet Speed')}</span>
                  <div style={{ fontSize: '26px', fontWeight: '800', color: plan.popular ? 'var(--accent-green)' : 'var(--text-main)', marginTop: '4px' }}>
                    {plan.speed}
                  </div>
                </div>

                {/* Price Display */}
                <div style={{ marginBottom: '30px', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  {plan.price !== "Custom" && (
                    <span style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-main)' }}>₦</span>
                  )}
                  <span style={{ fontSize: '38px', fontWeight: '800', color: 'var(--text-main)', lineHeight: 1 }}>
                    {plan.price === "Custom" ? t("Custom") : plan.price}
                  </span>
                  {plan.price !== "Custom" && (
                    <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: '500' }}>/{t(plan.period)}</span>
                  )}
                </div>

                {/* Plan Features */}
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px', display: 'flex', flexDirection: 'column', gap: '14px', flexGrow: 1 }}>
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} style={{ display: 'flex', gap: '10px', fontSize: '13.5px', color: 'var(--text-muted)', alignItems: 'center' }}>
                      <i className="bi bi-check-circle-fill" style={{ color: 'var(--accent-green)', fontSize: '14px', flexShrink: 0 }} />
                      <span>{t(feat)}</span>
                    </li>
                  ))}
                </ul>

                {/* Redirect Button */}
                <a 
                  href="https://fibre.ratelplus.net.ng"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '12px',
                    textAlign: 'center',
                    background: plan.popular ? 'var(--accent-green)' : 'var(--primary)',
                    borderColor: plan.popular ? 'var(--accent-green)' : 'var(--primary)',
                    boxShadow: plan.popular ? '0 4px 14px rgba(16, 185, 129, 0.2)' : '0 4px 14px rgba(24, 73, 201, 0.15)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '14px',
                    fontWeight: '700'
                  }}
                >
                  {plan.price === "Custom" ? t("Contact Corporate Sales") : `${t('Order')} ${t(plan.name)}`} <i className="bi bi-box-arrow-up-right" style={{ marginLeft: '4px', fontSize: '12px' }}></i>
                </a>
              </div>
            ))}
          </div>

          {/* Quick Support & Information Grid */}
          <div className="content-grid" style={{ maxWidth: '900px', margin: '0 auto 40px' }}>
            <div className="glass-panel form-card" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(16, 185, 129, 0.08)',
                color: 'var(--accent-green)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                flexShrink: 0
              }}>
                <i className="bi bi-info-circle-fill"></i>
              </div>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>{t('Installation Note')}</h4>
                <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
                  {t('Installation charge covers standard drop cable fiber drop, fiber terminal node box placement, and high-performance dual-band optical wifi router provisioning. Check coverage dynamically on the portal.')}
                </p>
              </div>
            </div>

            <div className="glass-panel form-card" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(24, 73, 201, 0.08)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                flexShrink: 0
              }}>
                <i className="bi bi-chat-left-text-fill"></i>
              </div>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>{t('Dedicated Office Links')}</h4>
                <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
                  {t('For corporate headquarters requiring high bandwidth (100 Mbps - 10 Gbps) and absolute priority channels with 99.99% active circuit SLA, please click Contact Corporate Sales to schedule an office audit.')}
                </p>
              </div>
            </div>
          </div>

          {/* Centralized CTA bar */}
          <div className="glass-panel form-card" style={{
            textAlign: 'center',
            background: 'var(--bg-card)',
            border: '1px solid rgba(24, 73, 201, 0.15)',
            boxShadow: 'var(--shadow-lg)',
            maxWidth: '900px',
            margin: '0 auto',
            padding: '30px'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>{t('Already a Fiber subscriber?')}</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '20px' }}>
              {t('Manage active speed subscriptions, pay renewal fees online, and check invoices directly on the billing portal.')}
            </p>
            <a 
              href="https://fibre.ratelplus.net.ng" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-secondary"
              style={{ padding: '10px 24px', fontSize: '14px', fontWeight: '600' }}
            >
              {t('Access Fiber Customer Portal')} <i className="bi bi-box-arrow-up-right" style={{ marginLeft: '4px', fontSize: '12px' }}></i>
            </a>
          </div>

        </div>
      </section>
    </div>
  );
}
