import Image from 'next/image';
import styles from './page.module.css';

// Landing page behind the printed company QR code (ratelplus_company_qr.png → https://ratelplus.net.ng/connect/).
// Keep this URL stable: changing it breaks every QR code already printed.

export const metadata = {
  title: 'Connect with Ratel Plus | Power to Connect',
  description: 'All official Ratel Plus channels in one place: website, WhatsApp, Facebook, Instagram, TikTok, X and LinkedIn.',
  alternates: { canonical: 'https://ratelplus.net.ng/connect' },
  openGraph: {
    title: 'Connect with Ratel Plus',
    description: 'Reach Ratel Plus Nigeria Limited on WhatsApp and follow us on social media.',
    url: 'https://ratelplus.net.ng/connect',
    siteName: 'Ratel Plus',
    type: 'website',
  },
};

const PRIMARY = [
  {
    href: 'https://wa.me/2347010553861',
    icon: 'bi-whatsapp',
    tone: 'whatsapp',
    title: 'Chat on WhatsApp',
    detail: '+234 701 055 3861',
  },
  {
    href: 'https://ratelplus.net.ng',
    icon: 'bi-globe2',
    tone: 'brand',
    title: 'Official Website',
    detail: 'ratelplus.net.ng',
    sameTab: true,
  },
];

const SOCIAL = [
  { href: 'https://www.facebook.com/ratel.plus.2025', icon: 'bi-facebook', tone: 'facebook', title: 'Facebook', detail: 'Ratel Plus' },
  { href: 'https://www.instagram.com/ratel_telecommunications', icon: 'bi-instagram', tone: 'instagram', title: 'Instagram', detail: '@ratel_telecommunications' },
  { href: 'https://www.tiktok.com/@ratelplus', icon: 'bi-tiktok', tone: 'tiktok', title: 'TikTok', detail: '@ratelplus' },
  { href: 'https://x.com/ratelplus', icon: 'bi-twitter-x', tone: 'x', title: 'X (Twitter)', detail: '@ratelplus' },
  { href: 'https://www.linkedin.com/company/ratel-plus-nigeria/', icon: 'bi-linkedin', tone: 'linkedin', title: 'LinkedIn', detail: 'Ratel Plus Nigeria' },
];

function LinkCard({ link, large }) {
  const external = !link.sameTab;
  return (
    <a
      href={link.href}
      className={`${styles.card} ${large ? styles.cardLarge : ''}`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span className={`${styles.icon} ${styles[link.tone]}`} aria-hidden="true">
        <i className={`bi ${link.icon}`}></i>
      </span>
      <span className={styles.text}>
        <strong>{link.title}</strong>
        <small>{link.detail}</small>
      </span>
      <i className={`bi bi-arrow-up-right ${styles.arrow}`} aria-hidden="true"></i>
    </a>
  );
}

export default function ConnectPage() {
  return (
    <div className={styles.page}>
      <div className={styles.aurora} aria-hidden="true"></div>

      <div className={styles.wrap}>
        <header className={`${styles.hero} animate-fadeIn`}>
          <div className={styles.logoBadge}>
            <Image src="/logo.png" alt="Ratel Plus" width={174} height={49} priority />
          </div>
          <span className={styles.eyebrow}>Ratel Plus Nigeria Limited</span>
          <h1 className={styles.title}>Power to Connect</h1>
          <p className={styles.lead}>
            Talk to us, follow our updates and stay connected — every official Ratel Plus channel in one place.
          </p>
        </header>

        <section className={styles.section} aria-labelledby="reach-us">
          <h2 id="reach-us" className={styles.sectionTitle}>Reach us</h2>
          <div className={styles.grid}>
            {PRIMARY.map((l) => <LinkCard key={l.href} link={l} large />)}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="follow-us">
          <h2 id="follow-us" className={styles.sectionTitle}>Follow us</h2>
          <div className={styles.list}>
            {SOCIAL.map((l) => <LinkCard key={l.href} link={l} />)}
          </div>
        </section>

        <p className={styles.note}>
          <i className="bi bi-patch-check-fill" aria-hidden="true"></i>
          These are our only official channels. Ratel Plus will never ask for your PIN or password.
        </p>
      </div>
    </div>
  );
}
