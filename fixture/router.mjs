// Deliberately tiny, in-memory free-order fixture. It has no outbound I/O.
const envelope = (attributes) => ({ data: { attributes } })
const ok = (attributes) => ({ status: 200, body: envelope(attributes) })
const reject = (status, message) => ({ status, body: { error: true, message } })
const pathWithoutTrailingSlash = (path) => path.replace(/\/+$/, '') || '/'
const ticketId = 'fixture-free-ticket'

export function newFixtureState() {
  return { quantity: 0, orderCreated: false, completed: false }
}

// Body data is inspected only to reject non-fixture buyer details; it is never
// logged, returned or stored. Production and provider routes are never proxied.
export function fixtureRoute(method, rawPath, body, state) {
  const path = pathWithoutTrailingSlash(rawPath)
  // With baseUrl: '', beta.28's Axios transport resolves this root-looking URL
  // under /api; retain the direct spelling too for an explicit host proxy.
  if (method === 'POST' &&
      (path === '/api/ajax/contact-email' || path === '/ajax/contact-email')) {
    return { status: 200, body: { exists: 0 } }
  }
  if (!path.startsWith('/api/')) return null
  if (method === 'GET' && path === '/api/v1/event/1') {
    return ok({
      name: 'Fixture Festival (simulation)', slug: 'fixture-festival',
      currency: { currency: 'USD', symbol: '$', decimal_places: 2 },
      allowMultipleTicketTypePurchases: false,
    })
  }
  if (method === 'GET' && path === '/api/v1/event/1/tickets') {
    return ok({
      tickets: {
        [ticketId]: {
          id: ticketId, selectionKey: 'event:1:ticket:1', isRegularTicket: true,
          displayName: 'Simulated free ticket', optionName: 'fixture-ticket-type',
          price: 0, basePrice: 0, priceCurrency: 'USD', priceSymbol: '$',
          feeIncluded: true, salesStarted: true, salesEnded: false,
          soldOut: false, minQuantity: 1, maxQuantity: 4, multiplier: 1,
          allowDirectPurchase: true,
        },
      },
    })
  }
  if (method === 'POST' && path === '/api/v1/event/1/sdk-session') {
    return ok({
      guestToken: 'fixture-guest-0000000000000001',
      seatGrant: 'sdk-seat1.' + (Math.floor(Date.now() / 1000) + 1200) + '.' + 'a'.repeat(64),
      expiresAt: Date.now() + 1200000,
    })
  }
  if (method === 'GET' && path === '/api/v1/event/1/sdk/auth/profile') {
    return ok({ authenticated: false, twoFactorRequired: false, smsAvailable: false, profile: null })
  }
  if (method === 'POST' && path === '/api/v1/event/1/currency') {
    return ok({ currency: 'USD', symbol: '$', default: 'USD', available: [] })
  }
  if (method === 'POST' && path === '/api/v1/event/1/add-to-cart') {
    const attributes = body?.data?.attributes
    const lines = attributes?.ticket_types
    const ids = lines && typeof lines === 'object' ? Object.keys(lines) : []
    const qty = Number(lines?.[ticketId]?.quantity)
    if (ids.length !== 1 || ids[0] !== ticketId || !Number.isInteger(qty) || qty < 1 || qty > 4) {
      return reject(422, 'Choose one to four simulated tickets.')
    }
    state.quantity = qty
    state.orderCreated = false
    state.completed = false
    return ok({ names_required: false })
  }
  if (method === 'GET' && path === '/api/v1/cart') {
    if (!state.quantity) return reject(409, 'No simulated cart exists.')
    return ok({ expiresAt: 600, payment: { gateway: 'stripe_payment_intents' } })
  }
  if (method === 'POST' && path === '/api/v1/checkout') {
    if (!state.quantity) return reject(409, 'No simulated cart exists.')
    return ok({
      cart_price_breakdown: {
        total: 0, total_add_ons: 0, currency: { currency: 'USD', symbol: '$' },
        tickets_price_breakdown: [{
          ticket_type_id: '1', ticket_type_name: 'Simulated free ticket',
          quantity: state.quantity, price_per_ticket: '0.00', total_price: 0,
        }],
      },
    })
  }
  if (method === 'GET' && path === '/api/v1/checkout-configs') return ok({ names_required: false, free_ticket: true, hide_phone_field: true })
  if (method === 'GET' && path === '/api/v1/event/1/custom_fields') return ok([])
  if (method === 'GET' && path === '/api/v1/event/1/add-ons') return ok({ add_ons: [] })
  if (method === 'GET' && path === '/api/v1/event/1/conditions') return ok([])
  if (method === 'GET' && path === '/api/v1/event/1/waiver') return ok({ waiver: null })
  if (method === 'GET' && path === '/api/countries/list') {
    return { status: 200, body: { data: [{ id: 1, name: 'United States', code: 'US' }] } }
  }
  if (method === 'GET' && path === '/api/countries/1/states') {
    return { status: 200, body: { data: {} } }
  }
  if (method === 'POST' && path === '/api/v1/on-checkout') {
    const a = body?.data?.attributes
    if (!state.quantity || !a || a.first_name !== 'Demo' || a.last_name !== 'Buyer' ||
      a.email !== 'demo@example.test' || a.confirm_email !== 'demo@example.test' ||
      a.phone || a.street_address || a.city || a.zip) {
      return reject(422, 'Use only the displayed fictional buyer details and no address or phone.')
    }
    state.orderCreated = true
    return ok({ hash: 'fixture-order', total: '0', pay_now: '0', status: 'pending' })
  }
  if (method === 'GET' && path === '/api/v1/order/fixture-order/review') {
    if (!state.orderCreated) return reject(409, 'No simulated order exists.')
    return ok({ order_details: { id: 1, total: '0', currency: 'USD' }, payment_method: {} })
  }
  if (method === 'POST' && path === '/api/v1/order/fixture-order/complete_free_registration') {
    if (!state.orderCreated) return reject(409, 'No simulated order exists.')
    state.completed = true
    return ok({ simulated: true })
  }
  return reject(404, 'This route is not implemented by the local fixture.')
}
