// Same-site gateway to the vos-portal payments API.
// Browsers call ratelplus.net.ng/api/portal/... instead of portal.ratelplus.net.ng directly:
// cross-site calls (extra CORS preflight, second domain) fail far more often on mobile data and
// data-saver browsers, which customers saw as "Failed to fetch". This server forwards the call with
// the customer's real IP and a shared key so the portal's per-customer rate limits still work.

const PORTAL_API = (process.env.PORTAL_API_URL || 'https://portal.ratelplus.net.ng').replace(/\/$/, '');
const TIMEOUT_MS = 30_000;

// Only the public payment calls the website needs.
const ALLOWED = [
  { method: 'POST', re: /^payments\/initialize$/ },
  { method: 'POST', re: /^payments\/initialize-registration$/ },
  { method: 'GET', re: /^payments\/verify\/[A-Za-z0-9-]{4,60}$/ },
  { method: 'POST', re: /^registrations$/ },
];

function clientIp(request) {
  const real = request.headers.get('x-real-ip');
  if (real) return real.trim();
  const fwd = request.headers.get('x-forwarded-for');
  return fwd ? fwd.split(',')[0].trim() : '';
}

async function forward(request, params) {
  const { path = [] } = await params;
  const sub = path.join('/');
  if (!ALLOWED.some((a) => a.method === request.method && a.re.test(sub))) {
    return Response.json({ success: false, error: 'Not found' }, { status: 404 });
  }

  const headers = { Accept: 'application/json' };
  const ip = clientIp(request);
  if (ip) headers['X-Client-IP'] = ip;
  if (process.env.PORTAL_PROXY_KEY) headers['X-Proxy-Key'] = process.env.PORTAL_PROXY_KEY;
  let body;
  if (request.method === 'POST') {
    headers['Content-Type'] = request.headers.get('content-type') || 'application/json';
    body = await request.text();
  }

  try {
    const upstream = await fetch(`${PORTAL_API}/api/${sub}`, {
      method: request.method,
      headers,
      body,
      cache: 'no-store',
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    const text = await upstream.text();
    return new Response(text, {
      status: upstream.status,
      headers: {
        'Content-Type': upstream.headers.get('content-type') || 'application/json',
        'Cache-Control': 'no-store',
      },
    });
  } catch {
    return Response.json(
      { success: false, error: 'We could not reach the payment service. Please check your connection and try again.' },
      { status: 502 },
    );
  }
}

export async function GET(request, ctx) {
  return forward(request, ctx.params);
}

export async function POST(request, ctx) {
  return forward(request, ctx.params);
}
