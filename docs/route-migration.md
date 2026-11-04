# Original sample route migration

The 1.x Gatsby sample started at an event and moved through separate ticket,
billing, payment and confirmation pages. The goal is to preserve that
progression and its header/footer while the SDK owns the checkout session and
the ready-made views.

| Existing route | 1.x component | 2.x migration target |
| --- | --- | --- |
| `/` | Redirect to a hardcoded event | Open the explicitly configured, checked event. |
| `/events/[slug]` | `TicketsContainer` | SDK progressive checkout ticket step. |
| `/billing/billing-info` | `BillingInfoContainer` | Same mounted SDK checkout owner's buyer-details step. |
| `/billing/checkout` | `PaymentContainer` | Same owner's payment step. |
| `/billing/checkout-complete` | `ConfirmationContainer` | SDK confirmation/status view after an authoritative handoff. |
| `/orders` | `MyTicketsContainer` | SDK `OrderHistory` candidate, once full-account isolation is resolved. |
| `/order?o=...` | `OrderDetailsContainer` | A complete ready-made order-details layout, still to be provided by the SDK. |
| `/buy/resold/ticket` | `TicketResaleContainer` | A ready-made resale invitation/accept/decline flow and same-session checkout, still to be provided by the SDK. |

These are migration targets, not claims that the current beta provides them.
`OrderHistory` exists only in held shared PR #191. `ProgressiveCheckout` and a
route navigation contract are in development. Neither has been published.

A temporary, hard-disabled sample wrapper sketches how one `QueryClientProvider`
and checkout owner could remain mounted across client-side route changes. This
wrapper is only a review prototype: the reusable ownership and guarded routing
belong in a ready-made SDK adapter, which is not yet released. The SDK's guarded step transitions
should drive the displayed route; direct URL edits or browser Back must not
bypass validation, discard a seat hold or reset an in-flight payment. The
published beta's `onViewChange` only identifies `tickets`, `seats` and
`checkout`, so it cannot yet drive the two old billing/payment routes.

A hard reload or direct visit to a billing URL must not assume that 1.x local
storage, query-string flags or an arbitrary order hash recreate a current cart.
Use only a supported same-session server-cart recovery contract and retain an
uncertain order until its provider/backend status is known. If the result
cannot be established, offer neutral support rather than another payment.
No customer credentials, cart data, order hashes or provider tokens belong in
sample URLs or logs.

The full-account layouts also require server-authorized buyer ownership and an
enforced identity-retirement boundary for external browser-cookie changes.
Checkout authentication is not full-account authentication. The original
order details included PDF/ticket actions and sender resale; the original
resale route accepted or declined a resale invitation. The SDK must provide
those full journeys and deployed contracts before the sample can demonstrate
them again.
