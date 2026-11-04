import React from 'react'
import LegacyRouteNotice from '../../components/LegacyRouteNotice'

export default function BillingInfo() {
  return <LegacyRouteNotice title="Billing page moved">
    <p>Billing is now part of the embedded checkout on the configured event page. This sample cannot resume a cart created by the old 1.x page.</p>
  </LegacyRouteNotice>
}
