import React from 'react'
import Header from '../header'
import Footer from '../footer'

export default function Layout({ children }) {
  return <div style={{ fontFamily: 'system-ui, sans-serif', color: '#171529', lineHeight: 1.5 }}>
    <Header />
    <main className="main-layout-content" style={{ maxWidth: 960, margin: '2rem auto', padding: '0 1rem 3rem' }}>
      {children}
    </main>
    <Footer />
  </div>
}
