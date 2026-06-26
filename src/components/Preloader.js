'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Preloader.module.css';

const Preloader = () => {
  const { t } = useLanguage();
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(false);
  const [statusText, setStatusText] = useState('Connecting to Ratel Plus...');

  useEffect(() => {
    // Prevent scrolling while preloading
    document.body.style.overflow = 'hidden';

    // Customer-friendly status messages based on loading phases
    const updateStatusMessage = (val) => {
      if (val < 30) {
        setStatusText('Connecting to Ratel Plus...');
      } else if (val < 65) {
        setStatusText('Loading broadband services...');
      } else if (val < 85) {
        setStatusText('Optimizing network routes...');
      } else if (val < 100) {
        setStatusText('Establishing secure connection...');
      } else {
        setStatusText('Welcome to Ratel Plus');
      }
    };

    // Incremental progress simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 5) + 3;
        if (next >= 100) {
          clearInterval(interval);
          updateStatusMessage(100);
          
          // Trigger fade out after 100% is displayed
          setTimeout(() => {
            setFade(true);
            // Fully remove preloader from view after transition completes
            setTimeout(() => {
              setLoading(false);
              document.body.style.overflow = '';
            }, 600); // matches CSS transition duration
          }, 300);
          return 100;
        }
        updateStatusMessage(next);
        return next;
      });
    }, 50);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, []);

  if (!loading) return null;

  return (
    <div className={`${styles.preloaderWrapper} ${fade ? styles.fadeOut : ''}`}>
      {/* Premium organic ambient glow */}
      <div className={styles.ambientGlow} />

      <div className={styles.loaderContent}>
        {/* Sleek Logo Container */}
        <div className={styles.logoContainer}>
          <img src="/logo.png" alt="Ratel Plus" className={styles.logoImage} />
        </div>

        {/* Brand Tagline */}
        <div className={styles.tagline}>
          {t('Broadband • Voice • LTE')}
        </div>
        
        {/* Dynamic Connection Status */}
        <div className={styles.statusBox}>
          <span className={styles.loadingText}>{t(statusText)}</span>
        </div>
        
        {/* Minimal High-Speed Fiber progress bar */}
        <div className={styles.progressBarBg}>
          <div className={styles.progressBarFill} style={{ width: `${progress}%` }}></div>
        </div>
        
        {/* Percent indicator */}
        <div className={styles.percentText}>
          {progress}%
        </div>
      </div>
    </div>
  );
};

export default Preloader;
