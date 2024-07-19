/* App#event console debug logging helper */
const flattenLogArray = val =>
  '<Array[width:int, height:int]> ' + JSON.stringify(val, null, 0).replace(/\],\[/g, '] [')

export const Log = (event, myEventId) => {
  const colors = {
    Unsubscribe: ['yellow', 'black'],
    Ad: ['limegreen', 'black'],
    Analytics: ['tomato', 'white'],
    Devices: ['white', 'purple']
  }
  const [statusColor, statusBgColor] = colors[event] || ['orange', 'black']

  const eventGroupColors = {
    Unsubscribe: 'hotpink',
    Ad: 'limegreen',
    Analytics: 'tomato',
    Devices: 'azure'
  }

  return (payload) => {
    const safeCopy = JSON.parse(payload)

    if (safeCopy.data && safeCopy.data.supports) {
      safeCopy.data.supports = flattenLogArray(safeCopy.data.supports)
    }

    const json = JSON.stringify(safeCopy, null, 2)

    if (window && window.console) {
      window.console.log(
        '%c%s %c%s',
        `color:${eventGroupColors[event] || 'aliceblue'}`,
        `<${event || 'Ecom'}>`,
        `color:${statusColor};${statusBgColor ? `background:${statusBgColor}` : ''}`,
        `[${safeCopy.event}]`,
        myEventId || '',
        json
      )
    }
  }
}

/**
 * @param  {...any} args - first argument is [log, error, info, warn] and additional arguments
 * work like a traditional console.log statement should.
 */
export const Debug = (...args) => {
  const type = args[0]
  const msgs = args.slice(1, args.length)

  if (window && window.console) {
    window.console[type].call(console, '%c<EcomDebug>', 'color:red;background:white', ...msgs)
  }
}
