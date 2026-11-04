import test from 'node:test'
import assert from 'node:assert/strict'
import { fixtureRoute, newFixtureState } from '../fixture/router.mjs'

const order = { data: { attributes: {
  first_name: 'Demo', last_name: 'Buyer', email: 'demo@example.test',
  confirm_email: 'demo@example.test',
} } }
const cart = { data: { attributes: {
  ticket_types: { 'fixture-free-ticket': { quantity: 1 } },
} } }

test('only the simulated free event, cart and order can complete', () => {
  const state = newFixtureState()
  assert.equal(fixtureRoute('GET', '/api/v1/event/1', null, state).status, 200)
  assert.equal(fixtureRoute('POST', '/api/v1/event/1/add-to-cart/', cart, state).status, 200)
  assert.equal(fixtureRoute('POST', '/api/v1/on-checkout/', order, state).status, 200)
  const review = fixtureRoute('GET', '/api/v1/order/fixture-order/review', null, state)
  assert.equal(review.body.data.attributes.order_details.total, '0')
  assert.equal(fixtureRoute('POST', '/api/v1/order/fixture-order/complete_free_registration', null, state).status, 200)
  assert.equal(state.completed, true)
  assert.deepEqual(Object.keys(state).sort(), ['completed', 'orderCreated', 'quantity'])
})

test('rejects provider routes, real events, and order attempts before a cart', () => {
  const state = newFixtureState()
  for (const [method, path] of [
    ['GET', '/api/v1/event/55263'],
    ['POST', '/api/payments/submit-payment/fixture-order'],
    ['POST', '/api/v1/order/fixture-order/stripe/confirm-redirect'],
    ['POST', '/api/v1/order/fixture-order/complete_free_registration'],
  ]) assert.notEqual(fixtureRoute(method, path, null, state).status, 200)
  assert.notEqual(fixtureRoute('POST', '/api/v1/on-checkout/', order, state).status, 200)
})

test('accepts only fixture buyer details and does not store them', () => {
  const state = newFixtureState()
  fixtureRoute('POST', '/api/v1/event/1/add-to-cart/', cart, state)
  const bad = { data: { attributes: { ...order.data.attributes, email: 'someone@example.test' } } }
  assert.equal(fixtureRoute('POST', '/api/v1/on-checkout/', bad, state).status, 422)
  assert.equal(state.orderCreated, false)
  assert.deepEqual(Object.keys(state).sort(), ['completed', 'orderCreated', 'quantity'])
})

test('handles the actual same-origin SDK email lookup and rejects unsupported methods', () => {
  const state = newFixtureState()
  const lookup = fixtureRoute('POST', '/api/ajax/contact-email/', null, state)
  assert.equal(lookup.status, 200)
  assert.deepEqual(lookup.body, { exists: 0 })
  assert.equal(fixtureRoute('GET', '/api/ajax/contact-email/', null, state).status, 404)
  assert.equal(fixtureRoute('POST', '/ajax/contact-email/', null, state).status, 200)
})
