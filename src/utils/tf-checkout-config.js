import { setConfigs } from 'tf-checkout-react'
import { ENV } from '../constants/env'

export const setTfCheckoutReactConfigs = () => {
  setConfigs(ENV)
}