import test from 'node:test'
import assert from 'node:assert/strict'
import { CHECKOUT_GUARD_KEY, claimCheckoutGuard, readCheckoutGuard } from '../src/utils/checkout-guard.mjs'

const storage = () => {
  const values = new Map()
  return {
    getItem: (key) => values.has(key) ? values.get(key) : null,
    setItem: (key, value) => values.set(key, String(value)),
  }
}

test('a started session remains guarded when a new route reads the same storage', () => {
  const shared = storage()
  assert.equal(readCheckoutGuard(shared), 'clear')
  assert.equal(claimCheckoutGuard(shared), true)
  assert.equal(readCheckoutGuard(shared), 'unresolved')
  assert.equal(claimCheckoutGuard(shared), false)
})

test('unknown values fail closed, not just the marker written by this version', () => {
  const shared = storage()
  shared.setItem(CHECKOUT_GUARD_KEY, 'unrecognized')
  assert.equal(readCheckoutGuard(shared), 'unresolved')
  assert.equal(claimCheckoutGuard(shared), false)
})

test('missing, unreadable, unwritable, or non-persistent storage fails closed', () => {
  const deniedRead = { getItem() { throw new Error('denied') } }
  const deniedWrite = { getItem() { return null }, setItem() { throw new Error('denied') } }
  const noPersistence = { getItem() { return null }, setItem() {} }
  assert.equal(readCheckoutGuard(null), 'unavailable')
  assert.equal(readCheckoutGuard(deniedRead), 'unavailable')
  assert.equal(claimCheckoutGuard(deniedWrite), false)
  assert.equal(claimCheckoutGuard(noPersistence), false)
})
