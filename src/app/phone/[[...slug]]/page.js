'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function PhoneDeepLinkPage({ params }) {
  // Unwrap Next.js dynamic params if Promise (Next.js 15+ / React 19)
  const resolvedParams = params && typeof params.then === 'function' ? use(params) : params;
  const slug = resolvedParams?.slug || [];
  const phoneNumber = slug.length > 0 ? slug[0] : '';

  const [deepLinkUrl, setDeepLinkUrl] = useState('ratel://login');
  const [password, setPassword] = useState('');
  const [attempted, setAttempted] = useState(false);

  useEffect(() => {
    let pwd = '';
    if (typeof window !== 'undefined') {
      const hash = window.location.hash || '';
      pwd = hash.replace(/^#/, '');
      if (pwd) {
        try {
          pwd = decodeURIComponent(pwd);
        } catch (_) {}
        setPassword(pwd);
      }

      // Construct appropriate deep link URL
      let url = 'ratel://login';
      if (phoneNumber && pwd) {
        url = `ratel://login?username=${encodeURIComponent(phoneNumber)}&password=${encodeURIComponent(pwd)}&autoLogin=true`;
      } else if (phoneNumber) {
        url = `ratel://call/${encodeURIComponent(phoneNumber)}`;
      }

      setDeepLinkUrl(url);

      // Attempt automatic redirect to the native app
      const timer = setTimeout(() => {
        try {
          window.location.href = url;
          setAttempted(true);
        } catch (_) {}
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [phoneNumber]);

  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        background: 'linear-gradient(135deg, #0b1329 0%, #152248 100%)',
        color: '#ffffff',
      }}
    >
      <div
        className="glass-panel"
        style={{
          maxWidth: '520px',
          width: '100%',
          padding: '40px 30px',
          borderRadius: '24px',
          background: 'rgba(255, 255, 255, 0.06)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
          textAlign: 'center',
        }}
      >
        {/* App Icon */}
        <div
          style={{
            width: '84px',
            height: '84px',
            margin: '0 auto 24px auto',
            borderRadius: '22px',
            background: 'linear-gradient(135deg, #384CB8 0%, #1e2b7b 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 25px rgba(56, 76, 184, 0.4)',
          }}
        >
          <i className="bi bi-phone-fill" style={{ fontSize: '42px', color: '#ffffff' }}></i>
        </div>

        <h1
          style={{
            fontSize: '26px',
            fontWeight: '700',
            marginBottom: '10px',
            color: '#ffffff',
          }}
        >
          Ratel Phone App
        </h1>

        <p
          style={{
            fontSize: '15px',
            lineHeight: '1.6',
            color: 'rgba(255, 255, 255, 0.8)',
            marginBottom: '24px',
          }}
        >
          {phoneNumber ? (
            <>
              Connecting account <strong>{phoneNumber}</strong> to Ratel Phone.
            </>
          ) : (
            'Opening your Ratel Phone softphone application...'
          )}
        </p>

        {/* Primary Action Button */}
        <a
          href={deepLinkUrl}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            width: '100%',
            padding: '16px 24px',
            fontSize: '16px',
            fontWeight: '600',
            color: '#ffffff',
            background: 'linear-gradient(135deg, #384CB8 0%, #25369c 100%)',
            borderRadius: '14px',
            textDecoration: 'none',
            boxShadow: '0 8px 20px rgba(56, 76, 184, 0.35)',
            marginBottom: '28px',
            transition: 'transform 0.15s ease',
          }}
        >
          <i className="bi bi-box-arrow-up-right" style={{ fontSize: '18px' }}></i>
          <span>Open in Ratel Phone</span>
        </a>

        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '24px',
            marginBottom: '20px',
          }}
        >
          <p
            style={{
              fontSize: '13px',
              color: 'rgba(255, 255, 255, 0.65)',
              marginBottom: '16px',
            }}
          >
            Don't have the Ratel Phone app installed yet? Download it for free:
          </p>

          <div
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <a
              href="https://play.google.com/store/apps/details?id=net.ratelplus.phone"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                borderRadius: '8px',
                overflow: 'hidden',
                transition: 'opacity 0.2s',
              }}
            >
              <img
                src="/google_play.png"
                alt="Get it on Google Play"
                style={{ height: '42px', width: 'auto', display: 'block' }}
              />
            </a>

            <a
              href="https://apps.apple.com/ng/app/ratelplus-phone/id1659297972"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                borderRadius: '8px',
                overflow: 'hidden',
                transition: 'opacity 0.2s',
              }}
            >
              <img
                src="/app_store.png"
                alt="Download on the App Store"
                style={{ height: '42px', width: 'auto', display: 'block' }}
              />
            </a>
          </div>
        </div>

        <Link
          href="/"
          style={{
            fontSize: '13px',
            color: 'rgba(255, 255, 255, 0.5)',
            textDecoration: 'none',
          }}
        >
          ← Back to Ratel Plus Website
        </Link>
      </div>
    </div>
  );
}

