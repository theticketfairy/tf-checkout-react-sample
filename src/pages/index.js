import React, { useEffect } from 'react'
import { Link, navigate } from 'gatsby'
import Layout from '../components/Layout'
import { readConfiguration } from '../utils/sample-config.mjs'

export default function IndexPage() {
  const config = readConfiguration()
  const event = config.value
  const eventPath = event ?
    '/events/' + encodeURIComponent(event.eventSlug) + '/?eventId=' + encodeURIComponent(event.eventId) :
    null
  useEffect(() => {
    if (eventPath) void navigate(eventPath, { replace: true })
  }, [eventPath])

  return <Layout>
    <h1>Test the embedded checkout</h1>
    <p>This example is for an explicitly approved test event with verified test payments.</p>
    {config.error ? (
      <section role="alert">
        <h2>Configuration needed</h2>
        <p>{config.error}</p>
        <p>See the README for the required public client and test-event settings.</p>
      </section>
    ) : (
      <section>
        <p>Opening event <strong>{event.eventSlug}</strong> (ID {event.eventId}).</p>
        <p>If you are not redirected, <Link to={eventPath}>open the configured test event</Link>.</p>
      </section>
    )}
  </Layout>
}

export const Head = () => <title>Ticket Fairy checkout sample</title>
