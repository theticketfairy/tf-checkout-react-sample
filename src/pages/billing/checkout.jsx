import React from 'react'
import LegacyRouteNotice from '../../components/LegacyRouteNotice'

export default function Checkout() {
  return <LegacyRouteNotice title="Checkout page moved">
    <p>Payment is now part of the embedded checkout on the configured event page. This sample cannot resume a cart created by the old 1.x page.</p>
  </LegacyRouteNotice>
}
