import React from 'react'
import LegacyRouteNotice from '../../components/LegacyRouteNotice'

export default function CheckoutComplete() {
  return <LegacyRouteNotice title="Check your order">
    <p>This legacy route does not establish whether an order was placed, payment settled or tickets issued.</p>
  </LegacyRouteNotice>
}
