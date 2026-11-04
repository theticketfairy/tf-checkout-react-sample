// Route values contain no cart, buyer, order, or payment credentials.
const cleanPath = (value) => typeof value === 'string'
  ? (value.replace(/\/+$/, '') || '/')
  : ''

export function checkoutStepForLocation(location, event) {
  if (!event || !location || typeof location.search !== 'string') return null
  const path = cleanPath(location.pathname)
  if (path === '/billing/billing-info') return 'details'
  if (path === '/billing/checkout') return 'payment'
  if (path === '/billing/checkout-complete') return 'complete'
  const eventPath = '/events/' + encodeURIComponent(event.eventSlug)
  if (path !== eventPath) return null
  const query = new URLSearchParams(location.search)
  const ids = query.getAll('eventId')
  const steps = query.getAll('step')
  if (ids.length !== 1 || ids[0] !== event.eventId || steps.length > 1) return null
  if (steps.length === 0) return 'tickets'
  return steps[0] === 'seats' ? 'seats' : null
}

export function checkoutPathForStep(step, event) {
  if (!event) return null
  if (step === 'details') return '/billing/billing-info/'
  if (step === 'payment') return '/billing/checkout/'
  if (step === 'complete') return '/billing/checkout-complete/'
  if (step !== 'tickets' && step !== 'seats') return null
  const base = '/events/' + encodeURIComponent(event.eventSlug) +
    '/?eventId=' + encodeURIComponent(event.eventId)
  return step === 'seats' ? base + '&step=seats' : base
}
