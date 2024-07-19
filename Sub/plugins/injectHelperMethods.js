import * as utilityMethods from '~/helpers/utility.js'

export default function (context, inject) {
  // Inject to context as $api
  inject('hopX', utilityMethods)
}
