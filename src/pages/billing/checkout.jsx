import React from "react";
import { PaymentContainer, currencyNormalizerCreator, createFixedFloatNormalizer } from "tf-checkout-react";
import Layout from "../../components/Layout";
import { setTfCheckoutReactConfigs } from "../../utils/tf-checkout-config";

setTfCheckoutReactConfigs()

const Checkout = () => {

  const checkoutData =
    typeof window !== 'undefined'
      ? window.localStorage.getItem('checkoutData')
      : null
  const parsedData = checkoutData ? JSON.parse(checkoutData) : checkoutDataTemp


  return <Layout>
    <PaymentContainer
      enableTimer={true}
      checkoutData={parsedData}
      paymentFields={paymentFields}
      handlePayment={(response) => {
        if (typeof window !== 'undefined') {
          window.location.href = '/billing/checkout-complete'
        }
      }}
      onCountdownFinish={() => {
        if (typeof window !== 'undefined') {
          window.location.href = '/events'
        }
      }}
      stripeCardOptions={{
        style: {
          base: {
            fontFamily: 'Montserrat',
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: 600,
            color: '#000',
            backgroundColor: '#fff',
            ':-webkit-autofill': {
              color: '#000',
            },
            '::placeholder': {
              color: 'rgba(201, 201, 201, 0.5)',
            },
          },
          invalid: {
            color: '#E53935',
          },
        },
      }}
      themeOptions={{
        checkbox: {
          fontFamily: 'Montserrat',
        },
      }}
      elementsOptions={{
        fonts: [
          {
            cssSrc:
              'https://fonts.googleapis.com/css?family=Montserrat:600',
          },
        ],
      }}
      paymentInfoLabel="Payment"
    />
  </Layout>
}

export default Checkout

const paymentFields = [
  {
    label: 'Event',
    id: 'product_name',
    class: 'field-underline',
  },
  {
    label: (
      <div>
        <span>Price per ticket</span>
        <p className="fees-block">(incl. fees)</p>
      </div>
    ),
    id: 'price',
    class: 'field-underline',
    normalizer: (value, currency) =>
      currencyNormalizerCreator(
        createFixedFloatNormalizer(2)(parseFloat(value)),
        currency,
      ),
  },
  {
    label: 'Ticket Type',
    id: 'ticketType',
    class: '',
  },
  {
    label: (
      <div>
        <span>Total</span>
        <p className="fees-block">(incl. fees, card processing and taxes)</p>
      </div>
    ),
    id: 'total',
    class: '',
    normalizer: (value, currency) =>
      currencyNormalizerCreator(
        createFixedFloatNormalizer(2)(parseFloat(value)),
        currency,
      ),
  },
  {
    label: 'Number of Tickets',
    id: 'quantity',
    class: '',
  },
]

const checkoutDataTemp = {
  id: '499543',
  hash: '54d319968906b4895162c1f3c777bfca',
  total: '89.80',
  status: 'new',
}