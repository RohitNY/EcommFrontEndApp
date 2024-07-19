<template>
  <div v-if="vm" :data-device="vm" data-ref="device-shell">
    <component :is="vm" />
  </div>
</template>

<script>
import Vue from 'vue'
import get from 'lodash/get'

import DeviceService from '~/services/Device.service'

import { assetTemplate } from '~/templates/assetTemplate'

let deviceVarsInterpolated = null
window.myVue = Vue

const deviceAccessibleVars = [
  ['FirstName', () => get(window, 'Spectrum.Bootstrap.User.FirstName')],
  ['LastName', () => get(window, 'Spectrum.Bootstrap.User.LastName')],
  ['Gender', () => get(window, 'Spectrum.Bootstrap.User.Gender')]
]

function createComponent (componentName, api, framework = {}) {
  const vars = api.data.DeviceData.Vars
    ? api.data.DeviceData.Vars.reduce((acc, [key, val]) => {
      acc[key] = framework.support.evalSpectrum(val)
      return acc
    }, {})
    : {}
  // delete data.Vars

  const clientInjectedVars =
    deviceVarsInterpolated ||
    deviceAccessibleVars.reduce((acc, [key, val]) => {
      acc[key] = val()
      return acc
    }, {})
  if (!deviceVarsInterpolated) {
    deviceVarsInterpolated = clientInjectedVars
  }

  Vue.component(componentName, {
    ...framework,
    data () {
      return {
        Id: api.data.Id ? api.data.Id : 'no-id',
        ...framework.data,
        ...api.data.DeviceData,
        ...Object.assign(vars, clientInjectedVars)
      }
    },
    mounted () {
      this.$hopX.DeviceEvent({
        event: 'on_device_load_event',
        name: api.name,
        msg: 'Device has been loaded on tab',
        data: api.data,
        $hopX: this.$hopX
      })
    },
    template: api.data.Ui === 'assetTemp' ? assetTemplate : api.data.Src.Template
  })

  return componentName
}

export default {
  props: {
    data: Object,
    itemIndex: Number
  },
  data () {
    return {
      vm: null
    }
  },
  async mounted () {
    const { Placement, Slug } = this.$store.getters[
      'app/getActivePathExperience'
    ]

    /**
     * Require supporting Script and Style tags every time a Device is to be
     * rendered on the UI. If any of these required files failes to load,
     * we will skip the rendering of the Device. We attempt to reload these
     * files on page changes and retry to load component.
     */
    try {
      this.device = await new DeviceService(this.data)

      const { default: framework } = await import(
        '~/frameworks/' + this.data.Framework + '.js'
      )

      const id = `${this.device.name}-${Placement}-${this.itemIndex}`.toLowerCase()

      const deviceComponent = this.$store.getters[
        'device/getComponentIfExistsOrNull'
      ](Slug, id)

      if (deviceComponent) {
        this.vm = deviceComponent
      } else {
        const deviceName = await this.$store.dispatch('device/add', {
          tab: Slug,
          name: id
        })

        /* if  */
        if (deviceName) {
          this.vm = createComponent(deviceName, this.device, framework)
        }
      }
    } catch (err) {
      this.$hopX.debug('error', err)
    }
  }
}
</script>
