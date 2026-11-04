import React, { useContext, useEffect, useRef, useState } from 'react'
import Layout from '../../components/Layout'
import { CheckoutRouteContext } from '../../components/CheckoutRouteBoundary'
import { getCheckoutRuntime } from '../../utils/checkout-runtime'
import { readCheckoutGuard } from '../../utils/checkout-guard.mjs'
import { matchesConfiguredRoute, matchesEventInfo, readConfiguration } from '../../utils/sample-config.mjs'
import { ROUTED_CHECKOUT_RELEASE_QUALIFIED } from '../../utils/release-capabilities'

export default function EventPage({ params, location }) {
  const [state, setState] = useState({ kind: 'checking' })
  const [startError, setStartError] = useState(false)
  const { begin } = useContext(CheckoutRouteContext)
  const mounted = useRef(false)
  const starting = useRef(false)
  const slug = params && params.slug
  const search = (location && location.search) || ''
  const routeKey = String(slug || '') + '\\0' + search
  const current = useRef({ routeKey, generation: 0 })
  if (current.current.routeKey !== routeKey) {
    current.current = { routeKey, generation: current.current.generation + 1 }
  }
  const config = readConfiguration()
  const validRoute = !config.error && matchesConfiguredRoute(slug, search, config.value)
  const routeState = state.routeKey === routeKey ? state : { kind: 'checking', routeKey }

  useEffect(() => {
    mounted.current = true
    return () => { mounted.current = false; current.current.generation += 1 }
  }, [])

  useEffect(() => {
    let storage
    try { storage = window.localStorage } catch { storage = null }
    const status = readCheckoutGuard(storage)
    setState({ kind: status === 'clear' ? 'preview' : 'guarded', routeKey })
    setStartError(false)
  }, [routeKey])

  const checkEvent = async () => {
    if (!validRoute || routeState.kind !== 'preview' || starting.current) return
    starting.current = true
    const generation = current.current.generation
    const stillCurrent = () => mounted.current &&
      current.current.generation === generation && current.current.routeKey === routeKey
    let storage
    try { storage = window.localStorage } catch { storage = null }
    if (readCheckoutGuard(storage) !== 'clear') {
      if (stillCurrent()) setState({ kind: 'guarded', routeKey })
      starting.current = false
      return
    }
    if (stillCurrent()) setState({ kind: 'loading', routeKey })
    try {
      const runtime = await getCheckoutRuntime(config.value)
      if (!stillCurrent()) return
      // This may start or renew an event-scoped SDK session, so it is called
      // only after the operator explicitly chooses to inspect the event.
      const info = await runtime.ttf.events.info(config.value.eventId)
      if (!matchesEventInfo(config.value, info)) throw new Error('Event identity mismatch')
      if (stillCurrent()) setState({ kind: 'ready', routeKey, runtime, info })
    } catch {
      if (stillCurrent()) setState({ kind: 'unavailable', routeKey })
    } finally {
      starting.current = false
    }
  }

  let content
  if (!validRoute) {
    content = <p role="alert">This route does not match the configured and approved test event. Check the sample configuration and event link.</p>
  } else if (routeState.kind === 'checking') {
    content = <p role="status">Checking local session state...</p>
  } else if (routeState.kind === 'guarded') {
    content = <section role="alert">
      <h1>Check the previous test session</h1>
      <p>A previous session may be unresolved, or browser storage is unavailable. Check its order and payment status before starting another session. See the README for recovery limitations.</p>
    </section>
  } else if (routeState.kind === 'loading') {
    content = <p role="status">Checking the test event...</p>
  } else if (routeState.kind === 'unavailable') {
    content = <p role="alert">The event response could not be matched. Check the ID, slug, environment and browser access before continuing.</p>
  } else if (routeState.kind === 'preview') {
    content = <section>
      <h1>Review the configured test event</h1>
      <p>Event slug: <strong>{config.value.eventSlug}</strong></p>
      <p>Event ID: <strong>{config.value.eventId}</strong></p>
      <p>Environment: <strong>{config.value.environment}</strong></p>
      <p>These are operator-supplied values, not yet independently verified. Confirm them against the approved event and verify its merchant is configured for test payments. A production-hosted event can take real payments.</p>
      <p>Starting can create or renew an event-scoped SDK session. Payment remains disabled.</p>
      <button type="button" onClick={checkEvent}>Start test session and check the event</button>
    </section>
  } else {
    const { info, runtime } = routeState
    content = <section>
      <h1>{info.name}</h1>
      <p>Event slug: <strong>{info.slug}</strong></p>
      <p>Event ID: <strong>{config.value.eventId}</strong></p>
      {!ROUTED_CHECKOUT_RELEASE_QUALIFIED ? (
        <p role="status">The routed checkout is unavailable until the SDK navigation, seat-hold and payment recovery contracts are qualified.</p>
      ) : (
        <>
          <button type="button" onClick={() => {
            if (!begin({ runtime, config: config.value, info })) setStartError(true)
          }}>Continue to tickets</button>
          {startError && <p role="alert">The routed checkout could not be started. Check the SDK version and existing session status.</p>}
        </>
      )}
    </section>
  }
  return <Layout>{content}</Layout>
}

export const Head = () => <title>Test event checkout</title>
