import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: "Message from CEO | Ratel Plus Nigeria",
  description: "Read the strategic vision from our MD/CEO, Dr. Aminu Lawan Abdullahi, on leveraging IP-based communication technologies for business growth.",
};

export default function CeoMessage() {
  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <ul className="breadcrumbs">
            <li><Link href="/">Home</Link></li>
            <li>About</li>
            <li>Message from CEO</li>
          </ul>
          <h1 className="page-title">Executive Message</h1>
        </div>
      </div>

      {/* Main Section */}
      <section className="section-padding">
        <div className="container">
          <div className="main-grid">
            
            {/* Left Content Column */}
            <div>
              <div className="glass-panel form-card" style={{ marginBottom: '40px' }}>
                <div style={{ display: 'flex', gap: '30px', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <div 
                    style={{ 
                       width: 'clamp(80px, 20vw, 100px)', 
                       height: 'clamp(80px, 20vw, 100px)', 
                       borderRadius: '50%', 
                       background: 'rgba(37, 99, 235, 0.08)', 
                       border: '2px solid var(--primary)',
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                       flexShrink: 0
                    }}
                  >
                    <i className="bi bi-person-fill" style={{ fontSize: 'clamp(40px, 10vw, 50px)', color: 'var(--primary)' }}></i>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: 'clamp(20px, 5vw, 24px)', color: 'var(--text-main)', margin: 0 }}>Dr. Aminu Lawan Abdullahi (MNIA)</h2>
                    <p style={{ color: 'var(--primary)', fontWeight: '600', fontSize: 'clamp(13px, 3.5vw, 15px)', marginTop: '4px' }}>Managing Director & Chief Executive Officer</p>
                  </div>
                </div>

                <div style={{ color: 'var(--text-main)', fontSize: '16px', lineHeight: '1.8' }}>
                  <p style={{ marginBottom: '20px' }}>
                    Today’s volatile economy requires businesses to make the best use of resources while delivering superior products and services.
                  </p>
                  
                  <p style={{ marginBottom: '20px' }}>
                    The businesses that thrive are investing in ways that not only meet today’s goals but also position them for competitive advantage in the economic upturn. Leading CIOs tell us that as they reduce costs in many areas, they are increasing their investments in the collaboration capabilities that will continue to save them money in the future while making their companies more effective. 
                  </p>
                  
                  <p style={{ marginBottom: '20px' }}>
                    Companies should focus on capital efficiency by centralizing their communications infrastructure and resources by moving to an IP-based solution. Collaboration, unified communication, virtualization, and advanced security capabilities should be key parts of your plans to thrive.
                  </p>

                  <p style={{ marginBottom: '20px' }}>
                    A technology-enabled business model enables the business to act more rapidly and scale faster than their competitors. Technology-enabled business processes help you to establish relationships faster across a broader host of partners and work more closely with your own strategic thinkers to improve differentiation, increase market share, and accelerate innovation.
                  </p>

                  <p style={{ marginBottom: '30px' }}>
                    At Ratel Plus Nigeria, our highly skilled and motivated staff will strive to enable your business with the necessary technologies that will take you into the future.
                  </p>

                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                    <p style={{ color: 'var(--primary)', fontWeight: '700', fontStyle: 'italic', marginBottom: '4px' }}>Dr. Aminu Lawan Abdullahi (MNIA)</p>
                    <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>MD/CEO, Ratel Plus Nigeria Limited</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div className="glass-panel form-card" style={{ textAlign: 'center' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '20px' }}>Key Focus Areas</h3>
                <ul style={{ listStyle: 'none', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <li style={{ display: 'flex', gap: '10px', fontSize: '14px', color: 'var(--text-muted)' }}>
                    <i className="bi bi-cpu" style={{ color: 'var(--primary)' }}></i>
                    <span>Virtualization & Cloud Hosting</span>
                  </li>
                  <li style={{ display: 'flex', gap: '10px', fontSize: '14px', color: 'var(--text-muted)' }}>
                    <i className="bi bi-shield-lock" style={{ color: 'var(--primary)' }}></i>
                    <span>Advanced Network Security</span>
                  </li>
                  <li style={{ display: 'flex', gap: '10px', fontSize: '14px', color: 'var(--text-muted)' }}>
                    <i className="bi bi-chat-left-dots" style={{ color: 'var(--primary)' }}></i>
                    <span>Unified IP Collaboration</span>
                  </li>
                  <li style={{ display: 'flex', gap: '10px', fontSize: '14px', color: 'var(--text-muted)' }}>
                    <i className="bi bi-diagram-3" style={{ color: 'var(--primary)' }}></i>
                    <span>Centralized Communication Pipe</span>
                  </li>
                </ul>
              </div>

              <div className="glass-panel form-card">
                <h3 style={{ fontSize: '18px', color: 'var(--primary)', marginBottom: '16px' }}>Corporate Mission</h3>
                <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
                  To make the telecommunication broadband infrastructure, internet, and managed IT services accessible to as many people and companies as possible at the lowest cost possible.
                </p>
                <Link href="/aboutus" style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '14px' }}>
                  Read Corporate Profile <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
