'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import styles from './careers.module.css';

// Initial Sample Openings
const OPEN_POSITIONS = [
  {
    id: 'job-1',
    title: 'Senior Fiber Network Engineer',
    department: 'Telecom Engineering',
    category: 'engineering',
    location: 'Kano, Nigeria',
    type: 'Full-time',
    experience: '4+ Years',
    description: 'Lead the design, deployment, and optimization of FTTH (Fiber-to-the-Home) backbone infrastructure and GPON networks across commercial and residential layouts.',
    requirements: ['Degree in Telecommunications or Electrical Engineering', 'CCNA/CCNP Service Provider or equivalent certification', 'Hands-on experience with OTDR testing, fiber splicing, and GPON OLTs']
  },
  {
    id: 'job-2',
    title: 'NOC & Cloud Operations Specialist',
    department: 'NOC & Infrastructure',
    category: 'noc',
    location: 'Kano / Hybrid',
    type: 'Full-time',
    experience: '2+ Years',
    description: 'Monitor 24/7 core network transit performance, manage BGP routing tables, resolve upstream ISP outages, and optimize bandwidth utilization.',
    requirements: ['B.Sc in Computer Science, IT, or Networking', 'Strong knowledge of Mikrotik RouterOS, Cisco IOS, and Linux servers', 'Experience with Zabbix, PRTG, or Nagios network monitoring']
  },
  {
    id: 'job-3',
    title: 'Enterprise Telecom Sales Manager',
    department: 'Sales & Business Dev',
    category: 'sales',
    location: 'Abuja / Kano',
    type: 'Full-time',
    experience: '3+ Years',
    description: 'Drive corporate B2B acquisition for Ratel Plus leased lines, IP wholesale, and enterprise VoIP solutions across government and commercial clients.',
    requirements: ['Proven track record in ISP or Telecom enterprise sales', 'Strong network within corporate and government sectors', 'Excellent presentation, negotiation, and relationship skills']
  },
  {
    id: 'job-4',
    title: 'Customer Experience & Care Executive',
    department: 'Customer Support',
    category: 'support',
    location: 'Kano, Nigeria',
    type: 'Full-time',
    experience: '1+ Years',
    description: 'Provide tier-1 technical support, resolve subscriber account inquiries, coordinate field technician dispatch, and maintain high CSAT scores.',
    requirements: ['Degree or HND in any relevant field', 'Strong verbal and written communication in English and Hausa', 'Customer service orientation and basic networking troubleshooting skills']
  },
  {
    id: 'job-5',
    title: 'RF & LTE Network Optimization Engineer',
    department: 'Wireless Engineering',
    category: 'engineering',
    location: 'Kano, Nigeria',
    type: 'Full-time',
    experience: '3+ Years',
    description: 'Plan, optimize, and maintain Ratel Plus fixed-wireless LTE base stations and microwave backhaul links to guarantee sub-millisecond latency.',
    requirements: ['Experience with RF propagation tools and spectrum analyzers', 'Understanding of 4G/LTE RAN architecture and eNodeB configuration', 'Field operations experience']
  },
  {
    id: 'job-6',
    title: 'Billing Systems & Software Admin',
    department: 'Corporate IT',
    category: 'corporate',
    location: 'Remote / Kano',
    type: 'Full-time',
    experience: '2+ Years',
    description: 'Manage and integrate custom subscriber billing platforms, Paystack payment gateways, and automated bandwidth provisioning APIs.',
    requirements: ['Proficiency in PHP, Node.js, and SQL database management', 'Familiarity with RADIUS servers and CRM integrations', 'Strong problem-solving and security auditing mindset']
  }
];

