const fs = require('fs')
const path = require('path')
const Vue = require('vue')

if (!global.__JEST_SETUP_ONCE_COMPLETE_FLAG) {
  /**
   * #1 setSpectrumGlobalMock
   */
  ;(function setSpectrumGlobalMock () {
    const spectrumMockFile = fs.readFileSync(path.join(__dirname, '/../static/js/spectrum.js'), 'utf8')
    const spectrumMock = spectrumMockFile.replace('window.Spectrum = ', '')
    // eslint-disable-next-line no-eval
    global.Spectrum = eval('(' + spectrumMock + ')')
  })()

  /**
   * #2 setupGlobalVueComponents
   */
  ;(function setupGlobalVueComponents () {
    const getAllFiles = function (dirPath, arrayOfFiles) {
      const files = fs.readdirSync(dirPath)

      arrayOfFiles = arrayOfFiles || []

      files.forEach(function (file) {
        if (fs.statSync(dirPath + '/' + file).isDirectory()) {
          arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles)
        } else {
          arrayOfFiles.push(path.join(__dirname, dirPath, '/', file))
        }
      })

      return arrayOfFiles
    }

    const extractGlobalVueComponents = getAllFiles('./components').filter(file => /\.global\.vue/.test(file))

    extractGlobalVueComponents.forEach((component) => {
      const relativePath = component.replace(/.+\/tests\//, '~/')
      try {
        const c = require(relativePath).default

        /* globally register Vue components */
        if (c.name) {
          Vue.component(c.name, c)
        }
      } catch (error) {
        console.log(error)
      }
    })
  })()

  /**
   * Complete JEST one-time Setup
   */
  global.__JEST_SETUP_ONCE_COMPLETE_FLAG = true
}
