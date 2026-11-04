import React, { createContext, useCallback, useEffect, useRef, useState } from 'react'
import { navigate } from 'gatsby'
import Layout from './Layout'
import { claimCheckoutGuard, readCheckoutGuard } from '../utils/checkout-guard.mjs'
import { checkoutPathForStep, checkoutStepForLocation } from '../utils/checkout-routes.mjs'
import { matchesEventInfo } from '../utils/sample-config.mjs'
import { ROUTED_CHECKOUT_RELEASE_QUALIFIED } from '../utils/release-capabilities'

export const CheckoutRouteContext = createContext({ begin: () => false })

// Gatsby's wrapPageElement keeps this wrapper mounted between client-side page
// changes. The SDK component below must keep the same owner and query client.
export default function CheckoutRouteBoundary({ children, location }) {
  const [active, setActive] = useState(null)
  const [completion, setCompletion] = useState(null)
  const activeRef = useRef(null)
  const completionRef = useRef(false)
  const currentStep = useRef('tickets')
  const locationRef = useRef(location)
  const mounted = useRef(false)
  locationRef.current = location

  useEffect(() => {
    mounted.current = true
    return () => { mounted.current = false }
  }, [])

  const begin = useCallback(({ runtime, config, info }) => {
    if (!ROUTED_CHECKOUT_RELEASE_QUALIFIED || activeRef.current ||
        !runtime || typeof runtime.sdk?.ProgressiveCheckout !== 'function' ||
        !matchesEventInfo(config, info) ||
        checkoutStepForLocation(locationRef.current, config) !== 'tickets') return false
    let storage
    try { storage = window.localStorage } catch { storage = null }
    if (readCheckoutGuard(storage) !== 'clear' || !claimCheckoutGuard(storage)) return false
    const owner = { runtime, config }
    currentStep.current = 'tickets'
    completionRef.current = false
    activeRef.current = owner
    setActive(owner)
    return true
  }, [])

  const stepChanged = useCallback((step) => {
    const owner = activeRef.current
    if (!mounted.current || !owner || completionRef.current) return
    const target = checkoutPathForStep(step, owner.config)
    const current = checkoutStepForLocation(locationRef.current, owner.config)
    if (!target || current === null || current === 'complete') return
    currentStep.current = step
    if (current !== step) void navigate(target)
  }, [])

  const stepRejected = useCallback((_requested, current) => {
    const owner = activeRef.current
    if (!mounted.current || !owner || completionRef.current) return
    const target = checkoutPathForStep(current, owner.config)
    if (target) {
      currentStep.current = current
      void navigate(target, { replace: true })
    }
  }, [])

  useEffect(() => {
    if (!active) return
    const current = checkoutStepForLocation(location, active.config)
    if ((completionRef.current && current === 'complete') ||
        (!completionRef.current && current !== null && current !== 'complete')) return
    const target = checkoutPathForStep(completionRef.current ? 'complete' : currentStep.current, active.config)
    if (target) void navigate(target, { replace: true })
  }, [active, location, completion])

  const value = { begin }
  if (!active) {
    return <CheckoutRouteContext.Provider value={value}>{children}</CheckoutRouteContext.Provider>
  }
  const { sdk, QueryClientProvider, queryClient } = active.runtime
  const ProgressiveCheckout = sdk.ProgressiveCheckout
  const routeStep = checkoutStepForLocation(location, active.config)
  const requestedStep = routeStep && routeStep !== 'complete' ? routeStep : currentStep.current
  const complete = (result) => {
    if (!mounted.current || activeRef.current !== active ||
        checkoutStepForLocation(locationRef.current, active.config) === null) return
    completionRef.current = true
    setCompletion(result || {})
    void navigate(checkoutPathForStep('complete', active.config), { replace: true })
  }

  return <CheckoutRouteContext.Provider value={value}>
    <Layout>
      {completion && <section role="status">
        <h1>Check your order</h1>
        <p>Check the order with Ticket Fairy before making another purchase. This sample cannot confirm settlement or ticket issuance.</p>
        {completion.pending && <p>Payment may still be pending.</p>}
        {completion.needIdVerification && <p>Identity verification may be required.</p>}
        {completion.pendingVoucherUrl && <p>A voucher may be required; this sample cannot deliver it.</p>}
      </section>}
      <div hidden={Boolean(completion)}>
        <QueryClientProvider client={queryClient}>
          <ProgressiveCheckout
            eventId={active.config.eventId}
            requestedStep={requestedStep}
            onStepChange={stepChanged}
            onStepRequestRejected={stepRejected}
            confirmationMode="redirect"
            onComplete={complete}
          />
        </QueryClientProvider>
      </div>
    </Layout>
  </CheckoutRouteContext.Provider>
}
