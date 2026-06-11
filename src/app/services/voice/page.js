import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: "Voice Services & VoIP Solutions | Ratel Plus",
  description: "Explore Ratel Plus Voice Services. We offer competitive call rates, cloud PBX, automated IVR, SIP trunking, and our softphone app, Ratel Phone.",
};

export default function VoiceServices() {
  const serviceList = [
    { title: "Hosted & On-Premises PBX", desc: "Complete business telephone system features without high hardware costs." },
    { title: "SIP Trunking & IVR Services", desc: "Interactive Voice Response systems to route customer inquiries dynamically." },
    { title: "Virtual Receptionist & CRM Sync", desc: "Integrated caller dashboards synced directly with your business CRM." },
    { title: "Contact Center Solutions", desc: "Automated routing, voice broadcasts, queues, and supervisor analytics." },
    { title: "Estate Resident Platforms", desc: "Private inter-estate communications network for security gates and homes." },
    { title: "Survey & Feedback Channels", desc: "Automated phone surveys via interactive IVR SIP trunk configurations." }
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <ul className="breadcrumbs">
            <li><Link href="/">Home</Link></li>
            <li>Services</li>
            <li>Voice Services</li>
          </ul>
          <h1 className="page-title">Voice Services (VoIP)</h1>
        </div>
      </div>

      {/* Main Section */}
      <section className="section-padding">
        <div className="container">
          <div className="main-grid">
            
            {/* Left Content Column */}
            <div>
              <div 
                className="glass-panel" 
                style={{ 
                  height: 'clamp(200px, 40vh, 320px)', 
                  marginBottom: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #ffffff 0%, #eff6ff 100%)',
                  borderRadius: 'var(--radius-lg)'
                }}
              >
                <i className="bi bi-headset" style={{ fontSize: 'clamp(50px, 15vw, 80px)', color: 'rgba(37, 99, 235, 0.4)' }}></i>
              </div>

              <h2 style={{ fontSize: '28px', color: 'var(--text-main)', marginBottom: '20px' }}>Next-Generation Telephony</h2>
              
              <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '25px' }}>
                Ratel Plus is fully licensed by the Nigerian Communications Commission (NCC) to provide telecommunication and voice services. We provide highly competitive call rates and offer unique value-added services. Our voice solutions are designed to meet both enterprise and residential needs with flexible options and premium customer support.
              </p>
              
              <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '40px' }}>
                Whether you need basic fixed telephone lines or an advanced hosted cloud PBX system across multiple office branches, our VoIP network delivers crisp HD audio, low jitter, and seamless routing.
              </p>

              <h3 style={{ fontSize: '22px', color: 'var(--text-main)', marginBottom: '20px' }}>Key Products & Solutions</h3>
              <div className="content-grid" style={{ marginBottom: '40px' }}>
                {serviceList.map((srv, idx) => (
                  <div key={idx} className="glass-panel" style={{ padding: '24px' }}>
                    <h4 style={{ color: 'var(--primary)', marginBottom: '8px', fontSize: '16px' }}>{srv.title}</h4>
                    <p style={{ fontSize: '13.5px', margin: 0 }}>{srv.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Sidebar Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              {/* App Download Promo */}
              <div className="glass-panel form-card" style={{ textAlign: 'center' }}>
                <i className="bi bi-phone" style={{ fontSize: '48px', color: 'var(--primary)' }}></i>
                <h3 style={{ fontSize: '18px', margin: '15px 0' }}>Ratel Phone App</h3>
                <p style={{ fontSize: '13.5px', marginBottom: '24px' }}>
                  Download our official softphone utility to make crystal clear VoIP calls directly from your Android or iOS smartphone.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <a 
                    href="https://play.google.com/store/apps/details?id=net.ratelplus.phone" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-primary"
                    style={{ fontSize: '14px' }}
                  >
                    <i className="bi bi-android2"></i> Android Play Store
                  </a>
                  <a 
                    href="https://apps.apple.com/ng/app/ratelplus-phone/id1659297972" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-secondary"
                    style={{ fontSize: '14px' }}
                  >
                    <i className="bi bi-apple"></i> Apple App Store
                  </a>
                </div>
              </div>

              {/* General Inquiries */}
              <div className="glass-panel form-card">
                <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Have Questions?</h3>
                <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
                  Need help choosing a SIP trunk rate or setting up an office PBX server? Talk to our technology team.
                </p>
                <Link href="/#contact" className="btn-secondary" style={{ width: '100%', textAlign: 'center' }}>
                  Contact Sales Team
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
