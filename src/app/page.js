'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import styles from './page.module.css';

const heroSlides = [
  {
    title: "High-Definition VoIP Services",
    subtitle: "Crystal Clear Voice Calls",
    desc: "Experience high-definition voice calling over the internet at the lowest call rates using our SIP softphone app.",
    img: "phone_mockup.png",
    badge: "VoIP Telephony"
  },
  {
    title: "Fibre to the Home (FTTH)",
    subtitle: "Superfast Broadband Connectivity",
    desc: "High-speed and reliable fiber optic connection directly to your home or office for seamless streaming, gaming, and remote work.",
    img: "datacenter_fiber.png",
    badge: "Broadband Fiber"
  },
  {
    title: "High-Speed 4G LTE Services",
    subtitle: "Reliable Mobile Broadband",
    desc: "Stay connected on the go with our licensed, high-speed LTE data services designed for speed and reliability.",
    img: "hero_banner.jpg",
    badge: "4G LTE Network"
  }
];

export default function Home() {
  const { t, language } = useLanguage();

  // 1. Tab State for Features Section
  const [activeTab, setActiveTab] = useState('mission');

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
  }, [activeTab]);

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
      {/* 1. Hero Banner — Redesigned Premium Split Layout */}
      <section className={`${styles.heroSection} ${styles.heroDark}`}>
        {/* Layered background orbs */}
        <div className={styles.heroOrb1} />
        <div className={styles.heroOrb2} />
        <div className={styles.heroOrb3} />

        {/* Subtle background image */}
        {heroSlides[heroSlide] && heroSlides[heroSlide].img && (
          <img
            src={`/${heroSlides[heroSlide].img}`}
            alt=""
            aria-hidden="true"
            className={styles.heroImage}
          />
        )}

        <div className={`container ${styles.heroContainer}`}>
          {/* LEFT COLUMN */}
          <div key={heroSlide} className={`${styles.heroContent} animate-fadeIn`} style={{ animationDelay: '0.1s' }}>


            {/* Headline */}
            <h1 className={styles.heroTitle}>
              {t(heroSlides[heroSlide].title)}
            </h1>

            {/* Description */}
            <p className={styles.heroDesc}>
              {t(heroSlides[heroSlide].desc)}
            </p>

            {/* CTA Buttons */}
            <div className={styles.heroBtns}>
              <Link href="/reg-options" id="hero-register-btn" className={styles.heroRegisterBtn}>
                <i className="bi bi-person-plus-fill"></i>
                {t('Register Now Btn')}
              </Link>
              <Link href="/airtime" id="hero-airtime-btn" className={styles.heroAirtimeBtn}>
                <i className="bi bi-wallet2"></i>
                {t('Buy Airtime Btn')}
              </Link>
            </div>

            {/* Watch video + slide dots row */}
            <div className={styles.heroBottomRow}>
              <button
                className={styles.btnWatch}
                onClick={() => window.open('https://youtu.be/dP2eLpavzKc', '_blank')}
              >
                <i className="bi bi-play-circle-fill"></i>
                <span>{t('Watch Video')}</span>
              </button>
              <div className={styles.slideDotsRow}>
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setHeroSlide(idx)}
                    className={`${styles.slideDot} ${heroSlide === idx ? styles.slideDotActive : ''}`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Inline stat pills */}
            <div className={styles.heroStatPills}>
              <div className={styles.heroStatPill}>
                <span className={styles.heroStatValue}>99.9%</span>
                <span className={styles.heroStatLabel}>{t('Uptime')}</span>
              </div>
              <div className={styles.heroStatPillDivider} />
              <div className={styles.heroStatPill}>
                <span className={styles.heroStatValue}>24/7</span>
                <span className={styles.heroStatLabel}>{t('Support')}</span>
              </div>
              <div className={styles.heroStatPillDivider} />
              <div className={styles.heroStatPill}>
                <span className={styles.heroStatValue}>15ms</span>
                <span className={styles.heroStatLabel}>{t('Avg Latency')}</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Premium Airtime Calculator */}
          <div className={styles.heroGraphic}>
            <div className={styles.calcCardOuter}>
              <div className={styles.calcCardRing} />
              <div className={styles.calcCard}>


                {/* Amount display */}
                <div className={styles.calcAmountDisplay}>
                  <span className={styles.calcCurrency}>&#8358;</span>
                  <span className={styles.calcAmountValue}>
                    {rechargeAmt ? rechargeAmt.toLocaleString() : '0'}
                  </span>
                </div>

                {/* Quick amount chips */}
                <div className={styles.calcAmountChips}>
                  {[500, 1000, 2000, 5000].map(amt => (
                    <button
                      key={amt}
                      className={`${styles.calcChip} ${rechargeAmt === amt ? styles.calcChipActive : ''}`}
                      onClick={() => setRechargeAmt(amt)}
                    >
                      &#8358;{amt.toLocaleString()}
                    </button>
                  ))}
                </div>

                {/* Form fields */}
                <div className={styles.calcForm}>
                  <div className={styles.calcField}>
                    <label className={styles.calcLabel}>{t('Phone Number')}</label>
                    <div className={styles.calcInputWrap}>
                      <i className="bi bi-telephone-fill"></i>
                      <input
                        type="tel"
                        placeholder="e.g. 02064700000"
                        value={rechargePhone}
                        onChange={(e) => setRechargePhone(e.target.value)}
                        className={styles.calcInput}
                      />
                    </div>
                  </div>
                  <div className={styles.calcField}>
                    <label className={styles.calcLabel}>{t('Recharge Amount (&#8358;)')}</label>
                    <div className={styles.calcInputWrap}>
                      <i className="bi bi-wallet2"></i>
                      <input
                        type="number"
                        placeholder="Enter amount (e.g. 2000)"
                        value={rechargeAmt || ''}
                        onChange={(e) => setRechargeAmt(Number(e.target.value))}
                        className={styles.calcInput}
                        min="100"
                        max="100000"
                      />
                    </div>
                  </div>
                </div>



                {/* Recharge Now button */}
                <Link
                  href={`/airtime?phone=${rechargePhone}&amount=${rechargeAmt}&operator=${rechargeOperator}`}
                  className={styles.calcSubmitBtn}
                  id="hero-recharge-btn"
                >
                  <i className="bi bi-cart-check-fill"></i>
                  {t('Recharge Now')}
                </Link>

                <p className={styles.calcFootNote}>
                  <i className="bi bi-shield-fill-check"></i>
                  {t('Secured & encrypted payment')}
                </p>
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
                <img src="/phone_dialer.png" alt="Ratel Phone App Dialer" className={styles.appImgCover} />
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
                <h3>{t('Our Vision')}</h3>
                <p>
                  {t("To become Africa's leading indigenous digital connectivity provider, empowering communities through world-class telecommunications services.")}
                </p>
                <h3>{t('Our Mission')}</h3>
                <p>
                  {t('To provide reliable, affordable, and innovative voice and data communication solutions that connect people, businesses, and communities across Nigeria.')}
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
            <h2 className={styles.sectionTitle}>{t('Our Services')}</h2>
            <p>{t('Reliable, affordable, and innovative voice and data communication solutions connecting people, businesses, and communities across Nigeria.')}</p>
          </div>

          <div className={`${styles.simpleServicesGrid} revealScale`}>
            <div className={`glass-panel ${styles.simpleServiceCard}`}>
              <div className={styles.serviceIcon}>
                <i className="bi bi-wifi"></i>
              </div>
              <h4>{t('Broadband Internet Services')}</h4>
              <p className={styles.serviceDesc}>{t('Provision of high-speed and reliable internet connectivity for residential, commercial, and institutional customers.')}</p>
            </div>

            <div className={`glass-panel ${styles.simpleServiceCard}`}>
              <div className={styles.serviceIcon}>
                <i className="bi bi-phone-vibrate-fill"></i>
              </div>
              <h4>{t('LTE Services')}</h4>
              <p className={styles.serviceDesc}>{t('Delivery of high-speed wireless broadband solutions through advanced LTE technology, providing reliable internet access for homes, businesses, and remote locations.')}</p>
            </div>

            <div className={`glass-panel ${styles.simpleServiceCard}`}>
              <div className={styles.serviceIcon}>
                <i className="bi bi-telephone-outbound-fill"></i>
              </div>
              <h4>{t('Voice over Internet Protocol (VoIP) Services')}</h4>
              <p className={styles.serviceDesc}>{t('Provision of cost-effective and scalable voice communication solutions, enabling high-quality local and international calls over IP networks for businesses and individuals.')}</p>
            </div>

            <div className={`glass-panel ${styles.simpleServiceCard}`}>
              <div className={styles.serviceIcon}>
                <i className="bi bi-hdd-network-fill"></i>
              </div>
              <h4>{t('Fiber-to-the-Home (FTTH) Solutions')}</h4>
              <p className={styles.serviceDesc}>{t('Deployment of fiber optic infrastructure that delivers ultra-fast, secure, and stable internet services directly to homes and businesses.')}</p>
            </div>

            <div className={`glass-panel ${styles.simpleServiceCard}`}>
              <div className={styles.serviceIcon}>
                <i className="bi bi-building-fill"></i>
              </div>
              <h4>{t('Enterprise Connectivity Solutions')}</h4>
              <p className={styles.serviceDesc}>{t('Customized connectivity and communication solutions tailored to meet the networking requirements of corporate organizations, SMEs, and government institutions.')}</p>
            </div>

            <div className={`glass-panel ${styles.simpleServiceCard}`}>
              <div className={styles.serviceIcon}>
                <i className="bi bi-diagram-3-fill"></i>
              </div>
              <h4>{t('Network Infrastructure Deployment')}</h4>
              <p className={styles.serviceDesc}>{t('Design, installation, operation, and maintenance of telecommunications infrastructure, including fiber optic networks and related systems.')}</p>
            </div>

            <div className={`glass-panel ${styles.simpleServiceCard}`}>
              <div className={styles.serviceIcon}>
                <i className="bi bi-cpu-fill"></i>
              </div>
              <h4>{t('ICT Solutions')}</h4>
              <p className={styles.serviceDesc}>{t('Provision of innovative ICT services and digital solutions that enhance communication, productivity, and operational efficiency.')}</p>
            </div>

            <div className={`glass-panel ${styles.simpleServiceCard}`}>
              <div className={styles.serviceIcon}>
                <i className="bi bi-gear-wide-connected"></i>
              </div>
              <h4>{t('Managed Network Services')}</h4>
              <p className={styles.serviceDesc}>{t('Comprehensive network management and support services to ensure optimal performance, security, and reliability.')}</p>
            </div>
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
        </div>

        <div style={{ position: 'relative', overflow: 'hidden', padding: '20px 0', width: '100%' }}>
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
            {/* CEO */}
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

            {/* General Manager */}
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

            {/* Compliance & Regulatory Officer */}
            <div className={`glass-panel ${styles.memberCard}`}>
              <div className={styles.memberImgArea}>
                <div className={styles.memberGlow} />
                <img src="/team/hauwa.jpeg" alt="Shehu Hauwa Ahmed" className={styles.memberImage} />
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

            {/* Chief Accountant */}
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

            {/* LTE Marketing Manager */}
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

            {/* HoD Software Development */}
            <div className={`glass-panel ${styles.memberCard}`}>
              <div className={styles.memberImgArea}>
                <div className={styles.memberGlow} />
                <img src="/team/alameen.jpg" alt="Muhammad Abubakar Al-ameen" className={styles.memberImage} style={{ objectPosition: 'center 20%', transform: 'scale(0.95)' }} />
                <div className={styles.memberOverlay}>
                  <div className={styles.memberSocials}>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}><i className="bi bi-linkedin"></i></a>
                    <a href="mailto:customercare@ratelplus.net.ng" className={styles.socialIcon}><i className="bi bi-envelope-fill"></i></a>
                  </div>
                </div>
              </div>
              <div className={styles.memberInfo}>
                <h4>Muhammad Abubakar Al-ameen</h4>
                <span>{t('HoD Software Development')}</span>
              </div>
            </div>

            {/* HoD VoIP Services */}
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
