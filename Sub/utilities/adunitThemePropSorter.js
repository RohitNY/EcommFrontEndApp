// New values copied directly from Chrome inspector
const newThemeValues = `
    --theme-color-primary: rgb(253 121 14);
    --theme-color-secondary: rgb(255 255 255);
    --theme-color-contrast: rgb(169 112 25);
    --theme-color-body: rgb(27 10 41);
    --theme-font-color-body: rgb(255, 255, 255);
    --theme-font-color-body-main-savings: rgb(204 49 49);
    --theme-font-color-primary: rgb(255, 255, 255);
    --theme-font-color-smlt-primary: rgb(255, 255, 255);
    --theme-border-primary: var(--universal-adunit-frame-border) solid rgb(49, 49, 49);
    --universal-box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.5);
    --theme-font-color-feature-header: rgb(255, 255, 255);
    --theme-background-color-feature-header: rgb(49, 49, 49);
    --theme-font-color-content: rgb(255, 255, 255);
    --theme-font-color-content-main-savings: rgb(237 215 255);
    --theme-background-color-content: rgb(26 13 37);
    --theme-background-color-readmore-button: rgb(27 10 41);
    --theme-font-color-readmore-button: rgb(255, 255, 255);
    --theme-border-pricing: var(--universal-adunit-frame-border) solid rgb(49, 49, 49);
    --theme-background-color-tiered-pricing: rgb(49 39 58);
    --theme-font-color-tiered-pricing: rgb(255, 255, 255);
    --theme-background-color-part-pay-pricing: rgb(26 13 37);
    --theme-font-color-part-pay-text: rgb(255, 255, 255);
    --theme-font-color-part-pay-price: rgb(228 218 216);
    --theme-background-color-button: rgb(253 121 14);
    --theme-font-color-button: rgb(255 255 255);
    --theme-font-color-quantity-toggle: rgb(255, 255, 255);
    --theme-background-color-quantity-toggle: rgb(26 14 36);
    --theme-background-color-smlt-tray: rgb(49 49 49);
    --theme-font-color-smlt-button: rgb(170 170 170);
    --theme-background-color-smlt-button: rgb(30, 30, 30);
    --theme-font-color-title: rgb(111 111 111);
    --theme-font-color-image-count: rgb(240 240 240);
    `

// ! DO NOT EDIT PAST THIS LINE UNLESS GLOBAL $HOPX ADUNIT THEME HAS BEEN MODIFIED
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

const masterLabels = ['// Feature Header', '// Content', '// Pricing', '// See More Like This', '// Image Preview']
const masterTemplate = `--theme-color-primary: rgb(80, 94, 53);
    --theme-color-secondary: rgb(36, 176, 106);
    --theme-color-body: rgb(236, 236, 236);
    --theme-color-contrast: rgba(26, 164, 142, 0.37);
    --theme-font-color-primary: rgb(11, 77, 67);
    --theme-font-color-smlt-primary: rgb(2, 69, 59);
    --theme-border-primary: var(--universal-adunit-frame-border) solid rgb(223, 255, 157);
    // Feature Header
    --theme-font-color-feature-header: rgb(11, 77, 67);
    --theme-background-color-feature-header: rgb(221, 255, 152);
    // Content
    --theme-font-color-content: rgb(0, 0, 0);
    --theme-font-color-content-main-savings: rgb(28, 74, 120);
    --theme-background-color-content: rgb(236, 236, 238);
    --theme-background-color-readmore-button: rgb(236, 236, 238);
    --theme-font-color-readmore-button: rgb(0, 0, 0);
    // Pricing
    --theme-border-pricing: var(--universal-adunit-frame-border) solid rgb(221, 255, 152);
    --theme-background-color-tiered-pricing: rgb(221, 255, 152);
    --theme-font-color-tiered-pricing: rgb(11, 77, 67);
    --theme-background-color-part-pay-pricing: rgb(236, 236, 236);
    --theme-font-color-part-pay-text: rgb(0, 0, 0);
    --theme-font-color-part-pay-price: rgb(36, 176, 106);
    --theme-background-color-button: rgb(36, 176, 106);
    --theme-font-color-button: rgb(236, 236, 236);
    --theme-font-color-quantity-toggle: rgb(11, 77, 67);
    --theme-background-color-quantity-toggle: rgba(26, 164, 142, 0.37);
    // See More Like This
    --theme-background-color-smlt-tray: rgb(221, 255, 152);
    --theme-font-color-smlt-button: rgb(2, 69, 59);
    --theme-background-color-smlt-button: rgb(236, 236, 236);
    --theme-font-color-title: rgb(2, 69, 59);
    // Image Preview
    --theme-font-color-image-count: rgb(255, 255, 255);`

const getCSSVar = (line) => {
  line = line.trim()
  return line.slice(0, 2) === '--' ? line : null
}

const splitLine = (line) => {
  if (line) { return line.split(':').map(v => v.trim()) } else { return [] }
}

function createCssMap (vars) {
  const values = new Map()
  vars.split('\n').forEach((line, i) => {
    const [cssVar, cssValue] = splitLine(getCSSVar(line))
    if (cssVar) {
      values.set(cssVar, cssValue)
    } else {
      values.set(i, '------------------------------------------------')
    }
  })
  return values
}

const sortedCssMap = createCssMap(masterTemplate)
const newThemeCssMap = createCssMap(newThemeValues)
let output = ''

sortedCssMap.forEach((key, prop) => {
  const cssValue = newThemeCssMap.get(prop)
  if (cssValue) {
    output += `${prop}: ${cssValue} \n`
  } else {
    const label = masterLabels.shift()
    output += '\n' + label + '\n'
  }
})

function pbcopy (data) {
  const proc = require('child_process').spawn('pbcopy')
  proc.stdin.write(data)
  proc.stdin.end()
}

console.log(output)
console.log('Great success! The new theme was copied to clipboard...')
pbcopy(output)
