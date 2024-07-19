import axios from 'axios'
import compact from 'lodash/compact'
import { Event } from '~/helpers/utility.js'
import { DeviceLoadError } from '~/helpers/customErrors'

/**
 * We track each device loaded by adding the Device's unique Id to the cache
 * Set. We do this to ensure we only load a given Device's Script, Style, Template?
 * code once EVEN if a Device is used more than once on a given Shop Experience.
 */

const cache = new Map()
// window.DEVICE_CACHE = cache //! dev

export const EVENTS = {
  DeviceReady: 'DeviceReady'
}

export default class Device {
  constructor (deviceData) {
    this.name = `Device${deviceData.DeviceId}`
    this.events = this.deviceEvents
    this.data = deviceData

    return this.init()
  }

  get deviceEvents () {
    return {
      ready: `${this.name}:Ready`
    }
  }

  /* instance methods */
  init () {
    if (cache.has(this.name)) {
      const device = cache.get(this.name)
      return Promise.resolve({ ...device, data: this.data })
    }

    const deviceAssets = compact([
      this.data.TemplateAsync
        ? axios.get(this.data.Src.Template)
        : Promise.resolve({
          data: this.data.Src.Template
        }),
      axios.get(this.data.Src.Style),
      this.data.Src.Script && axios.get(this.data.Src.Script)
    ])

    return axios
      .all(deviceAssets)
      .then(
        axios.spread((template, style, script) => {
          this.data.Src.Template = this.processTemplate(template.data)
          this.append('style', style.data)
          script && this.append('script', script.data)
        })
      )
      .then(() => {
        cache.set(this.name, this)
        return this
      })
      .catch(() => {
        cache.delete(this.name)
        throw new DeviceLoadError(this.name)
      })
  }

  processTemplate (str) {
    const frontmatter = str.match(/^---([\s\S]*?)---$/m)
    let extractedTemplate = null

    if (frontmatter) {
      const templateData = {}
      frontmatter[0].split('\n').forEach((line) => {
        if (line !== '---') {
          // eslint-disable-next-line no-unused-vars
          const [_, variable, value] = line.split(/^(\w+):/)
          templateData[variable] = value
        }
      })

      this.data.DeviceData = Object.assign(this.data.DeviceData, templateData)
      extractedTemplate = str.match(/<template>([\s\S]*?)<\/template>$/m)[1].trim()
    }

    return extractedTemplate || str
  }

  append (nodeType, content) {
    const vNode = document.createElement(nodeType)
    const fn = nodeType === 'script' ? this.appendScript : this.appendStyle
    document.body.append(fn.call(this, vNode, content))
  }

  appendScript (node, content) {
    node.type = 'text/javascript'
    node.append(document.createTextNode(content))
    setTimeout(() => {
      Event.$emit(EVENTS.DeviceReady, this.events.ready)
    }, 100)
    return node
  }

  appendStyle (node, content) {
    node.type = 'text/css'
    node.append(document.createTextNode(content))
    return node
  }
}
