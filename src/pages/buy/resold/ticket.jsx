import React from 'react'
import LegacyRouteNotice from '../../../components/LegacyRouteNotice'

export default function ResoldTicket() {
  return <LegacyRouteNotice title="Resale checkout">
    <p>The SDK can resume a cart already created in the current session, but this sample has no verified preceding buyer-side resale acceptance and cart-creation integration.</p>
    <p>See docs/account-and-resale.md for the sender hook, the ResumedCheckout contract and the missing buyer-side steps.</p>
  </LegacyRouteNotice>
}
