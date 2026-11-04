import test from 'node:test'
import assert from 'node:assert/strict'
import { matchesConfiguredRoute, matchesEventInfo, validateConfiguration } from '../src/utils/sample-config.mjs'

const approved = {
  environment: 'PROD',
  clientId: 'public-client',
  eventId: '123',
  eventSlug: 'example-test-event',
  testAcknowledgement: 'I_VERIFIED_TEST_PAYMENTS',
}

test('requires explicit test payment acknowledgement even on a production host', () => {
  assert.ok(validateConfiguration({ ...approved, testAcknowledgement: '' }).error)
  assert.ok(validateConfiguration(approved).value)
})

test('rejects missing, malformed, and unapproved configuration', () => {
  for (const patch of [
    { environment: 'UNKNOWN' }, { clientId: ' ' }, { eventId: '0' },
    { eventId: '123/456' }, { eventSlug: '../another' }, { eventSlug: '' },
  ]) {
    assert.ok(validateConfiguration({ ...approved, ...patch }).error)
  }
})

test('allows only the exact configured route and one event ID', () => {
  const config = validateConfiguration(approved).value
  assert.equal(matchesConfiguredRoute('example-test-event', '?eventId=123', config), true)
  for (const [slug, query] of [
    ['another-event', '?eventId=123'], ['example-test-event', '?eventId=456'],
    ['example-test-event', '?eventId=123&eventId=456'],
    ['example-test-event', ''], ['../example-test-event', '?eventId=123'],
  ]) {
    assert.equal(matchesConfiguredRoute(slug, query, config), false)
  }
})

test('requires the SDK event lookup to return a matching slug and nonempty name', () => {
  const config = validateConfiguration(approved).value
  assert.equal(matchesEventInfo(config, { slug: config.eventSlug, name: 'Test event' }), true)
  for (const info of [
    null, {}, { slug: 'another-event', name: 'Test event' },
    { slug: config.eventSlug, name: '  ' }, { slug: config.eventSlug, name: 123 },
  ]) {
    assert.equal(matchesEventInfo(config, info), false)
  }
})
