import Vue from 'vue'
import * as VueRx from 'vue-rx'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import { Subject } from 'rxjs/Subject'

function installVueRx() {
  Vue.use(VueRx, {
    Observable,
    Subscription,
    Subject,
  })
}

export function initVue () {
  installVueRx()
}
