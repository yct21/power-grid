import Vue from 'vue'
import 'entry/global.css'
import Main from '../Main/index.vue'

new Vue({
  el: '#app',
  components: { Main },
  template: '<Main />'
})
