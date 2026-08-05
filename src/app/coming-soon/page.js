'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

const SERVICES = {
  register: {
    label: 'Register for RatelSIM',
    url: 'https://www.ratelplus.net/personal-subscribers.php',
    icon: 'bi-person-plus-fill',
  },
  airtime: {
    label: 'Buy Airtime / Recharge',
    url: 'https://www.ratelplus.net/airtime.php',
    icon: 'bi-phone-fill',
  },
};

const COUNTDOWN_SEC = 8;

function ComingSoonContent() {
  const params = useSearchParams();
  const service = SERVICES[params.get('service')] ?? SERVICES.register;
  const [seconds, setSeconds] = useState(COUNTDOWN_SEC);

  useEffect(() => {
    if (seconds <= 0) {
      window.location.href = service.url;
      return;
    }
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds, service.url]);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0b1f3a 0%, #0f2e5c 50%, #1a3a6b 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: "'Outfit', sans-serif",
    }}>
      {/* Card */}
      <div style={{
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '20px',
        padding: '48px 40px',
        maxWidth: '480px',
        width: '100%',
        textAlign: 'center',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
      }}>
        {/* Logo */}
        <div style={{ marginBottom: '28px' }}>
          <Image src="/logo.png" alt="Ratel Plus" width={140} height={48} style={{ objectFit: 'contain' }} />
        </div>

        {/* Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(245,158,11,0.15)',
          border: '1px solid rgba(245,158,11,0.35)',
          color: '#f59e0b',
          borderRadius: '999px',
          padding: '4px 14px',
          fontSize: '12px',
          fontWeight: '600',
          letterSpacing: '0.04em',
          marginBottom: '24px',
        }}>
          <i className="bi bi-tools" /> UPGRADING
        </div>

        <h1 style={{
          color: '#ffffff',
          fontSize: '26px',
          fontWeight: '700',
          lineHeight: '1.3',
          margin: '0 0 12px',
        }}>
          New Portal Coming Soon
        </h1>

        <p style={{
          color: 'rgba(255,255,255,0.65)',
          fontSize: '15px',
          lineHeight: '1.6',
          margin: '0 0 36px',
        }}>
          We&apos;re upgrading this service to serve you better.
          In the meantime, use the link below to access the current portal.
        </p>

        {/* Old-site button */}
        <a
          href={service.url}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            background: '#1e5fcf',
            color: '#fff',
            borderRadius: '10px',
            padding: '15px 24px',
            fontSize: '15px',
            fontWeight: '700',
            textDecoration: 'none',
            marginBottom: '20px',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#1749a8'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#1e5fcf'; }}
        >
          <i className={`bi ${service.icon}`} />
          {service.label}
          <i className="bi bi-arrow-right" />
        </a>

        {/* Countdown */}
        <p style={{
          color: 'rgba(255,255,255,0.4)',
          fontSize: '13px',
          margin: 0,
        }}>
          Redirecting automatically in{' '}
          <span style={{ color: '#f59e0b', fontWeight: '700' }}>{seconds}s</span>
        </p>

        {/* Progress bar */}
        <div style={{
          marginTop: '12px',
          height: '3px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '999px',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            background: '#1e5fcf',
            borderRadius: '999px',
            width: `${((COUNTDOWN_SEC - seconds) / COUNTDOWN_SEC) * 100}%`,
            transition: 'width 1s linear',
          }} />
        </div>
      </div>

      {/* Footer note */}
      <p style={{
        color: 'rgba(255,255,255,0.3)',
        fontSize: '12px',
        marginTop: '28px',
        textAlign: 'center',
      }}>
        &copy; {new Date().getFullYear()} Ratel Plus Nigeria Limited
      </p>
    </div>
  );
}

export default function ComingSoonPage() {
  return (
    <Suspense>
      <ComingSoonContent />
    </Suspense>
  );
}
