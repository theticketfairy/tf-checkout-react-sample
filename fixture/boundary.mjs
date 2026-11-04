// The proxy is intentionally pinned to a single loopback origin.
export const FIXTURE_HOST = '127.0.0.1'
export const FIXTURE_PORT = 4102
export const FIXTURE_ORIGIN = 'http://127.0.0.1:4102'
export const FIXTURE_CSP = [
  "default-src 'self'",
  "connect-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "media-src 'self'",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'none'",
  "form-action 'self'",
].join('; ')

export function validFixtureRequest(host, origin, target) {
  if (host !== '127.0.0.1:4102' || (origin && origin !== FIXTURE_ORIGIN) ||
      typeof target !== 'string' || !target.startsWith('/') || target.startsWith('//')) return false
  try { return new URL(target, FIXTURE_ORIGIN).origin === FIXTURE_ORIGIN } catch { return false }
}

export function isFixtureEndpoint(pathname) {
  return pathname === '/api' || pathname.startsWith('/api/') ||
    pathname === '/ajax' || pathname.startsWith('/ajax/')
}

export function localGatsbyRedirect(value) {
  try {
    const url = new URL(value, 'http://127.0.0.1:3002')
    return url.origin === 'http://127.0.0.1:3002' ?
      url.pathname + url.search + url.hash : null
  } catch { return null }
}