export default function CareersPage() {
  const { t } = useLanguage();
  const [positions, setPositions] = useState(OPEN_POSITIONS);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeJob, setActiveJob] = useState(null); // Job currently being applied for in modal
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    portfolioUrl: '',
    coverNote: '',
    resumeFile: null
  });

  const categories = [
    { key: 'all', label: 'All Openings' },
    { key: 'engineering', label: 'Fiber & Wireless Engineering' },
    { key: 'noc', label: 'NOC & Infrastructure' },
    { key: 'sales', label: 'Sales & Business Dev' },
    { key: 'support', label: 'Customer Experience' },
    { key: 'corporate', label: 'Corporate & IT' }
  ];

  const getApiUrl = () => {
    let url = process.env.NEXT_PUBLIC_API_URL;
    if (!url || url.includes('portal.ratelplus.net.ng')) {
      if (typeof window !== 'undefined' && window.location.hostname.includes('ratelplus.net.ng')) {
        url = 'https://attendance.ratelplus.net.ng/api/v1';
      } else {
        url = 'http://localhost:8000/api/v1';
      }
    }
    url = url.trim().replace(/\/+$/, '');
    if (!url.endsWith('/api/v1')) {
      if (url.endsWith('/api')) {
        url = `${url}/v1`;
      } else {
        url = `${url}/api/v1`;
      }
    }
    return url;
  };

  // Fetch job openings from API backend with category & search parameters
  React.useEffect(() => {
    let active = true;
    const loadJobs = async () => {
      const apiUrl = getApiUrl();

      try {
        const params = new URLSearchParams({ active_only: 'true' });
        if (selectedCategory && selectedCategory !== 'all') {
          params.append('category', selectedCategory);
        }
        if (searchQuery.trim()) {
          params.append('search', searchQuery.trim());
        }

        const res = await fetch(`${apiUrl}/jobs/?${params.toString()}`);
        if (res.ok) {
          const data = await res.json();
          if (active && Array.isArray(data)) {
            setPositions(data);
          }
        }
      } catch (e) {
        console.warn('Jobs API unavailable, showing fallback listings:', e);
      }
    };



    const timer = setTimeout(() => {
      loadJobs();
    }, 300);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [selectedCategory, searchQuery]);

  // Filtered Jobs fallback client-side matching
  const filteredJobs = useMemo(() => {
    return positions.filter((job) => {
      const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
      const matchesQuery =
        searchQuery.trim() === '' ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [positions, selectedCategory, searchQuery]);

  const handleOpenApplyModal = (job = null) => {
    setActiveJob(job);
    setSubmittedSuccess(false);
    setSubmitError(null);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setActiveJob(null);
    setSubmittedSuccess(false);
    setSubmitError(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      portfolioUrl: '',
      coverNote: '',
      resumeFile: null
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    const apiUrl = getApiUrl();

    try {

      const bodyData = new FormData();
      bodyData.append('full_name', formData.fullName);
      bodyData.append('email', formData.email);
      bodyData.append('phone', formData.phone);
      if (activeJob && activeJob.id) {
        bodyData.append('job_id', activeJob.id);
      }
      if (formData.portfolioUrl) {
        bodyData.append('portfolio_url', formData.portfolioUrl);
      }
      if (formData.coverNote) {
        bodyData.append('cover_note', formData.coverNote);
      }
      if (formData.resumeFile) {
        bodyData.append('resume_file', formData.resumeFile);
      }

      const response = await fetch(`${apiUrl}/jobs/apply`, {
        method: 'POST',
        body: bodyData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Failed to submit application. Please try again.');
      }

      setSubmittedSuccess(true);
    } catch (err) {
      console.error('Job application submission error:', err);
      setSubmitError(err.message || 'Error submitting application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className={styles.pageWrapper}>
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <ul className="breadcrumbs">
            <li><Link href="/">{t('Home')}</Link></li>
            <li>{t('Careers')}</li>
          </ul>
          <h1 className="page-title">{t('Careers & Opportunities')}</h1>
        </div>
      </div>

      {/* Open Positions Section */}
      <section id="openings" className={styles.jobsSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>{t('Current Opportunities')}</span>
            <h2 className={styles.sectionTitle}>{t('Explore Available Career Positions')}</h2>
            <p>{t('Find the role that matches your skills and passion. Apply directly online in minutes.')}</p>
          </div>

          {/* Search & Filter Component */}
          <div className={styles.searchFilterBar}>
            <div className={styles.searchBox}>
              <i className={`bi bi-search ${styles.searchIcon}`} />
              <input
                type="text"
                placeholder={t('Search by job title, department, or keyword...')}
                className={styles.searchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className={styles.categoryPills}>
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  className={`${styles.categoryPill} ${selectedCategory === cat.key ? styles.categoryPillActive : ''}`}
                  onClick={() => setSelectedCategory(cat.key)}
                >
                  {t(cat.label)}
                </button>
              ))}
            </div>
          </div>

          {/* Jobs List */}
          {filteredJobs.length > 0 ? (
            <div className={styles.jobsList}>
              {filteredJobs.map((job) => (
                <div key={job.id} className={styles.jobCard}>
                  <div className={styles.jobMainInfo}>
                    <div className={styles.jobDepartment}>{job.department}</div>
                    <h3 className={styles.jobTitle}>{job.title}</h3>
                    <p style={{ fontSize: '14px', marginBottom: '14px', color: 'var(--text-muted)' }}>
                      {job.description}
                    </p>
                    {job.requirements && job.requirements.length > 0 && (
                      <div style={{ marginBottom: '14px' }}>
                        <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          {t('Key Requirements:')}
                        </span>
                        <ul className={styles.requirementsList}>
                          {job.requirements.map((req, idx) => (
                            <li key={idx} className={styles.requirementItem}>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className={styles.jobMetaList}>
                      <span className={styles.jobMetaItem}>
                        <i className="bi bi-geo-alt-fill" />
                        {job.location}
                      </span>
                      <span className={styles.jobMetaItem}>
                        <i className="bi bi-clock-fill" />
                        {job.type}
                      </span>
                      <span className={styles.jobMetaItem}>
                        <i className="bi bi-briefcase-fill" />
                        {job.experience}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleOpenApplyModal(job)}
                    className={styles.applyBtn}
                  >
                    <span>{t('Apply Now')}</span>
                    <i className="bi bi-arrow-right" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <i className={`bi bi-briefcase ${styles.emptyStateIcon}`} />
              <h3>{t('No Matching Openings Found')}</h3>
              <p>{t('Try clearing your search filters or send us a spontaneous application below.')}</p>
            </div>
          )}

          {/* Spontaneous Application Banner */}
          <div className={styles.spontaneousCard}>
            <div className={styles.spontaneousText}>
              <h3>{t('Don’t See Your Role Listed?')}</h3>
              <p>{t('We are always eager to meet talented engineers, sales visionaries, and support champions. Send us your CV.')}</p>
            </div>
            <button
              onClick={() => handleOpenApplyModal(null)}
              className="btn-primary"
              style={{ whiteSpace: 'nowrap' }}
            >
              {t('Submit Open Application')}
            </button>
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {modalOpen && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalCloseBtn} onClick={handleCloseModal} aria-label="Close Modal">
              <i className="bi bi-x-lg" />
            </button>

            {!submittedSuccess ? (
              <>
                <div className={styles.modalHeader}>
                  <h2 className={styles.modalTitle}>
                    {activeJob ? `${t('Apply for')} ${activeJob.title}` : t('Submit Spontaneous Application')}
                  </h2>
                  <p className={styles.modalSubTitle}>
                    {activeJob ? `${activeJob.department} • ${activeJob.location}` : t('Tell us about your skill set and how you can contribute to Ratel Plus.')}
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>{t('Full Name')} *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ibrahim Abubakar"
                      className={styles.formInputSelect}
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>{t('Email Address')} *</label>
                    <input
                      type="email"
                      required
                      placeholder="ibrahim@example.com"
                      className={styles.formInputSelect}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>{t('Phone Number')} *</label>
                    <input
                      type="tel"
                      required
                      placeholder="080 1234 5678"
                      className={styles.formInputSelect}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>{t('LinkedIn / Portfolio URL')}</label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/username"
                      className={styles.formInputSelect}
                      value={formData.portfolioUrl}
                      onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                    />
                  </div>

                  <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                    <label className={styles.formLabel}>{t('Resume / CV (PDF or DOCX)')} *</label>
                    <div className={styles.fileDropZone}>
                      <i className={`bi bi-cloud-arrow-up-fill ${styles.fileDropIcon}`} />
                      <div className={styles.fileDropText}>
                        {formData.resumeFile
                          ? formData.resumeFile.name
                          : t('Click or drag your Resume file here to attach')}
                      </div>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        required={!formData.resumeFile}
                        style={{ display: 'none' }}
                        id="resumeInput"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setFormData({ ...formData, resumeFile: e.target.files[0] });
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => document.getElementById('resumeInput').click()}
                        className="btn-secondary"
                        style={{ marginTop: '12px', padding: '6px 16px', fontSize: '12px' }}
                      >
                        {t('Browse File')}
                      </button>
                    </div>
                  </div>

                  <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                    <label className={styles.formLabel}>{t('Cover Note / Summary')}</label>
                    <textarea
                      rows={3}
                      placeholder={t('Briefly share your relevant experience or why you want to join Ratel Plus...')}
                      className={styles.formInputSelect}
                      value={formData.coverNote}
                      onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
                    />
                  </div>

                  {submitError && (
                    <div className={styles.formGroupFull} style={{ color: '#ef4444', fontSize: '13px', backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                      {submitError}
                    </div>
                  )}

                  <div className={styles.formGroupFull}>

                    <button type="submit" disabled={submitting} className={styles.submitBtn}>
                      {submitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm" role="status" />
                          <span>{t('Submitting Application...')}</span>
                        </>
                      ) : (
                        <>
                          <span>{t('Submit Application')}</span>
                          <i className="bi bi-send-fill" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className={styles.successBox}>
                <div className={styles.successIcon}>
                  <i className="bi bi-check-lg" />
                </div>
                <h2 className={styles.modalTitle}>{t('Application Submitted Successfully!')}</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: '12px 0 24px' }}>
                  {t('Thank you for applying. Our talent acquisition team will review your CV and get in touch with you shortly.')}
                </p>
                <button onClick={handleCloseModal} className="btn-primary">
                  {t('Done')}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
