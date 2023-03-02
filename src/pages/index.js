import * as React from "react"
import { navigate } from 'gatsby'
import { setTfCheckoutReactConfigs } from '../utils/tf-checkout-config'
import { useEffect } from "react"

setTfCheckoutReactConfigs()

const IndexPage = () => {
  useEffect(() => {
    navigate('/events/ash-s-test-event/?eventId=98')
  }, [])
  
  return (
    <main>
    </main>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>
