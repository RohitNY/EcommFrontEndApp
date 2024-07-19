export class BootstrapFetchError extends Error {
  name = 'BootstrapFetchError'
  message = 'Cannot load a Spectrum shopping experience because /bootstraps failed to return a valid configuration object.'
}

export class ProductFetchError extends Error {
  name = 'ProductFetchError'
  message = 'Cannot load products from Spectrum. The API is not responding or "DataUri" field is not valid.'
}

export class DeviceLoadError extends Error {
  name = 'DeviceLoadError'
  message = `Device assets failed to load for ${this.message}`
}
