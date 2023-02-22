import { setConfigs } from 'tf-checkout-react'
import { ENV } from './env';

export const setTfCheckoutReactConfigs = () => {
  setConfigs(ENV)
}