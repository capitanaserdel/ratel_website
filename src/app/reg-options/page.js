'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function RegOptions() {
  const { t } = useLanguage();

  const cardBase = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
  };

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
            <h2 style={{ fontSize: '32px', fontWeight: '800', marginTop: '10px', marginBottom: '16px' }}>
              {t('Select Registration Option')}
            </h2>
            <p style={{ color: 'var(--text-muted)' }}>
              {t('Choose your subscriber category to link your National Identification Number (NIN) or provision new enterprise VoIP lines.')}
            </p>
          </div>

          <div className="content-grid" style={{ maxWidth: '900px', margin: '0 auto' }}>

            {/* Personal Card — fully clickable */}
            <Link
              href="/personal-subscribers"
              id="reg-personal-card"
              className="glass-panel form-card"
              style={cardBase}
            >
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
                  margin: '0 auto 10px',
                }}
              >
                <i className="bi bi-person-badge-fill"></i>
              </div>
              <h3 style={{ fontSize: '22px', color: 'var(--text-main)' }}>
                {t('Ratel Phone App')}
              </h3>
              <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-muted)' }}>
                {t('Link your personal mobile voice line, upload verification details, and ensure your SIM compliance with the NCC guidelines.')}
              </p>
              <div style={{ marginTop: 'auto', paddingTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--primary)', fontWeight: '700', fontSize: '14px' }}>
                {t('Ratel Phone App Register')}
                <i className="bi bi-arrow-right-circle-fill" style={{ fontSize: '18px' }}></i>
              </div>
            </Link>

            {/* Fiber Card — fully clickable */}
            <Link
              href="/reg-options/fiber"
              id="reg-fiber-card"
              className="glass-panel form-card"
              style={{ ...cardBase, position: 'relative', overflow: 'hidden' }}
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
                  margin: '0 auto 10px',
                }}
              >
                <i className="bi bi-router-fill"></i>
              </div>
              <h3 style={{ fontSize: '22px', color: 'var(--text-main)' }}>
                {t('Fiber To The Home Registration')}
              </h3>
              <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-muted)' }}>
                {t('Request high-speed, reliable fiber optic broadband installation directly to your home or office, select plans, and check coverage.')}
              </p>
              <div style={{ marginTop: 'auto', paddingTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--accent-green)', fontWeight: '700', fontSize: '14px' }}>
                {t('Explore Fiber Options')}
                <i className="bi bi-arrow-right-circle-fill" style={{ fontSize: '18px' }}></i>
              </div>
            </Link>

          </div>
        </div>
      </section>
    </div>
  );
}
