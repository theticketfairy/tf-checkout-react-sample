import test from 'node:test'
import assert from 'node:assert/strict'
import { FIXTURE_CSP, isFixtureEndpoint, localGatsbyRedirect, validFixtureRequest } from '../fixture/boundary.mjs'

test('accepts only the exact loopback host and rejects external origins or proxy targets', () => {
  assert.equal(validFixtureRequest('127.0.0.1:4102', undefined, '/fixture/'), true)
  assert.equal(validFixtureRequest('127.0.0.1:4102', 'http://127.0.0.1:4102', '/api/v1/event/1'), true)
  for (const [host, origin, target] of [
    ['attacker.test', undefined, '/fixture/'],
    ['127.0.0.1:4102', 'https://attacker.test', '/fixture/'],
    ['127.0.0.1:4102', undefined, 'https://attacker.test/'],
    ['127.0.0.1:4102', undefined, '//attacker.test/'],
    ['127.0.0.1:4102', undefined, '/\\\\attacker.test/'],
  ]) assert.equal(validFixtureRequest(host, origin, target), false)
})

test('all API and ajax paths are intercepted instead of proxied', () => {
  for (const path of ['/api', '/api/unknown', '/ajax', '/ajax/contact-email/'])
    assert.equal(isFixtureEndpoint(path), true)
  assert.equal(isFixtureEndpoint('/fixture/'), false)
})

test('allows only local Gatsby redirects and defines a same-origin content policy', () => {
  assert.equal(localGatsbyRedirect('http://127.0.0.1:3002/fixture/?x=1'), '/fixture/?x=1')
  assert.equal(localGatsbyRedirect('https://example.test/'), null)
  assert.equal(localGatsbyRedirect('//example.test/'), null)
  assert.match(FIXTURE_CSP, /connect-src 'self'/)
  assert.match(FIXTURE_CSP, /frame-src 'none'/)
  assert.match(FIXTURE_CSP, /form-action 'self'/)
})
