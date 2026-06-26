'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function RegOptions() {
  const { t } = useLanguage();

  return (
    <div>
      {/* Choice Category Header */}
      <div style={{ paddingTop: '60px' }}></div>

      {/* Main Choice Cards Section */}
      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 60px' }}>
            <span style={{ color: 'var(--primary)', textTransform: 'uppercase', fontSize: '13px', fontWeight: '600', letterSpacing: '0.05em' }}>
              {t('NIN Compliance & Account Setup')}
            </span>
            <h2 style={{ fontSize: '32px', fontWeight: '800', marginTop: '10px', marginBottom: '16px' }}>{t('Select Registration Option')}</h2>
            <p style={{ color: 'var(--text-muted)' }}>
              {t('Choose your subscriber category to link your National Identification Number (NIN) or provision new enterprise VoIP lines.')}
            </p>
          </div>

          <div className="content-grid" style={{ maxWidth: '900px', margin: '0 auto' }}>
            
            {/* Personal Card */}
            <div className="glass-panel form-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'center' }}>
              <div 
                style={{ 
                  width: '70px', 
                  height: '70px', 
                  borderRadius: '16px', 
                  background: 'rgba(37, 99, 235, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  color: 'var(--primary)',
                  margin: '0 auto 10px'
                }}
              >
                <i className="bi bi-person-badge-fill"></i>
              </div>
              <h3 style={{ fontSize: '22px', color: 'var(--text-main)' }}>{t('Personal Subscribers')}</h3>
              <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-muted)' }}>
                {t('Link your personal mobile voice line, upload verification details, and ensure your SIM compliance with the NCC guidelines.')}
              </p>
              <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
                <Link href="/personal-subscribers" className="btn-primary" style={{ width: '100%' }}>
                  {t('Register Personal SIM')}
                </Link>
              </div>
            </div>

            {/* Fiber Card */}
            <div 
              className="glass-panel form-card" 
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '20px', 
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div 
                style={{ 
                  width: '70px', 
                  height: '70px', 
                  borderRadius: '16px', 
                  background: 'rgba(16, 185, 129, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  color: 'var(--accent-green)',
                  margin: '0 auto 10px'
                }}
              >
                <i className="bi bi-router-fill"></i>
              </div>
              <h3 style={{ fontSize: '22px', color: 'var(--text-main)' }}>{t('Fiber Subscribers')}</h3>
              <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-muted)' }}>
                {t('Request high-speed, reliable fiber optic broadband installation directly to your home or office, select plans, and check coverage.')}
              </p>
              <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
                <Link href="/reg-options/fiber" className="btn-primary" style={{ width: '100%', background: 'var(--accent-green)', borderColor: 'var(--accent-green)', boxShadow: '0 4px 14px rgba(16, 185, 129, 0.2)' }}>
                  {t('Explore Fiber Options')}
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
