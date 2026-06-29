'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { language, toggleLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const pathname = usePathname();
  const [theme, setTheme] = useState('light');
  const [scrolled, setScrolled] = useState(false);

  // Close drawer on path change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Read theme on mount
  useEffect(() => {
    const activeTheme = document.documentElement.getAttribute('data-theme') || 'light';
    setTheme(activeTheme);
  }, []);

  // Listen to scroll to toggle class
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <>
      <header className={`${styles.navbarWrapper} ${scrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.navbarContainer}`}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <Link href="/" className={styles.logo}>
              <img src="/logo.png" alt="Ratel Plus Logo" className={styles.logoImage} />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav>
            <ul className={styles.navMenu}>
              <li>
                <Link href="/" className={`${styles.navLink} ${pathname === '/' ? styles.navItemActive : ''}`}>
                  {t('Home')}
                </Link>
              </li>
              <li className={styles.navItem}>
                <span className={styles.navLink} style={{ cursor: 'pointer' }}>
                  {t('Our Services')} <i className="bi bi-chevron-down"></i>
                </span>
                <div className={styles.dropdownMenu}>
                  <Link href="/#services" className={styles.dropdownItem}>
                    <i className="bi bi-wifi" style={{ marginRight: '8px', color: 'var(--primary)' }}></i>
                    {t('Broadband Internet Services')}
                  </Link>
                  <Link href="/reg-options" className={styles.dropdownItem}>
                    <i className="bi bi-phone-vibrate-fill" style={{ marginRight: '8px', color: 'var(--accent-green)' }}></i>
                    {t('LTE Services')}
                  </Link>
                  <Link href="/services/voice" className={styles.dropdownItem}>
                    <i className="bi bi-telephone-outbound-fill" style={{ marginRight: '8px', color: 'var(--primary)' }}></i>
                    {t('Voice over Internet Protocol (VoIP) Services')}
                  </Link>
                  <Link href="/aboutus" className={styles.dropdownItem}>
                    <i className="bi bi-hdd-network-fill" style={{ marginRight: '8px', color: 'var(--accent-green)' }}></i>
                    {t('Fiber-to-the-Home (FTTH) Solutions')}
                  </Link>
                  <Link href="/#services" className={styles.dropdownItem}>
                    <i className="bi bi-building-fill" style={{ marginRight: '8px', color: 'var(--primary)' }}></i>
                    {t('Enterprise Connectivity Solutions')}
                  </Link>
                  <Link href="/#services" className={styles.dropdownItem}>
                    <i className="bi bi-diagram-3-fill" style={{ marginRight: '8px', color: 'var(--accent-green)' }}></i>
                    {t('Network Infrastructure Deployment')}
                  </Link>
                  <Link href="/#services" className={styles.dropdownItem}>
                    <i className="bi bi-cpu-fill" style={{ marginRight: '8px', color: 'var(--primary)' }}></i>
                    {t('ICT Solutions')}
                  </Link>
                  <Link href="/#services" className={styles.dropdownItem}>
                    <i className="bi bi-gear-wide-connected" style={{ marginRight: '8px', color: 'var(--accent-green)' }}></i>
                    {t('Managed Network Services')}
                  </Link>
                </div>
              </li>

              <li className={styles.navItem}>
                <span className={styles.navLink} style={{ cursor: 'pointer' }}>
                  {t('About')} <i className="bi bi-chevron-down"></i>
                </span>
                <div className={styles.dropdownMenu}>
                  <Link href="/aboutus" className={styles.dropdownItem}>
                    <i className="bi bi-info-circle-fill" style={{ marginRight: '8px', color: 'var(--primary)' }}></i>
                    {t('About us')}
                  </Link>
                  <Link href="/about/ceo" className={styles.dropdownItem}>
                    <i className="bi bi-chat-quote-fill" style={{ marginRight: '8px', color: 'var(--accent-green)' }}></i>
                    {t('Message from CEO')}
                  </Link>
                  <Link href="/about/board" className={styles.dropdownItem}>
                    <i className="bi bi-people-fill" style={{ marginRight: '8px', color: 'var(--primary)' }}></i>
                    {t('Board Structure')}
                  </Link>
                  <Link href="/#team" className={styles.dropdownItem}>
                    <i className="bi bi-person-workspace" style={{ marginRight: '8px', color: 'var(--accent-green)' }}></i>
                    {t('Management Team')}
                  </Link>
                </div>
              </li>
              <li>
                <Link href="/#contact" className={styles.navLink}>
                  {t('Contact')}
                </Link>
              </li>
            </ul>
          </nav>
 
          <div className={styles.ctas}>
            <button 
              onClick={toggleLanguage} 
              className={styles.themeToggle}
              aria-label="Toggle Language" 
              title="Toggle English / Hausa"
              style={{ marginRight: '4px', gap: '4px', display: 'inline-flex', alignItems: 'center', fontSize: '12px', fontWeight: '700', borderRadius: '20px', width: 'auto', padding: '0 12px' }}
            >
              <i className="bi bi-globe" style={{ fontSize: '14px' }}></i>
              <span>{language === 'en' ? 'EN' : 'HA'}</span>
            </button>
            <button className={styles.themeToggle} onClick={toggleTheme} aria-label="Toggle Theme" title="Toggle Light/Dark Theme">
              <i className={`bi ${theme === 'light' ? 'bi-moon-stars-fill' : 'bi-sun-fill'}`} style={{ transition: 'transform 0.5s ease' }}></i>
            </button>
            <Link href="/airtime" className={styles.btnAirtime}>
              {t('Buy Airtime')}
            </Link>
            <Link href="/reg-options" className={styles.btnRegister}>
              {t('Register Now')}
            </Link>
          </div>

          {/* Right Header actions for Mobile */}
          <div className={styles.mobileHeaderActions}>
            <button 
              onClick={toggleLanguage} 
              className={styles.themeToggleMobile}
              aria-label="Toggle Language" 
              title="Toggle English / Hausa"
              style={{ marginRight: '4px', gap: '4px', display: 'inline-flex', alignItems: 'center', fontSize: '11px', fontWeight: '700', borderRadius: '20px', width: 'auto', padding: '0 10px' }}
            >
              <i className="bi bi-globe" style={{ fontSize: '13px' }}></i>
              <span>{language === 'en' ? 'EN' : 'HA'}</span>
            </button>
            <button className={styles.themeToggleMobile} onClick={toggleTheme} aria-label="Toggle Theme">
              <i className={`bi ${theme === 'light' ? 'bi-moon-stars-fill' : 'bi-sun-fill'}`}></i>
            </button>
            {/* Mobile Menu Toggle Button */}
            <button className={styles.mobileToggle} onClick={toggleDrawer} aria-label="Toggle Navigation Menu">
              <i className={`bi ${isOpen ? 'bi-x' : 'bi-list'}`}></i>
            </button>
          </div>
        </div>
      </header>

      {/* Drawer Overlay for Mobile */}
      <div 
        className={`${styles.drawerOverlay} ${isOpen ? styles.drawerOverlayActive : ''}`} 
        onClick={toggleDrawer}
      />

      {/* Mobile Drawer */}
      <div className={`${styles.mobileDrawer} ${isOpen ? styles.mobileDrawerOpen : ''}`}>
        <ul className={styles.mobileNavList}>
          <li>
            <Link href="/" className={styles.mobileNavLink}>
              {t('Home')}
            </Link>
          </li>
          <li>
            <div 
              className={styles.mobileNavLink} 
              onClick={() => setServicesOpen(!servicesOpen)}
              style={{ cursor: 'pointer' }}
            >
              <span>{t('Our Services')}</span>
              <i className={`bi ${servicesOpen ? 'bi-chevron-up' : 'bi-chevron-down'}`} style={{ fontSize: '14px' }}></i>
            </div>
            {servicesOpen && (
              <div className={styles.mobileSubmenu}>
                <Link href="/#services" className={styles.mobileSubLink}>{t('Broadband Internet Services')}</Link>
                <Link href="/reg-options" className={styles.mobileSubLink}>{t('LTE Services')}</Link>
                <Link href="/services/voice" className={styles.mobileSubLink}>{t('Voice over Internet Protocol (VoIP) Services')}</Link>
                <Link href="/aboutus" className={styles.mobileSubLink}>{t('Fiber-to-the-Home (FTTH) Solutions')}</Link>
                <Link href="/#services" className={styles.mobileSubLink}>{t('Enterprise Connectivity Solutions')}</Link>
                <Link href="/#services" className={styles.mobileSubLink}>{t('Network Infrastructure Deployment')}</Link>
                <Link href="/#services" className={styles.mobileSubLink}>{t('ICT Solutions')}</Link>
                <Link href="/#services" className={styles.mobileSubLink}>{t('Managed Network Services')}</Link>
              </div>
            )}
          </li>

          <li>
            <div 
              className={styles.mobileNavLink} 
              onClick={() => setAboutOpen(!aboutOpen)}
              style={{ cursor: 'pointer' }}
            >
              <span>{t('About')}</span>
              <i className={`bi ${aboutOpen ? 'bi-chevron-up' : 'bi-chevron-down'}`} style={{ fontSize: '14px' }}></i>
            </div>
            {aboutOpen && (
              <div className={styles.mobileSubmenu}>
                <Link href="/aboutus" className={styles.mobileSubLink}>{t('About us')}</Link>
                <Link href="/about/ceo" className={styles.mobileSubLink}>{t('Message from CEO')}</Link>
                <Link href="/about/board" className={styles.mobileSubLink}>{t('Board Structure')}</Link>
                <Link href="/#team" className={styles.mobileSubLink}>{t('Management Team')}</Link>
              </div>
            )}
          </li>
          <li>
            <Link href="/#contact" className={styles.mobileNavLink}>
              {t('Contact')}
            </Link>
          </li>
        </ul>

        <div className={styles.mobileDrawerCtas}>
          <button className={styles.themeToggleDrawer} onClick={toggleLanguage} aria-label="Toggle Language" style={{ marginBottom: '12px' }}>
            <i className="bi bi-globe"></i>
            <span>{language === 'en' ? 'Hausa (Hausa)' : 'English (Turanci)'}</span>
          </button>
          <button className={styles.themeToggleDrawer} onClick={toggleTheme} aria-label="Toggle Theme">
            <i className={`bi ${theme === 'light' ? 'bi-moon-stars-fill' : 'bi-sun-fill'}`}></i>
            <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
          </button>
          <Link href="/airtime" className={styles.btnAirtime}>
            {t('Buy Airtime')}
          </Link>
          <Link href="/reg-options" className={styles.btnRegister}>
            {t('Register Now')}
          </Link>
        </div>
      </div>
    </>
  );
}
