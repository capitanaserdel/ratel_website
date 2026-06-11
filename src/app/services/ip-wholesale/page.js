import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: "IP Wholesale & Transit Services | Ratel Plus",
  description: "Leverage aerial fiber optics bulk IP capacity. Ratel Plus delivers high-bandwidth transit to ISPs and carriers with low latency guarantees.",
};

export default function IpWholesale() {
  const benefits = [
    { title: "Affordable Pricing", desc: "Cost-effective wholesale pricing models suited for tier-2/3 ISPs and corporate providers." },
    { title: "High Availability", desc: "Redundant network ring architectures guaranteeing 99.9% uptime and low packet loss." },
    { title: "Secure Connections", desc: "Fully monitored data transport with built-in physical security along fiber layouts." },
    { title: "Ultra Low Latency", desc: "Aerial fiber layouts minimize signal path distance between aggregation nodes." }
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <ul className="breadcrumbs">
            <li><Link href="/">Home</Link></li>
            <li>Services</li>
            <li>IP Wholesale</li>
          </ul>
          <h1 className="page-title">IP Wholesale Capacity</h1>
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
                <i className="bi bi-globe2" style={{ fontSize: 'clamp(50px, 15vw, 80px)', color: 'rgba(37, 99, 235, 0.4)' }}></i>
              </div>

              <h2 style={{ fontSize: '28px', color: 'var(--text-main)', marginBottom: '20px' }}>Bulk IP Capacity & Transit</h2>
              
              <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '25px' }}>
                Leveraging the unique advantages of aerial fiber optic connectivity, Ratel Plus delivers bulk IP capacity to Internet Service Providers (ISPs), Communication Service Providers, and carriers. Our solutions support service delivery to end customers with incredibly low latency and minimal jitter between nodes.
              </p>
              
              <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '40px' }}>
                By establishing direct physical infrastructure pipelines, we avoid the vulnerabilities of shared conduits. Our wholesale IP network is built to withstand high demands, allowing carriers to expand bandwidth instantly via software provisioning.
              </p>

              <h3 style={{ fontSize: '22px', color: 'var(--text-main)', marginBottom: '20px' }}>Key Benefits & Features</h3>
              <div className="content-grid" style={{ marginBottom: '40px' }}>
                {benefits.map((bnf, idx) => (
                  <div key={idx} className="glass-panel" style={{ padding: '24px' }}>
                    <h4 style={{ color: 'var(--primary)', marginBottom: '8px', fontSize: '16px' }}>{bnf.title}</h4>
                    <p style={{ fontSize: '13.5px', margin: 0 }}>{bnf.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Sidebar Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div className="glass-panel" style={{ padding: '30px', textAlign: 'center' }}>
                <i className="bi bi-speedometer2" style={{ fontSize: '48px', color: 'var(--primary)' }}></i>
                <h3 style={{ fontSize: '18px', margin: '15px 0' }}>Carrier Class SLA</h3>
                <p style={{ fontSize: '13.5px', marginBottom: '24px' }}>
                  Our wholesale nodes operate under strict service level agreements, ensuring 24/7 technical assistance and traffic monitoring.
                </p>
                <Link href="/#contact" className="btn-primary" style={{ width: '100%', textAlign: 'center' }}>
                  Inquire Bulk Rates
                </Link>
              </div>

              <div className="glass-panel" style={{ padding: '30px' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Backhaul Services</h3>
                <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
                  Need to connect your aggregation point to the core network? Check out our backhaul capacities.
                </p>
                <Link href="/services/backhaul" className="btn-secondary" style={{ width: '100%', textAlign: 'center' }}>
                  View Backhaul Details
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
