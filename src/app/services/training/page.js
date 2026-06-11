import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: "Training Portfolio & Certifications | Ratel Plus",
  description: "Advanced engineering and technical product certification courses. Acquire hands-on skills in installing, commissioning, and maintaining telecom systems.",
};

export default function TrainingPortfolio() {
  const courses = [
    { title: "LTE System Deployment", desc: "Covers base transceiver station (BTS) installations, microwave linkages, and FWA spectrum tuning." },
    { title: "Fiber Optic Engineering", desc: "Hands-on instruction in aerial and underground fiber splicing, node routing, and loss-budget calculations." },
    { title: "VoIP Cloud PBX Configuration", desc: "Designing multi-branch SIP routing, configuring automated IVR scripts, and virtual receptionist software." },
    { title: "SLA Infrastructure Monitoring", desc: "Best practices in co-location power management, cooling systems, and physical security triggers." }
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <ul className="breadcrumbs">
            <li><Link href="/">Home</Link></li>
            <li>Services</li>
            <li>Our Training Portfolio</li>
          </ul>
          <h1 className="page-title">Training Portfolio</h1>
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
                <i className="bi bi-award-fill" style={{ fontSize: 'clamp(50px, 15vw, 80px)', color: 'rgba(37, 99, 235, 0.4)' }}></i>
              </div>

              <h2 style={{ fontSize: '28px', color: 'var(--text-main)', marginBottom: '20px' }}>Professional Certification & Training</h2>
              
              <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '25px' }}>
                Ratel Plus technical employees are certified in line with our vendor’s requirements. They undergo ongoing certification and skills enhancement to keep their profiles current and relevant to our customers' changing environments.
              </p>
              
              <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '40px' }}>
                Each learner must complete a rigorous assessment, including a practical exam, after each course they attend before receiving their certification. This ensures they have acquired the necessary skills to install, commission, and maintain these high-capacity systems.
              </p>

              <h3 style={{ fontSize: '22px', color: 'var(--text-main)', marginBottom: '20px' }}>End-User & Product Training Workshops</h3>
              <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '30px' }}>
                Our clients and channel partners have direct access to our Product Managers and Technical Resources to obtain in-depth training on small, medium, and large enterprise systems and solutions.
              </p>

              <div className="content-grid" style={{ marginBottom: '40px' }}>
                {courses.map((crs, idx) => (
                  <div key={idx} className="glass-panel" style={{ padding: '24px' }}>
                    <h4 style={{ color: 'var(--primary)', marginBottom: '8px', fontSize: '16px' }}>{crs.title}</h4>
                    <p style={{ fontSize: '13.5px', margin: 0 }}>{crs.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Sidebar Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div className="glass-panel" style={{ padding: '30px', textAlign: 'center' }}>
                <i className="bi bi-mortarboard-fill" style={{ fontSize: '48px', color: 'var(--primary)' }}></i>
                <h3 style={{ fontSize: '18px', margin: '15px 0' }}>Training Enrollment</h3>
                <p style={{ fontSize: '13.5px', marginBottom: '24px' }}>
                  Register for our upcoming network engineering cohorts or request private product training workshops for your IT staff.
                </p>
                <Link href="/#contact" className="btn-primary" style={{ width: '100%', textAlign: 'center' }}>
                  Request Syllabus / Call
                </Link>
              </div>

              <div className="glass-panel" style={{ padding: '30px' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Voice Services</h3>
                <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
                  Learn about our carrier-grade voice offerings and telephone systems.
                </p>
                <Link href="/services/voice" className="btn-secondary" style={{ width: '100%', textAlign: 'center' }}>
                  View Voice Solutions
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
