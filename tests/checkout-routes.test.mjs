import test from 'node:test'
import assert from 'node:assert/strict'
import { checkoutPathForStep, checkoutStepForLocation } from '../src/utils/checkout-routes.mjs'

const event = { eventId: '123', eventSlug: 'example-event' }
const location = (pathname, search = '') => ({ pathname, search })

test('maps original event, buyer-details, payment, and status routes', () => {
  assert.equal(checkoutStepForLocation(location('/events/example-event/', '?eventId=123'), event), 'tickets')
  assert.equal(checkoutStepForLocation(location('/events/example-event/', '?eventId=123&step=seats'), event), 'seats')
  assert.equal(checkoutStepForLocation(location('/billing/billing-info/'), event), 'details')
  assert.equal(checkoutStepForLocation(location('/billing/checkout/'), event), 'payment')
  assert.equal(checkoutStepForLocation(location('/billing/checkout-complete/'), event), 'complete')
})

test('rejects a different event, duplicate identity or unknown selection step', () => {
  for (const route of [
    location('/events/another/', '?eventId=123'),
    location('/events/example-event/', '?eventId=456'),
    location('/events/example-event/', '?eventId=123&eventId=456'),
    location('/events/example-event/', '?eventId=123&step=payment'),
    location('/events/example-event/', '?eventId=123&step=seats&step=seats'),
    location('/orders/'),
  ]) assert.equal(checkoutStepForLocation(route, event), null)
})

test('only supported SDK steps produce sample routes', () => {
  assert.equal(checkoutPathForStep('tickets', event), '/events/example-event/?eventId=123')
  assert.equal(checkoutPathForStep('seats', event), '/events/example-event/?eventId=123&step=seats')
  assert.equal(checkoutPathForStep('details', event), '/billing/billing-info/')
  assert.equal(checkoutPathForStep('payment', event), '/billing/checkout/')
  assert.equal(checkoutPathForStep('complete', event), '/billing/checkout-complete/')
  assert.equal(checkoutPathForStep('unrecognized', event), null)
})
