import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: "Backhaul Services & Transport Solutions | Ratel Plus",
  description: "High-capacity backhaul transit for ISPs, telcos, and operators. Connect aggregation nodes directly to core switches over fiber & microwave links.",
};

export default function BackhaulServices() {
  const specs = [
    { title: "E-1 to STM-16 Bandwidths", desc: "Granular bandwidth tiers adaptable to heavy operator or ISP transit requirements." },
    { title: "High Quality of Service (QoS)", desc: "Priority-tagged packet routing ensuring low latency for delay-sensitive voice and video streams." },
    { title: "Owned Infrastructure", desc: "Because we own and manage the physical fiber ring nodes directly, you get reduced pricing." },
    { title: "24/7 Technical Support", desc: "Live network operations center monitoring nodes around the clock to assist carriers." }
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <ul className="breadcrumbs">
            <li><Link href="/">Home</Link></li>
            <li>Services</li>
            <li>Backhaul Services</li>
          </ul>
          <h1 className="page-title">Backhaul Services</h1>
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
                <i className="bi bi-router-fill" style={{ fontSize: 'clamp(50px, 15vw, 80px)', color: 'rgba(37, 99, 235, 0.4)' }}></i>
              </div>

              <h2 style={{ fontSize: '28px', color: 'var(--text-main)', marginBottom: '20px' }}>Core Transport & Aggregation</h2>
              
              <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '25px' }}>
                We provide resilient backhaul services for LTE providers, mobile network operators, ISPs, and enterprises. Our transit links connect your aggregation points directly to the core of the network over advanced fiber optic technology or high-capacity microwave wireless links.
              </p>
              
              <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '40px' }}>
                With a wide range of available bandwidths from E-1 up to STM-16, our backhaul services are fully customized to suit your capacity requirements. Because our core network is 100% fiber optic and in most cases fully owned and managed end-to-end by Ratel Plus, you gain high availability and reliability at significantly reduced costs.
              </p>

              <h3 style={{ fontSize: '22px', color: 'var(--text-main)', marginBottom: '20px' }}>Service Specifications</h3>
              <div className="content-grid" style={{ marginBottom: '40px' }}>
                {specs.map((sp, idx) => (
                  <div key={idx} className="glass-panel" style={{ padding: '24px' }}>
                    <h4 style={{ color: 'var(--primary)', marginBottom: '8px', fontSize: '16px' }}>{sp.title}</h4>
                    <p style={{ fontSize: '13.5px', margin: 0 }}>{sp.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Sidebar Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div className="glass-panel" style={{ padding: '30px', textAlign: 'center' }}>
                <i className="bi bi-hdd-network" style={{ fontSize: '48px', color: 'var(--primary)' }}></i>
                <h3 style={{ fontSize: '18px', margin: '15px 0' }}>Fibre Backbone</h3>
                <p style={{ fontSize: '13.5px', marginBottom: '24px' }}>
                  Our 100% fiber optic core connects major cities and industrial districts across northern Nigeria.
                </p>
                <Link href="/#contact" className="btn-primary" style={{ width: '100%', textAlign: 'center' }}>
                  Inquire Transit Capacity
                </Link>
              </div>

              <div className="glass-panel" style={{ padding: '30px' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>IP Wholesale</h3>
                <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
                  Interested in bulk transit IP capacity? Explore our wholesale node offerings.
                </p>
                <Link href="/services/ip-wholesale" className="btn-secondary" style={{ width: '100%', textAlign: 'center' }}>
                  View IP Wholesale
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
