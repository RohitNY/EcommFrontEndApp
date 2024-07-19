import Vue from 'vue'
import Ripple from 'vue-ripple-directive'

// !vue-ripple-directive
// https://github.com/PygmySlowLoris/vue-ripple-directive
Ripple.color = 'rgba(255, 255, 255, 0.35)'
Ripple.zIndex = 55
Vue.directive('ripple', Ripple)
