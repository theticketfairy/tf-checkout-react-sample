import React from 'react'

export default function Footer() {
  return <footer className="footer-container" style={{ borderTop: '1px solid #ddd', padding: '1.5rem 1rem' }}>
    <div className="linear-row" />
    <div className="content" style={{ maxWidth: 960, margin: 'auto' }}>
      © {new Date().getFullYear()} All Rights Reserved.{' '}
      <a href="https://www.ticketfairy.com/privacy-policy/" target="_blank" rel="noreferrer">Privacy</a>
      {' | '}
      <a href="https://www.ticketfairy.com/terms-of-service/" target="_blank" rel="noreferrer">Terms</a>
    </div>
  </footer>
}
