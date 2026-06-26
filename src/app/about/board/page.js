import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: "Board Structure & Corporate Governance | Ratel Plus",
  description: "Learn about the corporate governance, discipline, transparency, and management hierarchy of Ratel Plus Nigeria Limited.",
};

export default function BoardStructure() {
  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <ul className="breadcrumbs">
            <li><Link href="/">Home</Link></li>
            <li>About</li>
            <li>Board Structure</li>
          </ul>
          <h1 className="page-title">Corporate Governance</h1>
        </div>
      </div>

      {/* Main Section */}
      <section className="section-padding">
        <div className="container">
          <div className="main-grid">
            
            {/* Left Content Column */}
            <div>
              <h2 style={{ fontSize: '28px', color: 'var(--text-main)', marginBottom: '20px' }}>Corporate Governance Principles</h2>
              
              <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '20px' }}>
                Ratel Plus is committed to the highest standards of business integrity, ethics, and professionalism. The Board recognizes the need to conduct the business in accordance with the principles of the King Code of Corporate Practices and Conduct ("King III"). 
              </p>

              <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '30px' }}>
                These principles include discipline, independence, responsibility, fairness, social responsibility, transparency, and the accountability of directors to all stakeholders. A number of these principles are entrenched in the Group’s internal controls and policy procedures governing corporate conduct.
              </p>

              <h3 style={{ fontSize: '22px', color: 'var(--text-main)', marginBottom: '24px' }}>Management Hierarchy Structure</h3>
              
              {/* Hierarchical Board Map */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', margin: '40px 0' }}>
                {/* Level 1 */}
                <div 
                  className="glass-panel" 
                  style={{ 
                    padding: '16px 30px', 
                    border: '1px solid var(--primary)', 
                    textAlign: 'center',
                    background: 'rgba(37, 99, 235, 0.08)', 
                    minWidth: '220px'
                  }}
                >
                  <h4 style={{ color: 'var(--primary)', margin: 0 }}>Board of Directors</h4>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Governance & Strategy</span>
                </div>

                <div style={{ height: '30px', width: '2px', background: 'var(--border-color)' }}></div>

                {/* Level 2 */}
                <div 
                  className="glass-panel" 
                  style={{ 
                    padding: '16px 30px', 
                    textAlign: 'center',
                    minWidth: '220px'
                  }}
                >
                  <h4 style={{ color: 'var(--text-main)', margin: 0 }}>Managing Director & CEO</h4>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Dr. Aminu Lawan Abdullahi</span>
                </div>

                <div style={{ height: '30px', width: '2px', background: 'var(--border-color)' }}></div>

                {/* Level 3: Columns */}
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', width: '100%', flexWrap: 'wrap' }}>
                  <div className="glass-panel" style={{ padding: '16px 20px', textAlign: 'center', flex: '1 1 200px' }}>
                    <h4 style={{ fontSize: '14px', margin: 0, color: 'var(--text-main)' }}>General Manager</h4>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Operations Oversight</span>
                  </div>
                  
                  <div className="glass-panel" style={{ padding: '16px 20px', textAlign: 'center', flex: '1 1 200px' }}>
                    <h4 style={{ fontSize: '14px', margin: 0, color: 'var(--text-main)' }}>Regulatory & Compliance</h4>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Shehu Hauwa Ahmad</span>
                  </div>

                  <div className="glass-panel" style={{ padding: '16px 20px', textAlign: 'center', flex: '1 1 200px' }}>
                    <h4 style={{ fontSize: '14px', margin: 0, color: 'var(--text-main)' }}>Finance & Accounts</h4>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Abba Labaran (Chief Accountant)</span>
                  </div>
                </div>

                <div className="hide-mobile" style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
                  <div style={{ height: '30px', width: '2px', background: 'var(--border-color)' }}></div>
                  <div style={{ height: '30px', width: '2px', background: 'var(--border-color)' }}></div>
                </div>

                {/* Level 4: Ops Departments */}
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', width: '100%', flexWrap: 'wrap' }}>
                  <div className="glass-panel" style={{ padding: '16px 20px', textAlign: 'center', flex: '1 1 250px' }}>
                    <h4 style={{ fontSize: '14px', margin: 0, color: 'var(--text-main)' }}>Software Development Department</h4>
                    <span style={{ fontSize: '11px', color: 'var(--primary)' }}>Muhammad Abubakar Al-ameen (Head of Dept)</span>
                  </div>

                  <div className="glass-panel" style={{ padding: '16px 20px', textAlign: 'center', flex: '1 1 250px' }}>
                    <h4 style={{ fontSize: '14px', margin: 0, color: 'var(--text-main)' }}>VoIP Services Department</h4>
                    <span style={{ fontSize: '11px', color: 'var(--primary)' }}>Muhammad Najib (Head of Dept)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div className="glass-panel" style={{ padding: '30px' }}>
                <h3 style={{ fontSize: '18px', color: 'var(--primary)', marginBottom: '16px' }}>King III Standards</h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <li style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                    <strong style={{ color: 'var(--text-main)' }}>Discipline:</strong> Commitment to transparent business practices.
                  </li>
                  <li style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                    <strong style={{ color: 'var(--text-main)' }}>Transparency:</strong> Full reporting disclosure to stakeholders.
                  </li>
                  <li style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                    <strong style={{ color: 'var(--text-main)' }}>Social Responsibility:</strong> Empowering communities through infrastructure.
                  </li>
                </ul>
              </div>

              <div className="glass-panel" style={{ padding: '30px' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Our Team</h3>
                <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
                  Check the detailed bios and designations of our management executives.
                </p>
                <Link href="/#team" style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '14px' }}>
                  Meet Management <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
