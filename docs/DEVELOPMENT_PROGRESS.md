# Development progress

## 2026-11-04: SDK 2.x sample migration draft

The existing Gatsby routes and header/footer are being migrated to the
shared-core React SDK. The public SDK is pinned to 2.0.0-beta.28; browser-side
Basic authorization and 1.x-only container imports are removed in the draft.

- An explicitly selected test event can be inspected after the operator starts
  an SDK session. Real-event checkout remains gated pending SDK recovery and
  authoritative payment status.
- A loopback-only free-order fixture uses the real SDK and a fixed mock API.
  The router's contract tests pass in an in-memory Node harness; no Gatsby build
  or browser checkout has yet verified its complete wire flow.
- The sample selector anticipates the SDK's proposed ready-made single-page,
  progressive and accordion layouts. Their exports are not in beta.28. A
  hard-disabled host-route prototype is present for review, but reusable routed
  checkout ownership belongs in the SDK before this sample can use it.
- The original account/order/resale paths remain blocked while the SDK's
  full-account identity boundary, order details and resale layouts are
  developed. They are pending compatibility work, not dropped features.
- A minimal React 18/beta.28 dependency-resolution experiment found peer
  warnings and a strict-peer failure. The Gatsby install, real lockfile and
  full build remain outstanding. No dependency bypass has been used.

See [README](../README.md), [layouts](layouts.md) and
[account and resale](account-and-resale.md) for precise integration and
qualification requirements. Shared SDK draft [#191](https://github.com/theticketfairy/tf-shared-libraries/pull/191)
contains an unreleased OrderHistory layout and is on hold for buyer isolation.
