import React, { useState } from "react"
import { BillingInfoContainer } from "tf-checkout-react"
import { setTfCheckoutReactConfigs } from "../../utils/tf-checkout-config"
import Layout from "../../components/Layout"

setTfCheckoutReactConfigs()

const Billing = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const onLoginSuccess = () => {
    setIsLoggedIn(true)
    if (typeof window !== 'undefined') {
      const event = new window.CustomEvent('tf-login')
      window.document.dispatchEvent(event)
    }
  }

  return <Layout>
    <BillingInfoContainer
      brandOptIn={true}
      enableTimer={false}
      onCountdownFinish={() => {
        /* if (typeof window !== 'undefined') {
          window.location.href = '/events'
        }
      }}
      onGetCartError={() => {
        if (typeof window !== 'undefined') {
          window.location.href = '/events'
        } */
      }}
      // logo={Logo}
      // ticketHoldersFields={ticketHoldersFields}
      data={billingInfoFields}
      isLoggedIn={isLoggedIn}
      onLoginSuccess={onLoginSuccess}
      handleSubmit={(values, formikHelpers, eventId, res) => {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(
            'checkoutData',
            JSON.stringify(res?.data?.data?.attributes),
          )
          window.location.href = `/billing/checkout?event_id=${eventId}`
        }
      }}
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        confirmEmail: '',
        phone: '',
        street_address: '',
        city: '',
        state: '',
        zip: '',
        holderFirstName: '',
        holderLastName: '',
        holderAge: '',
      }}
      theme="dark"
      buttonName="Next"
      accountInfoTitle={
        <div>
          Got a <strong>MANA Common</strong>  account?
        </div>
      }
      showForgotPasswordButton={true}
      isCountryCodeEditable={false}
    />
  </Layout>
}

export default Billing;


const billingInfoFields = [
  {
    id: 1,
    label: 'Get Your Tickets',
    labelClassName: 'main-header',
    fields: [
      {
        id: 1,
        groupClassname: 'billing-info-container__twoFields',
        groupItems: [
          {
            className: 'is-half',
            name: 'firstName',
            label: 'First Name',
            type: 'text',
            required: true,
            onValidate: () => { },
          },
          {
            className: 'is-half',
            name: 'lastName',
            label: 'Last Name',
            type: 'text',
            required: true,
            onValidate: () => { },
          },
        ],
      },
      {
        id: 2,
        groupClassname:
          'billing-info-container__singleField email-info-block-container',
        groupItems: [
          {
            className: '',
            name: 'email-info',
            label: '',
            type: '',
            component: (
              <div className="email-info-block">
                <b>IMPORTANT</b>
                <span>
                  : Please double check that your email address is correct. It's
                  where we send your confirmation!
                </span>
              </div>
            ),
          },
        ],
      },
      {
        id: 3,
        groupClassname: 'billing-info-container__twoFields',
        groupItems: [
          {
            className: 'is-half',
            name: 'email',
            label: 'Email',
            type: 'email',
            required: true,
            onValidate: () => { },
          },
          {
            className: 'is-half',
            name: 'confirmEmail',
            label: 'Confirm Email',
            type: 'email',
            required: true,
            onValidate: () => { },
          },
        ],
      },
      {
        id: 4,
        groupClassname:
          'billing-info-container__singleField choose-password-field-block',
        groupItems: [
          {
            className: '',
            name: 'password-info',
            label: '',
            type: '',
            component: (
              <div className="email-info-block">
                <span>Choose a password for your new</span>
                <b> Mana Common </b>
                <span>account</span>
              </div>
            ),
          },
        ],
      },
      {
        id: 5,
        groupClassname:
          'billing-info-container__twoFields password-field-block',
        groupItems: [
          {
            className: 'is-half',
            name: 'password',
            label: 'Password',
            type: 'password',
            required: true,
            onValidate: () => { },
          },
          {
            className: 'is-half',
            name: 'confirmPassword',
            label: 'Confirm Password',
            type: 'password',
            required: true,
            onValidate: () => { },
          },
        ],
      },
      {
        id: 6,
        groupClassname: 'billing-info-container__singleField phone-field-block',
        groupItems: [
          {
            className: '',
            name: 'phone',
            label: 'Phone',
            type: 'phone',
            disableDropdown: false,
            fill: true,
            onValidate: () => { },
          },
        ],
      },
      {
        id: 7,
        groupClassname: 'billing-info-container__singleField',
        groupItems: [
          {
            className: '',
            name: 'street_address',
            label: 'Billing Street Address',
            type: 'text',
            required: true,
            onValidate: () => { },
          },
        ],
      },
      {
        id: 8,
        groupClassname: 'billing-info-container__twoFields',
        groupItems: [
          {
            className: 'is-half',
            name: 'city',
            label: 'City/Suburb',
            type: 'text',
            required: true,
            onValidate: () => { },
          },
          {
            className: 'is-half state-field',
            name: 'state',
            label: 'State/County',
            type: 'select',
            required: true,
            onValidate: () => { },
          },
        ],
      },
      {
        id: 9,
        groupClassname: 'billing-info-container__twoFields',
        groupItems: [
          {
            className: 'is-half',
            name: 'zip',
            label: 'Post Code/Zip',
            type: 'text',
            required: true,
            onValidate: () => { },
          },
          {
            className: 'is-half country-field',
            name: 'country',
            label: 'Country',
            type: 'select',
            required: true,
            onValidate: () => { },
          },
        ],
      },
      {
        id: 10,
        groupClassname: 'billing-info-container__singleField',
        groupItems: [
          {
            className: '',
            name: 'holderAge',
            label: 'Date of Birth',
            type: 'date',
            required: true,
            format: 'MM/DD/YYYY',
            placeholder: 'mm/dd/yyyy',
            onValidate: () => { },
          },
        ],
      },
      {
        id: 11,
        groupClassname: 'billing-info-container__singleField',
        groupItems: [
          {
            className: '',
            name: 'data_capture[wallet_address]',
            label: 'Wallet address',
            type: 'text',
            required: false,
            onValidate: () => { },
          },
        ],
      },
      {
        id: 13,
        groupClassname:
          'billing-info-container__singleField email-info-block-container',
        groupItems: [
          {
            className: '',
            name: 'wallet-address-info',
            label: '',
            type: '',
            component: (
              <div className="email-info-block">
                For promotional drops from participating sponsors.
              </div>
            ),
          },
        ],
      },
      {
        id: 12,
        groupClassname:
          'billing-info-container__singleField billing-info-checkboxes-block',
        groupItems: [
          {
            className: 'width-fc',
            name: 'brand_opt_in',
            label: (
              <span className="checkbox-text">
                (optional) Keep me updated on Mana Common events, news and more.
              </span>
            ),
            type: 'checkbox',
          },
          {
            className: 'width-fc privacy-policy-block',
            name: 'ttf_opt_in',
            required: true,
            label: (
              <span className="checkbox-text">
                I have read and agree to The Ticket Fairy <a
                  href="https://www.ticketfairy.com/terms-of-service/"
                  target="_blank"
                  rel="noreferrer"
                >Terms of Service </a> and{' '}
                <a
                  href="https://www.ticketfairy.com/privacy-policy/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Privacy Policy.
                </a>
              </span>
            ),
            type: 'checkbox',
          },
        ],
      },
    ],
  },
]