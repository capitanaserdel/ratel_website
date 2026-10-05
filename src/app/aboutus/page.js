import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: "About Us | Ratel Plus Nigeria Limited",
  description: "Learn about Ratel Plus history, our metropolitan fiber network, FWA licenses, and our commitment to broadband infrastructure development in Nigeria.",
};

export default function AboutUs() {
  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <ul className="breadcrumbs">
            <li><Link href="/">Home</Link></li>
            <li>About us</li>
          </ul>
          <h1 className="page-title">Corporate Profile</h1>
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
                  height: 'clamp(200px, 40vh, 300px)', 
                  marginBottom: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #ffffff 0%, #eff6ff 100%)',
                  borderRadius: 'var(--radius-lg)'
                }}
              >
                <i className="bi bi-buildings-fill" style={{ fontSize: '72px', color: 'rgba(37, 99, 235, 0.4)' }}></i>
              </div>

              <h2 style={{ fontSize: '28px', color: 'var(--text-main)', marginBottom: '20px' }}>Ratel Plus Nigeria Limited</h2>
              
              <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '20px' }}>
                Ratel Plus Nigeria is a facilities-based telecommunications services provider. The company was founded in 2006 when it bided and obtained its infrastructure & Colocation, ISP, Metropolitan Fibre, and Fixed Wireless Access (FWA) licenses from the Nigerian Communications Commission (NCC) to provide multi-service broadband connectivity services to Mobile Operators, businesses, and residential subscribers.
              </p>
              
              <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '20px' }}>
                Since inception, Ratel Plus has invested heavily in “next generation” networking technologies to build a robust multi-service network platform. Ratel Plus holds an exclusive wireless spectrum license from the Nigerian Communications Commission (NCC), allowing it to operate end-to-end reliable, fiber-like connectivity services in the exclusively licensed and interference-free 2.3GHz spectrum.
              </p>
              
              <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '30px' }}>
                Ratel Plus has the requisite financial and organizational resources to become the leading broadband connectivity services provider in Nigeria. Our infrastructure footprint is optimized to deliver low latency, high capacity, and redundant backhaul.
              </p>

              <h3 style={{ fontSize: '20px', color: 'var(--text-main)', marginBottom: '16px' }}>Our Licensing Portfolio</h3>
              <div className="content-grid" style={{ marginBottom: '40px' }}>
                <div className="glass-panel" style={{ padding: '20px' }}>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '8px' }}>Infrastructure & Colocation</h4>
                  <p style={{ fontSize: '13px' }}>Enables hosting of third-party cellular assets, telecom antenna masts, and high-security equipment nodes.</p>
                </div>
                <div className="glass-panel" style={{ padding: '20px' }}>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '8px' }}>Metropolitan Fibre Transit</h4>
                  <p style={{ fontSize: '13px' }}>Permits installation of aerial and underground fiber optics links across cities to aggregate node transit.</p>
                </div>
                <div className="glass-panel" style={{ padding: '20px' }}>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '8px' }}>Internet Service Provider (ISP)</h4>
                  <p style={{ fontSize: '13px' }}>Broadband internet delivery services, including high-speed corporate transit and FTTH.</p>
                </div>
                <div className="glass-panel" style={{ padding: '20px' }}>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '8px' }}>Fixed Wireless Access (FWA)</h4>
                  <p style={{ fontSize: '13px' }}>Delivers high-capacity, interference-free internet distribution utilizing the 2.3GHz spectrum.</p>
                </div>
              </div>
            </div>

            {/* Right Sidebar Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              {/* Quick Action Box */}
              <div className="glass-panel" style={{ padding: '30px', textAlign: 'center' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '20px' }}>Quick Connections</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <Link href="/reg-options" className="btn-primary" style={{ fontSize: '14px', width: '100%' }}>
                    Register Line
                  </Link>
                  <Link href="/airtime" className="btn-secondary" style={{ fontSize: '14px', width: '100%' }}>
                    Buy Airtime
                  </Link>
                </div>
              </div>

              {/* Core Values Box */}
              <div className="glass-panel" style={{ padding: '30px' }}>
                <h3 style={{ fontSize: '18px', color: 'var(--primary)', marginBottom: '16px' }}>Mission & Vision</h3>
                <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
                  To make the telecommunication broadband infrastructure, internet, and managed IT services accessible to as many people and companies as possible at the lowest cost possible.
                </p>
                
                <h3 style={{ fontSize: '18px', color: 'var(--primary)', marginBottom: '16px' }}>Our Aim</h3>
                <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
                  Our aim is to handle your network infrastructure connectivity efficiently, so you can connect with the rest of the world smiling.
                </p>

                <h3 style={{ fontSize: '18px', color: 'var(--primary)', marginBottom: '16px' }}>Corporate Governance</h3>
                <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
                  We are committed to high standards of Corporate Governance critical to maintaining business integrity, fairness, and trust.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
