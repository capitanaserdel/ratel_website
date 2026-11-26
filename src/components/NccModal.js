'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './NccModal.module.css';

const SEEN_KEY = 'ratel_ncc_seen_at';
const REMIND_AFTER_MS = 7 * 24 * 60 * 60 * 1000;
const ACK_COOKIE_KEY = 'ratel_ncc_acknowledged';
const ACK_STORAGE_KEY = 'ratel_ncc_acknowledged_at';
const ACK_DAYS = 30;
const ACK_MS = ACK_DAYS * 24 * 60 * 60 * 1000;

function getCookie(name) {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(?:^|;\\s*)' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name, value, days) {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; max-age=${maxAge}; path=/; SameSite=Lax`;
}

export default function NccModal() {
  const [show, setShow] = useState(false);
  const pathname = usePathname();
  // /connect is the landing page behind the printed company QR code: people arrive there to
  // tap a WhatsApp or social link, so the notice would only get in the way.
  const suppressed = pathname === '/connect';

  useEffect(() => {
    if (suppressed) return;
    // 1. Check if user already acknowledged via cookie (or localStorage fallback) within the last 30 days
    try {
      const ackCookie = getCookie(ACK_COOKIE_KEY);
      if (ackCookie === 'true' || ackCookie === '1') {
        return;
      }
      const ackAt = Number(localStorage.getItem(ACK_STORAGE_KEY)) || 0;
      if (ackAt && Date.now() - ackAt < ACK_MS) {
        return;
      }
    } catch {
      // Storage blocked (e.g. private mode)
    }

    // 2. Check 7-day cooldown if user dismissed without acknowledging
    let seenAt = 0;
    try {
      seenAt = Number(localStorage.getItem(SEEN_KEY)) || 0;
    } catch {
      // Storage blocked (e.g. private mode): fall back to showing it.
    }
    if (Date.now() - seenAt < REMIND_AFTER_MS) return;

    const timer = setTimeout(() => {
      setShow(true);
    }, 1500); // Small delay on load for smooth appearance
    return () => clearTimeout(timer);
  }, [suppressed]);

  const handleClose = () => {
    setShow(false);
    try {
      localStorage.setItem(SEEN_KEY, String(Date.now()));
    } catch {
      // Ignore: the notice will simply show again next visit.
    }
  };

  const handleAcknowledge = () => {
    setShow(false);
    try {
      setCookie(ACK_COOKIE_KEY, 'true', ACK_DAYS);
      localStorage.setItem(ACK_STORAGE_KEY, String(Date.now()));
    } catch {
      // Ignore
    }
  };

  return (
    <div className={`${styles.modalOverlay} ${show && !suppressed ? styles.modalOverlayActive : ''}`}>
      <div className={styles.modalContent}>
        <button className={styles.btnClose} onClick={handleClose} aria-label="Close Modal">
          <i className="bi bi-x-lg"></i>
        </button>

        <div className={styles.icon}>
          <i className="bi bi-exclamation-triangle"></i>
        </div>

        <h3 className={styles.title}>NCC Subscriber Notice</h3>
        
        <p className={styles.desc}>
          According to the Nigerian Communications Commission (NCC), it is mandatory for all GSM and Non-GSM subscribers to link their National Identification Number (NIN) to their telephone lines. Non-compliant lines will be restricted.
        </p>

        <div className={styles.btnGroup}>
          <Link href="/reg-options" onClick={handleClose} className={styles.btnReg}>
            Link NIN Now
          </Link>
          <Link href="/airtime" onClick={handleClose} className={styles.btnAirtime}>
            Recharge Line
          </Link>
          <button type="button" onClick={handleAcknowledge} className={styles.btnAck}>
            Acknowledged
          </button>
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
