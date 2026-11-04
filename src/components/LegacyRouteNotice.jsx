import React from 'react'
import { Link } from 'gatsby'
import Layout from './Layout'

export default function LegacyRouteNotice({ title, children }) {
  return (
    <Layout>
      <h1>{title}</h1>
      {children}
      <p>
        This sample cannot establish your order status. If you have already
        attempted payment, check your account or contact Ticket Fairy support
        before starting another purchase.
      </p>
      <Link to="/">Return to the sample home</Link>
    </Layout>
  )
}
