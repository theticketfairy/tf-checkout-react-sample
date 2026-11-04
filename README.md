# Ticket Fairy React checkout sample

This Gatsby sample is being migrated from the 1.x containers to the published
shared-core `tf-checkout-react@2.0.0-beta.28`. It demonstrates public browser
configuration, an operator-confirmed test event, the current `EmbeddedCheckout`
wiring, and the route changes needed for a 2.x integration.

**Real-event payment is deliberately disabled in this draft.** The localhost
fixture can render a simulated free checkout; it cannot charge or issue real
tickets. Beta.28 can
leave a payment button available after an ambiguous result, and recovery across
a full-page return, reload or navigation has not been established here. The
sample also lacks durable authoritative order reconciliation. An origin-local
marker and a test-mode acknowledgement do not make a payment retry safe. Do not
enable this flow for live or test payments until the SDK, backend and host
recovery are qualified together.

The previous account, order and resale containers do not exist as drop-in 2.x
exports. Those routes stay unavailable while a known ambient-cookie buyer
isolation limitation is unresolved. See the practical integration guidance in
[account and resale](docs/account-and-resale.md),
[checkout layouts](docs/layouts.md) and the
[original route migration](docs/route-migration.md).

## Prerequisites

- Node.js 18 or newer and npm.
- A published, approved test event with a numeric event ID and canonical URL
  slug. The operator must verify both values and the actual merchant/payment
  provider's test configuration through an authoritative integration record.
- A registered **public browser SDK client ID** approved for your environment
  and host origin. Ask your Ticket Fairy integration contact.
- The applicable CORS, cookie, payment-provider and browser configuration for
  the deployment. An approved public client does not itself establish
  first-party account authority.

The production host may contain a Stripe-test event, but it may also take real
payments. Likewise, `DEV` or `STAG` alone does not prove that an event's
merchant is configured for test payments. All `GATSBY_` variables are embedded
in the browser bundle. Never put a client secret, Basic Authorization value,
account password or payment-provider secret in the sample, a Gatsby variable
or Git.

The React SDK bundles the shared checkout core. Do not install the private
`tf-checkout-shared` workspace package separately.

## Installation status

The package manifest pins the 2.x SDK. The old 1.x lockfile was removed because
it cannot represent this dependency change. The published seat-map dependency has a React peer mismatch. In an isolated
Node 22/npm 10 experiment, a minimal React 18 + beta.28 lock-only resolution
completed with peer override warnings, `npm ls --package-lock-only` reported
invalid React/ReactDOM peers, and strict peer resolution failed. That experiment
was not a Gatsby install or a seat-flow test. Resolve the mismatch upstream or
select a reviewed compatible dependency combination, then generate and commit
a genuine `package-lock.json`. Do not hide it with `--legacy-peer-deps`.

Once the conflict is resolved:

```sh
npm install
cp .env.example .env.development
# Enter the public settings described below in .env.development.
npm start
```

Open `http://localhost:3002/`. Gatsby reads `.env.development` for
`npm start`; provide corresponding `.env.production` values or build-environment
variables for `npm run build`. Restart or rebuild after changing variables.

Run `npm run test:contracts` for the configuration, guard and fixture-router
contracts, and `npm run build` after dependency resolution. Seventeen Node contract
tests passed in an in-memory harness with each source module loaded by a data
URL; the sample has not been installed, built, or exercised in a browser with
the packaged SDK. These checks do not establish a working checkout or provider
integration.

## Local free-order fixture

After a clean dependency resolution, start the Gatsby development server and
the fixture proxy in separate terminals:

```sh
npm start
npm run fixture
```

Open `http://127.0.0.1:4102/fixture/`. The proxy binds only to loopback, sends
a restrictive content security policy, forwards all non-API/ajax GET and HEAD
requests to the local Gatsby server and answers a fixed set of mock API routes
itself. Unknown API and provider routes are rejected. The page configures the real SDK against
the same fixture origin with in-memory session storage. It presents a fictional
zero-total event and accepts only **Demo Buyer** and **demo@example.test** for
the simulated order; do not enter real buyer, address, phone or card data.

