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
  - [`Order Details Container`](#order-details-container)
- [Functionalities](#functionalities)
  - [`Login`](#login)
  - [`Register`](#register)
  - [`Forgot Password`](#forgot-password)
  - [`Promo Code`](#promo-code)
  - [`Access Code`](#access-code)
  - [`Waiting List`](#waiting-list)
  - [`Pixel Usage`](#pixel-usage)

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

Tickets component will retrieve and show a list of tickets corresponding to selected event,
which allows the user to select the desired ticket type and quantity.

The __"Get Tickets"__ button which name is also customizable, allows the user to add the selected tickets to their cart and proceed to the checkout process.<br />
Other buttons can be displayed to handle various actions, such as viewing the user's orders or logging out.

Tickets component provides a section for entering an [Access Code](#access-code) or [Promo Code](#promo-code) that applies a discount to the ticket price or hide/unhide some tickets via [Access Code](#access-code).<br />
It also containes `WaitingLsit` that manages and displays waiting list functionality for the event.<br />
Props interface partially extends [Promo Code Props Interface](#promo-code), [Access Code Props Interface](#access-code), [Waiting List Props Interface](#waiting-list).

Tickets component displays a list of the top influencers who have promoted the event.

Tickets component is flexible and customizable, allowing for different layouts and behaviors depending on the event's requirements.

___Example of usage___:
```jsx

import { TicketsContainer } from 'tf-checkout-react'

<TicketsContainer
  theme="light"
  eventId={event?.id}
  handleNotInvitedModalClose={() => { }}
  handleInvalidLinkModalClose={() => { }}
  onAddToCartSuccess={() => {}}
  isPromotionsEnabled={event?.is_promotions_enabled}
  isAccessCodeEnabled={event?.is_access_code}
  onLogoutSuccess={() => {}}
  hideSessionButtons={true}
  enableAddOns={false}
  showGroupNameBlock={true}
  tableTicketsHeaderComponent={<div className="tickets-container-header">RESERVE TABLES</div>}
  onPendingVerification={() => {}}
/>
```

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
  <summary><b>Add-Ons Container Props Interface</b></summary>

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

Component includes also phone field, which validation functionality is provided by Twilio and integrated into the component. It provides an additional layer of verification and security during the ticket purchase process.

<details open>
<summary><b>Billing Info Container Props Interface</b></summary>

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
<summary><b>Payment Container Props Interface</b></summary>

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
<summary><b>Confirmation Container Props Interface</b></summary>

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
<summary><b>My Tickets Container Props Interface</b></summary>

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


## `Order Details Container`

Will show the purchased order details. Contains `order PDF download` and `ticket resale` functionalities. Currently both functionalities are enabled by default.

<details open>
  <summary><b>Order Container Props Interface:</b></summary>

| Property                  | Type                      | Required | Default Value              | Description                                                                              |
| ------------------------- | ------------------------- | -------- | -------------------------- | ---------------------------------------------------------------------------------------- |
| columns                   | [ { label: string } ]     | yes      | []                         | Order details table’s columns’ labels.                                                   |
| ticketsTableColumns       | ITicketsTableColumns[]    | no       | defaultTicketsTableColumns | Order’s tickets table’s columns.                                                         |
| displayColumnNameInRow    | boolean                   | no       | false                      | Display column’s names in row, instead of table header.                                  |
| canSellTicket             | boolean                   | no       | true                       | A boolean value indicating whether the user can sell tickets.                            |
| ordersPath                | string                    | no       | '/orders'                  | A string representing the URL of the `MyTicketrsContainer` page.                         |
| orderId                   | string or number          | no       |                            | A string or number representing the ID of the order to be displayed.                     |
| referralTitle             | string                    | no       | ""                         | A string representing the title of the referral section.                                 |
| itemsTitle                | string                    | no       | ""                         | A string representing the title of the items section.                                    |
| ticketsTitle              | string                    | no       | "Your Tickets"             | A string representing the title of the tickets table section.                            |
| personalLinkIcon          | string                    | no       | “”                         | Custom icon to display near personal share link.                                         |
| onGetOrdersSuccess        | Function: (data) => void  | no       | value => value             | Called after fetching order data request’s success.                                      |
| onGetOrdersError          | Function: (error) => void | no       | value => value             | Called after fetching order data request’s failure.                                      |
| onResaleTicketSuccess     | Function: (data) => void  | no       | value => value             | Called after resale ticket request’s success.                                            |
| onResaleTicketError       | Function: (error) => void | no       | value => value             | Called after resale ticket request’s failure.                                            |
| onRemoveFromResaleSuccess | Function: (data) => void  | no       | value => value             | Called after remove from resale ticket request’s success.                                |
| onRemoveFromResaleError   | Function: (error) => void | no       | value => value             | Called after remove from resale ticket request’s failure.                                |
| onReturnButtonClick       | Function: () => void      | no       | N/A                        | Called on “Return” button click. If not passed, button click will redirect to ‘/orders’. |

</details>

&nbsp;


# Functionalities

## `Login`

The `LoginModal` component is designed to be used inside package to authenticate users.  <br /> To use the `LoginModal`, simply include it in your React component and pass in the required __onLogin__ and __onClose__ callbacks as props.

You can authenticate users from the Billing page too, here you can either provide __onLogin__ callback as a prop to the [`BillingInfoContainer`](#billinginfocontainer) component so that you can open your custom component for authentication or you can ommit it and the package inside provided `LoginModal` component will be called and opened.

Package can detect whether a user is logged in or not by checking for the presence of the __X-TF-ECOMMERCE__ cookie, which is automatically set by the system when the user successfully logs in. If the __X-TF-ECOMMERCE__ cookie is present, the package assumes that the user is logged in and displays the appropriate content.

The `LoginModal` component also is used in [`MyTicketsContainer`](#myticketscontainer) and  [`TicketsContainer`](#ticketscontainer).

To detect whether a user is logged in or not, you can use the __useCookieListener__ hook provided by the package.
Here's an example of how to use the __useCookieListener__ hook to automatically detect whether the user is logged in:

```jsx
import { useEffect, useRef, useState } from 'react'
import { useCookieListener } from 'tf-checkout-react'

const MyComponent = () => {
  const [isLogged, setIsLogged] = useState(false)

  // Listen for changes to the __X-TF-ECOMMERCE__ cookie
  useCookieListener("X_TF_ECOMMERCE", value => setIsLogged(Boolean(value)))

  // ... rest of component logic
}
```

<details open>
<summary><b>Login Modal Props Interface:</b></summary>

| Property                 | Type                | Required | Default Value                   | Description                                                                                                                 |
| ------------------------ | ------------------- | -------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| onLogin                  | () => void          | yes      | N/A                             | Called after the user successfully authorizes.                                                                              |
| onClose                  | () => void          | yes      | N/A                             | Called on modal close.                                                                                                      |
| onGetProfileDataSuccess  | (data) => void      | no       | value => value                  | A callback function that is called when the profile data is successfully retrieved.                                         |
| onGetProfileDataError    | (error) => void     | no       | value => value                  | A callback function that is called when retrieving the profile data fails.                                                  |
| onForgotPassword         | () => void          | no       | value => value                  | Called on “Forgot Password” button click.                                                                                   |
| onSignup                 | () => void          | no       | value => value                  | Called on “Sign Up” button click.                                                                                           |
| modalClassname           | string              | no       | " "                             | Login modal main container class.                                                                                           |
| logo                     | string / URL / path | no       | TheTicketFairy black logo (URL) | Login modal top section’s logo.                                                                                             |
| showForgotPasswordButton | boolean             | no       | false                           | Display “Forgot Password” button.                                                                                           |
| showSignUpButton         | boolean             | no       | false                           | Display “Sign Up” button.                                                                                                   |
| showPoweredByImage       | boolean             | no       | false                           | Whether or not to show the <a href="https://cdn-checkout.s3.us-east-2.amazonaws.com/IconTicketFairy.svg">Powered image</a>. |
| alreadyHasUser           | boolean             | no       | false                           | Whether or not to show the "email is already attached to an account" message block.                                         |
| userExpired              | boolean             | no       | false                           | Whether or not to show the "session expired" message block.                                                                 |

</details>

&nbsp;

## `Register`

The `RegisterModal` component is designed to be used inside package to allows users to register for an account.  <br />

When the user submits the form, the component calls the register API function to create the user's account. If account creation is successful, the component then retrieves the user's profile data. The __onGetProfileDataSuccess__ and __onGetProfileDataError__ callbacks are then called depending on whether the profile data retrieval succeeds or fails. If profile data retrieval succeeds, the component maps the profile data to a format used by the application and saves the resulting data to the browser's localStorage. Finally, the __onClose__ callback is called to close the modal.

<details open>
<summary><b>Register Modal Props Interface:</b></summary>

| Property                | Type            | Required | Default Value  | Description                                                                                                                 |
| ----------------------- | --------------- | -------- | -------------- | --------------------------------------------------------------------------------------------------------------------------- |
| onRegister (deprecated) | () => void      | no       | N/A            | -                                                                                                                           |
| onClose                 | () => void      | yes      | N/A            | Called on modal close, after register request's success.                                                                    |
| onGetProfileDataSuccess | (data) => void  | no       | value => value | A callback function that is called when the profile data is successfully retrieved.                                         |
| onGetProfileDataError   | (error) => void | no       | value => value | A callback function that is called when retrieving the profile data fails.                                                  |
| showPoweredByImage      | boolean         | no       | false          | Whether or not to show the <a href="https://cdn-checkout.s3.us-east-2.amazonaws.com/IconTicketFairy.svg">Powered image</a>. |

</details>

&nbsp;

## `Forgot Password`

The `ForgotPasswordModal` component is a modal dialog for users to reset their passwords. To use it, simply import the component, manage its open state, and provide callback functions for closing the modal, navigating back to the login page or component, handling successful password reset requests, and handling errors in password reset requests. Optionally, you can also display a "Powered By" image within the modal by setting the __showPoweredByImage__ prop to true.

<details open>
<summary><b>Forgot Password Modal Props Interface:</b></summary>

| Property                | Type            | Required | Default Value  | Description                                                                                                                 |
| ----------------------- | --------------- | -------- | -------------- | --------------------------------------------------------------------------------------------------------------------------- |
| onLogin                 | () => void      | yes      | N/A            | Called on "Back to Log In" button click.                                                                                    |
| onClose                 | () => void      | yes      | N/A            | Called on modal close, after register request's success.                                                                    |
| onForgotPasswordSuccess | (data) => void  | no       | value => value | A callback function that is called when the user successfully resets their password.                                        |
| onForgotPasswordError   | (error) => void | no       | value => value | A callback function that is called when there is an error resetting the password.                                           |
| showPoweredByImage      | boolean         | no       | false          | Whether or not to show the <a href="https://cdn-checkout.s3.us-east-2.amazonaws.com/IconTicketFairy.svg">Powered image</a>. |

</details>
&nbsp;

## `Promo Code`

The `PromoCodeSection` is a React component for handling promo code input, validation, and displaying success or error messages. It accepts various props to control its appearance and behavior, such as the promo code value, validation status, input visibility, and callback functions for updating the state which you can see in the below provided table.

To use this component, simply import it and include it in your JSX with the required props, managing the component's state and callback functions in the parent component as needed.

***Note that package automatically calls component in [`TicketsContainer`](#ticketscontainer)***.


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

## `Access Code`

The `AccessCodeSection` is a React component designed for handling access code input and submission. It allows users to enter an access code and triggers an update to the ticket information based on the submitted access code. The component accepts a set of props to manage the access code value and provide callback functions for updating the state which you can see in below table.

To integrate the `AccessCodeSection` component, import it into your JSX and provide the required props, such as the access code value, and callback functions for updating the state. Make sure to manage the component's state and callback functions within the parent component as needed. <br /> 

***Note that package automatically calls component in [`TicketsContainer`](#ticketscontainer)***.

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

## `Waiting List`

The `WaitingList` component is a React component designed to handle user registration for a waiting list. It displays a form that allows users to input their information, including first name, last name, email, ticket type, and quantity. Upon submission, the component adds the user to the waiting list and displays a success message.

***Note that package automatically calls component in [`TicketsContainer`](#ticketscontainer)***.

<details open>
<summary><b>Waiting List Props Interface:</b></summary>

| Property           | Type            | Required | Default Value | Description                                                   |
| ------------------ | --------------- | -------- | ------------- | ------------------------------------------------------------- |
| tickets            | Object          | yes      | ' '           | The list of tickets to be displayed.                          |
| eventId            | string / number | yes      | N/A           | The ID of the event for which the tickets are displayed.      |
| defaultMaxQuantity | number          | yes      | 10            | The default maximum quantity of tickets that can be selected. |

</details>

&nbsp;

## `Pixel Usage`

The `usePixel` hook is a utility function used to load a pixel script for tracking events on the page. It is commonly used in multiple components throughout the application to track various user actions, such as the completion of a checkout or a purchase. <br />

The purpose of the `usePixel` hook is to enable event tracking and analytics for various user actions within the application.

Here is the list of pages where the `usePixel` function is automatically used:

- Billing Info Container
- Confirmation Container
- Payment Container
- Tickets Container

&nbsp;
