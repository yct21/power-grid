import Vue from 'vue'
import * as VueRx from 'vue-rx'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import { Subject } from 'rxjs/Subject'
import App from 'App/index.vue'

export function initVue () {
  Vue.use(VueRx, {
    Observable,
    Subscription,
    Subject,
  })

  new Vue({
    el: '#app',
    components: { App },
    template: '<App />'
  })
}
