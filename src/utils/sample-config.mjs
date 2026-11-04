// Only public values belong here: Gatsby embeds GATSBY_ variables in the page.
export function readConfiguration() {
  return validateConfiguration({
    environment: process.env.GATSBY_TTF_ENV,
    clientId: process.env.GATSBY_TTF_PUBLIC_CLIENT_ID,
    eventId: process.env.GATSBY_TTF_TEST_EVENT_ID,
    eventSlug: process.env.GATSBY_TTF_TEST_EVENT_SLUG,
    testAcknowledgement: process.env.GATSBY_TTF_TEST_PAYMENT_ACKNOWLEDGEMENT,
  })
}

const safeSlug = (value) =>
  typeof value === 'string' && /^[A-Za-z0-9]+(?:[-_][A-Za-z0-9]+)*$/.test(value) &&
  value.length <= 160

const safeEventId = (value) =>
  typeof value === 'string' && /^[1-9][0-9]{0,15}$/.test(value)

export function validateConfiguration(raw) {
  if (!raw || !['DEV', 'STAG', 'PROD'].includes(raw.environment)) {
    return { error: 'Set GATSBY_TTF_ENV to the approved test event environment.' }
  }
  if (typeof raw.clientId !== 'string' || !raw.clientId.trim()) {
    return { error: 'Set the registered public SDK client ID.' }
  }
  if (!safeEventId(raw.eventId) || !safeSlug(raw.eventSlug)) {
    return { error: 'Set the approved test event ID and slug.' }
  }
  if (raw.testAcknowledgement !== 'I_VERIFIED_TEST_PAYMENTS') {
    return { error: 'Verify the event uses test payments and set the test-payment acknowledgement.' }
  }
  return {
    value: {
      environment: raw.environment,
      clientId: raw.clientId.trim(),
      eventId: raw.eventId,
      eventSlug: raw.eventSlug,
    },
  }
}

export function matchesConfiguredRoute(slug, search, expected) {
  if (!expected || !safeSlug(slug) || typeof search !== 'string') return false
  const ids = new URLSearchParams(search).getAll('eventId')
  return ids.length === 1 && ids[0] === expected.eventId && slug === expected.eventSlug
}

export function matchesEventInfo(expected, info) {
  return !!expected && !!info &&
    typeof info.name === 'string' && !!info.name.trim() &&
    typeof info.slug === 'string' && info.slug === expected.eventSlug
}
