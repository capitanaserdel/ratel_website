'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Footer.module.css';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footerWrapper}>
      <div className="container">
        
        {/* Top CTA Banner */}
        <div className={styles.topBanner}>
          <div className={styles.bannerGlow} />
          <div className={styles.bannerContent}>
            <div className={styles.bannerText}>
              <h3>{t('Ready to Experience Premium Connectivity?')}</h3>
              <p>{t('Link your NIN, explore superfast fiber broadband plans, or recharge your airtime credit instantly.')}</p>
            </div>
            <div className={styles.bannerBtns}>
              <Link href="/reg-options" className={styles.bannerBtnPrimary}>
                {t('Register Now')} <i className="bi bi-arrow-right-short" />
              </Link>
              <Link href="/airtime" className={styles.bannerBtnSecondary}>
                {t('Buy Airtime')}
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.footerGrid}>
          
          {/* Column 1: Brand Info */}
          <div className={`${styles.footerCol} ${styles.aboutCol}`}>
            <div className={styles.footerLogo}>
              <img src="/logo.png" alt="Ratel Plus Logo" className={styles.logoImage} />
            </div>
            <p className={styles.addressInfo}>
              {t('Plots 375 and 373, 8th Avenue by 7th Avenue, Zawachiki Layout, Behind 1000 Housing Estate, adjacent to Dala Inland Container Terminal. P. O. Box 4466 Kano, Nigeria.')}
            </p>
            <div className={styles.contactDetails}>
              <div className={styles.contactInfoItem}>
                <i className="bi bi-telephone-fill"></i>
                <span>02064700000 / 02097030000</span>
              </div>
              <div className={styles.contactInfoItem}>
                <i className="bi bi-envelope-fill"></i>
                <span>customercare@ratelplus.net.ng</span>
              </div>
            </div>
            <div className={styles.socialLinks}>
              <a href="https://x.com/ratelplus" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="X (Twitter)">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="https://www.facebook.com/profile.php?id=100063811702256" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://www.instagram.com/ratel_telecommunications/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Instagram">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://www.linkedin.com/company/ratel-plus-nigeria/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="LinkedIn">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>

          {/* Column 2: Useful Links */}
          <div className={styles.footerCol}>
            <h4>{t('Useful Links')}</h4>
            <ul className={styles.linkList}>
              <li className={styles.linkItem}><Link href="/">{t('Home')}</Link></li>
              <li className={styles.linkItem}><Link href="/#team">{t('Management Team')}</Link></li>
              <li className={styles.linkItem}><Link href="/about/ceo">{t('Message from CEO')}</Link></li>
              <li className={styles.linkItem}><Link href="/about/board">{t('Board Structure')}</Link></li>
              <li className={styles.linkItem}><Link href="/aboutus" className={styles.profileLink}>{t('Read Corporate Profile')}</Link></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className={styles.footerCol}>
            <h4>{t('Our Services')}</h4>
            <ul className={styles.linkList}>
              <li className={styles.linkItem}><Link href="/services/voice">{t('Voice Services')}</Link></li>
              <li className={styles.linkItem}><Link href="/aboutus">{t('Fibre to the Home (FTTH)')}</Link></li>
              <li className={styles.linkItem}><Link href="/reg-options">{t('LTE Services')}</Link></li>
              <li className={styles.linkItem}><Link href="/privacy-policy">{t('Privacy Policy')}</Link></li>
            </ul>
          </div>

          {/* Column 4: NCC Shield & Certifications */}
          <div className={styles.footerCol}>
            <h4>{t('NCC Compliance')}</h4>
            <div className={styles.complianceCard}>
              <div className={styles.shieldIcon}>
                <i className="bi bi-shield-check" />
              </div>
              <p style={{ fontSize: '13px', lineHeight: '1.7', color: 'var(--text-muted)', margin: '0 0 12px' }}>
                {t('Ratel Plus Nigeria is a facilities-based telecommunications service provider committed to high standards of business integrity, ethics, and regulatory compliance.')}
              </p>
              <span className={styles.licenceLabel}>
                <i className="bi bi-award-fill" style={{ marginRight: '4px', color: 'var(--accent-green)' }} />
                {t('Licensed by the NCC')}
              </span>
            </div>
          </div>

        </div>

        {/* Bottom copyright and status */}
        <div className={styles.bottomBar}>
          <div className={styles.copyright}>
            &copy; {currentYear} <strong>Ratel Plus</strong>. {t('All Rights Reserved.')}
          </div>
          <div className={styles.statusInfo}>
            <span className={styles.statusDot}></span>
            <span>{t('All Core Transit Circuits Active')}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
