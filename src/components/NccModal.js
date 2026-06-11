'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './NccModal.module.css';

export default function NccModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check session storage to prevent showing on every single page load in the same session
    const hasSeenModal = sessionStorage.getItem('ratel_ncc_seen');
    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setShow(true);
      }, 1500); // Small delay on load for smooth appearance
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setShow(false);
    sessionStorage.setItem('ratel_ncc_seen', 'true');
  };

  return (
    <div className={`${styles.modalOverlay} ${show ? styles.modalOverlayActive : ''}`}>
      <div className={styles.modalContent}>
        <button className={styles.btnClose} onClick={handleClose} aria-label="Close Modal">
          <i className="bi bi-x-lg"></i>
        </button>

        <div className={styles.icon}>
          <i className="bi bi-exclamation-triangle"></i>
        </div>

        <h3 className={styles.title}>NCC Subscriber Notice</h3>
        
        <p className={styles.desc}>
          According to the Nigerian Communications Commission (NCC), it is mandatory for all GSM and Non-GSM subscribers to link their National Identification Number (NIN) to their telephone lines. Unlinked lines may face restriction.
        </p>

        <div className={styles.btnGroup}>
          <Link href="/reg-options" onClick={handleClose} className={styles.btnReg}>
            Link NIN Now
          </Link>
          <Link href="/airtime" onClick={handleClose} className={styles.btnAirtime}>
            Recharge Line
          </Link>
        </div>

        <span 
          className={styles.learnMore}
          onClick={() => window.open('https://ncc.gov.ng/node/742', '_blank')}
        >
          Read NCC Regulation Details
        </span>
      </div>
    </div>
  );
}
