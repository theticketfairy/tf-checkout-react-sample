import React, { useEffect, useState } from 'react'
import { navigate } from 'gatsby'
import Layout from '../../components/Layout'
import LegacyRouteNotice from '../../components/LegacyRouteNotice'
import { getCheckoutRuntime } from '../../utils/checkout-runtime'
import { readConfiguration } from '../../utils/sample-config.mjs'

// The SDK's proposed OrderHistory is held for ambient-cookie buyer isolation.
// Keep this off until an approved account configuration, enforced identity
// retirement and the ready-made layout have all been released and qualified.
// Flipping this flag by itself does not establish a safe account session.
const ACCOUNT_LAYOUT_RELEASE_QUALIFIED = false

export default function Orders() {
  const [runtime, setRuntime] = useState(null)
  const [error, setError] = useState(false)
  useEffect(() => {
    let active = true
    if (!ACCOUNT_LAYOUT_RELEASE_QUALIFIED) return () => { active = false }
    const config = readConfiguration()
    if (!config.value) { setError(true); return () => { active = false } }
    getCheckoutRuntime(config.value)
      .then((value) => { if (active) setRuntime(value) })
      .catch(() => { if (active) setError(true) })
    return () => { active = false }
  }, [])

  if (!ACCOUNT_LAYOUT_RELEASE_QUALIFIED) return <LegacyRouteNotice title="My tickets and orders">
    <p>This route is being migrated to the SDK's ready-made OrderHistory layout. Full-account authorization and buyer isolation must be qualified before it can be enabled.</p>
    <p>See docs/account-and-resale.md for the SDK dependency and migration details.</p>
  </LegacyRouteNotice>
  if (error) return <LegacyRouteNotice title="My tickets and orders">
    <p>The account layout could not be prepared.</p>
  </LegacyRouteNotice>
  if (!runtime) return <Layout><p role="status">Preparing your orders...</p></Layout>
  const { QueryClientProvider, queryClient, sdk } = runtime
  const OrderHistory = sdk.OrderHistory
  if (typeof OrderHistory !== 'function') return <LegacyRouteNotice title="My tickets and orders">
    <p>This route requires a released SDK with OrderHistory support.</p>
  </LegacyRouteNotice>
  return <Layout>
    <QueryClientProvider client={queryClient}>
      <OrderHistory onSelectOrder={(id) => {
        if (/^[1-9][0-9]*$/.test(id)) navigate('/order/?o=' + encodeURIComponent(id))
      }} />
    </QueryClientProvider>
  </Layout>
}