The fixture is under development. The mock router's unit contracts passed, but a
Gatsby build and full browser/SDK journey have not been run, and its wire shapes
may need correction. Its intended result is a simulated free completion, not a
real ticket or evidence of payment-provider behavior. The package currently
contains `EmbeddedCheckout`; the selector detects the planned ready-made
single-page, progressive and accordion exports and keeps them unavailable until
a release includes them.

The content security policy restricts subresources, fetch/XHR connections,
frames and form targets to the fixture origin. It does not reliably prevent
top-level or popup navigation, or restrict operating-system process egress.
For a hard egress guarantee run the already-built sample and browser in an
isolated network namespace with loopback only. Do not use this fixture as a
proxy to a real Ticket Fairy or payment service.

## Public test configuration

| Variable | Value |
| --- | --- |
| `GATSBY_TTF_ENV` | `DEV`, `STAG` or `PROD`, matching the approved test event and public client. |
| `GATSBY_TTF_PUBLIC_CLIENT_ID` | The registered public browser SDK client ID. |
| `GATSBY_TTF_TEST_EVENT_ID` | The approved test event's numeric ID. |
| `GATSBY_TTF_TEST_EVENT_SLUG` | Its canonical slug, not a full URL. |
| `GATSBY_TTF_TEST_PAYMENT_ACKNOWLEDGEMENT` | `I_VERIFIED_TEST_PAYMENTS` only after the operator verifies the event and merchant test configuration. |

The acknowledgement is a reminder, not proof of provider configuration.
Checkout remains disabled even when it is set. Never enter real card data while
testing.

The home page shows the configured ID and slug and links to the corresponding
event route. Those values are initially operator supplied. No SDK request runs
on that preview. When the operator explicitly starts the test session, the
sample calls `ttf.events.info(eventId)`. That SDK
call can create or renew an event-scoped session. It compares the returned slug
and requires a nonempty name, then displays both for the operator to inspect.

The beta.28 event-info facade does not expose an independently returned ID.
Even `events.details().id` can be a fallback to the requested ID when the
server omits one. Matching the slug and inspecting the name helps an operator
check the configured ID; it is not independent proof of the ID or payment
configuration. Confirm the mapping in an authoritative source and qualify
origin access and CORS for your target environment.

## Checkout and session guard

`src/utils/checkout-runtime.js` imports and configures the SDK in the browser
after the operator acts. It caches one successful initialization and one React
Query client; a rejected import/configuration clears the cached promise. The
checkout uses `cookieAuth: true` and an empty client-secret string with the
registered public client ID. It does not enable `accountAuth`.

The intended wiring, currently disabled in the event page, is:

```jsx
<QueryClientProvider client={queryClient}>
  <EmbeddedCheckout
    eventId={eventId}
    confirmationMode="redirect"
    onComplete={(result) => handoffToVerifiedOrderStatus(result)}
  />
</QueryClientProvider>
```

`EmbeddedCheckout` owns its `CheckoutProvider`. Do not wrap it in another.
The SDK entry imports CSS and assets; a deployed Gatsby build must process
those imports. Static hosts also need the appropriate client-side route
fallback for `/events/*`.

The future payment path is wired to claim an origin-local marker with no order
hash or personal data before it can mount checkout. The disabled preview does
not write that marker. If a marker already exists, is unknown, or browser
storage fails, the route blocks another session. The marker survives a normal
same-origin reload and navigation, but it is **not** an atomic cross-tab lock,
a cross-device recovery mechanism, a server-side idempotency key or proof of
settlement. Clearing browser data or using another origin/device bypasses it,
and it cannot control retry actions inside the stock SDK UI.

There is no automatic marker reset. After independently establishing that the
test session has no unresolved payment or order, a developer may remove
`tf-sample-checkout-unresolved-v1` from this origin's browser local storage.
Removing it does not reconcile an order; never clear it merely because a
request timed out or a page closed.

## Payment and return handling

