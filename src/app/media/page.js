'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import styles from './media.module.css';

export const getMediaImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('/static/')) {
    return `https://attendance.ratelplus.net.ng${url}`;
  }
  return url;
};

function MediaImage({ src, alt, className, style, category }) {
  const [hasError, setHasError] = useState(false);
  const imageUrl = getMediaImageUrl(src);

  if (!imageUrl || hasError) {
    return (
      <div className={styles.placeholderBanner} style={style}>
        <div className={styles.placeholderIconWrapper}>
          <i className="bi bi-newspaper" />
        </div>
        <span className={styles.placeholderBrand}>RATEL PLUS MEDIA</span>
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={alt}
      className={className}
      style={style}
      onError={() => setHasError(true)}
    />
  );
}

// Fallback publications if backend is offline or loading
const SAMPLE_MEDIA_POSTS = [
  {
    id: 'post-1',
    title: 'Ratel Plus Expands High-Speed Metro Fiber Across Kano Metropolitan Layouts',
    slug: 'ratel-expands-metro-fiber-kano',
    category: 'Infrastructure & Fiber',
    summary: 'Phase-2 fiber optic backbone expansion connects over 2,500 residential homes and corporate office complexes with unthrottled gigabit speeds.',
    content: 'Full details on Phase-2 fiber optic deployment across Kano metropolis...',
    featured_image: '/datacenter_fiber.png',
    author: 'Engr. Ahmed Bello',
    read_time: '4 min read',
    tags: ['Fiber', 'FTTH', 'Kano', 'Broadband'],
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
    content: 'Experience HD voice quality and the lowest call tariffs...',
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
    content: 'High-speed 4G LTE wireless routers for commercial enterprises...',
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
    content: 'Technical labs and field mastery for aspiring engineers...',
    featured_image: '/router_hub.png',
    author: 'Dr. Amina Garba',
    read_time: '3 min read',
    tags: ['Academy', 'Education', 'Fiber', 'Networking'],
    is_published: true,
    views_count: 0,
    published_at: '2026-10-11T12:00:00Z',
  },
];

const CATEGORIES = [
  'All',
  'Infrastructure & Fiber',
  'Product Launch',
  'Wireless & LTE',
  'Academy & Training',
  'News',
  'Press Release',
  'Community',
];

export default function MediaPage() {
  const { t } = useLanguage();
  const [posts, setPosts] = useState(SAMPLE_MEDIA_POSTS);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

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

    const loadPosts = async () => {
      const apiUrl = getApiUrl();
      try {
        const params = new URLSearchParams({ published_only: 'true', limit: '50' });
        if (selectedCategory !== 'All') params.append('category', selectedCategory);
        if (searchQuery.trim()) params.append('search', searchQuery.trim());

        const res = await fetch(`${apiUrl}/media/posts?${params.toString()}`);
        if (res.ok) {
          const data = await res.json();
          if (active && Array.isArray(data) && data.length > 0) {
            setPosts(data);
          }
        }
      } catch (err) {
        console.warn('Media API unreachable, displaying sample publications:', err);
      } finally {
        if (active) setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      loadPosts();
    }, 200);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [selectedCategory, searchQuery]);

  // Client Filtering
  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      const matchesCategory =
        selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        !searchQuery.trim() ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const remainingPosts = filteredPosts.length > 1 ? filteredPosts.slice(1) : [];

  return (
    <div className={styles.mediaContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <i className="bi bi-newspaper"></i>
              {t('Press & Media Hub')}
            </div>
            <h1 className={styles.heroTitle}>
              {t('Latest Stories, Insights')} <br />
              <span className={styles.heroTitleGradient}>{t('& Telecom Innovations')}</span>
            </h1>
            <p className={styles.heroSubtitle}>
              {t('Stay updated with news releases, broadband network expansions, community initiatives, and technology launches from Ratel Plus Nigeria.')}
            </p>
          </div>
        </div>
      </section>

      {/* Toolbar & Filter Pills */}
      <section className={styles.toolbarSection}>
        <div className="container">
          <div className={styles.toolbarCard}>
            <div className={styles.searchBar}>
              <i className="bi bi-search" style={{ color: 'var(--text-muted)', fontSize: '18px' }} />
              <input
                type="text"
                placeholder={t('Search articles by topic, title, or keywords...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                >
                  <i className="bi bi-x-circle-fill" />
                </button>
              )}
            </div>

            <div className={styles.categoryPills}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`${styles.categoryPill} ${selectedCategory === cat ? styles.categoryPillActive : ''}`}
                >
                  {t(cat)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section>
        <div className="container">
          {filteredPosts.length === 0 ? (
            <div className={styles.emptyState}>
              <i className="bi bi-journal-x" style={{ fontSize: '48px', color: 'var(--text-muted)', marginBottom: '16px', display: 'block' }} />
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '8px' }}>
                {t('No publications found')}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', maxWidth: '480px', margin: '0 auto 20px' }}>
                {t('Try adjusting your search query or selecting a different category.')}
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="btn-primary"
                style={{ fontSize: '14px' }}
              >
                {t('View All Articles')}
              </button>
            </div>
          ) : (
            <>
              {/* Featured Top Story */}
              {featuredPost && (
                <Link href={`/media/${featuredPost.slug}`} className={styles.featuredStoryCard}>
                  <div className={styles.featuredImageWrapper}>
                    <MediaImage
                      src={featuredPost.featured_image}
                      alt={featuredPost.title}
                      className={styles.featuredImage}
                      category={featuredPost.category}
                    />
                  </div>

                  <div className={styles.featuredContent}>
                    <div className={styles.featuredTagRow}>
                      <span className={styles.categoryBadge}>{featuredPost.category}</span>
                      <span className={styles.metaText}>
                        <i className="bi bi-clock" />
                        {featuredPost.read_time}
                      </span>
                      <span className={styles.metaText}>
                        <i className="bi bi-calendar3" />
                        {new Date(featuredPost.published_at || Date.now()).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      <span className={styles.metaText}>
                        <i className="bi bi-eye" />
                        {featuredPost.views_count || 0} {t('views')}
                      </span>
                    </div>

                    <h2 className={styles.featuredTitle}>{featuredPost.title}</h2>
                    <p className={styles.featuredSummary}>{featuredPost.summary}</p>

                    <div className={styles.readMoreBtn}>
                      <span>{t('Read Full Story')}</span>
                      <i className="bi bi-arrow-right" />
                    </div>
                  </div>
                </Link>
              )}

              {/* Grid of Remaining Articles */}
              {remainingPosts.length > 0 && (
                <div className={styles.articlesGrid}>
                  {remainingPosts.map((post) => (
                    <Link key={post.id || post.slug} href={`/media/${post.slug}`} className={styles.articleCard}>
                      <div className={styles.cardImageWrapper}>
                        <MediaImage
                          src={post.featured_image}
                          alt={post.title}
                          className={styles.cardImage}
                          category={post.category}
                        />
                      </div>

                      <div className={styles.cardContent}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                          <span className={styles.categoryBadge}>{post.category}</span>
                          <span className={styles.metaText}>
                            <i className="bi bi-clock" />
                            {post.read_time}
                          </span>
                        </div>

                        <h3 className={styles.cardTitle}>{post.title}</h3>
                        <p className={styles.cardSummary}>{post.summary}</p>

                        <div className={styles.cardFooter}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <i className="bi bi-person-fill" />
                            {post.author}
                          </span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <i className="bi bi-eye" />
                            {post.views_count || 0}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
