import * as React from "react"
import { navigate } from 'gatsby'
import { setTfCheckoutReactConfigs } from '../../tf-checkout-config'

setTfCheckoutReactConfigs()

const IndexPage = () => {
  navigate('/events/ash-s-test-event/?eventId=12145')
  
  return (
    <main>
    </main>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>
