import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: "Privacy Policy | Ratel Plus Nigeria Limited",
  description: "Learn about how Ratel Plus collects, uses, protects, and handles your personal data in compliance with NDPA 2023 and NCC regulations.",
};

export default function PrivacyPolicy() {
  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <ul className="breadcrumbs">
            <li><Link href="/">Home</Link></li>
            <li>Privacy Policy</li>
          </ul>
          <h1 className="page-title">Privacy Policy</h1>
        </div>
      </div>

      {/* Main Content Section */}
      <section className="section-padding">
        <div className="container">
          <div className="main-grid">
            
            {/* Left Content Column */}
            <div>
              <div 
                className="glass-panel" 
                style={{ 
                  padding: '40px',
                  borderRadius: 'var(--radius-lg)',
                  marginBottom: '40px'
                }}
              >
                <h2 style={{ fontSize: '26px', color: 'var(--text-main)', marginBottom: '20px', fontWeight: '800' }}>
                  Ratel Plus Nigeria Limited Privacy Policy
                </h2>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', marginBottom: '30px' }}>
                  Last Reviewed: October 30, 2025 | Effective Date: October 30, 2025
                </p>

                {/* 1. Introduction */}
                <h3 style={{ fontSize: '20px', color: 'var(--primary)', marginTop: '30px', marginBottom: '15px', fontWeight: '700' }}>
                  1. Introduction
                </h3>
                <p style={{ fontSize: '15px', lineHeight: '1.7', marginBottom: '20px', color: 'var(--text-muted)' }}>
                  Ratel Plus Nigeria Limited (“Ratel Plus”) is committed to protecting the privacy and security of our subscribers’ personal data. This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you use our mobile, data, and digital services.
                </p>
                <p style={{ fontSize: '15px', lineHeight: '1.7', marginBottom: '20px', color: 'var(--text-muted)' }}>
                  We comply with the Nigeria Data Protection Act 2023, the Nigerian Communications Commission (NCC) Consumer Code of Practice Regulations, and all applicable data protection laws and regulations. By using our services, you agree to the terms of this Privacy Policy.
                </p>

                {/* 2. Scope and Definitions */}
                <h3 style={{ fontSize: '20px', color: 'var(--primary)', marginTop: '30px', marginBottom: '15px', fontWeight: '700' }}>
                  2. Scope and Definitions
                </h3>
                <ul style={{ fontSize: '15px', lineHeight: '1.7', marginBottom: '20px', paddingLeft: '20px', color: 'var(--text-muted)' }}>
                  <li style={{ marginBottom: '10px' }}>
                    <strong>Scope:</strong> This policy applies to all users of Ratel Plus mobile, broadband, and digital communication services.
                  </li>
                  <li style={{ marginBottom: '10px' }}>
                    <strong>Personal Data:</strong> Means any information relating to an identified or identifiable natural person.
                  </li>
                  <li style={{ marginBottom: '10px' }}>
                    <strong>Processing:</strong> Refers to any operation performed on personal data such as collection, storage, retrieval, use, disclosure, or deletion.
                  </li>
                </ul>

                {/* 3. Guiding Principles */}
                <h3 style={{ fontSize: '20px', color: 'var(--primary)', marginTop: '30px', marginBottom: '15px', fontWeight: '700' }}>
                  3. Guiding Principles
                </h3>
                <p style={{ fontSize: '15px', lineHeight: '1.7', marginBottom: '15px', color: 'var(--text-muted)' }}>
                  Ratel Plus processes personal data in accordance with the following core principles as provided by the Nigeria Data Protection Commission (NDPC):
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px' }}>
                  {[
                    { title: "Lawfulness & Fairness", desc: "Processed transparently and ethically." },
                    { title: "Purpose Limitation", desc: "Collected only for specified, explicit reasons." },
                    { title: "Data Minimisation", desc: "Only adequate and relevant data is collected." },
                    { title: "Accuracy", desc: "Kept accurate and updated regularly." },
                    { title: "Storage Limitation", desc: "Retained no longer than necessary." },
                    { title: "Integrity & Confidentiality", desc: "Secured using robust safety protocols." },
                    { title: "Accountability", desc: "Ensured compliance tracking and responsibility." }
                  ].map((p, i) => (
                    <div key={i} className="glass-panel" style={{ padding: '15px', background: 'var(--bg-main)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
                      <h4 style={{ fontSize: '14px', color: 'var(--text-main)', marginBottom: '5px', fontWeight: '700' }}>{p.title}</h4>
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>{p.desc}</p>
                    </div>
                  ))}
                </div>

                {/* 4. Data We Collect */}
                <h3 style={{ fontSize: '20px', color: 'var(--primary)', marginTop: '30px', marginBottom: '15px', fontWeight: '700' }}>
                  4. Data We Collect
                </h3>
                <p style={{ fontSize: '15px', lineHeight: '1.7', marginBottom: '15px', color: 'var(--text-muted)' }}>
                  We may collect the following categories of personal data from you:
                </p>
                <ul style={{ fontSize: '15px', lineHeight: '1.7', marginBottom: '20px', paddingLeft: '20px', color: 'var(--text-muted)' }}>
                  <li style={{ marginBottom: '8px' }}>Subscriber identity data (full name, address, verified phone number, ID cards, date of birth)</li>
                  <li style={{ marginBottom: '8px' }}>SIM registration and NIN linkage details</li>
                  <li style={{ marginBottom: '8px' }}>Call, SMS, and data usage records</li>
                  <li style={{ marginBottom: '8px' }}>Billing, credit card, and transactional payment details</li>
                  <li style={{ marginBottom: '8px' }}>Device identifiers (IMEI, IMSI, IP address)</li>
                  <li style={{ marginBottom: '8px' }}>Location information (necessary for network routing and coverage check)</li>
                  <li style={{ marginBottom: '8px' }}>Customer support history and chatbot interactions</li>
                  <li style={{ marginBottom: '8px' }}>Online portal activity, web configurations, and mobile app telemetry</li>
                </ul>

                {/* 5. Purpose and Legal Basis */}
                <h3 style={{ fontSize: '20px', color: 'var(--primary)', marginTop: '30px', marginBottom: '15px', fontWeight: '700' }}>
                  5. Purpose and Legal Basis
                </h3>
                <p style={{ fontSize: '15px', lineHeight: '1.7', marginBottom: '15px', color: 'var(--text-muted)' }}>
                  We process your personal data for the following essential business purposes:
                </p>
                <ul style={{ fontSize: '15px', lineHeight: '1.7', marginBottom: '20px', paddingLeft: '20px', color: 'var(--text-muted)' }}>
                  <li style={{ marginBottom: '8px' }}>Providing and managing high-quality network and digital communication services</li>
                  <li style={{ marginBottom: '8px' }}>Processing billing, airtime recharges, and payment collections</li>
                  <li style={{ marginBottom: '8px' }}>Resolving technical tickets and delivering 24/7 customer support</li>
                  <li style={{ marginBottom: '8px' }}>Optimizing network quality, bandwidth provisioning, and latency control</li>
                  <li style={{ marginBottom: '8px' }}>Complying with NCC directive rules, statutory filings, and law enforcement requests</li>
                  <li style={{ marginBottom: '8px' }}>Sending promotional announcements and product updates (only with your explicit consent)</li>
                  <li style={{ marginBottom: '8px' }}>Preventing cellular fraud, cyber-attacks, and illegal network access</li>
                </ul>

                {/* 6. Data Sharing and Disclosure */}
                <h3 style={{ fontSize: '20px', color: 'var(--primary)', marginTop: '30px', marginBottom: '15px', fontWeight: '700' }}>
                  6. Data Sharing and Disclosure
                </h3>
                <p style={{ fontSize: '15px', lineHeight: '1.7', marginBottom: '15px', color: 'var(--text-muted)' }}>
                  Ratel Plus will not sell your personal data. We may share data under strict confidentiality obligations with:
                </p>
                <ul style={{ fontSize: '15px', lineHeight: '1.7', marginBottom: '20px', paddingLeft: '20px', color: 'var(--text-muted)' }}>
                  <li style={{ marginBottom: '8px' }}>Licensed sub-agents, technicians, or software providers bound by confidentiality covenants</li>
                  <li style={{ marginBottom: '8px' }}>Law enforcement or governmental regulatory bodies (NCC, NDPC) as required by Nigerian law</li>
                  <li style={{ marginBottom: '8px' }}>Roaming operators, interconnect partners, and bulk wholesale carriers (only for service routing)</li>
                  <li style={{ marginBottom: '8px' }}>Financial institutions, merchant payment gates (Paystack, OPay) for payment clearances</li>
                </ul>

                {/* 7. Data Retention */}
                <h3 style={{ fontSize: '20px', color: 'var(--primary)', marginTop: '30px', marginBottom: '15px', fontWeight: '700' }}>
                  7. Data Retention
                </h3>
                <p style={{ fontSize: '15px', lineHeight: '1.7', marginBottom: '20px', color: 'var(--text-muted)' }}>
                  We retain personal data only as long as necessary to fulfill subscriber service obligations and comply with standard NCC or NDPC regulations. After the statutory retention period lapses, your data will be securely shredded, deleted from databases, or fully anonymized.
                </p>

                {/* 8. Your Rights */}
                <h3 style={{ fontSize: '20px', color: 'var(--primary)', marginTop: '30px', marginBottom: '15px', fontWeight: '700' }}>
                  8. Your Rights
                </h3>
                <p style={{ fontSize: '15px', lineHeight: '1.7', marginBottom: '15px', color: 'var(--text-muted)' }}>
                  As a data subject in Nigeria, you hold the following rights:
                </p>
                <ul style={{ fontSize: '15px', lineHeight: '1.7', marginBottom: '20px', paddingLeft: '20px', color: 'var(--text-muted)' }}>
                  <li style={{ marginBottom: '8px' }}>Right to request access to records of your personal data stored with us</li>
                  <li style={{ marginBottom: '8px' }}>Right to request correction of inaccurate, incomplete, or stale profiles</li>
                  <li style={{ marginBottom: '8px' }}>Right to request deletion of non-statutory data (subject to NCC record compliance rules)</li>
                  <li style={{ marginBottom: '8px' }}>Right to object to or restrict processing under valid grounds</li>
                  <li style={{ marginBottom: '8px' }}>Right to withdraw consent for direct marketing newsletters and SMS blasts</li>
                  <li style={{ marginBottom: '8px' }}>Right to lodge official complaints directly with the Nigeria Data Protection Commission (NDPC)</li>
                </ul>

                {/* 9. Data Security */}
                <h3 style={{ fontSize: '20px', color: 'var(--primary)', marginTop: '30px', marginBottom: '15px', fontWeight: '700' }}>
                  9. Data Security
                </h3>
                <p style={{ fontSize: '15px', lineHeight: '1.7', marginBottom: '20px', color: 'var(--text-muted)' }}>
                  Without prejudice to your rights, Ratel Plus implements robust administrative, physical, and digital safeguards (including end-to-end SSL encryption, firewalls, and multi-factor authorization) to safeguard your data. However, please note that no system connected to the internet can be guaranteed to be 100% impenetrable.
                </p>

                {/* 10. International Data Transfers */}
                <h3 style={{ fontSize: '20px', color: 'var(--primary)', marginTop: '30px', marginBottom: '15px', fontWeight: '700' }}>
                  10. International Data Transfers
                </h3>
                <p style={{ fontSize: '15px', lineHeight: '1.7', marginBottom: '20px', color: 'var(--text-muted)' }}>
                  Where data transit requires cross-border storage (such as cloud hosting), Ratel Plus ensures adequate security protections under approved legal frameworks and gets subscriber consent when required.
                </p>

                {/* 11. Updates to this Policy */}
                <h3 style={{ fontSize: '20px', color: 'var(--primary)', marginTop: '30px', marginBottom: '15px', fontWeight: '700' }}>
                  11. Updates to this Policy
                </h3>
                <p style={{ fontSize: '15px', lineHeight: '1.7', marginBottom: '20px', color: 'var(--text-muted)' }}>
                  We may revise this Privacy Policy periodically to reflect legal amendments, technological innovations, or cellular regulatory guidance. Updates will be highlighted on our official portal and app announcements.
                </p>

                {/* 12. Contact Information */}
                <h3 style={{ fontSize: '20px', color: 'var(--primary)', marginTop: '30px', marginBottom: '15px', fontWeight: '700' }}>
                  12. Contact Information
                </h3>
                <p style={{ fontSize: '15px', lineHeight: '1.7', marginBottom: '10px', color: 'var(--text-muted)' }}>
                  For data requests, inquiries, or privacy complaints, please contact our office:
                </p>
                <div 
                  className="glass-panel" 
                  style={{ 
                    padding: '25px', 
                    background: 'rgba(24, 73, 201, 0.03)', 
                    border: '1px solid rgba(24, 73, 201, 0.15)',
                    borderRadius: 'var(--radius-sm)',
                    marginTop: '15px'
                  }}
                >
                  <strong style={{ display: 'block', color: 'var(--text-main)', marginBottom: '8px' }}>
                    Data Protection Officer
                  </strong>
                  <span style={{ display: 'block', fontSize: '14px', color: 'var(--text-muted)', marginBottom: '5px' }}>
                    Ratel Plus Nigeria Limited
                  </span>
                  <span style={{ display: 'block', fontSize: '14px', color: 'var(--text-muted)', marginBottom: '5px' }}>
                    Plots 375 and 373, 8th Avenue, Zawachiki Layout, Behind 1000 Housing Estate, Kano, Nigeria
                  </span>
                  <span style={{ display: 'block', fontSize: '14px', color: 'var(--text-muted)', marginBottom: '5px' }}>
                    Email: <a href="mailto:info@ratelplus.net" style={{ color: 'var(--primary)' }}>info@ratelplus.net</a>
                  </span>
                  <span style={{ display: 'block', fontSize: '14px', color: 'var(--text-muted)' }}>
                    Phone: +234 802 372 6318
                  </span>
                </div>

              </div>
            </div>

            {/* Right Sidebar Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              {/* Quick Action Box */}
              <div className="glass-panel" style={{ padding: '30px', textAlign: 'center' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '20px' }}>Quick Access</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <Link href="/reg-options" className="btn-primary" style={{ fontSize: '14px', width: '100%' }}>
                    Register Line
                  </Link>
                  <Link href="/airtime" className="btn-secondary" style={{ fontSize: '14px', width: '100%' }}>
                    Buy Airtime
                  </Link>
                </div>
              </div>

              {/* Security Badge Box */}
              <div className="glass-panel" style={{ padding: '30px', textAlign: 'center' }}>
                <div style={{ fontSize: '48px', color: 'var(--accent-green)', marginBottom: '15px' }}>
                  <i className="bi bi-shield-fill-check"></i>
                </div>
                <h3 style={{ fontSize: '18px', color: 'var(--text-main)', marginBottom: '10px' }}>NDPR Compliant</h3>
                <p style={{ fontSize: '13px', lineHeight: '1.6', color: 'var(--text-muted)' }}>
                  We employ enterprise-grade security structures and data encryption standards to ensure that all subscriber details are protected under standard Nigerian data regulations.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
