'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import styles from './academy.module.css';

// Initial Fallback Courses if backend is loading or offline
const SAMPLE_COURSES = [
  {
    id: 'course-1',
    title: 'Fiber Optic Fusion Splicing & FTTH Engineering',
    code: 'RATEL-FBE-101',
    category: 'fiber',
    description: 'Comprehensive practical masterclass covering fiber optic principles, color coding, OTDR trace analysis, power meters, fusion splicing machines, and live GPON / FTTH distribution deployment.',
    syllabus: [
      'Introduction to Optical Physics, Fiber Modes & Cable Geometry',
      'Color Coding, Loose Tube & Ribbon Fiber Preparation',
      'Precision Splicing with Core-Alignment Fusion Splicers',
      'OTDR Testing, Event Analysis & Attenuation Troubleshooting',
      'FTTH Splitters, Distribution Boxes (FDB/FAT) & Drop Cable Installation',
      'Field Safety Standards & ISP Quality Certification',
    ],
    prerequisites: [
      'Basic technical or electrical foundation',
      'Enthusiasm for physical telecommunications infrastructure',
    ],
    instructor: 'Engr. Ahmed Bello (Senior Field & FTTH Lead)',
    location: 'Ratel Tech Campus, Kano',
    format: 'Onsite',
    duration: '6 Weeks',
    schedule: 'Mon, Wed & Fri (10:00 AM - 1:00 PM)',
    fee: '₦45,000',
    status: 'ongoing',
    start_date: 'Oct 14, 2026',
    capacity: 25,
    enrolled_count: 18,
    is_active: true,
  },
  {
    id: 'course-2',
    title: 'Enterprise IP Routing, Mikrotik & BGP Core Networks',
    code: 'RATEL-NET-201',
    category: 'networking',
    description: 'Deep dive into service provider IP routing, Mikrotik RouterOS administration, VLAN segmentation, OSPF, and BGP peering with Internet Exchange Points (IXPN) and upstream transit providers.',
    syllabus: [
      'IPv4/IPv6 Subnetting & Network Design Principles',
      'Mikrotik RouterOS Architecture, CLI & Firewall Configuration',
      'VLANs, Bridge Filtering & QinQ Tagging in ISP Access Networks',
      'Interior Gateway Protocols: OSPF Multi-Area Deployments',
      'Border Gateway Protocol (BGP) Multi-Homing & AS Path Filtering',
      'Bandwidth Queues, Traffic Shaping & QoS for Voice/Data',
    ],
    prerequisites: [
      'Fundamental networking knowledge (TCP/IP, OSI model)',
      'Personal laptop for laboratory simulation',
    ],
    instructor: 'Kabir Sani (Lead NOC & Routing Specialist)',
    location: 'Ratel NOC Lab / Hybrid',
    format: 'Hybrid',
    duration: '8 Weeks',
    schedule: 'Tuesdays & Thursdays (4:00 PM - 7:00 PM)',
    fee: '₦65,000',
    status: 'registration_open',
    start_date: 'Nov 18, 2026',
    capacity: 30,
    enrolled_count: 12,
    is_active: true,
  },
  {
    id: 'course-3',
    title: 'Fixed Wireless Access (FWA) & 4G/LTE Radio Operations',
    code: 'RATEL-WRL-102',
    category: 'wireless',
    description: 'Master RF transmission, line-of-sight path profiling, microwave point-to-point backhaul links, and 4G LTE eNodeB base station alignment and interference mitigation.',
    syllabus: [
      'Radio Frequency Fundamentals: Decibels, Antennas & Fresnel Zones',
      'Microwave Link Budgeting & Path Loss Calculations',
      'Point-to-Multipoint (PtMP) Base Station Alignment & Sectoring',
      'Spectrum Analysis & RF Noise Floor Management',
      'LTE CPE Installation, Signal Optimization (RSRP, RSRQ, SINR)',
      'Tower Climbing Safety & Mast Earthing/Surge Protection',
    ],
    prerequisites: [
      'Basic understanding of wireless concepts',
      'Physical capability for outdoor field practice',
    ],
    instructor: 'Engr. Fatima Garba (RF & Spectrum Lead)',
    location: 'Ratel Wireless Engineering Center, Kano',
    format: 'Onsite',
    duration: '4 Weeks',
    schedule: 'Saturdays (9:00 AM - 4:00 PM)',
    fee: '₦40,000',
    status: 'upcoming',
    start_date: 'Dec 05, 2026',
    capacity: 20,
    enrolled_count: 5,
    is_active: true,
  },
  {
    id: 'course-4',
    title: 'VoIP Telephony, SIP Trunking & Cloud PBX Solutions',
    code: 'RATEL-VOP-301',
    category: 'telecoms',
    description: 'Build carrier-grade voice systems. Learn Session Initiation Protocol (SIP), Asterisk/FreePBX deployment, codec negotiation, DID routing, and softphone provisioning.',
    syllabus: [
      'VoIP Fundamentals & SIP Signaling Call Flows',
      'Asterisk PBX Setup & Extension Configuration',
      'SIP Trunking, DID Routing & Dial Plan Logic',
      'Voice Codecs (G.711, G.729, Opus) & Jitter Buffer Optimization',
      'Ratel Softphone Mobile App Provisioning & WebRTC',
      'VoIP Security, Toll Fraud Prevention & Fail2ban',
    ],
    prerequisites: [
      'Linux terminal basics',
      'General networking comprehension',
    ],
    instructor: 'Usman Aliyu (Voice Core Systems Architect)',
    location: 'Virtual Classroom + Lab Day',
    format: 'Online',
    duration: '5 Weeks',
    schedule: 'Weekdays Evening (6:30 PM - 8:30 PM)',
    fee: '₦50,000',
    status: 'ongoing',
    start_date: 'Oct 20, 2026',
    capacity: 35,
    enrolled_count: 27,
    is_active: true,
  },
  {
    id: 'course-5',
    title: 'Linux Server Administration & 24/7 NOC Monitoring',
    code: 'RATEL-SYS-202',
    category: 'software',
    description: 'Acquire practical skills required in telecom Network Operations Centers. Covers Ubuntu/Debian server hardening, DNS/DHCP, Prometheus, Grafana, and automated alerting.',
    syllabus: [
      'Linux Shell Navigation, Permissions & Systemd Services',
      'BIND9 DNS & ISC-DHCP Server Deployment',
      'Network Monitoring with SNMP, Zabbix & Prometheus',
      'Building Real-Time Grafana Dashboards for ISP Traffic',
      'Incident Escalation Procedures & SLA Management',
      'Bash Scripting for Automated Backups and Healthchecks',
    ],
    prerequisites: [
      'Computer literacy',
      'Willingness to learn command-line tools',
    ],
    instructor: 'Ibrahim Mukhtar (Lead Infrastructure Engineer)',
    location: 'Ratel Tech Campus, Kano',
    format: 'Hybrid',
    duration: '6 Weeks',
    schedule: 'Mon & Wed (2:00 PM - 5:00 PM)',
    fee: '₦55,000',
    status: 'upcoming',
    start_date: 'Dec 01, 2026',
    capacity: 25,
    enrolled_count: 8,
    is_active: true,
  },
];

