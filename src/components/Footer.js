import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footerWrapper}>
      <div className="container">
        <div className={styles.footerGrid}>
          
          {/* Column 1: About & Info */}
          <div className={`${styles.footerCol} ${styles.aboutCol}`}>
            <div className={styles.footerLogo}>
              <img src="/logo.png" alt="Ratel Plus Logo" className={styles.logoImage} />
            </div>
            <p className={styles.addressInfo}>
              Plots 375 and 373, 8th Avenue by 7th Avenue, Zawachiki Layout, 
              Behind 1000 Housing Estate, adjacent to Dala Inland Container Terminal.
              P. O. Box 4466 Kano, Nigeria.
            </p>
            <div className={styles.contactInfoItem} style={{ marginTop: '10px' }}>
              <i className="bi bi-telephone-fill"></i>
              <span>02064700000 / 02097030000</span>
            </div>
            <div className={styles.contactInfoItem}>
              <i className="bi bi-envelope-fill"></i>
              <span>customercare@ratelplus.net.ng</span>
            </div>
          </div>

          {/* Column 2: Useful Links */}
          <div className={styles.footerCol}>
            <h4>Useful Links</h4>
            <ul className={styles.linkList}>
              <li className={styles.linkItem}><Link href="/">Home</Link></li>
              <li className={styles.linkItem}><Link href="/#devices">Devices</Link></li>
              <li className={styles.linkItem}><Link href="/#team">Management Team</Link></li>
              <li className={styles.linkItem}><Link href="/about/ceo">Message from CEO</Link></li>
              <li className={styles.linkItem}><Link href="/about/board">Board Structure</Link></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className={styles.footerCol}>
            <h4>Our Services</h4>
            <ul className={styles.linkList}>
              <li className={styles.linkItem}><Link href="/services/voice">Voice Services</Link></li>
              <li className={styles.linkItem}><Link href="/services/ip-wholesale">IP Wholesale</Link></li>
              <li className={styles.linkItem}><Link href="/services/backhaul">Backhaul Services</Link></li>
              <li className={styles.linkItem}><Link href="/services/training">Training Portfolio</Link></li>
              <li className={styles.linkItem}><Link href="/#unique_service">Unique Value Prop</Link></li>
            </ul>
          </div>

          {/* Column 4: Shortcuts */}
          <div className={styles.footerCol}>
            <h4>Registration</h4>
            <ul className={styles.linkList}>
              <li className={styles.linkItem}><Link href="/reg-options">Register Subscriptions</Link></li>
              <li className={styles.linkItem}><Link href="/airtime">Buy Airtime Portal</Link></li>
              <li className={styles.linkItem}><Link href="/#devices">Download Softphone</Link></li>
              <li className={styles.linkItem}><Link href="/#contact">Contact Support</Link></li>
              <li className={styles.linkItem}><Link href="/#client">Our Clients</Link></li>
            </ul>
          </div>

          {/* Column 5: Summary */}
          <div className={styles.footerCol}>
            <h4>Ratel Plus</h4>
            <p style={{ fontSize: '14px', marginBottom: '16px' }}>
              Ratel Plus Nigeria is a facilities-based telecommunications service provider committed to high standards of business integrity, ethics, and professionalism.
            </p>
            <ul className={styles.linkList}>
              <li className={styles.linkItem}><Link href="/privacy-policy">Privacy Policy</Link></li>
              <li className={styles.linkItem}><Link href="/aboutus" style={{ fontWeight: '600', color: 'var(--primary)' }}>Read Corporate Profile</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright and socials */}
        <div className={styles.bottomBar}>
          <div className={styles.copyright}>
            <div>
              &copy; {currentYear} <strong>Ratel Plus</strong>. All Rights Reserved.
            </div>
            <div className={styles.credits}>
              Redesigned for modern standards.
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

      </div>
    </footer>
  );
}
