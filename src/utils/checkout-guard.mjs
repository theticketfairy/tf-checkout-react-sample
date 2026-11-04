// Advisory origin-scoped guard. This is not an atomic or cross-device lock and
// cannot intercept retries offered by the SDK's stock payment screen.
export const CHECKOUT_GUARD_KEY = 'tf-sample-checkout-unresolved-v1'

export function readCheckoutGuard(storage) {
  try {
    if (!storage || typeof storage.getItem !== 'function') return 'unavailable'
    return storage.getItem(CHECKOUT_GUARD_KEY) === null ? 'clear' : 'unresolved'
  } catch {
    return 'unavailable'
  }
}

export function claimCheckoutGuard(storage) {
  if (readCheckoutGuard(storage) !== 'clear') return false
  try {
    storage.setItem(CHECKOUT_GUARD_KEY, 'session-started')
    return storage.getItem(CHECKOUT_GUARD_KEY) === 'session-started'
  } catch {
    return false
  }
}
