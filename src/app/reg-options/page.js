import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: "Subscriber Registration Options | Ratel Plus",
  description: "Select your registration path. Register as a personal mobile subscriber or set up corporate bulk enterprise accounts.",
};

export default function RegOptions() {
  return (
    <div>
      {/* Choice Category Header */}
      <div style={{ paddingTop: '60px' }}></div>

      {/* Main Choice Cards Section */}
      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 60px' }}>
            <span style={{ color: 'var(--primary)', textTransform: 'uppercase', fontSize: '13px', fontWeight: '600', letterSpacing: '0.05em' }}>
              NIN Compliance & Account Setup
            </span>
            <h2 style={{ fontSize: '32px', fontWeight: '800', marginTop: '10px', marginBottom: '16px' }}>Select Registration Option</h2>
            <p style={{ color: 'var(--text-muted)' }}>
              Choose your subscriber category to link your National Identification Number (NIN) or provision new enterprise VoIP lines.
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
              <h3 style={{ fontSize: '22px', color: 'var(--text-main)' }}>Personal Subscribers</h3>
              <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-muted)' }}>
                Link your personal mobile voice line, upload verification details, and ensure your SIM compliance with the NCC guidelines.
              </p>
              <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
                <Link href="/personal-subscribers" className="btn-primary" style={{ width: '100%' }}>
                  Register Personal SIM
                </Link>
              </div>
            </div>

            {/* Business Card */}
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
              {/* Coming Soon Banner Badge */}
              <div 
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  color: '#ffffff',
                  fontSize: '11px',
                  fontWeight: '800',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  boxShadow: '0 2px 8px rgba(217, 119, 6, 0.2)'
                }}
              >
                Coming Soon
              </div>

              <div 
                style={{ 
                  width: '70px', 
                  height: '70px', 
                  borderRadius: '16px', 
                  background: 'rgba(59, 130, 246, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  color: 'var(--accent-blue)',
                  margin: '0 auto 10px'
                }}
              >
                <i className="bi bi-building-fill-check"></i>
              </div>
              <h3 style={{ fontSize: '22px', color: 'var(--text-main)' }}>Business Subscribers</h3>
              <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-muted)' }}>
                Provision enterprise bulk VoIP connections, register office hosted PBX systems, or submit corporate compliance profiles.
              </p>
              <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
                <button 
                  disabled 
                  className="btn-secondary" 
                  style={{ 
                    width: '100%', 
                    borderColor: 'var(--border-color)', 
                    color: 'var(--text-muted)', 
                    background: 'rgba(0, 0, 0, 0.03)',
                    cursor: 'not-allowed',
                    opacity: 0.6
                  }}
                >
                  Setup Corporate Account
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
