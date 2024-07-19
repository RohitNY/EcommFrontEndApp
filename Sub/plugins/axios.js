export default function ({ app, route, $axios, env }, inject) {
  const api = $axios.create({
    timeout: env.dev ? 10000 : route.query.__rm_api_timeout ? 0 : 25000,
    headers: {
      common: {
        Accept: 'application/json'
      }
    },
    withCredentials: true
  })

  api.setBaseURL(window.Spectrum.Env.ApiBaseUrl)

  api.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      const status = error.response.status
      const redirectUrl = window.Spectrum.RedirectError[status]
      if (redirectUrl) {
        app.$hopX.AnalyticEvent('onApiRedirectFailure', {
          http_request_url: error.response.config.baseURL + error.response.config.url,
          http_request_method: error.response.config.method,
          http_request_headers: error.response.config.headers,
          http_response_status: error.response.status,
          http_response_status_text: error.response.statusText,
          http_response_headers: error.response.headers,
          http_response_body: error.response.data
        })
        location.href = redirectUrl
      } else {
        return Promise.reject(error)
      }
    }
  )

  inject('api', api)
}
