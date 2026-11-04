# Account, orders and resale integration

The old sample used 1.x account and resale containers. Beta.28 exposes
headless account and resale APIs, but this draft does **not** enable those routes.
The known ambient-cookie isolation issue in shared PR #191 can leave a prior
buyer's state and actions alive after the browser's account cookie changes
outside the SDK. A first-party configuration flag, a login callback, an
operator acknowledgement or a React state boolean does not fix that boundary.

The examples below are API references, not runnable authorization or payment
implementations. Before enabling them, obtain an approved full-account journey
and implement and test a request-bound identity-retirement mechanism. The server
must enforce the authenticated buyer, including CSRF and action ownership, at
the time of each read and write; the client must retire stale requests, UI and
cached data when that authority changes. A browser-side poll or comparing a
previously returned profile alone does not atomically prevent a stale write.
Resolve the SDK/backend ambient-cookie limitation rather than treating these
examples as a security boundary.

## Full-account sign-in

The first-party account journey requires `accountAuth: true` and
`cookieAuth: true` in the **one** initial SDK configuration, an authorized
backend and a supported sign-in flow. In beta.28, `accountAuth: true` changes
`useAuthFlow` away from checkout-scoped authentication. Do not enable it
globally just to demonstrate private screens on a public checkout origin, and
do not reconfigure the same SDK singleton during an active checkout. `AuthModal`'s `onAuthenticated` is for the
full-account journey; `onCheckoutAuthenticated` is scoped to checkout and does
not authorize account data. Neither callback substitutes for server enforcement.
A third-party host needs an explicitly approved account integration.

Handle sign-out, an expired session, two-factor and account-completion
challenges, buyer switches, 401/403 responses and stale in-flight operations.
Keep private query caches isolated by the confirmed buyer and clear/retire them
when authority changes. Beta.28's `hooks.useAuthSession()` reports SDK session
state, but an ambient browser cookie can change without producing that SDK
notification. Do not use it as the sole authorization test.

## Orders and tickets

With the boundary above enforced, the beta.28 SDK provides:

```js
const envelope = await ttf.orders.list({ page: 1, limit: 10 })
const page = normalizeAccountOrders(envelope)
// page.items, page.page, page.totalPages and page.totalCount
```

The React equivalent is `hooks.useOrders({ page, limit })` under the same
`QueryClientProvider`. Optional event/brand filters are supported. Handle loading,
empty, error and pagination states; do not leave an old buyer's rows visible
while the next buyer is being established. The normalizer is exported directly
from `tf-checkout-react`, not from a `logic` namespace.

For a single order:

```js
const detailEnvelope = await ttf.orders.get(numericOrderId)
const order = normalizeAccountOrder(detailEnvelope)
// order.eventName, order.amount, order.currency and order.tickets
```

`hooks.useOrder(numericOrderId)` is the React hook. The account order ID must be
a numeric string; a public order hash is not accepted by this endpoint. The
backend must verify ownership. Validate the input, handle a missing or forbidden
order and render text as text. Do not place ticket hashes, order hashes, voucher
links, session values or buyer details in URLs, logs or analytics.

`ttf.orders.myTickets(query)` together with `normalizeAccountTickets(envelope)`
can back a paginated ticket list. Fields such as `isSellable` come from the
current server projection, not from an assumption based on ticket status.
Refreshing an order view is not proof of payment settlement.

## Selling an owned ticket

After buyer authority, order ownership and current sellability are established,
`hooks.useTicketResale({ hash, orderId, ticketTypeHash }, onListed)` supplies the
sender form state, `edit`, `submit`, `canSubmit` and current account data. Provide
the numeric `orderId` so the hook can re-read the ticket when the outcome is
uncertain. For the public listing choice, wait for the current ticket-type
availability; a ticket type that is not active is not eligible for that choice.
Use a fresh owned order projection rather than accepting a ticket hash from an
untrusted URL.

The form must show the applicable resale terms and collect the recipient's
details for a friend sale. Do not retry a mutation solely because a request
timed out. In beta.28, a retained `state.submitted` means the hook is checking
the listing before any further change; handle unresolved status and support
explicitly. Server-side ownership and CSRF are still required. Qualify
interruption, retry, account switching and the PR #191 cookie race before
exposing resale actions. For test runs, use only a specifically approved test
ticket and test recipient; a test event alone does not identify a safe recipient.

## Buying a resold ticket

`ResumedCheckout` can present a cart already created in the **same current
session**, for example after an approved resale acceptance flow:

```jsx
<ResumedCheckout
  eventId={eventId}
  isFromResale
  confirmationMode="redirect"
  onComplete={handoffToVerifiedOrderStatus}
/>
```

This component neither accepts an arbitrary cart ID nor creates the resale
cart. The old `TicketResaleContainer` is not a 2.x drop-in. Beta.28 exposes low-level `ttf.resale.process` and `ttf.resale.decline`
calls. The previous container used an invitation hash, processed or declined
it, and continued to billing using the returned event and add-on flags. This
sample has not established the current ownership, uncertainty and same-session
cart handoff contracts for that journey; therefore its `/buy/resold/ticket`
route does not pretend a cart exists or mount payment. Implement and verify that preceding flow, session
continuity, backend reconciliation and the payment safety requirements before
enabling it. An order result or provider redirect alone is not confirmation of
settlement.

The pinned
[beta.28 SDK guide](https://www.npmjs.com/package/tf-checkout-react/v/2.0.0-beta.28)
describes the supported React components, hooks and session contracts.