export default function AcademyPage() {
  const { t } = useLanguage();
  const [courses, setCourses] = useState(SAMPLE_COURSES);
  const [loading, setLoading] = useState(true);

  // Filters
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [detailCourse, setDetailCourse] = useState(null);
  const [enrollCourse, setEnrollCourse] = useState(null);

  // Enrollment Form State
  const [enrollForm, setEnrollForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    educationLevel: 'Degree / HND',
    experienceLevel: 'Beginner',
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [enrollSuccess, setEnrollSuccess] = useState(false);
  const [enrollError, setEnrollError] = useState(null);

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

  // Fetch courses dynamically from the attendance backend
  useEffect(() => {
    let active = true;

    const loadCourses = async () => {
      const apiUrl = getApiUrl();
      try {
        const params = new URLSearchParams({ active_only: 'true' });
        if (categoryFilter !== 'all') params.append('category', categoryFilter);
        if (statusFilter !== 'all') params.append('status', statusFilter);
        if (searchQuery.trim()) params.append('search', searchQuery.trim());

        const res = await fetch(`${apiUrl}/academy/courses?${params.toString()}`);
        if (res.ok) {
          const data = await res.json();
          if (active && Array.isArray(data) && data.length > 0) {
            setCourses(data);
          }
        }
      } catch (err) {
        console.warn('Academy API unreachable, displaying local courses:', err);
      } finally {
        if (active) setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      loadCourses();
    }, 250);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [statusFilter, categoryFilter, searchQuery]);

  // Client-side filtering
  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'ongoing' && c.status === 'ongoing') ||
        (statusFilter === 'open' && (c.status === 'registration_open' || c.status === 'upcoming')) ||
        (statusFilter === 'completed' && c.status === 'completed');

      const matchesCategory = categoryFilter === 'all' || c.category === categoryFilter;

      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        (c.instructor && c.instructor.toLowerCase().includes(q)) ||
        (c.code && c.code.toLowerCase().includes(q));

      return matchesStatus && matchesCategory && matchesQuery;
    });
  }, [courses, statusFilter, categoryFilter, searchQuery]);

  // Handle Enrollment Submission
  const handleEnrollSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setEnrollError(null);

    const apiUrl = getApiUrl();
    try {
      const res = await fetch(`${apiUrl}/academy/enroll`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          course_id: enrollCourse?.id || null,
          course_title: enrollCourse?.title || 'General Academy Interest',
          full_name: enrollForm.fullName,
          email: enrollForm.email,
          phone: enrollForm.phone,
          education_level: enrollForm.educationLevel,
          experience_level: enrollForm.experienceLevel,
          notes: enrollForm.notes,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Failed to submit enrollment application. Please try again.');
      }

      setEnrollSuccess(true);
    } catch (err) {
      setEnrollError(err.message || 'Submission failed. Please check your internet connection.');
    } finally {
      setSubmitting(false);
    }
  };

  const openEnrollModal = (course) => {
    setEnrollCourse(course);
    setEnrollSuccess(false);
    setEnrollError(null);
    setEnrollForm({
      fullName: '',
      email: '',
      phone: '',
      educationLevel: 'Degree / HND',
      experienceLevel: 'Beginner',
      notes: '',
    });
  };

  const ongoingCount = courses.filter((c) => c.status === 'ongoing').length;
  const upcomingCount = courses.filter((c) => c.status === 'upcoming' || c.status === 'registration_open').length;

  return (
    <div className={styles.pageWrapper}>
      {/* Page Header / Breadcrumbs */}
      <div className="page-header">
        <div className="container">
          <ul className="breadcrumbs">
            <li>
              <Link href="/">{t('Home')}</Link>
            </li>
            <li>{t('Academy')}</li>
          </ul>
          <h1 className="page-title">{t('Ratel Plus Academy')}</h1>
        </div>
      </div>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroGlow} />
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <span className={styles.heroBadgeDot} />
              <span>{t('Hands-On Telecom & Engineering Training')}</span>
            </div>

            <h2 className={styles.heroTitle}>
              {t('Practical Telecom, Fiber & IT Professional Training')}
            </h2>

            <p className={styles.heroSubtitle}>
              {t(
                'Learn industry-certified skills directly from practicing network engineers at Ratel Plus. Gain hands-on field experience with fusion splicing, GPON, Mikrotik routing, and 4G wireless.'
              )}
            </p>

            {/* Quick Stats Grid */}
            <div className={styles.heroStatsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>100%</div>
                <div className={styles.statLabel}>{t('Practical Lab Work')}</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statNumber} style={{ color: '#d97706' }}>
                  {ongoingCount}
                </div>
                <div className={styles.statLabel}>{t('Ongoing Classes')}</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statNumber} style={{ color: '#0284c7' }}>
                  {upcomingCount}
                </div>
                <div className={styles.statLabel}>{t('Starting Soon')}</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statNumber} style={{ color: '#10b981' }}>
                  Top 20%
                </div>
                <div className={styles.statLabel}>{t('Internship / Job Pathway')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Directory Section */}
      <section style={{ padding: '50px 0 30px' }}>
        <div className="container">
          {/* Search & Filter Bar */}
          <div className={styles.searchFilterBar}>
            {/* Search Input */}
            <div className={styles.searchBox}>
              <i className={`bi bi-search ${styles.searchIcon}`} />
              <input
                type="text"
                placeholder={t('Search courses by title, instructor, or skill...')}
                className={styles.searchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Controls Row: Status tabs & Category Dropdown */}
            <div className={styles.filterControlsRow}>
              <div className={styles.statusTabs}>
                <button
                  className={`${styles.statusTabBtn} ${statusFilter === 'all' ? styles.statusTabBtnActive : ''}`}
                  onClick={() => setStatusFilter('all')}
                >
                  <i className="bi bi-grid-fill" />
                  {t('All Courses')} ({courses.length})
                </button>

                <button
                  className={`${styles.statusTabBtn} ${statusFilter === 'ongoing' ? styles.statusTabBtnActive : ''}`}
                  onClick={() => setStatusFilter('ongoing')}
                >
                  <span
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      background: '#d97706',
                      display: 'inline-block',
                    }}
                  />
                  {t('Ongoing Classes')} ({ongoingCount})
                </button>

                <button
                  className={`${styles.statusTabBtn} ${statusFilter === 'open' ? styles.statusTabBtnActive : ''}`}
                  onClick={() => setStatusFilter('open')}
                >
                  <i className="bi bi-calendar-check" />
                  {t('Starting Soon / Open')} ({upcomingCount})
                </button>
              </div>

              {/* Category Dropdown */}
              <select
                className={styles.categorySelect}
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">{t('All Tracks & Categories')}</option>
                <option value="fiber">{t('Fiber Optics & FTTH')}</option>
                <option value="networking">{t('Enterprise Routing & BGP')}</option>
                <option value="wireless">{t('Wireless & 4G/LTE Radio')}</option>
                <option value="telecoms">{t('VoIP & PBX Telephony')}</option>
                <option value="software">{t('Linux & NOC Infrastructure')}</option>
              </select>
            </div>
          </div>

          {/* Courses Grid */}
          {filteredCourses.length > 0 ? (
            <div className={styles.coursesGrid}>
              {filteredCourses.map((course) => (
                <div key={course.id} className={styles.courseCard}>
                  <div>
                    {/* Top Row: Status & Format */}
                    <div className={styles.cardTopRow}>
                      {course.status === 'ongoing' ? (
                        <span className={styles.badgeOngoing}>
                          <span
                            style={{
                              width: '7px',
                              height: '7px',
                              borderRadius: '50%',
                              background: '#d97706',
                              animation: 'pulseDot 2s infinite',
                            }}
                          />
                          {t('Ongoing Course')}
                        </span>
                      ) : course.status === 'registration_open' ? (
                        <span className={styles.badgeOpen}>
                          <i className="bi bi-check-circle-fill" />
                          {t('Registration Open')}
                        </span>
                      ) : (
                        <span className={styles.badgeUpcoming}>
                          <i className="bi bi-calendar-event" />
                          {t('Starting Soon')}
                        </span>
                      )}

                      <span className={styles.formatBadge}>{course.format}</span>
                    </div>

                    <div className={styles.courseCategory}>
                      {course.code ? `${course.code} • ` : ''}
                      {course.category.toUpperCase()}
                    </div>

                    <h3 className={styles.courseTitle}>{course.title}</h3>

                    <p className={styles.courseDescription}>{course.description}</p>

                    {/* Metadata Grid */}
                    <div className={styles.metaGrid}>
                      <div className={styles.metaItem}>
                        <i className="bi bi-clock-history" />
                        <span>{course.duration}</span>
                      </div>
                      <div className={styles.metaItem}>
                        <i className="bi bi-tag-fill" style={{ color: '#16a34a' }} />
                        <span className={styles.metaHighlight}>{course.fee}</span>
                      </div>
                      <div className={styles.metaItem}>
                        <i className="bi bi-geo-alt-fill" />
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {course.location}
                        </span>
                      </div>
                      <div className={styles.metaItem}>
                        <i className="bi bi-people-fill" />
                        <span>
                          {course.enrolled_count || 0} / {course.capacity || 30} {t('Enrolled')}
                        </span>
                      </div>
                    </div>

                    {/* Syllabus Highlights */}
                    {course.syllabus && course.syllabus.length > 0 && (
                      <div className={styles.syllabusPreview}>
                        <div className={styles.syllabusTitle}>{t('Key Modules Covered:')}</div>
                        <ul className={styles.syllabusList}>
                          {course.syllabus.slice(0, 3).map((mod, idx) => (
                            <li key={idx} className={styles.syllabusItem}>
                              <i className="bi bi-check-circle" />
                              <span>{mod}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Bottom Action Buttons */}
                  <div className={styles.cardActions}>
                    <button
                      className={styles.btnDetails}
                      onClick={() => setDetailCourse(course)}
                    >
                      <i className="bi bi-info-circle" />
                      {t('Syllabus')}
                    </button>

                    <button
                      className={styles.btnEnroll}
                      onClick={() => openEnrollModal(course)}
                    >
                      <span>{t('Enroll Now')}</span>
                      <i className="bi bi-arrow-right-short" style={{ fontSize: '18px' }} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <i className={`bi bi-mortarboard ${styles.emptyIcon}`} />
              <h3>{t('No Courses Match Your Filter')}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '6px' }}>
                {t('Try selecting another category or check back soon as new cohorts open frequently.')}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Why Ratel Academy Pillars */}
      <section className={styles.pillarsSection}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px' }}>
            <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--primary)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              {t('The Ratel Plus Advantage')}
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--text-main)', marginTop: '8px' }}>
              {t('Why Study at Ratel Academy?')}
            </h2>
          </div>

          <div className={styles.pillarsGrid}>
            <div className={styles.pillarCard}>
              <div className={styles.pillarIcon}>
                <i className="bi bi-lightning-charge-fill" />
              </div>
              <h3 className={styles.pillarTitle}>{t('Real Telecom Equipment')}</h3>
              <p className={styles.pillarDesc}>
                {t('Train on live Fujikura fusion splicers, EXFO OTDR testers, Mikrotik CCR core routers, and GPON OLT distribution frames.')}
              </p>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarIcon}>
                <i className="bi bi-people-fill" />
              </div>
              <h3 className={styles.pillarTitle}>{t('Active Network Engineers')}</h3>
              <p className={styles.pillarDesc}>
                {t('Learn directly from telecom practitioners who manage 24/7 internet backbones across Northern Nigeria every day.')}
              </p>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarIcon}>
                <i className="bi bi-patch-check-fill" />
              </div>
              <h3 className={styles.pillarTitle}>{t('Recognized Certification')}</h3>
              <p className={styles.pillarDesc}>
                {t('Graduate with industry-recognized certificate diplomas validating your verified hours in optical splicing & network routing.')}
              </p>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarIcon}>
                <i className="bi bi-briefcase-fill" />
              </div>
              <h3 className={styles.pillarTitle}>{t('Employment & Internship')}</h3>
              <p className={styles.pillarDesc}>
                {t('Outstanding students receive direct internship placements and full-time hiring opportunities within the Ratel Plus network team.')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* COURSE DETAIL MODAL */}
      {/* ============================================================== */}
      {detailCourse && (
        <div className={styles.modalOverlay} onClick={() => setDetailCourse(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--primary)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  {detailCourse.category.toUpperCase()} • {detailCourse.code}
                </span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-main)', margin: '4px 0 0 0' }}>
                  {detailCourse.title}
                </h3>
              </div>
              <button className={styles.modalCloseBtn} onClick={() => setDetailCourse(null)}>
                <i className="bi bi-x" />
              </button>
            </div>

            <div className={styles.modalBody}>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '20px' }}>
                {detailCourse.description}
              </p>

              {/* Meta details */}
              <div className={styles.metaGrid} style={{ marginBottom: '20px' }}>
                <div className={styles.metaItem}>
                  <i className="bi bi-clock" />
                  <span><strong>Duration:</strong> {detailCourse.duration}</span>
                </div>
                <div className={styles.metaItem}>
                  <i className="bi bi-tag" />
                  <span><strong>Tuition:</strong> <span className={styles.metaHighlight}>{detailCourse.fee}</span></span>
                </div>
                <div className={styles.metaItem}>
                  <i className="bi bi-calendar" />
                  <span><strong>Schedule:</strong> {detailCourse.schedule || 'Flexible'}</span>
                </div>
                <div className={styles.metaItem}>
                  <i className="bi bi-geo-alt" />
                  <span><strong>Venue:</strong> {detailCourse.location}</span>
                </div>
              </div>

              {detailCourse.instructor && (
                <div style={{ marginBottom: '20px', padding: '12px 16px', background: 'var(--bg-main)', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-main)' }}>Lead Instructor:</div>
                  <div style={{ fontSize: '14px', color: 'var(--primary)', fontWeight: '600' }}>{detailCourse.instructor}</div>
                </div>
              )}

              {/* Full Syllabus */}
              {detailCourse.syllabus && detailCourse.syllabus.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '10px' }}>
                    Full Course Curriculum:
                  </div>
                  <ul className={styles.syllabusList}>
                    {detailCourse.syllabus.map((item, idx) => (
                      <li key={idx} className={styles.syllabusItem} style={{ fontSize: '13px' }}>
                        <i className="bi bi-check-circle-fill" style={{ color: '#10b981' }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Prerequisites */}
              {detailCourse.prerequisites && detailCourse.prerequisites.length > 0 && (
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '8px' }}>
                    Prerequisites:
                  </div>
                  <ul className={styles.syllabusList}>
                    {detailCourse.prerequisites.map((req, idx) => (
                      <li key={idx} className={styles.syllabusItem} style={{ fontSize: '13px' }}>
                        <i className="bi bi-dash" style={{ color: 'var(--primary)' }} />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                className={styles.submitBtn}
                onClick={() => {
                  const target = detailCourse;
                  setDetailCourse(null);
                  openEnrollModal(target);
                }}
              >
                <span>Enroll in this Course</span>
                <i className="bi bi-arrow-right" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* ENROLLMENT MODAL */}
      {/* ============================================================== */}
      {enrollCourse && (
        <div className={styles.modalOverlay} onClick={() => setEnrollCourse(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--primary)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Enrollment Registration
                </span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--text-main)', margin: '4px 0 0 0' }}>
                  {enrollCourse.title}
                </h3>
              </div>
              <button className={styles.modalCloseBtn} onClick={() => setEnrollCourse(null)}>
                <i className="bi bi-x" />
              </button>
            </div>

            <div className={styles.modalBody}>
              {enrollSuccess ? (
                <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                  <i className="bi bi-check-circle-fill" style={{ fontSize: '50px', color: '#10b981', display: 'block', marginBottom: '16px' }} />
                  <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '8px' }}>
                    Application Submitted Successfully!
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6', maxWidth: '400px', margin: '0 auto 24px' }}>
                    Thank you, <strong>{enrollForm.fullName}</strong>. Our Academy admissions officer will contact you via email and phone with orientation details.
                  </p>
                  <button
                    className={styles.submitBtn}
                    onClick={() => setEnrollCourse(null)}
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleEnrollSubmit}>
                  {enrollError && (
                    <div style={{ padding: '10px 14px', background: '#fee2e2', color: '#991b1b', borderRadius: '8px', fontSize: '13px', marginBottom: '16px' }}>
                      {enrollError}
                    </div>
                  )}

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Fatima Mohammed"
                      className={styles.formInput}
                      value={enrollForm.fullName}
                      onChange={(e) => setEnrollForm({ ...enrollForm, fullName: e.target.value })}
                    />
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="fatima@example.com"
                        className={styles.formInput}
                        value={enrollForm.email}
                        onChange={(e) => setEnrollForm({ ...enrollForm, email: e.target.value })}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="0803XXXXXXX"
                        className={styles.formInput}
                        value={enrollForm.phone}
                        onChange={(e) => setEnrollForm({ ...enrollForm, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Educational Background</label>
                      <select
                        className={styles.formSelect}
                        value={enrollForm.educationLevel}
                        onChange={(e) => setEnrollForm({ ...enrollForm, educationLevel: e.target.value })}
                      >
                        <option value="Secondary School (SSCE)">Secondary School (SSCE)</option>
                        <option value="OND / NCE">OND / NCE</option>
                        <option value="HND / B.Sc / B.Eng">HND / B.Sc / B.Eng</option>
                        <option value="Postgraduate (M.Sc / PGD)">Postgraduate (M.Sc / PGD)</option>
                        <option value="Self-Taught / Professional">Self-Taught / Professional</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Prior Telecom / IT Experience</label>
                      <select
                        className={styles.formSelect}
                        value={enrollForm.experienceLevel}
                        onChange={(e) => setEnrollForm({ ...enrollForm, experienceLevel: e.target.value })}
                      >
                        <option value="Beginner (No prior experience)">Beginner (No prior experience)</option>
                        <option value="Intermediate (Basic networking / computer)">Intermediate (Basic networking)</option>
                        <option value="Experienced (Field or ISP technician)">Experienced (Field technician)</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Statement of Interest / Questions (Optional)</label>
                    <textarea
                      rows={3}
                      placeholder="Tell us what you hope to achieve through this training program..."
                      className={styles.formTextarea}
                      value={enrollForm.notes}
                      onChange={(e) => setEnrollForm({ ...enrollForm, notes: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className={styles.submitBtn}
                  >
                    {submitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Registration</span>
                        <i className="bi bi-send-fill" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
