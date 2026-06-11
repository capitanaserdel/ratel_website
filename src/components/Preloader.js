'use client';

import React, { useEffect, useState } from 'react';
import styles from './Preloader.module.css';

const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(false);
  const [statusText, setStatusText] = useState('CONNECTING TO RATEL PLUS BACKBONE...');

  useEffect(() => {
    // Prevent scrolling while preloading
    document.body.style.overflow = 'hidden';

    // Status log messages based on loading phases
    const updateStatusMessage = (val) => {
      if (val < 20) {
        setStatusText('BOOTING SECURE GATEWAY NETWORKS...');
      } else if (val < 45) {
        setStatusText('OPTIMIZING FIBER CORE TRANSIT PATHS...');
      } else if (val < 70) {
        setStatusText('INITIALIZING VOIP TRANSCODE PIPELINES...');
      } else if (val < 90) {
        setStatusText('STABILIZING METRO BROADBAND NODES...');
      } else if (val < 100) {
        setStatusText('SYNCHRONIZING SECURE ACCOUNT DATABASES...');
      } else {
        setStatusText('SYSTEM ONLINE - WELCOME TO RATEL PLUS');
      }
    };

    // Incremental progress simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 4) + 2;
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
    }, 60);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, []);

  if (!loading) return null;

  return (
    <div className={`${styles.preloaderWrapper} ${fade ? styles.fadeOut : ''}`}>
      {/* Background cyber grid scan line */}
      <div className={styles.gridOverlay} />
      
      <div className={styles.loaderContent}>
        {/* Sleek SVG Rotating Ring Structure */}
        <div className={styles.svgContainer}>
          <svg className={styles.svgScanner} viewBox="0 0 100 100">
            <circle 
              className={styles.track} 
              cx="50" 
              cy="50" 
              r="40" 
            />
            <circle 
              className={styles.fill} 
              cx="50" 
              cy="50" 
              r="40" 
              style={{ strokeDashoffset: 251.2 - (251.2 * progress) / 100 }}
            />
          </svg>
          <div className={styles.percentText}>
            {progress}<span>%</span>
          </div>
        </div>

        {/* Brand Header */}
        <h2 className={styles.brandTitle}>
          RATEL <span>PLUS</span>
        </h2>
        
        {/* Dynamic Status Log */}
        <div className={styles.statusBox}>
          <div className={styles.pulseDot}></div>
          <span className={styles.loadingText}>{statusText}</span>
        </div>
        
        {/* Sub-bar */}
        <div className={styles.progressBarBg}>
          <div className={styles.progressBarFill} style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
