import React, { useEffect, useState } from 'react'

const allowedOrigin = 'http://127.0.0.1:4102'

// The local proxy constrains subresources and returns only fixture API data.
// It is not a browser navigation or operating-system network firewall.
export default function FixturePage() {
  const [runtime, setRuntime] = useState(null)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
  const [layout, setLayout] = useState('embedded')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    let active = true
    if (window.location.origin !== allowedOrigin) {
      setError('Open this page through the local fixture server at ' + allowedOrigin + '/fixture/.')
      return () => { active = false }
    }
    Promise.all([import('tf-checkout-react'), import('@tanstack/react-query')])
      .then(([sdk, query]) => {
        if (!active) return
        if (sdk.isConfigured()) throw new Error('Reload the fixture to start with a fresh SDK session.')
        sdk.configureCheckout({
          baseUrl: '',
          clientId: 'fixture',
          clientSecret: '',
          cookieAuth: false,
          withCredentials: false,
          storage: sdk.createMemoryStorage(),
        })
        setRuntime({
          sdk,
          Provider: query.QueryClientProvider,
          client: new query.QueryClient({ defaultOptions: { queries: { retry: false } } }),
        })
      })
      .catch(() => { if (active) setError('The SDK could not be loaded. Reload to start a fresh fixture session.') })
    return () => { active = false }
  }, [])

  const complete = (order) => {
    if (order?.free === true) setResult({ free: true })
    else setError('Unexpected non-free fixture result. The simulation has stopped.')
  }

  let checkout = <p role="status">Preparing the local fixture...</p>
  if (error) checkout = <p role="alert">{error}</p>
  else if (result) checkout = <section role="status">
    <h2>Simulation complete</h2>
    <p>No payment was taken and no real ticket was issued. Reload to select another layout.</p>
  </section>
  else if (runtime && !started) checkout = <form onSubmit={(event) => { event.preventDefault(); setStarted(true) }}>
    <label htmlFor="fixture-layout">Choose a sample layout</label>{' '}
    <select id="fixture-layout" value={layout} onChange={(event) => setLayout(event.target.value)}>
      <option value="embedded">Embedded checkout</option>
      <option value="single" disabled={!runtime.sdk.SinglePageCheckout}>Single page{!runtime.sdk.SinglePageCheckout ? ' (SDK update required)' : ''}</option>
      <option value="steps" disabled={!runtime.sdk.ProgressiveCheckout}>Step by step{!runtime.sdk.ProgressiveCheckout ? ' (SDK update required)' : ''}</option>
      <option value="accordion" disabled={!runtime.sdk.AccordionCheckout}>Accordion{!runtime.sdk.AccordionCheckout ? ' (SDK update required)' : ''}</option>
    </select>{' '}
    <button type="submit">Start simulation</button>
  </form>
  else if (runtime) {
    const { sdk, Provider, client } = runtime
    const Layout = {
      embedded: sdk.EmbeddedCheckout,
      single: sdk.SinglePageCheckout,
      steps: sdk.ProgressiveCheckout,
      accordion: sdk.AccordionCheckout,
    }[layout]
    checkout = typeof Layout !== 'function' ?
      <p role="alert">This ready-made layout requires the forthcoming SDK update.</p> :
      <Provider client={client}>
        <Layout
          eventId="1"
          auth={false}
          readAttributionFromUrl={false}
          collectTicketHolders={false}
          collectHolderContact={false}
          requireEmailConfirmation={false}
          confirmationMode="redirect"
          onComplete={complete}
        />
      </Provider>
  }
  return <main style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 960, margin: '2rem auto', padding: '0 1rem' }}>
    <h1>Local checkout simulation</h1>
    <p>This is a fictional free event. The local server cannot create a real order or connect to a payment provider.</p>
    <p>Use only <strong>Demo Buyer</strong> and <strong>demo@example.test</strong>; do not enter a phone number, address, real personal information or card details.</p>
    {checkout}
  </main>
}

export const Head = () => <title>Local checkout simulation</title>
