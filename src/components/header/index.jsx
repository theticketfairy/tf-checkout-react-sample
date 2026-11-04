import React, { useState } from 'react'
import { Link } from 'gatsby'

export default function Header() {
  const [expanded, setExpanded] = useState(false)
  return <header className="header" style={{ borderBottom: '1px solid #ddd' }}>
    <style>{`
      @media (min-width: 601px) { .sample-menu-toggle { display: none; } }
      @media (max-width: 600px) { .sample-menu-list:not(.is-open) { display: none !important; } }
    `}</style>
    <div className="linear-row" />
    <div className="header-contianer" style={{ maxWidth: 960, margin: 'auto', padding: '1rem', display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
      <div className="logo-container">
        <Link to="/" aria-label="Ticket Fairy sample home"><strong>Ticket Fairy</strong></Link>
      </div>
      <nav className="nav" aria-label="Main navigation">
        <div className={expanded ? 'nav-menu expanded' : 'nav-menu'}>
          <button className="hamburger sample-menu-toggle" type="button" aria-expanded={expanded} aria-controls="sample-menu"
            aria-label={expanded ? 'Close menu' : 'Open menu'}
            onClick={() => setExpanded((value) => !value)}>
            <span aria-hidden="true">☰</span>
          </button>
          <ul id="sample-menu" className={expanded ? 'sample-menu-list is-open' : 'sample-menu-list'} style={{ display: 'flex', gap: '1rem', alignItems: 'center', listStyle: 'none', margin: 0, padding: 0 }}>
            <li><Link className="nav-button" to="/orders/">My Tickets</Link></li>
            <li><button className="nav-button" type="button" disabled
              title="Account sign-in is being updated in the SDK">Log in</button></li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
}
