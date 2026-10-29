'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import styles from '../media.module.css';

export const getMediaImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('/static/')) {
    return `https://attendance.ratelplus.net.ng${url}`;
  }
  return url;
};

function DetailBannerImage({ src, alt }) {
  const [hasError, setHasError] = useState(false);
  const imageUrl = getMediaImageUrl(src);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  if (!imageUrl || hasError) {
    return (
      <div
        className={styles.placeholderBanner}
        style={{
          height: '240px',
          borderRadius: '16px',
          marginBottom: '36px',
        }}
      >
        <div className={styles.placeholderIconWrapper}>
          <i className="bi bi-newspaper" />
        </div>
        <span className={styles.placeholderBrand}>RATEL PLUS PRESS & MEDIA</span>
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={alt}
      className={styles.readerBanner}
      onError={() => setHasError(true)}
    />
  );
}

const SAMPLE_MEDIA_POSTS = [
  {
    id: 'post-1',
    title: 'Ratel Plus Expands High-Speed Metro Fiber Across Kano Metropolitan Layouts',
    slug: 'ratel-expands-metro-fiber-kano',
    category: 'Infrastructure & Fiber',
    summary: 'Phase-2 fiber optic backbone expansion connects over 2,500 residential homes and corporate office complexes with unthrottled gigabit speeds.',
    content: `Ratel Plus Nigeria Limited has officially commissioned Phase 2 of its state-of-the-art Metro Fiber deployment across Kano metropolis.

The infrastructure project, spanning over 65 kilometers of underground high-density fiber optic cable, is designed to deliver symmetric, ultra-low latency internet access to homes, educational institutions, commercial centers, and healthcare providers.

### Gigabit Speeds & Unthrottled Reliability
With GPON and active Ethernet technology, subscribers can experience speeds up to 1Gbps with 99.9% uptime SLA. Unlike traditional wireless links, subterranean optical fiber is immune to weather degradation, radio frequency interference, and signal congestion.

"Our goal is to turn northern Nigeria into a prime digital hub for software development, remote work, enterprise cloud computing, and digital transformation," said Engr. Ahmed Bello, Head of Network Engineering at Ratel Plus.

### Key Deployment Highlights
- 65+ kilometers of newly energized underground ducting
- Redundant core interconnection with the Internet Exchange Point of Nigeria (IXPN)
- 24/7 proactive NOC monitoring and field rapid response units
- Direct peering with major global content delivery networks (CDNs)

Residential and commercial property owners can check coverage and request site survey inspections directly on the Ratel Plus portal.`,
    featured_image: '/datacenter_fiber.png',
    author: 'Engr. Ahmed Bello',
    read_time: '4 min read',
    tags: ['Fiber', 'FTTH', 'Kano', 'Broadband', 'Infrastructure'],
    is_published: true,
    views_count: 0,
    published_at: '2026-10-24T10:00:00Z',
  },
  {
    id: 'post-2',
    title: 'Next-Gen Ratel Phone App Launched with Crystal-Clear HD VoIP Calling',
    slug: 'next-gen-ratel-phone-app-launched',
    category: 'Product Launch',
    summary: 'Our official SIP softphone application is now available on Android Google Play and Apple App Store, featuring crystal-clear audio and zero roaming fees.',
    content: `Ratel Plus is excited to announce the official release of the **Ratel Phone App** on both Google Play Store and Apple iOS App Store.

The app transforms any smartphone into an enterprise-grade extension, allowing users to make and receive high-definition phone calls over Wi-Fi, 4G, or fiber data connections.

### Why Choose Ratel Phone?
- **HD Voice Quality:** Utilizes high-efficiency Opus and G.722 codecs for crystal clear audio even on congested connections.
- **Cheapest Call Rates:** Call any Nigerian network or international destination at a fraction of standard mobile tariffs.
- **Enterprise Extension Sync:** Remote workers and office staff can answer their desk phones directly from their mobile devices wherever they are in the world.
- **Encrypted Communications:** End-to-end TLS signaling and SRTP media encryption protect your voice calls from eavesdropping and toll fraud.

### How to Get Started
1. Download the app from the Google Play Store or Apple App Store.
2. Complete your NIN verification on the Ratel Plus subscriber portal.
3. Choose your personalized phone number and start making clear calls immediately!`,
    featured_image: '/phone_dialer.png',
    author: 'Usman Aliyu',
    read_time: '3 min read',
    tags: ['VoIP', 'Mobile App', 'Voice', 'SIP'],
    is_published: true,
    views_count: 0,
    published_at: '2026-10-20T14:30:00Z',
  },
  {
    id: 'post-3',
    title: 'Empowering Northern Businesses with Dedicated 4G LTE Fixed Wireless Access',
    slug: 'empowering-businesses-with-4g-lte',
    category: 'Wireless & LTE',
    summary: 'Commercial enterprises now have access to high-capacity 4G LTE wireless routers with dedicated bandwidth and guaranteed uptime.',
    content: `Small and medium businesses (SMBs) across Nigeria require stable, reliable connectivity to power point-of-sale systems, cloud accounting software, customer CRM portals, and team collaboration tools.

Ratel Plus has introduced its new enterprise Fixed Wireless Access (FWA) routers powered by licensed 4G LTE spectrum.

### Engineered for Continuous Business Operations
- **Dedicated Business Bandwidth:** No artificial bandwidth throttling or peak-hour slowdowns.
- **Dual-Band Wi-Fi 6 Support:** Connect up to 64 office devices simultaneously with robust beamforming range.
- **Failover Redundancy:** Automatic multi-SIM and Ethernet failover ensures your office remains online during unexpected regional link cuts.

"We recognize that modern commerce doesn't sleep," explained Kabir Sani, Lead NOC Specialist. "Our enterprise LTE packages guarantee business-first priority queuing across our radio base stations."

Contact our enterprise team today to schedule an onsite RF survey for your premises.`,
    featured_image: '/lte_mast.png',
    author: 'Kabir Sani',
    read_time: '4 min read',
    tags: ['LTE', 'Wireless', 'Enterprise', 'FWA'],
    is_published: true,
    views_count: 0,
    published_at: '2026-10-16T09:15:00Z',
  },
  {
    id: 'post-4',
    title: 'Ratel Academy Opens Applications for Telecoms & Optical Fiber Engineering',
    slug: 'ratel-academy-opens-applications',
    category: 'Academy & Training',
    summary: 'Join our comprehensive hands-on technical masterclasses covering fiber fusion splicing, service provider IP routing, and wireless infrastructure.',
    content: `Ratel Plus is proud to officially open applications for the upcoming cohort of **Ratel Academy**.

As Nigeria's telecommunications sector experiences rapid growth, the demand for certified, field-ready technicians and network engineers has never been higher.

### Practical Learning, Not Just Theory
Our state-of-the-art training facilities in Kano provide students with direct access to:
- Industrial core-alignment optical fusion splicers
- Optical Time-Domain Reflectometers (OTDR) and laser power meters
- Enterprise Mikrotik and Cisco carrier routing racks
- Live 4G LTE eNodeB base station simulation labs

### Career Pathways & Top 20% Placement
The top 20% of graduates from each cohort are offered direct internship and junior engineering employment opportunities within Ratel Plus and partner telecom providers.

Applications are now open online through the **Ratel Academy** portal.`,
    featured_image: '/router_hub.png',
    author: 'Dr. Amina Garba',
    read_time: '3 min read',
    tags: ['Academy', 'Education', 'Fiber', 'Networking'],
    is_published: true,
    views_count: 0,
    published_at: '2026-10-11T12:00:00Z',
  },
];

export default function ArticleDetailPage() {
  const params = useParams();
  const slug = params?.slug;
  const { t } = useLanguage();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const getApiUrl = () => {
    let url = process.env.NEXT_PUBLIC_API_URL;
    if (!url || url.includes('portal.ratelplus.net.ng')) {
      if (typeof window !== 'undefined' && window.location.hostname.includes('ratelplus.net.ng')) {
        url = 'https://attendance.ratelplus.net.ng/api/v1';
      } else {
        url = 'http://localhost:8000/api/v1';
      }
    }
    url = url.trim().replace(/\/+$/, '');
    if (!url.endsWith('/api/v1')) {
      if (url.endsWith('/api')) {
        url = `${url}/v1`;
      } else {
        url = `${url}/api/v1`;
      }
    }
    return url;
  };

  useEffect(() => {
    let active = true;

    const loadPost = async () => {
      const apiUrl = getApiUrl();
      try {
        const res = await fetch(`${apiUrl}/media/posts/${slug}`);
        if (res.ok) {
          const data = await res.json();
          if (active && data) {
            setPost(data);
          }
        } else {
          // Fallback to sample posts
          const fallback = SAMPLE_MEDIA_POSTS.find((p) => p.slug === slug || p.id === slug);
          if (active) setPost(fallback || SAMPLE_MEDIA_POSTS[0]);
        }
      } catch (err) {
        console.warn('Could not fetch post from backend, using sample:', err);
        const fallback = SAMPLE_MEDIA_POSTS.find((p) => p.slug === slug || p.id === slug);
        if (active) setPost(fallback || SAMPLE_MEDIA_POSTS[0]);
      } finally {
        if (active) setLoading(false);
      }
    };

    if (slug) {
      loadPost();
    }
  }, [slug]);

  // Load related articles
  useEffect(() => {
    if (post) {
      const others = SAMPLE_MEDIA_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);
      setRelatedPosts(others);
    }
  }, [post]);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '160px 0', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '16px' }}>{t('Loading article details...')}</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container" style={{ padding: '160px 0', textAlign: 'center' }}>
        <h2>{t('Article not found')}</h2>
        <Link href="/media" className="btn-primary" style={{ marginTop: '20px', display: 'inline-block' }}>
          {t('Back to Media Hub')}
        </Link>
      </div>
    );
  }

  const currentUrl = typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : '';
  const postTitleEnc = encodeURIComponent(post.title);

  return (
    <div className={styles.mediaContainer}>
      <div className="container">
        <div className={styles.readerContainer}>
          {/* Back Navigation */}
          <Link href="/media" className={styles.backLink}>
            <i className="bi bi-arrow-left"></i>
            {t('Back to All Stories')}
          </Link>

          {/* Header */}
          <div className={styles.readerHeader}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span className={styles.categoryBadge}>{post.category}</span>
              <span className={styles.metaText}>
                <i className="bi bi-clock"></i>
                {post.read_time}
              </span>
            </div>

            <h1 className={styles.readerTitle}>{post.title}</h1>

            <div className={styles.readerMetaRow}>
              <div className={styles.authorBadge}>
                <div className={styles.authorAvatar}>
                  {post.author ? post.author.charAt(0).toUpperCase() : 'R'}
                </div>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '14px', color: 'var(--text-main)' }}>
                    {post.author}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    {t('Published on')}{' '}
                    {new Date(post.published_at || post.created_at || Date.now()).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                </div>
              </div>

              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-muted)' }}>
                <i className="bi bi-eye"></i>
                <span>{post.views_count || 0} {t('views')}</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <DetailBannerImage src={post.featured_image} alt={post.title} />

          {/* Article Body */}
          <div className={styles.readerBody}>
            {post.content.split('\n\n').map((paragraph, idx) => {
              const trimmed = paragraph.trim();
              if (trimmed.startsWith('### ')) {
                return (
                  <h3 key={idx} style={{ fontSize: '22px', fontWeight: '800', margin: '30px 0 14px' }}>
                    {trimmed.replace('### ', '')}
                  </h3>
                );
              }
              if (trimmed.startsWith('## ')) {
                return (
                  <h2 key={idx} style={{ fontSize: '26px', fontWeight: '800', margin: '36px 0 16px' }}>
                    {trimmed.replace('## ', '')}
                  </h2>
                );
              }
              if (trimmed.startsWith('- ')) {
                const items = trimmed.split('\n').map((item) => item.replace(/^[-\*]\s*/, ''));
                return (
                  <ul key={idx}>
                    {items.map((item, itemIdx) => (
                      <li key={itemIdx}>{item}</li>
                    ))}
                  </ul>
                );
              }
              return <p key={idx}>{trimmed}</p>;
            })}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '30px' }}>
              {post.tags.map((tag, idx) => (
                <span
                  key={idx}
                  style={{
                    background: 'rgba(37, 99, 235, 0.06)',
                    color: 'var(--primary)',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600',
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Share Section */}
          <div className={styles.shareSection}>
            <div style={{ fontWeight: '700', fontSize: '14px', color: 'var(--text-main)' }}>
              {t('Share this article:')}
            </div>
            <div className={styles.shareButtons}>
              <a
                href={`https://api.whatsapp.com/send?text=${postTitleEnc}%20${currentUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.shareBtn}
                title="Share on WhatsApp"
              >
                <i className="bi bi-whatsapp" style={{ color: '#25D366' }}></i>
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${postTitleEnc}&url=${currentUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.shareBtn}
                title="Share on X (Twitter)"
              >
                <i className="bi bi-twitter-x"></i>
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.shareBtn}
                title="Share on LinkedIn"
              >
                <i className="bi bi-linkedin" style={{ color: '#0A66C2' }}></i>
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.shareBtn}
                title="Share on Facebook"
              >
                <i className="bi bi-facebook" style={{ color: '#1877F2' }}></i>
              </a>
              <button
                onClick={handleCopyLink}
                className={styles.shareBtn}
                title="Copy Link"
              >
                <i className={`bi ${copied ? 'bi-check-lg' : 'bi-link-45deg'}`} style={{ color: copied ? 'var(--accent-green)' : 'inherit' }}></i>
              </button>
            </div>
          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <div style={{ marginTop: '70px', paddingTop: '40px', borderTop: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '24px' }}>
                {t('Related Publications')}
              </h3>
              <div className={styles.articlesGrid}>
                {relatedPosts.map((rel) => (
                  <Link key={rel.slug} href={`/media/${rel.slug}`} className={styles.articleCard}>
                    <div className={styles.cardImageWrapper}>
                      {rel.featured_image ? (
                        <img src={getMediaImageUrl(rel.featured_image)} alt={rel.title} className={styles.cardImage} />
                      ) : (
                        <i className="bi bi-newspaper" style={{ fontSize: '40px', color: 'rgba(37,99,235,0.4)' }}></i>
                      )}
                    </div>
                    <div className={styles.cardContent}>
                      <span className={styles.categoryBadge} style={{ alignSelf: 'flex-start', marginBottom: '8px' }}>
                        {rel.category}
                      </span>
                      <h4 className={styles.cardTitle}>{rel.title}</h4>
                      <p className={styles.cardSummary}>{rel.summary}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
