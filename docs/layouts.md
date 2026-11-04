# Ready-made checkout layouts

The sample uses whole layouts exported by the SDK. It does not require
integrators to assemble ticket selection, buyer details, waivers or payment
sections themselves.

Beta.28 currently exports `EmbeddedCheckout` for a complete event checkout and
`ResumedCheckout` for a cart already created in the same session. The
`SinglePageCheckout`, `ProgressiveCheckout` and `AccordionCheckout` exports are
being prepared in an SDK draft; they are **not** in the published beta.28
package. The local simulator detects whether each export exists and disables
unavailable options.

No usage example is included for the unreleased variants. After a new SDK
release includes them, update this sample's dependency and documentation
together, then verify each layout's props, navigation and payment recovery
against that exact release. A host supplies one `QueryClientProvider` and
configures the SDK once; each ready-made layout owns its checkout provider.

## Original routes

The 1.x sample split ticket selection, billing, payment and confirmation over
`/events/[slug]` and `/billing/*`. The existing beta.28 `onViewChange` reports
only `tickets`, `seats` and `checkout`, so it cannot map billing and payment
to separate URL states. A guarded step navigation contract is being evaluated
in the SDK; its props, Back/Edit behavior and availability are not yet fixed.
The checkout owner must remain mounted during client-side navigation. A full
reload or direct link must not be represented as a resumed cart until an
authoritative recovery contract exists.

`ResumedCheckout` accepts an already-created current-session cart. It does not
create a resale cart. See [account and resale](account-and-resale.md).

All layouts require the durable payment-status and recovery work listed in the
README before live payment. The [published beta.28 guide](https://www.npmjs.com/package/tf-checkout-react/v/2.0.0-beta.28)
documents the currently available components; do not copy unreleased exports
into an integration until a new SDK release includes them.
