# tf-checkout-react-sample

<details open>
  <summary><strong>Table of Contents</strong></summary>

- [tf-checkout-react-sample](#tf-checkout-react-sample)
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Set configuration](#set-configuration)
    - [Configurations for production](#configurations-for-production)
    - [Configurations for development](#configurations-for-development)
- [Components](#components)
  - [`TicketsContainer`](#ticketscontainer)
  - [`AddOnsContainer`](#addonscontainer)
  - [`BillingInfoContainer`](#billinginfocontainer)
  - [`PaymentContainer`](#paymentcontainer)
  - [`ConfirmationContainer`](#confirmationcontainer)
  - [`MyTicketsContainer`](#myticketscontainer)
- [Functionalities](#functionalities)
  - [Login](#login)
  - [Register](#register)
  - [Forgot Password](#forgot-password)
  - [Promo Code](#promo-code)
  - [Access Code](#access-code)
  - [Waiting List](#waiting-list)

</details>
&nbsp;

# Introduction

This package includes TicketFairy's checkout functionality, as well as various related functionalities. These functionalities include login/register, order management, resale, referrals, and more.  

This package provides a set of components and functionalities designed to manage various aspects of the TicketFairy event experience. These include:

- `AccountSettings`: A component for managing user account settings, such as email address and password.
- `AddonsContainter`: A component for displaying a list of available add-ons and allowing the user to purchase them.
- `BillingInfoContainer`: A component for managing billing information, such as addresses and ticket holders.
- `ConfirmationContainer`: A component for displaying a confirmation page after a purchase is made.
- `IDVerification`: A component for verifying the identity of the user during the checkout process.
- `MyTicketsContainer`: A component for displaying a list of purchased orders.
- `OrderDetailsContainer`: A component for displaying detailed information about a purchase, such as the ticket types, add-ons and pricing.
- `PaymentContainer`: A component for managing payment processing during the checkout process.
- `ResetPasswordContainer`: A component for resetting a user's password.
- `SeatMapContainer`: A component for displaying and selecting seats on a venue map.
- `TicketResaleContainer`: A component for managing the resale of tickets or add-ons by the user.
- `TicketsContainer`: A component for displaying a list of available tickets and allowing the user to purchase them.  

Together, these components and functionalities provide a comprehensive set of tools to manage the checkout process and related activities for a TicketFairy-powered event.   
&nbsp;  
&nbsp;

# Prerequisites

- node >= v16.19.0
- npm >= 8.19.3

&nbsp;

# Installation

```
npm i tf-checkout-react
```

- [Available Versions List](https://www.npmjs.com/package/tf-checkout-react?activeTab=versions)

## Set configuration

In order to make this package work properly, you need to set some configurations, otherwise the default configurations will be used. Currently only configuration which is needed for production, is `API_BASE`. Other configurations written below are only for development/test environments.

Import `setConfigs` function from the package.

```
import { setConfigs } from 'tf-checkout-react'
```

Call it in the root and pass neccesary options. Here are available options:

### Configurations for production

- API_BASE - need for making API calls (default: `https://www.ticketfairy.com`)

### Configurations for development

- API_BASE - need for making API calls
- BRAND_SLUG - slug of the event's parent/owner brand
- X_SOURCE_ORIGIN - need for local environment. This header will be included in every API request.
- STRIPE_PUBLISHABLE_KEY - used to authenticate website with Stripe and to communicate securely with Stripe's servers.

Example `.env` file:
```
GATSBY_TTF_PUBLIC_API_BASE=https://www.ticketfairy.com
GATSBY_TTF_BASE_URL=https://www.ticketfairy.com
GATSBY_TTF_PUBLIC_X_SOURCE_ORIGIN=ticketfairy.com
GATSBY_TTF_BRAND_SLUG=brand-slug
GATSBY_TTF_SITE_URL=https://www.ticketfairy.com
```

&nbsp;
# Components


## `TicketsContainer`

Tickets component will retrieve and show a list of tickets corresponding to selected event. It also containes `PromoCode`, `AccessCode` and `WaitingLsit` functionalities.  
Props interface partially extends [Promo Code Props Interface](#promo-code), [Access Code Props Interface](#access-code), [Waiting List Props Interface](#waiting-list).

<details open>
  <summary><b>Tickets Container Props Interface</b></summary>

| Property                                 | Type             | Required | Default value  | Description                                                                                    |
| ---------------------------------------- | ---------------- | -------- | -------------- | ---------------------------------------------------------------------------------------------- |
| eventId                                  | string / number  | yes      | N/A            | The unique identifier for the event that the tickets belong to.                                |
| getTicketsLabel                          | string           | no       | “Get Tickets"  | The label for the "Get Tickets" button.                                                        |
| contentStyle                             | CSSProperties    | no       | {}             | An object containing styles to apply to the tickets list container.                            |
| theme                                    | ‘light’, ‘dark'  | no       | ‘light'        | The theme to use for the tickets list container. Sets as `className`.                          |
| themeOptions                             | MUI ThemeOptions | no       | N/A            | MUI Theme Provider’s theme options.                                                            |
| queryPromoCode (deprecated)              | -                | -        | -              | -                                                                                              |
| isButtonScrollable (deprecated)          | -                | -        | -              | -                                                                                              |
| disableCountdownLeadingZero (deprecated) | -                | -        | -              | -                                                                                              |
| isLoggedIn (deprecated)                  | -                | -        | -              | -                                                                                              |
| isPromotionsEnabled                      | boolean          | no       | false          | Whether or not promotions are enabled for the tickets list.                                    |
| isAccessCodeEnabled                      | boolean          | no       | false          | Whether or not access codes are enabled for the tickets list.                                  |
| hideTicketsHeader                        | boolean          | no       | false          | Whether to hide the tickets header.                                                            |
| hideSessionButtons                       | boolean          | no       | false          | Whether to hide “My Tickets” and “Log Out” buttons.                                            |
| hideWaitingList                          | boolean          | no       | false          | Whether to hide the waiting list.                                                              |
| enableBillingInfoAutoCreate              | boolean          | no       | true           | Whether to enable auto-creation of billing information, instead of manually creation by user.  |
| enableInfluencersSection                 | boolean          | no       | true           | Whether to display the influencers section.                                                    |
| enableAddOns                             | boolean          | no       | true           | Whether to enable add-ons.                                                                     |
| sortBySoldOut                            | boolean          | no       | false          | Whether to sort tickets by sold-out status. By default tickets will be sorted by sort order.   |
| hideTableTicketsHeader                   | boolean          | no       | false          | Whether to hide table type tickets section header.                                             |
| showPoweredByImage                       | boolean          | no       | false          | Whether to show the "Powered by TheTicketFairy" image.                                         |
| showGroupNameBlock                       | boolean          | no       | false          | Whether to show the ticket group name block.                                                   |
| actionsSectionComponent                  | ReactNode        | no       | N/A            | Custom component instead of “Get Tickets” button.                                              |
| ticketsHeaderComponent                   | ReactNode        | no       | N/A            | A React component to render the tickets section header.                                        |
| tableTicketsHeaderComponent              | ReactNode        | no       | N/A            | A React component to render the table type tickets section header.                             |
| ordersPath                               | string           | no       | '/orders'      | The URL path to the orders page.                                                               |
| currencySybmol                           | string           | no       | ' '            | The currency symbol to use.                                                                    |
| -                                        | -                | -        | -              | -                                                                                              |
| onAddToCartSuccess                       | (data) => void   | no       | value => value | A callback function to be called when a ticket is successfully added to the cart.              |
| onAddToCartError                         | (error) => void  | no       | value => value | A callback function to be called when there is an error adding a ticket to the cart.           |
| onGetTicketsSuccess                      | (data) => void   | no       | value => value | A callback function to be called when the tickets are successfully retrieved.                  |
| onGetTicketsError                        | (error) => void  | no       | value => value | A callback function to be called when there is an error retrieving the tickets.                |
| onLogoutSuccess                          | () => void       | no       | value => value | A callback function to be called when the user successfully logs out.                          |
| onLogoutError                            | (error) => void  | no       | value => value | A callback function to be called when there is an error logging out.                           |
| onLoginSuccess                           | () => void       | no       | value => value | A callback function to be called when the user successfully logs in.                           |
| handleNotInvitedModalClose               | () => void       | no       | value => value | A callback function to be called when the "Not Invited" modal is closed.                       |
| handleInvalidLinkModalClose              | () => void       | no       | value => value | A callback function to be called when the "Invalid Link" modal is closed.                      |
| onReserveButtonClick                     | () => void       | no       | value => value | A callback function to be called when the 'Select on map' button is clicked.                   |
| onPendingVerification                    | () => void       | no       | value => value | A callback function to be called when the verification process is passed and pending response. |

</details>

&nbsp;

## `AddOnsContainer`

Add-Ons component will retrieve and show a list of add-ons corresponding to selected event.

<details open>
  <summary><b>Tickets Container Props Interface</b></summary>

| Property                    | Type            | Required | Default value  | Description                                                                                          |
| --------------------------- | --------------- | -------- | -------------- | ---------------------------------------------------------------------------------------------------- |
| classNamePrefix             | string          | no       | 'add_on'       | Prefix to use for the CSS class names of the component.                                              |
| enableBillingInfoAutoCreate | boolean         | no       | true           | Whether to enable auto-creation of billing information, instead of manually creation by user.        |
| enableTimer                 | boolean         | no       | true           | Whether to show a timer for the user.                                                                |
| -                           | -               | -        | -              | -                                                                                                    |
| onGetAddonsPageInfoSuccess  | (data) => void  | no       | value => value | A callback function to be called when the add-ons page information is successfully fetched.          |
| onGetAddonsPageInfoError    | (error) => void | no       | value => value | A callback function to be called when there is an error while fetching the add-ons page information. |
| onPostCheckoutSuccess       | (data) => void  | no       | value => value | A callback function to be called when the add-ons are successfully added to the cart.                |
| onPostCheckoutError         | (error) => void | no       | value => value | A callback function to be called when there is an error while adding add-ons to the cart.            |
| onConfirmSelectionSuccess   | (data) => void  | no       | value => value | A callback function to be called when the add-ons selection is successfully confirmed.               |
| onConfirmSelectionError     | (error) => void | no       | value => value | A callback function to be called when there is an error while confirming the add-ons selection.      |
| onCountdownFinish           | () => void      | no       | value => value | A callback function that is called when the countdown timer finishes.                                |
| onPendingVerification       | () => void      | no       | value => value | A callback function to be called when the verification process is passed and pending response.       |

</details>

&nbsp;

## `BillingInfoContainer`
The component is responsible for managing the billing information during the checkout process. It provides a form that allows users to enter their billing information, including addresses and ticket holders' information.  
Props interface extends [Login Modal Interface](#login), [Register Modal Interface](#register), [Forgot Password Modal Interface](#forgot-password).

<details open>

| Property                          | Type                                         | Required | Default Value           | Description                                                                                         |
| --------------------------------- | -------------------------------------------- | -------- | ----------------------- | --------------------------------------------------------------------------------------------------- |
| data                              | IBillingInfoData[]                           | no       | []                      | Form fields list to be rendered to collect billing info data.                                       |
| ticketHoldersFields               | IBillingInfoData[]                           | no       | [{ id: 1, fields: [] }] | Form fields list to be rendered to collect ticket holders data.                                     |
| initialValues (deprecated)        | { [key: string]: any }                       | no       | {}                      | Form’s initial values.                                                                              |
| theme                             | 'light' / 'dark'                             | no       | 'light'                 | MUI Theme Provider’s theme.                                                                         |
| isLoggedIn (deprecated)           | -                                            | -        | -                       | -                                                                                                   |
| onLogin (deprecated)              | -                                            | -        | -                       | -                                                                                                   |
| brandOptIn (deprecated)           | -                                            | -        | -                       | -                                                                                                   |
| shouldFetchCountries (deprecated) | -                                            | -        | -                       | -                                                                                                   |
| accountInfoTitle                  | string / JSX.Element                         | no       | “”                      | Render some text or JSX component above Login section. Do not available if there is logged in user. |
| hideLogo                          | boolean                                      | no       | false                   | Hide TicketFairy logo under “Login” button.                                                         |
| themeOptions                      | MUI ThemeOptions                             | no       | N/A                     | MUI Theme Provider’s theme.                                                                         |
| hideErrorsAlertSection            | boolean                                      | no       | false                   | Hide form submit errors rendered by package.                                                        |
| skipPage                          | boolean                                      | no       | false                   | Enable skipping Billing Info page.                                                                  |
| canSkipHolderNames                | boolean                                      | no       | false                   | Allows the user to skip entering ticket holders' names.                                             |
| enableTimer                       | boolean                                      | no       | false                   | Enables the countdown timer.                                                                        |
| buttonName                        | string                                       | no       | false                   | The text to display on the submit button.                                                           |
| showPoweredByImage                | boolean                                      | no       | false                   | Displays the "Powered by TheTicketFairy" image.                                                     |
| isCountryCodeEditable             | boolean                                      | no       | true                    | Allows the user to edit the country code.                                                           |
| -                                 | -                                            | -        | -                       | -                                                                                                   |
| handleSubmit                      | (values, helpers, eventId, response) => void | no       | value => value          | A callback function that is called when the form is submitted.                                      |
| onSubmitError                     | (error) => void                              | no       | value => value          | A callback function that is called when form submission fails.                                      |
| onGetCartSuccess                  | (data) => void                               | no       | value => value          | A callback function that is called when the cart data is successfully retrieved.                    |
| onGetCartError                    | (error) => void                              | no       | value => value          | A callback function that is called when retrieving the cart data fails.                             |
| onErrorClose                      | () => void                                   | no       | value => value          | A callback function that is called when the error message is closed.                                |
| onSkipBillingPage                 | (data) => void                               | no       | value => value          | A callback function that is called when the billing page skips.                                     |
| onGetCountriesSuccess             | (data) => void                               | no       | value => value          | A callback function that is called when the list of countries is successfully retrieved.            |
| onGetCountriesError               | (error) => void                              | no       | value => value          | A callback function that is called when retrieving the list of countries fails.                     |
| onGetStatesSuccess                | (data) => void                               | no       | value => value          | A callback function that is called when the list of states is successfully retrieved.               |
| onGetCountriesError               | (error) => void                              | no       | value => value          | A callback function that is called when retrieving the list of states fails.                        |
| onAuthorizeSuccess                | (data) => void                               | no       | value => value          | A callback function that is called when authorization is successful.                                |
| onAuthorizeError                  | (error) => void                              | no       | value => value          | A callback function that is called when authorization fails.                                        |
| onCountdownFinish                 | () => void                                   | no       | value => value          | A callback function that is called when the countdown timer finishes.                               |
| onPendingVerification             | () => void                                   | no       | value => value          | A callback function that is called when the verification process is passed and pending response.    |

</details>

&nbsp;

## `PaymentContainer`
The component provides a form for users to enter their payment information and checkout. It accepts various props to customize the form and handle the checkout process.  

<details open>

| Property                | Type                            | Required | Default Value        | Description                                                                         |
| ----------------------- | ------------------------------- | -------- | -------------------- | ----------------------------------------------------------------------------------- |
| paymentFields           | IPaymentField[]                 | yes      | []                   | An array of payment fields to render in the form.                                   |
| checkoutData            | { hash: string, total: number } | yes      | N/A                  | An object containing checkout data, such as the order total and hash.               |
| formTitle               | string                          | no       | 'Get Your Tickets'   | Text to display above the payment form.                                             |
| errorText               | string                          | no       | ''                   | Text to display if there is an error during the payment process.                    |
| paymentButtonText       | string                          | no       | 'Pay'                | Text to display on the payment button.                                              |
| paymentInfoLabel        | string                          | no       | 'Order Confirmation' | Text to display above the payment information section.                              |
| orderInfoLabel          | string                          | no       | 'Order Review'       | Text to display above the order information section.                                |
| stripeCardOptions       | StripeCardNumberElementOptions  | no       | {}                   | Options for the Stripe card input element.                                          |
| elementsOptions         | StripeElementsOptions           | no       | {}                   | Options for the Stripe Elements instance.                                           |
| themeOptions            | ThemeOptions                    | no       | {}                   | An object containing theme options for the payment form.                            |
| enableTimer             | boolean                         | no       | false                | Whether to show a timer for the user.                                               |
| disableZipSection       | boolean                         | no       | false                | Whether to show the zip code input field.                                           |
| enablePaymentPlan       | boolean                         | no       | true                 | Whether to enable payment plans.                                                    |
| -                       | -                               | -        | -                    | -                                                                                   |
| handlePayment           | (data) => void                  | yes      | value => value       | A callback function to handle the payment process.                                  |
| onPaymentError          | (error) => void                 | no       | value => value       | A callback function that is called when the payment process fails.                  |
| onErrorClose            | () => void                      | no       | value => value       | A callback function that is called when the error message is closed.                |
| onGetPaymentDataSuccess | (data) => void                  | no       | value => value       | A callback function that is called when the payment data is successfully retrieved. |
| onGetPaymentDataError   | (error) => void                 | no       | value => value       | A callback function that is called when retrieving the payment data fails.          |
| onCountdownFinish       | () => void                      | no       | value => value       | A callback function that is called when the countdown timer finishes.               |

</details>

&nbsp;

## `ConfirmationContainer`
The component is responsible for displaying the confirmation page after a successful payment.  

<details open>

| Property                     | Type                | Required | Default Value  | Description                                                                              |
| ---------------------------- | ------------------- | -------- | -------------- | ---------------------------------------------------------------------------------------- |
| isReferralEnabled            | boolean             | yes      | false          | Whether referral functionality is enabled.                                               |
| showDefaultShareButtons      | boolean             | yes      | false          | Whether to display default share buttons.                                                |
| shareButtons                 | IShareButton[]      | yes      | []             | Array of objects representing the share buttons.                                         |
| messengerAppId               | string              | yes      | N/A            | Messenger App ID for Facebook share button.                                              |
| orderHash                    | string              | no       | N/A            | Hash value of the order.                                                                 |
| clientLabel                  | string              | no       | 'Ticket Fairy' | Client's name.                                                                           |
| confirmationLabels           | IConfirmationLabels | no       | {}             | Object containing labels for the confirmation page.                                      |
| hasCopyIcon                  | boolean             | no       | true           | Whether to display a copy icon beside the referral link.                                 |
| showReferralsInfoText        | boolean             | no       | false          | Whether to display referral information text.                                            |
| showCopyInfoModal            | boolean             | no       | false          | Whether to display a copy info modal after the link is copied.                           |
| showPricingNoteSection       | boolean             | no       | false          | Whether to display the pricing note section.                                             |
| -                            | -                   | -        | -              | -                                                                                        |
| onGetConfirmationDataSuccess | (data) => void      | yes      | value => value | A callback function that is called when the confirmation data is successfully retrieved. |
| onGetConfirmationDataError   | (error) => void     | yes      | value => value | A callback function that is called when retrieving the confirmation data fails.          |
| onLinkCopied                 | () => void          | no       | value => value | A callback function that is called when the referral link is copied.                     |

</details>

&nbsp;

## `MyTicketsContainer`
The component is responsible for rendering a list of orders with details and some customization options.  

<details open>

| Property                     | Type                | Required | Default Value  | Description                                                                              |
| ---------------------------- | ------------------- | -------- | -------------- | ---------------------------------------------------------------------------------------- |
| isReferralEnabled            | boolean             | yes      | false          | Whether referral functionality is enabled.                                               |
| showDefaultShareButtons      | boolean             | yes      | false          | Whether to display default share buttons.                                                |
| shareButtons                 | IShareButton[]      | yes      | []             | Array of objects representing the share buttons.                                         |
| messengerAppId               | string              | yes      | N/A            | Messenger App ID for Facebook share button.                                              |
| orderHash                    | string              | no       | N/A            | Hash value of the order.                                                                 |
| clientLabel                  | string              | no       | 'Ticket Fairy' | Client's name.                                                                           |
| confirmationLabels           | IConfirmationLabels | no       | {}             | Object containing labels for the confirmation page.                                      |
| hasCopyIcon                  | boolean             | no       | true           | Whether to display a copy icon beside the referral link.                                 |
| showReferralsInfoText        | boolean             | no       | false          | Whether to display referral information text.                                            |
| showCopyInfoModal            | boolean             | no       | false          | Whether to display a copy info modal after the link is copied.                           |
| showPricingNoteSection       | boolean             | no       | false          | Whether to display the pricing note section.                                             |
| -                            | -                   | -        | -              | -                                                                                        |
| onGetConfirmationDataSuccess | (data) => void      | yes      | value => value | A callback function that is called when the confirmation data is successfully retrieved. |
| onGetConfirmationDataError   | (error) => void     | yes      | value => value | A callback function that is called when retrieving the confirmation data fails.          |
| onLinkCopied                 | () => void          | no       | value => value | A callback function that is called when the referral link is copied.                     |

</details>

&nbsp;

# Functionalities

## Login

<details open>
<summary><b>Login Modal Props Interface:</b></summary>

| Property                 | Type                | Required | Default Value                   | Description                                                                         |
| ------------------------ | ------------------- | -------- | ------------------------------- | ----------------------------------------------------------------------------------- |
| onLogin                  | () => void          | yes      | N/A                             | Called after log in request’s success.                                              |
| onClose                  | () => void          | yes      | N/A                             | Called on modal close.                                                              |
| onGetProfileDataSuccess  | (data) => void      | no       | value => value                  | A callback function that is called when the profile data is successfully retrieved. |
| onGetProfileDataError    | (error) => void     | no       | value => value                  | A callback function that is called when retrieving the profile data fails.          |
| onForgotPassword         | () => void          | no       | value => value                  | Called on “Forgot Password” button click.                                           |
| onSignup                 | () => void          | no       | value => value                  | Called on “Sign Up” button click.                                                   |
| modalClassname           | string              | no       | " "                             | Login modal main container class.                                                   |
| logo                     | string / URL / path | no       | TheTicketFairy black logo (URL) | Login modal top section’s logo.                                                     |
| showForgotPasswordButton | boolean             | no       | false                           | Display “Forgot Password” button.                                                   |
| showSignUpButton         | boolean             | no       | false                           | Display “Sign Up” button.                                                           |

</details>

&nbsp;

## Register

<details open>
<summary><b>Register Modal Props Interface:</b></summary>

| Property                | Type            | Required | Default Value  | Description                                                                         |
| ----------------------- | --------------- | -------- | -------------- | ----------------------------------------------------------------------------------- |
| onRegister (deprecated) | () => void      | no       | N/A            | -                                                                                   |
| onClose                 | () => void      | yes      | N/A            | Called on modal close, after register request's success.                            |
| onGetProfileDataSuccess | (data) => void  | no       | value => value | A callback function that is called when the profile data is successfully retrieved. |
| onGetProfileDataError   | (error) => void | no       | value => value | A callback function that is called when retrieving the profile data fails.          |

</details>

&nbsp;

## Forgot Password

<details open>
<summary><b>Forgot Password Modal Props Interface:</b></summary>

| Property                | Type            | Required | Default Value  | Description                                                                          |
| ----------------------- | --------------- | -------- | -------------- | ------------------------------------------------------------------------------------ |
| onLogin                 | () => void      | yes      | N/A            | Called on "Back to Log In" button click.                                             |
| onClose                 | () => void      | yes      | N/A            | Called on modal close, after register request's success.                             |
| onForgotPasswordSuccess | (data) => void  | no       | value => value | A callback function that is called when the user successfully resets their password. |
| onForgotPasswordError   | (error) => void | no       | value => value | A callback function that is called when there is an error resetting the password.    |

</details>
&nbsp;

## Promo Code

<details open>
<summary><b>Promo Code Props Interface:</b></summary>

| Property          | Type                                   | Required | Default Value | Description                                                           |
| ----------------- | -------------------------------------- | -------- | ------------- | --------------------------------------------------------------------- |
| code              | string                                 | yes      | ' '           | The promo code.                                                       |
| codeIsApplied     | boolean                                | yes      | false         | Whether or not the promo code is currently applied.                   |
| showPromoInput    | boolean                                | yes      | false         | Whether or not to show the promo code input field.                    |
| codeIsInvalid     | boolean                                | yes      | false         | Whether or not the promo code is invalid.                             |
| showAlertIcons    | boolean                                | no       | false         | Whether or not to show the alert icons.                               |
| promoText         | string                                 | no       | false         | Button label, which click displays promo code input.                  |
| -                 | -                                      | -        | -             | -                                                                     |
| setCode           | (value: string) => void                | yes      | -             | A function to set the promo code.                                     |
| setCodeIsApplied  | (value: boolean) => void               | yes      | -             | A function to set whether or not the promo code is currently applied. |
| setCodeIsInvalid  | (value: boolean) => void               | yes      | -             | A function to set whether or not the promo code is invalid.           |
| setShowPromoInput | (value: boolean) => void               | yes      | -             | A function to set whether or not to show the promo code input field.  |
| updateTickets     | (value: boolean, type: string) => void | yes      | -             | A function to update the tickets based on the promo code.             |

</details>
&nbsp;

## Access Code

<details open>
<summary><b>Access Code Props Interface:</b></summary>

| Property      | Type                     | Required | Default Value | Description                                                |
| ------------- | ------------------------ | -------- | ------------- | ---------------------------------------------------------- |
| code          | string                   | yes      | ' '           | The access code.                                           |
| -             | -                        | -        | -             | -                                                          |
| setCode       | (value: string) => void  | yes      | -             | A function to set the access code.                         |
| updateTickets | (value: boolean) => void | yes      | -             | A function to update the tickets based on the access code. |

</details>
&nbsp;

## Waiting List

<details open>
<summary><b>Waiting List Props Interface:</b></summary>

| Property           | Type            | Required | Default Value | Description                                                   |
| ------------------ | --------------- | -------- | ------------- | ------------------------------------------------------------- |
| tickets            | Object          | yes      | ' '           | The list of tickets to be displayed.                          |
| eventId            | string / number | yes      | N/A           | The ID of the event for which the tickets are displayed.      |
| defaultMaxQuantity | number          | yes      | 10            | The default maximum quantity of tickets that can be selected. |

</details>

&nbsp;