import Vue from 'vue'
import { initSocket, joinChannel } from 'socket'
import App from 'App/vm.vue'

export function startApp(socketUrl: string, userId: string, gameId: string | null) {
  const socket = initSocket(socketUrl)
  const channel = joinChannel()

  new Vue({
    el: '#app',
    components: { App },
    template: '<App />'
  })
}
