module.exports = {
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js'
  },
  moduleFileExtensions: ['js', 'vue', 'json'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.vue$': 'vue-jest'
  },
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/components/**/*.vue', '<rootDir>/pages/**/*.vue'],
  reporters: ['default', 'jest-teamcity'],
  // setupFilesAfterEnv: ['./static/js/spectrum.js'],
  setupFiles: ['./tests/setup.js'],
  globals: {
    'vue-jest': {
      experimentalCSSCompile: true,
      resources: {
        scss: ['./assets/styling/mixins.scss']
      }
    }
    // Spectrum: {/*Spectrum obj mock, handled in setup.js*/}
  }
}
