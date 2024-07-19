import { BootstrapFetchError } from '~/helpers/customErrors.js'

async function fetchConfig (api) {
  const result = await api
    .get(`/bootstraps/${window.Spectrum.BootstrapUri}`, {
      Headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'include'
      }
    })
    .then(({ data, status }) => {
      return status === 200 ? data : new Error()
    })
    .catch(() => {
      if (process.env.dev) {
        throw new BootstrapFetchError()
      }
    })
  return result
}

export default async function ({ app, route, store }) {
  /* if config is null, we need to fetch the config setup from the server */
  let config = store.getters['app/getBootstrapConfig']
  if (!config) {
    config = window.Spectrum.Bootstrap || (await fetchConfig(app.$api))
    if (!window.Spectrum.Bootstrap) {
      window.Spectrum.Bootstrap = config
    }
    if (config) {
      await store.dispatch('app/setBootstrap', config)
      store.dispatch('cart/init', config.Cart)
    }
  }
}
