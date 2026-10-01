/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Personal registration runs on the original site; send old links/bookmarks there.
      { source: '/personal-subscribers', destination: 'https://ratelplus.net/personal-subscribers.php', permanent: false },
    ];
  },
};

export default nextConfig;