`onComplete` returns a `PlaceOrderResult` that can contain `orderHash`,
`pending`, `needIdVerification` and `pendingVoucherUrl`. A callback, a missing
`pending` flag, a redirect or a closed popup does not prove settlement or
ticket issuance. Never invite a new payment solely because an outcome is
uncertain.

A production host must securely hand the order reference to its backend and
reconcile the authoritative Ticket Fairy order with provider status. It must
preserve unresolved state across refreshes, navigation, other tabs and devices;
handle idempotency and interrupted attempts; complete identity verification;
and securely deliver any pending voucher after validating its provider URL.
Do not log order hashes, voucher links, session tokens or buyer/payment data.

Beta.28's Stripe Payment Element can return to the current page with
`payment_return=true` after a full-page navigation. That reload discards this
sample's in-memory result; the sample does not reconcile the return flag.
Popup payment rails can return to Ticket Fairy's origin, which a third-party
host cannot inspect with same-origin polling; the expected cross-origin message
and recovery have not been qualified here. Do not claim those rails work based
on this sample. The beta guards some same-store retries, but its payment button
may still be offered after an ambiguous result. Resolve the message, action
and reload recovery with authoritative status before allowing payment.

## Routes and developer examples

| Route or source | Current behavior |
| --- | --- |
| `/` and `src/pages/index.js` | Opens the explicitly configured event, as the original sample did. |
| `/fixture/` | Local-only simulated free checkout; SDK/browser acceptance remains outstanding. |
| `/events/[slug]/?eventId=...` | Requires the configured ID and slug, then operator consent before SDK session creation. Payment remains disabled. |
| `/billing/billing-info` and `/billing/checkout` | Explain that billing and payment moved into the embedded flow; 1.x carts cannot be resumed here. |
| `/billing/checkout-complete` | A neutral notice; it cannot establish the state of a legacy order. |
| `/orders` and `/order` | Unavailable until full-account authorization and buyer isolation are enforced. |
| `/buy/resold/ticket` | Unavailable until the buyer-side resale acceptance and same-session cart creation are established. |
| `src/utils/sample-config.mjs` | Validates public demo settings and the configured route. |
| `src/utils/checkout-guard.mjs` | Advisory local unresolved-session marker, not a security or payment boundary. |
| `src/utils/checkout-runtime.js` | Browser-only SDK setup and React Query client. |
| `docs/layouts.md` | Ready-made checkout layouts and their SDK dependencies. |
| `docs/route-migration.md` | Original routed checkout progression and SDK compatibility work. |
| `docs/account-and-resale.md` | Current orders, tickets, sender resale and buyer resale contracts and their prerequisites. |

`TicketsContainer`, `BillingInfoContainer`, `PaymentContainer`,
`ConfirmationContainer`, `MyTicketsContainer`, `OrderDetailsContainer`,
`TicketResaleContainer`, `LoginModal` and `ForgotPasswordModal` are not
drop-in 2.x exports. Use `EmbeddedCheckout` for the stock event flow; the
other ready-made variants are pending the SDK update. Do not reconstruct 1.x
carts from browser local storage. `ResumedCheckout` requires an existing cart
in the same session.

See the exact published
[beta.28 React SDK documentation](https://www.npmjs.com/package/tf-checkout-react/v/2.0.0-beta.28),
including its ready-made components and composed layout recipes.

## Work remaining before release

- Resolve the seat-map peer conflict, generate a genuine lockfile, then install
  and build without peer-dependency bypasses.
- Run the contract tests and qualify Gatsby routing, CSS and assets in a
  deployed browser environment.
- Confirm the approved event, ID/slug mapping, origin access and the actual
  test merchant configuration.
- Fix and qualify ambiguous-payment handling, return/popup flows, durable
  reconciliation, idempotency, vouchers, identity verification and recovery.
- Resolve the SDK/backend ambient-cookie buyer isolation issue; implement and
  test an approved full-account journey before enabling order or resale views.
- Establish the buyer-side resale invitation, acceptance and same-session
  cart contract. Test owner changes, authorization, CSRF and uncertain writes.
