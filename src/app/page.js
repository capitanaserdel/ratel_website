'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import styles from './page.module.css';

const heroSlides = [
  {
    title: "Mandatory National Identification Number (NIN)",
    subtitle: "Nigerian Communications Commission (NCC) Alert",
    desc: "According to the NCC, it is mandatory for all subscribers to provide their National Identification Number (NIN) to keep their telephone lines active.",
    img: "facade-206925_1920.jpg",
    badge: "Compliance Update"
  },
  {
    title: "Facilities-Based Telecommunications infrastructure",
    subtitle: "Next-Gen Networking Solutions",
    desc: "Operating end-to-end reliable, fiber-like connectivity in the exclusively licensed and interference-free 2.3GHz spectrum.",
    img: "2-GEE1-scaled.jpg",
    badge: "High Capacity Network"
  },
  {
    title: "Co-location & Managed Infrastructure Services",
    subtitle: "Enterprise Reliability Solutions",
    desc: "All environments receive redundant power, cooling, fire suppression, and network security drops with SLA-based 99.9% uptime guarantees.",
    img: "colocation_services.jpg",
    badge: "Data Services"
  }
];

export default function Home() {
  const { t, language } = useLanguage();

  // 1. Tab State for Features Section
  const [activeTab, setActiveTab] = useState('mission');

  // 2. Filter State for Devices Gallery
  const [activeFilter, setActiveFilter] = useState('*');

  // 3. FAQ Accordion State (index of active FAQ, or null)
  const [activeFaq, setActiveFaq] = useState(0);

  // 4. Contact Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState({ success: null, message: '' });
  const [submitting, setSubmitting] = useState(false);

  // Scroll Reveal IntersectionObserver hook
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px -5% -10% 0px', // Trigger slightly before element enters fully
      threshold: 0.05,
    };

    const handleIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          if (target.classList.contains('reveal')) {
            target.classList.add('revealActive');
          } else if (target.classList.contains('revealLeft')) {
            target.classList.add('revealLeftActive');
          } else if (target.classList.contains('revealRight')) {
            target.classList.add('revealRightActive');
          } else if (target.classList.contains('revealScale')) {
            target.classList.add('revealScaleActive');
          }
          // Unobserve after trigger to keep animation simple
          observer.unobserve(target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const elementsToAnimate = document.querySelectorAll('.reveal, .revealLeft, .revealRight, .revealScale');
    elementsToAnimate.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  // 5. Hero Slider Background index
  const [heroSlide, setHeroSlide] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlide((prevSlide) => (prevSlide + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // 6. Hero interactive widget tab ('coverage' | 'recharge')
  const [heroWidgetTab, setHeroWidgetTab] = useState('recharge');

  // 7. Coverage Checker State
  const [coverageSearch, setCoverageSearch] = useState('');
  const [isCheckingCoverage, setIsCheckingCoverage] = useState(false);
  const [coverageResult, setCoverageResult] = useState(null);

  // 8. Recharge Widget State
  const [rechargeAmt, setRechargeAmt] = useState(2000);
  const [rechargePhone, setRechargePhone] = useState('');
  const [rechargeOperator, setRechargeOperator] = useState('ratelphone');

  // 9. Bandwidth Calculator State
  const [calcProfile, setCalcProfile] = useState('home');
  const [calcDevices, setCalcDevices] = useState(5);

  // 10. Contact Info Copy State
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopyAddress = () => {
    const address = "Plots 375 & 373, 8th Avenue by 7th Avenue, Zawachiki Layout, Kano, Nigeria";
    navigator.clipboard.writeText(address).then(() => {
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    });
  };

  const handleCoverageCheck = (e) => {
    e.preventDefault();
    if (!coverageSearch.trim()) return;

    setIsCheckingCoverage(true);
    setCoverageResult(null);

    setTimeout(() => {
      const query = coverageSearch.toLowerCase().trim();
      let status = '';
      let active = true;
      let strength = 5;
      let details = '';

      if (query.includes('kano') || query.includes('zawachiki') || query.includes('dala') || query.includes('headquarters')) {
        status = t('Excellent Coverage Available');
        strength = 5;
        details = t('LTE 2.3GHz and Metro Fiber connections are fully active. VoLTE and high definition VoIP voice enabled.');
      } else if (query.includes('abuja') || query.includes('gwarinpa') || query.includes('wuse') || query.includes('asokoro')) {
        status = t('Excellent Coverage Available');
        strength = 5;
        details = t('High capacity fiber links are active. Premium SLA corporate connections supported.');
      } else if (query.includes('lagos') || query.includes('ikeja') || query.includes('lekki') || query.includes('victoria island')) {
        status = t('High Speed LTE Active');
        strength = 4;
        details = t('Bulk IP Wholesale transit operational. 4G LTE hubs fully supported.');
      } else if (query.includes('kaduna') || query.includes('jos') || query.includes('gombe') || query.includes('bauchi')) {
        status = t('Standard Services Active');
        strength = 3;
        details = t('LTE coverage operates via regional carrier nodes. Microwave backhauls can be provisioned.');
      } else {
        status = t('Expansion Region (Planning Phase)');
        strength = 1;
        active = false;
        details = t('Ratel Metro Optical Fiber path is scheduled for expansion. Request dedicated backhaul link provisioning.');
      }

      setCoverageResult({ status, strength, active, details, query: coverageSearch });
      setIsCheckingCoverage(false);
    }, 1200);
  };

  const getBandwidthSpecs = () => {
    let speed = 0;
    let description = '';
    let recommendation = '';
    let image = '/router_hub.png';
    let link = '/#contact';

    if (calcProfile === 'home') {
      speed = calcDevices * 4;
      description = t('Handles streaming, browsing, and remote work for {devices} devices at home.').replace('{devices}', calcDevices);
      recommendation = speed < 20 ? t('RatelSIM Mobile + SoftPhone App') : t('RATEL 4G LTE Hub Router');
      image = speed < 20 ? '/phone_mockup.png' : '/router_hub.png';
      link = speed < 20 ? 'https://play.google.com/store/apps/details?id=net.ratelplus.phone' : '/#contact';
    } else if (calcProfile === 'office') {
      speed = calcDevices * 8;
      description = t('Supports cloud SaaS, HD Zoom meetings, and multi-line VoIP channels for {devices} office devices.').replace('{devices}', calcDevices);
      recommendation = speed < 60 ? t('RATEL 4G LTE Hub Router') : t('Dedicated Metro Fiber Connection');
      image = speed < 60 ? '/router_hub.png' : '/datacenter_fiber.png';
      link = '/#contact';
    } else {
      speed = calcDevices * 15;
      description = t('High-capacity backbone supporting hosting nodes, bulk VoIP carriers, and large enterprise terminals.');
      recommendation = t('IP Wholesale Bulk Transit (SLA Metro Fiber Ring)');
      image = '/datacenter_fiber.png';
      link = '/services/ip-wholesale';
    }

    return { speed, description, recommendation, image, link };
  };

  const bandwidthSpecs = getBandwidthSpecs();

  useEffect(() => {
    if (calcProfile === 'home') {
      setCalcDevices(5);
    } else if (calcProfile === 'office') {
      setCalcDevices(15);
    } else {
      setCalcDevices(50);
    }
  }, [calcProfile]);

  // Devices Listing Data
  const devices = [
    {
      id: 1,
      title: t("Ratel Phone App"),
      category: "app",
      desc: t("A free SIP softphone that connects you to our network for high-definition voice calling over the internet."),
      badge: t("Google Play / App Store"),
      icon: "bi-phone-fill",
      img: "/phone_mockup.png",
      link: "https://play.google.com/store/apps/details?id=net.ratelplus.phone"
    },
    {
      id: 2,
      title: t("Smart Homes Solution"),
      category: "smart-homes",
      desc: t("Integrated smart home controls of the future, enabling video surveillance and lighting control over broadband."),
      badge: t("Future IoT"),
      icon: "bi-house-gear-fill",
      img: "/datacenter_fiber.png",
      link: "/#contact"
    },
    {
      id: 3,
      title: t("4G LTE Smartphone"),
      category: "smart-phones",
      desc: t("Brand new 6.5 inch Android smartphone optimized to support HD VoLTE calls on our high-speed network."),
      badge: t("LTE Device"),
      icon: "bi-phone-vibrate-fill",
      img: "/phone_mockup.png",
      link: "/#contact"
    },
    {
      id: 4,
      title: t("RATEL 4G LTE Hub Router"),
      category: "broadband",
      desc: t("High-speed wireless hubs with built-in router, converting your home or office into a high-speed hotspot."),
      badge: t("Broadband Hub"),
      icon: "bi-router-fill",
      img: "/router_hub.png",
      link: "/#contact"
    },
    {
      id: 5,
      title: t("RatelSIM Application"),
      category: "app",
      desc: t("Virtual SIM management interface to configure your VoIP lines, account balance, and subscription packages."),
      badge: t("eSIM Utility"),
      icon: "bi-sim-fill",
      img: "/phone_mockup.png",
      link: "https://apps.apple.com/ng/app/ratelplus-phone/id1659297972"
    },
    {
      id: 6,
      title: t("Enterprise Fixed Terminal"),
      category: "smart-phones",
      desc: t("Desk-bound smart cordless terminal supporting high-quality video calls and 5G Wi-Fi with SIM slots."),
      badge: t("Office VoIP"),
      icon: "bi-telephone-fill",
      img: "/router_hub.png",
      link: "/#contact"
    }
  ];

  const filteredDevices = activeFilter === '*'
    ? devices
    : devices.filter(d => d.category === activeFilter);

  // FAQ Accordion Data
  const faqs = [
    {
      q: t("How do I contact customer care?"),
      a: t("You can chat with us live using our portal widget or contact us via WhatsApp at +234 701 055 3861. You can also call us directly on 02097030000 or 02064700000, or send an email to customercare@ratelplus.net.ng.")
    },
    {
      q: t("How can I speak with a human agent?"),
      a: t("Our customer service desk operates 24/7. Use the Zoho live chat widget on the bottom right of the screen to connect immediately, or dial 02097030000 or 02064700000 on your telephone.")
    },
    {
      q: t("Do you have a mobile app?"),
      a: t("Yes! Our official app is called 'Ratel Phone'. You can download it on the Google Play Store for Android or the Apple App Store for iOS to manage calls and account balance.")
    },
    {
      q: t("How can I register a new line?"),
      a: t("You can click on 'Register Now' in the navigation bar to access subscriber options, or send us a WhatsApp message at +234 701 055 3861 to have an agent guide you through registration.")
    },
    {
      q: t("How do I recharge my Ratel Line?"),
      a: t("You can purchase airtime securely through our Online Airtime portal by clicking 'Buy Airtime' in the navigation, or recharge directly inside the Ratel Phone mobile application.")
    },
    {
      q: t("How do I access phone contacts on the Ratel Phone App?"),
      a: t("Navigate to your smartphone Settings > Apps & notifications > Advanced > Permission manager > Contacts. Select 'Ratel Phone' and choose 'Allow' contact access.")
    }
  ];

  // Contact Form Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormStatus({ success: null, message: '' });

    // Mock API simulation (simulating SMTP contact action)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
        setFormStatus({
          success: true,
          message: t("Thank you! Your message has been sent successfully. An agent will contact you shortly.")
        });
        setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setFormStatus({
        success: false,
        message: t("Oops! Something went wrong while sending your message. Please try again.")
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* 1. Hero Banner with Aurora Blur Backgrounds */}
      <section className={`${styles.heroSection} animate-fadeIn`}>
        <div className={styles.aurora1} />
        <div className={styles.aurora2} />
        {heroSlides[heroSlide] && heroSlides[heroSlide].img && (
          <img
            src={`/${heroSlides[heroSlide].img}`}
            alt="Hero Background"
            className={styles.heroImage}
          />
        )}

        <div className={`container ${styles.heroContainer}`}>
          {/* Left Column: Slides Content */}
          <div key={heroSlide} className={`${styles.heroContent} animate-fadeIn`} style={{ animationDelay: '0.2s' }}>
            <h1 className={styles.heroTitle}>
              {t(heroSlides[heroSlide].title)}
            </h1>
            <p className={styles.heroDesc}>
              {t(heroSlides[heroSlide].desc)}
            </p>
            <div className={styles.heroBtns}>
              <Link href="/reg-options" className={styles.heroRegisterBtn}>
                {t('Register Now Btn')} <i className="bi bi-chevron-right"></i>
              </Link>
              <Link href="/airtime" className={styles.heroAirtimeBtn}>
                {t('Buy Airtime Btn')} <i className="bi bi-wallet2"></i>
              </Link>
              <button
                className={styles.btnWatch}
                onClick={() => window.open('https://youtu.be/dP2eLpavzKc', '_blank')}
                style={{ color: 'var(--text-main)' }}
              >
                <i className="bi bi-play-circle-fill"></i>
                <span>{t('Watch Video')}</span>
              </button>
            </div>

            {/* Slider Controls */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '40px' }}>
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setHeroSlide(idx)}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    border: 'none',
                    background: heroSlide === idx ? 'var(--primary)' : 'rgba(15, 23, 42, 0.2)',
                    cursor: 'pointer',
                    transition: 'var(--transition)'
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Premium Interactive Widget Card */}
          <div className={styles.heroGraphic}>
            <div className={styles.interactiveWidgetCard}>
              <div className={styles.widgetHeader}>
                <button
                  className={`${styles.widgetTabBtn} ${heroWidgetTab === 'recharge' ? styles.widgetTabBtnActive : ''}`}
                  onClick={() => setHeroWidgetTab('recharge')}
                >
                  <i className="bi bi-lightning-charge-fill"></i> {t('Quick Recharge')}
                </button>
                <button
                  className={`${styles.widgetTabBtn} ${heroWidgetTab === 'coverage' ? styles.widgetTabBtnActive : ''}`}
                  onClick={() => setHeroWidgetTab('coverage')}
                >
                  <i className="bi bi-geo-alt-fill"></i> {t('Coverage Check')}
                </button>
              </div>

              <div className={styles.widgetContent}>
                {heroWidgetTab === 'recharge' ? (
                  <div className={styles.rechargeTab}>
                    <h4>{t('Quick Airtime Calculator')}</h4>
                    <p className={styles.widgetSubtext}>{t('Enter recharge amount to calculate bonuses & instant credits.')}</p>
                    <div className={styles.rechargeForm}>
                      <div className={styles.widgetRow}>
                        <div style={{ flex: 1 }}>
                          <label className={styles.widgetLabel}>{t('Operator')}</label>
                          <select
                            value={rechargeOperator}
                            onChange={(e) => setRechargeOperator(e.target.value)}
                            className={styles.widgetSelect}
                          >
                            <option value="ratelphone">{t('Ratel Phone App (VoIP)')}</option>
                            <option value="ratelsim">{t('RatelSIM Mobile')}</option>
                          </select>
                        </div>
                        <div style={{ flex: 1 }}>
                          <label className={styles.widgetLabel}>{t('Phone Number')}</label>
                          <input
                            type="tel"
                            placeholder="e.g. 02064700000"
                            value={rechargePhone}
                            onChange={(e) => setRechargePhone(e.target.value)}
                            className={styles.widgetInputTel}
                          />
                        </div>
                      </div>

                      <div className={styles.sliderGroup}>
                        <label className={styles.widgetLabel}>{t('Recharge Amount (₦)')}</label>
                        <div className={styles.widgetInputWrapper}>
                          <i className="bi bi-wallet2"></i>
                          <input
                            type="number"
                            placeholder="Enter Recharge Amount (e.g. 2000)"
                            value={rechargeAmt || ''}
                            onChange={(e) => setRechargeAmt(Number(e.target.value))}
                            className={styles.widgetInput}
                            min="100"
                            max="100000"
                            required
                          />
                        </div>
                      </div>

                      <Link
                        href={`/airtime?phone=${rechargePhone}&amount=${rechargeAmt}&operator=${rechargeOperator}`}
                        className={styles.widgetSubmitBtn}
                      >
                        <i className="bi bi-cart-check-fill"></i> {t('Recharge Now')}
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className={styles.coverageTab}>
                    <h4>{t('Check Network Coverage')}</h4>
                    <p className={styles.widgetSubtext}>{t('Find out if our high-speed LTE and Metro Fiber services are active in your area.')}</p>
                    <form onSubmit={handleCoverageCheck} className={styles.coverageForm}>
                      <div className={styles.widgetInputWrapper}>
                        <i className="bi bi-search"></i>
                        <input
                          type="text"
                          placeholder={t('Enter Neighborhood or City (e.g. Kano, Gwarinpa)')}
                          value={coverageSearch}
                          onChange={(e) => setCoverageSearch(e.target.value)}
                          className={styles.widgetInput}
                          required
                        />
                      </div>
                      <button type="submit" className={styles.widgetBtn} disabled={isCheckingCoverage}>
                        {isCheckingCoverage ? (
                          <>
                            <span className={`${styles.spinner} bi bi-arrow-repeat`}></span> {t('Checking...')}
                          </>
                        ) : (
                          <>{t('Check Service Status')}</>
                        )}
                      </button>
                    </form>

                    {coverageResult && (
                      <div className={`${styles.coverageResultCard} ${coverageResult.active ? styles.coverageResultSuccess : styles.coverageResultWarning}`}>
                        <div className={styles.coverageResultHeader}>
                          <span className={styles.coverageResultIndicator}>
                            <span className={styles.pulseDot}></span>
                            {coverageResult.status}
                          </span>
                          <div className={styles.signalBars}>
                            {[1, 2, 3, 4, 5].map((bar) => (
                              <div
                                key={bar}
                                className={`${styles.signalBar} ${bar <= coverageResult.strength ? styles.signalBarActive : ''}`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className={styles.coverageResultDetails}>{coverageResult.details}</p>
                        {coverageResult.active ? (
                          <Link href="/reg-options" className={styles.resultActionBtn}>
                            {t('Register SIM Now')} <i className="bi bi-arrow-right"></i>
                          </Link>
                        ) : (
                          <Link href="/#contact" className={styles.resultActionBtnSecondary}>
                            {t('Request Coverage Expansion')} <i className="bi-envelope-fill"></i>
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Network Activity Bar */}
      <section className={styles.liveActivityBar}>
        <div className="container">
          <div className={styles.liveActivityContainer}>
            <div className={styles.liveStats}>
              <div className={styles.statItem}>
                <span className={styles.statValue}>99.9%</span>
                <span className={styles.statLabel}>{t('Uptime')}</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>24/7</span>
                <span className={styles.statLabel}>{t('Support')}</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>15ms</span>
                <span className={styles.statLabel}>{t('Avg Latency')}</span>
              </div>
            </div>
            <div className={styles.liveTicker}>
              <div className={styles.tickerWrapper}>
                <span>{t('New fiber link active in Kano Central')}</span>
                <span className={styles.tickerDot}></span>
                <span>{t('LTE Coverage expanded in Abuja Wuse II')}</span>
                <span className={styles.tickerDot}></span>
                <span>{t('VoIP Capacity upgraded (+50,000 channels)')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LTE / About Section */}
      <section id="about" className={`${styles.sectionPadding} reveal`}>
        <div className="container">
          <div className={styles.lteGrid}>
            <div className={`${styles.lteText} revealLeft`}>
              <h3 className={styles.sectionTitle}>{t('Long Term Evolution (LTE) Services')}</h3>
              <p>
                {t('Experience high-speed, low-latency, and highly reliable mobile connectivity...')}
              </p>

              <ul className={styles.lteList}>
                <li className={styles.lteListItem}>
                  <i className="bi bi-check-circle-fill"></i>
                  <span>{t('HD Audio Call Quality')}</span>
                </li>
                <li className={styles.lteListItem}>
                  <i className="bi bi-check-circle-fill"></i>
                  <span>{t('Fast Setup & Connection')}</span>
                </li>
                <li className={styles.lteListItem}>
                  <i className="bi bi-check-circle-fill"></i>
                  <span>{t('Simultaneous Voice & Data')}</span>
                </li>
                <li className={styles.lteListItem}>
                  <i className="bi bi-check-circle-fill"></i>
                  <span>{t('Buffer-free Media Streaming')}</span>
                </li>
                <li className={styles.lteListItem}>
                  <i className="bi bi-check-circle-fill"></i>
                  <span>{t('Low-Latency Online Gaming')}</span>
                </li>
                <li className={styles.lteListItem}>
                  <i className="bi bi-check-circle-fill"></i>
                  <span>{t('Secure Cloud Syncing')}</span>
                </li>
              </ul>
            </div>

            <div className={`${styles.imgCard} revealRight`}>
              <div className={styles.imgBadge}>{t('Licensed 2.3 GHz Spectrum')}</div>
              <div className={styles.imgGlow} />
              <img src="/lte_mast.png" alt={t('Broadband Transmission Mast')} className={styles.imgCover} />
            </div>
          </div>
        </div>
      </section>

      {/* 2.5 Play Store App Section */}
      <section id="phone-app" className={`${styles.sectionPadding} ${styles.appSection} reveal`}>
        <div className="container">
          <div className={styles.appGrid}>
            <div className={`${styles.appText} revealLeft`}>
              <span className={styles.sectionSubtitle}>{t('Google Play / App Store')}</span>
              <h2 className={styles.sectionTitle}>{t('Ratel Phone App')}</h2>
              <p className={styles.appDescription}>
                {t('A free SIP softphone that connects you to our network for high-definition voice calling over the internet.')}
              </p>
              <div className={styles.appDownloadButtons}>
                <a
                  href="https://play.google.com/store/apps/details?id=net.ratelplus.phone"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.appBadgeLink}
                >
                  <img src="/google_play.png" alt="Get it on Google Play" className={styles.appBadgeImg} />
                </a>
                <a
                  href="https://apps.apple.com/ng/app/ratelplus-phone/id1659297972"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.appBadgeLink}
                >
                  <img src="/app_store.png" alt="Download on the App Store" className={styles.appBadgeImg} />
                </a>
              </div>
            </div>
            <div className={`${styles.appGraphic} revealRight`}>
              <div className={styles.appImgCard}>
                <div className={styles.appImgGlow} />
                <img src="/hand_phone.png" alt="Ratel Phone App in Hand" className={styles.appImgCover} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Features Accordion Tabs */}
      <section className={`${styles.sectionPadding} ${styles.tabsSection} reveal`}>
        <div className="container">
          <div className={`${styles.sectionHeader} reveal`}>
            <span className={styles.sectionSubtitle}>{t('Governance & Values')}</span>
            <h2 className={styles.sectionTitle}>{t('Built on Foundation of Trust')}</h2>
            <p>{t("We believe in maintaining the highest ethical standards, promoting transparency, and contributing to Africa's development.")}</p>
          </div>

          <div className={`${styles.tabList} revealScale`}>
            <button
              className={`${styles.tabItem} ${activeTab === 'mission' ? styles.tabItemActive : ''}`}
              onClick={() => setActiveTab('mission')}
            >
              {t('Mission & Vision')}
            </button>
            <button
              className={`${styles.tabItem} ${activeTab === 'governance' ? styles.tabItemActive : ''}`}
              onClick={() => setActiveTab('governance')}
            >
              {t('Corporate Governance')}
            </button>
            <button
              className={`${styles.tabItem} ${activeTab === 'ethics' ? styles.tabItemActive : ''}`}
              onClick={() => setActiveTab('ethics')}
            >
              {t('Ethics Programme')}
            </button>
          </div>

          {/* Tab Content Display */}
          {activeTab === 'mission' && (
            <div className={styles.tabContent}>
              <div className={`${styles.tabText} revealLeft`}>
                <h3>{t('Our Mission')}</h3>
                <p>
                  {t('Ratel Plus is 100% Nigerian owned. Our mission is to make telecommunication broadband infrastructure, high-quality internet, and managed IT services accessible to as many people and companies as possible at the lowest cost possible.')}
                </p>
                <ul className={styles.tabFeaturesList}>
                  <li className={styles.tabFeaturesItem}>
                    <i className="bi bi-shield-fill-check"></i>
                    <span><strong>{t('Empowering Communities:')}</strong> {t('Deploying infrastructure stimulates localized wealth generation across African nodes.')}</span>
                  </li>
                  <li className={styles.tabFeaturesItem}>
                    <i className="bi bi-graph-up-arrow"></i>
                    <span><strong>{t('Economic Stimulation:')}</strong> {t('Providing digital capabilities allows businesses to reach global markets efficiently.')}</span>
                  </li>
                </ul>
              </div>
              <div className={`${styles.imgCard} revealRight`}>
                <div className={styles.imgTag}>{t('100% Nigerian Owned')}</div>
                <div className={styles.imgGlow} />
                <img src="/datacenter_fiber.png" alt="Ratel Plus Infrastructure" className={styles.imgCover} />
              </div>
            </div>
          )}

          {activeTab === 'governance' && (
            <div className={styles.tabContent}>
              <div className={`${styles.tabText} revealLeft`}>
                <h3>{t('Corporate Governance')}</h3>
                <p>
                  {t('We are committed to high standards of Corporate Governance, which are critical to maintaining business integrity, shareholder transparency, and customer trust.')}
                </p>
                <ul className={styles.tabFeaturesList}>
                  <li className={styles.tabFeaturesItem}>
                    <i className="bi bi-people-fill"></i>
                    <span><strong>{t('Board Integrity:')}</strong> {t('Entrenching rigorous internal controls and policy guidelines across corporate conduct.')}</span>
                  </li>
                  <li className={styles.tabFeaturesItem}>
                    <i className="bi bi-heart-pulse-fill"></i>
                    <span><strong>{t('Honesty & Fairness:')}</strong> {t('Expecting directors, suppliers, and staff to act with total transparency.')}</span>
                  </li>
                </ul>
              </div>
              <div className={`${styles.imgCard} revealRight`}>
                <div className={styles.imgTag}>{t('Corporate Integrity')}</div>
                <div className={styles.imgGlow} />
                <img src="/hero_showcase.png" alt="Corporate Board Governance" className={styles.imgCover} />
              </div>
            </div>
          )}

          {activeTab === 'ethics' && (
            <div className={styles.tabContent}>
              <div className={`${styles.tabText} revealLeft`}>
                <h3>{t('Ethics Programme')}</h3>
                <p>
                  {t('Ratel Plus adheres to strict ethical codes wherever we operate. In 2015, we formally joined the Convention on Business Integrity (CBi) and the Society for Corporate Governance Nigeria to affirm our dedication.')}
                </p>
                <ul className={styles.tabFeaturesList}>
                  <li className={styles.tabFeaturesItem}>
                    <i className="bi bi-journal-check"></i>
                    <span><strong>{t('Risk Assessment:')}</strong> {t('Periodic audits and formulation of robust compliance mitigation plans.')}</span>
                  </li>
                  <li className={styles.tabFeaturesItem}>
                    <i className="bi bi-gift-fill"></i>
                    <span><strong>{t('Registry Policy:')}</strong> {t('Strictly enforced records for gifts, entertainment, and declarations of conflict interests.')}</span>
                  </li>
                </ul>
              </div>
              <div className={`${styles.imgCard} revealRight`}>
                <div className={styles.imgTag}>{t('Convention on Business Integrity')}</div>
                <div className={styles.imgGlow} />
                <img src="/datacenter_fiber.png" alt="Ethics Audit Programme" className={styles.imgCover} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. Services Section */}
      <section id="services" className={`${styles.sectionPadding} reveal`}>
        <div className="container">
          <div className={`${styles.sectionHeader} reveal`}>
            <span className={styles.sectionSubtitle}>{t('What We Offer')}</span>
            <h2 className={styles.sectionTitle}>{t('State-of-the-Art Telecom Services')}</h2>
            <p>{t('Delivering converged telephony, Surviellance, fast transit, and high-speed data transmission over a reliable fiber-grade backbone.')}</p>
          </div>

          <div className={`${styles.servicesGrid} revealScale`}>
            {/* Voice Services */}
            <div className={`glass-panel ${styles.serviceCard}`}>
              <div className={styles.serviceIcon}>
                <i className="bi bi-telephone-outbound-fill"></i>
              </div>
              <h4>{t('Voice Services')}</h4>
              <p>{t('Converged Voice telephony using SIP softphones and custom VoIP routing to offer cheap call rates and advanced cloud PBX configurations.')}</p>
              <Link href="/services/voice" className={styles.serviceLink}>
                {t('Learn More')} <i className="bi bi-arrow-right"></i>
              </Link>
            </div>

            {/* Metro Connectivity */}
            <div className={`glass-panel ${styles.serviceCard}`}>
              <div className={styles.serviceIcon}>
                <i className="bi bi-hdd-network-fill"></i>
              </div>
              <h4>{t('Metro Connectivity')}</h4>
              <p>{t('Point-to-point and multipoint fiber layout solutions (FTTH) designed to fit your preferred network transit and distribution architectures.')}</p>
              <Link href="/aboutus" className={styles.serviceLink}>
                {t('Learn More')} <i className="bi bi-arrow-right"></i>
              </Link>
            </div>

            {/* IP Wholesale */}
            <div className={`glass-panel ${styles.serviceCard}`}>
              <div className={styles.serviceIcon}>
                <i className="bi bi-globe2"></i>
              </div>
              <h4>{t('IP Wholesale')}</h4>
              <p>{t('IP Wholesale Desc')}</p>
              <Link href="/services/ip-wholesale" className={styles.serviceLink}>
                {t('Learn More')} <i className="bi bi-arrow-right"></i>
              </Link>
            </div>

            {/* Backhaul Services */}
            <div className={`glass-panel ${styles.serviceCard}`}>
              <div className={styles.serviceIcon}>
                <i className="bi bi-router"></i>
              </div>
              <h4>{t('Backhaul Services')}</h4>
              <p>{t('Backhaul Services Desc')}</p>
              <Link href="/services/backhaul" className={styles.serviceLink}>
                {t('Learn More')} <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Interactive Network Planner (Bandwidth & Speed Estimator) */}
      <section id="unique_service" className={`${styles.sectionPadding} ${styles.plannerSection} reveal`}>
        <div className={styles.aurora3} />
        <div className="container">
          <div className={`${styles.sectionHeader} reveal`}>
            <span className={styles.sectionSubtitle}>{t('Plan Your Requirements')}</span>
            <h2 className={styles.sectionTitle}>{t('Interactive Bandwidth Planner')}</h2>
            <p>{t('Select your operational profile and drag the device slider to calculate recommended speeds and hardware setups dynamically.')}</p>
          </div>

          <div className={styles.plannerGrid}>
            {/* Left Side: Interactive Controls */}
            <div className={`glass-panel ${styles.plannerControls} revealLeft`}>
              <div className={styles.plannerTabs}>
                <button
                  className={`${styles.plannerTabBtn} ${calcProfile === 'home' ? styles.plannerTabBtnActive : ''}`}
                  onClick={() => setCalcProfile('home')}
                >
                  <i className="bi bi-house-door-fill"></i> {t('Home / SOHO')}
                </button>
                <button
                  className={`${styles.plannerTabBtn} ${calcProfile === 'office' ? styles.plannerTabBtnActive : ''}`}
                  onClick={() => setCalcProfile('office')}
                >
                  <i className="bi bi-building-fill"></i> {t('Office / Corporate')}
                </button>
                <button
                  className={`${styles.plannerTabBtn} ${calcProfile === 'enterprise' ? styles.plannerTabBtnActive : ''}`}
                  onClick={() => setCalcProfile('enterprise')}
                >
                  <i className="bi bi-clouds-fill"></i> {t('Carrier / Wholesale')}
                </button>
              </div>

              <div className={styles.sliderGroupPlanner}>
                <div className={styles.sliderHeaderPlanner}>
                  <span>{t('Estimated Concurrent Users/Devices:')}</span>
                  <strong className={styles.sliderValuePlanner}>{calcDevices}</strong>
                </div>
                <input
                  type="range"
                  min={calcProfile === 'home' ? '1' : calcProfile === 'office' ? '5' : '20'}
                  max={calcProfile === 'home' ? '25' : calcProfile === 'office' ? '100' : '500'}
                  step={calcProfile === 'home' ? '1' : calcProfile === 'office' ? '5' : '10'}
                  value={calcDevices}
                  onChange={(e) => setCalcDevices(Number(e.target.value))}
                  className={styles.widgetSlider}
                />
                <div className={styles.sliderStepsPlanner}>
                  <span>{calcProfile === 'home' ? t('1 Device') : calcProfile === 'office' ? t('5 Users') : t('20 Nodes')}</span>
                  <span>{calcProfile === 'home' ? t('25 Devices') : calcProfile === 'office' ? t('100 Users') : t('500 Nodes')}</span>
                </div>
              </div>

              <div className={styles.plannerQuickFeatures}>
                <div className={styles.plannerFeatureItem}>
                  <i className="bi bi-shield-fill-check"></i>
                  <span><strong>{t('NLOS Setup:')}</strong> {t('High-gain receivers support seamless operations without high mast antennas.')}</span>
                </div>
                <div className={styles.plannerFeatureItem}>
                  <i className="bi bi-lightning-charge-fill"></i>
                  <span><strong>{t('99.9% Uptime:')}</strong> {t('Managed channels are protected under custom SLAs.')}</span>
                </div>
              </div>
            </div>

            {/* Right Side: Calculation Output Mockup */}
            <div className={`glass-panel ${styles.plannerOutputCard} revealRight`}>
              <div className={styles.scannerLine} />
              <div className={styles.plannerOutputHeader}>
                <span className={styles.liveBadge}>{t('LIVE CALCULATION')}</span>
                <h3>{t('Recommended Configuration')}</h3>
              </div>

              <div className={styles.plannerSpeedDisplay}>
                <span className={styles.plannerSpeedLabel}>{t('SUGGESTED BANDWIDTH')}</span>
                <h2 className={styles.plannerSpeedValue}>
                  {bandwidthSpecs.speed} <span className={styles.plannerSpeedUnit}>Mbps</span>
                </h2>
              </div>

              <div className={styles.plannerOutputDetails}>
                <p>{bandwidthSpecs.description}</p>

                <div className={styles.recommendedEquipmentCard}>
                  <div className={styles.recommendedEquipmentIcon}>
                    <img src={bandwidthSpecs.image} alt={bandwidthSpecs.recommendation} className={styles.equipmentImg} />
                  </div>
                  <div>
                    <h5>{t('Ideal Delivery Setup')}</h5>
                    <p className={styles.recommendedEquipmentText}>{bandwidthSpecs.recommendation}</p>
                  </div>
                </div>
              </div>

              <div className={styles.plannerActions}>
                {bandwidthSpecs.link.startsWith('http') ? (
                  <a href={bandwidthSpecs.link} target="_blank" rel="noopener noreferrer" className={styles.plannerPrimaryBtn}>
                    {t('Get Started')} <i className="bi bi-arrow-right-short"></i>
                  </a>
                ) : (
                  <Link href={bandwidthSpecs.link} className={styles.plannerPrimaryBtn}>
                    {t('Inquire for Plan')} <i className="bi bi-arrow-right-short"></i>
                  </Link>
                )}
                <Link href="/reg-options" className={styles.plannerSecondaryBtn}>
                  {t('View All Rates')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Devices Filtering Gallery */}
      <section id="devices" className={`${styles.sectionPadding} reveal`}>
        <div className="container">
          <div className={`${styles.sectionHeader} reveal`}>
            <span className={styles.sectionSubtitle}>{t('Product Showcase')}</span>
            <h2 className={styles.sectionTitle}>{t('Explore Our Smart Devices')}</h2>
            <p>{t('Download our softphone apps, set up enterprise fixed desk terminals, or configure high-performance broadband hubs.')}</p>
          </div>

          {/* Filter Controls */}
          <div className={`${styles.filterList} revealScale`}>
            <button
              className={`${styles.filterBtn} ${activeFilter === '*' ? styles.filterBtnActive : ''}`}
              onClick={() => setActiveFilter('*')}
            >
              {t('All Products')}
            </button>
            <button
              className={`${styles.filterBtn} ${activeFilter === 'app' ? styles.filterBtnActive : ''}`}
              onClick={() => setActiveFilter('app')}
            >
              {t('Mobile Apps')}
            </button>
            <button
              className={`${styles.filterBtn} ${activeFilter === 'broadband' ? styles.filterBtnActive : ''}`}
              onClick={() => setActiveFilter('broadband')}
            >
              {t('Broadband Hubs')}
            </button>
            <button
              className={`${styles.filterBtn} ${activeFilter === 'smart-phones' ? styles.filterBtnActive : ''}`}
              onClick={() => setActiveFilter('smart-phones')}
            >
              {t('Smart Phones')}
            </button>
            <button
              className={`${styles.filterBtn} ${activeFilter === 'smart-homes' ? styles.filterBtnActive : ''}`}
              onClick={() => setActiveFilter('smart-homes')}
            >
              {t('Smart Homes')}
            </button>
          </div>

          {/* Device Showcase Grid */}
          <div className={`${styles.deviceGrid} revealScale`}>
            {filteredDevices.map(device => (
              <div key={device.id} className={`glass-panel ${styles.deviceCard}`}>
                <div className={styles.deviceImgWrapper}>
                  {device.img ? (
                    <img src={device.img} alt={device.title} className={styles.deviceImage} />
                  ) : (
                    <i className={`bi ${device.icon}`}></i>
                  )}
                </div>
                <div className={styles.deviceInfo}>
                  <span className={styles.deviceBadge}>{device.badge}</span>
                  <h4>{device.title}</h4>
                  <p>{device.desc}</p>
                  <div className={styles.deviceAction}>
                    {device.link.startsWith('http') ? (
                      <a href={device.link} target="_blank" rel="noopener noreferrer" className={styles.deviceActionLink}>
                        {t('Visit Store')} <i className="bi bi-box-arrow-up-right"></i>
                      </a>
                    ) : (
                      <Link href={device.link} className={styles.deviceActionLink}>
                        {t('Inquire Details')} <i className="bi bi-chevron-right"></i>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Partners Infinite Scroll (simulated) */}
      <section id="client" className={`${styles.sectionPadding} ${styles.partnersSection} reveal`}>
        <div className="container">
          <div className={`${styles.sectionHeader} reveal`}>
            <span className={styles.sectionSubtitle}>{t('Clients & Partners')}</span>
            <h2 className={styles.sectionTitle}>{t('Trusted by Mobile Operators & Governments')}</h2>
          </div>

          <div style={{ position: 'relative', overflow: 'hidden', padding: '10px 0' }}>
            <div className={styles.partnersTrack}>
              <div className={styles.partnerLogo} title="MTN">
                <img src="/testimonials/MTN-logo.jpg" alt="MTN Logo" />
              </div>
              <div className={styles.partnerLogo} title="Airtel">
                <img src="/testimonials/New-Airtel-Logo.png" alt="Airtel Logo" />
              </div>
              <div className={styles.partnerLogo} title="9Mobile">
                <img src="/testimonials/nine.jpg" alt="9Mobile Logo" />
              </div>
              <div className={styles.partnerLogo} title="NITDA">
                <img src="/testimonials/nitda.jpg" alt="NITDA Logo" />
              </div>
              <div className={styles.partnerLogo} title="FCDA">
                <img src="/testimonials/fcta.jpg" alt="FCDA Logo" />
              </div>
              <div className={styles.partnerLogo} title="NJI">
                <img src="/testimonials/nji.jpg" alt="NJI Logo" />
              </div>
              <div className={styles.partnerLogo} title="Gombe Govt">
                <img src="/testimonials/govt_gombe.jpg" alt="Gombe Govt Logo" />
              </div>
              <div className={styles.partnerLogo} title="Bauchi Govt">
                <img src="/testimonials/bauchi.jpg" alt="Bauchi Govt Logo" />
              </div>
              {/* Duplicate for infinite scroll simulation */}
              <div className={styles.partnerLogo} title="MTN">
                <img src="/testimonials/MTN-logo.jpg" alt="MTN Logo" />
              </div>
              <div className={styles.partnerLogo} title="Airtel">
                <img src="/testimonials/New-Airtel-Logo.png" alt="Airtel Logo" />
              </div>
              <div className={styles.partnerLogo} title="9Mobile">
                <img src="/testimonials/nine.jpg" alt="9Mobile Logo" />
              </div>
              <div className={styles.partnerLogo} title="NITDA">
                <img src="/testimonials/nitda.jpg" alt="NITDA Logo" />
              </div>
              <div className={styles.partnerLogo} title="FCDA">
                <img src="/testimonials/fcta.jpg" alt="FCDA Logo" />
              </div>
              <div className={styles.partnerLogo} title="NJI">
                <img src="/testimonials/nji.jpg" alt="NJI Logo" />
              </div>
              <div className={styles.partnerLogo} title="Gombe Govt">
                <img src="/testimonials/govt_gombe.jpg" alt="Gombe Govt Logo" />
              </div>
              <div className={styles.partnerLogo} title="Bauchi Govt">
                <img src="/testimonials/bauchi.jpg" alt="Bauchi Govt Logo" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Management Team */}
      <section id="team" className={`${styles.sectionPadding} reveal`}>
        <div className="container">
          <div className={`${styles.sectionHeader} reveal`}>
            <span className={styles.sectionSubtitle}>{t('Who We Are')}</span>
            <h2 className={styles.sectionTitle}>{t('Management Team')}</h2>
            <p>{t('Our experienced executives lead our operations to ensure compliance and technical excellence.')}</p>
          </div>

          <div className={`${styles.teamGrid} revealScale`}>
            <div className={`glass-panel ${styles.memberCard}`}>
              <div className={styles.memberImgArea}>
                <div className={styles.memberGlow} />
                <img src="/team/ABDULLAHI-.jpg" alt="Dr. Aminu Lawan Abdullahi" className={styles.memberImage} />
                <div className={styles.memberOverlay}>
                  <div className={styles.memberSocials}>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}><i className="bi bi-linkedin"></i></a>
                    <a href="mailto:customercare@ratelplus.net.ng" className={styles.socialIcon}><i className="bi bi-envelope-fill"></i></a>
                  </div>
                </div>
              </div>
              <div className={styles.memberInfo}>
                <h4>Dr. Aminu Lawan Abdullahi</h4>
                <span>{t('CEO / Managing Director')}</span>
              </div>
            </div>

            <div className={`glass-panel ${styles.memberCard}`}>
              <div className={styles.memberImgArea}>
                <div className={styles.memberGlow} />
                <img src="/team/auta.jpeg" alt="Shehu Hauwa Ahmed" className={styles.memberImage} />
                <div className={styles.memberOverlay}>
                  <div className={styles.memberSocials}>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}><i className="bi bi-linkedin"></i></a>
                    <a href="mailto:customercare@ratelplus.net.ng" className={styles.socialIcon}><i className="bi bi-envelope-fill"></i></a>
                  </div>
                </div>
              </div>
              <div className={styles.memberInfo}>
                <h4>Shehu Hauwa Ahmed</h4>
                <span>{t('Compliance & Regulatory Officer')}</span>
              </div>
            </div>

            <div className={`glass-panel ${styles.memberCard}`}>
              <div className={styles.memberImgArea}>
                <div className={styles.memberGlow} />
                <img src="/team/blessing.jpeg" alt="John Blessing Odah" className={styles.memberImage} />
                <div className={styles.memberOverlay}>
                  <div className={styles.memberSocials}>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}><i className="bi bi-linkedin"></i></a>
                    <a href="mailto:customercare@ratelplus.net.ng" className={styles.socialIcon}><i className="bi bi-envelope-fill"></i></a>
                  </div>
                </div>
              </div>
              <div className={styles.memberInfo}>
                <h4>John Blessing Odah</h4>
                <span>{t('LTE Marketing Manager')}</span>
              </div>
            </div>

            <div className={`glass-panel ${styles.memberCard}`}>
              <div className={styles.memberImgArea}>
                <div className={styles.memberGlow} />
                <img src="/team/Shamsuddeen-Abba-Labaran.jpeg" alt="Shamsuddeen Abba Labaran" className={styles.memberImage} />
                <div className={styles.memberOverlay}>
                  <div className={styles.memberSocials}>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}><i className="bi bi-linkedin"></i></a>
                    <a href="mailto:customercare@ratelplus.net.ng" className={styles.socialIcon}><i className="bi bi-envelope-fill"></i></a>
                  </div>
                </div>
              </div>
              <div className={styles.memberInfo}>
                <h4>Shamsuddeen Abba Labaran</h4>
                <span>{t('Chief Accountant')}</span>
              </div>
            </div>

            <div className={`glass-panel ${styles.memberCard}`}>
              <div className={styles.memberImgArea}>
                <div className={styles.memberGlow} />
                <img src="/team/Isah-Abdulrazaq.jpg" alt="Isah Abdulrazaq" className={styles.memberImage} />
                <div className={styles.memberOverlay}>
                  <div className={styles.memberSocials}>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}><i className="bi bi-linkedin"></i></a>
                    <a href="mailto:customercare@ratelplus.net.ng" className={styles.socialIcon}><i className="bi bi-envelope-fill"></i></a>
                  </div>
                </div>
              </div>
              <div className={styles.memberInfo}>
                <h4>Isah Abdulrazaq</h4>
                <span>{t('General Manager')}</span>
              </div>
            </div>

            <div className={`glass-panel ${styles.memberCard}`}>
              <div className={styles.memberImgArea}>
                <div className={styles.memberGlow} />
                <img src="/team/auta.jpeg" alt="Ahmad Auta" className={styles.memberImage} />
                <div className={styles.memberOverlay}>
                  <div className={styles.memberSocials}>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}><i className="bi bi-linkedin"></i></a>
                    <a href="mailto:customercare@ratelplus.net.ng" className={styles.socialIcon}><i className="bi bi-envelope-fill"></i></a>
                  </div>
                </div>
              </div>
              <div className={styles.memberInfo}>
                <h4>Ahmad Auta</h4>
                <span>{t('HoD LTE Services')}</span>
              </div>
            </div>

            <div className={`glass-panel ${styles.memberCard}`}>
              <div className={styles.memberImgArea}>
                <div className={styles.memberGlow} />
                <img src="/team/najib.jpeg" alt="Muhammad Najib" className={styles.memberImage} />
                <div className={styles.memberOverlay}>
                  <div className={styles.memberSocials}>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}><i className="bi bi-linkedin"></i></a>
                    <a href="mailto:customercare@ratelplus.net.ng" className={styles.socialIcon}><i className="bi bi-envelope-fill"></i></a>
                  </div>
                </div>
              </div>
              <div className={styles.memberInfo}>
                <h4>Muhammad Najib</h4>
                <span>{t('HoD VoIP Services')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQs Accordion */}
      <section className={`${styles.sectionPadding} ${styles.faqSection} reveal`}>
        <div className="container">
          <div className={`${styles.sectionHeader} reveal`}>
            <span className={styles.sectionSubtitle}>{t('Got Questions?')}</span>
            <h2 className={styles.sectionTitle}>{t('Frequently Asked Questions')}</h2>
          </div>

          <div className={`${styles.faqContainer} revealScale`}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`${styles.faqItem} ${activeFaq === idx ? styles.faqItemActive : ''}`}
              >
                <div className={styles.faqHeader} onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}>
                  <h3>{faq.q}</h3>
                  <i className="bi bi-chevron-right"></i>
                </div>
                {activeFaq === idx && (
                  <div className={styles.faqBody}>
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Contact Info & Form */}
      <section id="contact" className={`${styles.contactSectionPadding} reveal`}>
        <div className={styles.aurora4} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className={`${styles.sectionHeader} reveal`}>
            <span className={styles.sectionSubtitle}>{t('Get In Touch')}</span>
            <h2 className={styles.sectionTitle}>{t('Contact Information')}</h2>
            <p>{t('Leave a message and we will respond within 24 hours. For instant support, connect via WhatsApp or Telephone.')}</p>
          </div>

          <div className={styles.contactGrid}>
            {/* Column 1: Headquarters Address with Mini-Map Preview (Exactly as requested) */}
            <div className={`glass-panel ${styles.contactCard} revealLeft`}>
              <div className={styles.contactCardHeader}>
                <div className={styles.contactCardIcon}>
                  <i className="bi bi-geo-alt-fill"></i>
                </div>
                <div style={{ textAlign: 'left' }}>
                  <h3 style={{ fontSize: '18px', color: 'var(--text-main)' }}>{t('Headquarters Address')}</h3>
                  <span className={styles.contactCardBadge}>{t('Kano Head Office')}</span>
                </div>
              </div>
              <p className={styles.contactCardText}>
                {t('Plots 375 & 373, 8th Avenue by 7th Avenue, Zawachiki Layout, Kano, Nigeria.')}
              </p>

              {/* Simulated CSS Mini-Map Preview */}
              <div className={styles.miniMapCard}>
                <div className={styles.mapGridLines} />
                <div className={styles.mapLocatorPin}>
                  <div className={styles.mapSonarPulse} />
                  <i className="bi bi-geo-alt-fill"></i>
                </div>
                <div className={styles.mapOverlayLabel}>
                  <strong>{t('RATEL NIGERIA HQ')}</strong>
                  <span>{t('Zawachiki Layout, Kano')}</span>
                </div>
              </div>

              <button
                onClick={handleCopyAddress}
                className={styles.copyAddressBtn}
                aria-label="Copy Corporate Address"
              >
                <i className={`bi ${copiedAddress ? 'bi-clipboard-check-fill' : 'bi-clipboard-fill'}`}></i>
                <span>{copiedAddress ? t('Corporate Address Copied!') : t('Copy Corporate Address')}</span>
              </button>
            </div>

            {/* Column 2: Telephone Support with live status & WhatsApp */}
            <div className={`glass-panel ${styles.contactCard} reveal`}>
              <div className={styles.contactCardHeader}>
                <div className={styles.contactCardIcon}>
                  <i className="bi bi-telephone-fill"></i>
                </div>
                <div style={{ textAlign: 'left' }}>
                  <h3 style={{ fontSize: '18px', color: 'var(--text-main)' }}>{t('Telephone Support')}</h3>
                  <span className={styles.liveOperatorBadge}>
                    <span className={styles.liveIndicatorDot}></span> {t('Live Agents Online')}
                  </span>
                </div>
              </div>
              <p className={styles.contactCardText} style={{ marginBottom: '12px' }}>
                {t('Select a number to place a call directly or chat on WhatsApp:')}
              </p>
              <div className={styles.phoneListGrid}>
                <a href="tel:02064700000" className={styles.phoneActionLink}>
                  <i className="bi bi-telephone"></i> 02064700000
                </a>
                <a href="tel:02064700001" className={styles.phoneActionLink}>
                  <i className="bi bi-telephone"></i> 02064700001
                </a>
                <a href="tel:02097030000" className={styles.phoneActionLink}>
                  <i className="bi bi-telephone"></i> 02097030000
                </a>
                <a href="tel:02097030001" className={styles.phoneActionLink}>
                  <i className="bi bi-telephone"></i> 02097030001
                </a>
              </div>

              <div 
                className={styles.whatsAppRowBtn}
                onClick={() => window.open('https://wa.me/2347010553861', '_blank')}
                title="Open WhatsApp Chat"
              >
                <div className={styles.contactCardIconGreen}>
                  <i className="bi bi-whatsapp"></i>
                </div>
                <div style={{ textAlign: 'left' }}>
                  <h4 style={{ fontSize: '13px', color: 'var(--text-main)', margin: 0, fontWeight: '700' }}>{t('WhatsApp Hotline')}</h4>
                  <span className={styles.quickContactLink}>+234 701 055 3861</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '4px' }}>
                <i className="bi bi-clock-fill" style={{ color: 'var(--primary)', fontSize: '13px' }} />
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500' }}>{t('24/7/365 Operations Support')}</span>
              </div>
            </div>

            {/* Column 3: Direct message Form */}
            <div className={`glass-panel ${styles.contactFormContainer} revealRight`}>
              <form onSubmit={handleFormSubmit} className={styles.contactForm}>
                <h3 style={{ fontSize: '20px', color: 'var(--text-main)', marginBottom: '8px' }}>{t('Send Direct Message')}</h3>
                <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '20px' }}>
                  {t('Leave a message and we will respond within 24 hours.')}
                </p>

                {formStatus.message && (
                  <div className={`${styles.formStatus} ${formStatus.success ? styles.statusSuccess : styles.statusError}`}>
                    {formStatus.message}
                  </div>
                )}

                <div className={styles.formRow}>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder={t('Your Name *')}
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder={t('Your Email *')}
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>

                <textarea
                  id="message"
                  name="message"
                  rows="3"
                  placeholder={t('Message Body *')}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="form-input"
                  style={{ resize: 'vertical' }}
                  required
                />

                <button type="submit" className="btn-primary" disabled={submitting} style={{ marginTop: '4px', padding: '12px 24px', width: '100%' }}>
                  {submitting ? (
                    <>
                      <span className="bi bi-hourglass-split"></span> {t('Sending Message...')}
                    </>
                  ) : (
                    <>
                      <span className="bi bi-send-fill"></span> {t('Send Message')}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Live Support Widget */}
      <a
        href="https://wa.me/2347010553861"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.floatingSupport}
        aria-label="Chat with Live Agent on WhatsApp"
        title="Live Chat Support"
      >
        <span className={styles.floatingPulse}></span>
        <i className="bi bi-whatsapp"></i>
        <span className={styles.floatingText}>{t('Live Support')}</span>
      </a>
    </div>
  );
}
