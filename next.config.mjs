/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Personal registration runs on the original site; send old links/bookmarks there.
      { source: '/personal-subscribers', destination: 'https://ratelplus.net/personal-subscribers.php', permanent: false },
      // The registration chooser is retired: phone registration is on ratelplus.net. Exact path only —
      // fiber registration (/reg-options/fiber) stays on this site. Not to ratelplus.net/reg-options.php,
      // which itself redirects back here (that would loop).
      { source: '/reg-options', destination: 'https://ratelplus.net/personal-subscribers.php', permanent: false },
    ];
  },
};

export default nextConfig;
