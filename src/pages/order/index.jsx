import React from 'react'
import LegacyRouteNotice from '../../components/LegacyRouteNotice'

export default function Order() {
  return <LegacyRouteNotice title="Order details">
    <p>Order details are unavailable until each request enforces the currently authorized buyer, including when a browser cookie changes outside the SDK.</p>
    <p>See docs/account-and-resale.md for numeric order IDs, supported 2.x APIs, buyer isolation and ticket actions.</p>
  </LegacyRouteNotice>
}
