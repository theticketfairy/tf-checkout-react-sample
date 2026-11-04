// Loopback-only simulator and Gatsby development proxy. No upstream API proxy.
import http from 'node:http'
import { fixtureRoute, newFixtureState } from './router.mjs'
import {
  FIXTURE_HOST as host, FIXTURE_PORT as port, FIXTURE_ORIGIN as origin,
  FIXTURE_CSP as csp, validFixtureRequest, isFixtureEndpoint, localGatsbyRedirect,
} from './boundary.mjs'

const fixture = newFixtureState()

const headers = {
  'Content-Security-Policy': csp,
  'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'no-referrer',
}
function reply(res, status, body) {
  res.writeHead(status, {
    ...headers,
    'Content-Type': 'application/json',
    'Authorization-Guest': 'fixture-guest-0000000000000001',
  })
  res.end(JSON.stringify(body))
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = ''
    req.setEncoding('utf8')
    req.on('data', (chunk) => {
      data += chunk
      if (data.length > 16384) { reject(new Error('Request too large')); req.destroy() }
    })
    req.on('end', () => {
      if (!data || !String(req.headers['content-type'] || '').includes('json')) return resolve(null)
      try { resolve(JSON.parse(data)) } catch { reject(new Error('Invalid request')) }
    })
    req.on('error', reject)
  })
}

function proxyGatsby(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    reply(res, 404, { error: true, message: 'Not available in the fixture.' })
    return
  }
  const upstream = http.request({
    hostname: host, port: 3002, path: req.url, method: req.method,
    headers: { host: host + ':3002', accept: req.headers.accept || '*/*' },
  }, (response) => {
    const location = response.headers.location
    if (location) {
      const redirect = localGatsbyRedirect(location)
      if (!redirect) {
        response.resume()
        reply(res, 502, { error: true, message: 'External redirect blocked.' })
        return
      }
      response.headers.location = redirect
    }
    delete response.headers['set-cookie']
    delete response.headers['content-security-policy']
    res.writeHead(response.statusCode || 502, { ...response.headers, ...headers })
    response.pipe(res)
  })
  upstream.on('error', () => {
    if (!res.headersSent) reply(res, 503, { error: true, message: 'Start Gatsby on 127.0.0.1:3002 first.' })
    else res.destroy()
  })
  upstream.end()
}

const server = http.createServer(async (req, res) => {
  // Reject DNS rebinding, cross-origin requests and absolute-form proxy targets.
  if (!validFixtureRequest(req.headers.host, req.headers.origin, req.url)) {
    reply(res, 403, { error: true, message: 'Local fixture only.' })
    return
  }
  let url
  try { url = new URL(req.url, origin) } catch {
    reply(res, 400, { error: true, message: 'Invalid request.' })
    return
  }
  const isFixture = isFixtureEndpoint(url.pathname)
  if (!isFixture) { proxyGatsby(req, res); return }
  try {
    const body = req.method === 'POST' ? await readBody(req) : null
    const result = fixtureRoute(req.method || '', url.pathname, body, fixture)
    if (!result) { reply(res, 404, { error: true, message: 'Unknown fixture route.' }); return }
    reply(res, result.status, result.body)
  } catch {
    if (!res.headersSent && !res.destroyed) reply(res, 400, { error: true, message: 'Invalid fixture request.' })
  }
})
server.listen(port, host, () => {
  process.stdout.write('Local fixture: ' + origin + '/fixture/\n')
})
