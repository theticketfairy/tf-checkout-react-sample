// Browser-only initialization. A rejected load must not permanently poison
// the cached promise; configuration is still performed at most once on success.
let runtimePromise

export function getCheckoutRuntime(config) {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('The checkout requires a browser.'))
  }
  if (!runtimePromise) {
    runtimePromise = Promise.all([
      import('tf-checkout-react'),
      import('@tanstack/react-query'),
    ]).then(([sdk, query]) => {
      sdk.configureCheckout({
        env: config.environment,
        clientId: config.clientId,
        clientSecret: '',
        cookieAuth: true,
      })
      return {
        sdk,
        EmbeddedCheckout: sdk.EmbeddedCheckout,
        ttf: sdk.ttf,
        QueryClientProvider: query.QueryClientProvider,
        queryClient: new query.QueryClient(),
      }
    }).catch((error) => {
      runtimePromise = undefined
      throw error
    })
  }
  return runtimePromise
}
