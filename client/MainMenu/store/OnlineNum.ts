import { types, getEnv } from 'mobx-state-tree'
import { Subscription } from 'rxjs/Subscription'
import { Channel, listen$ } from 'socket'

interface OnlineNumMessage {
  onlineNum: number,
}

export const OnlineNum = types.model('OnlineNum', {
  count: types.number,
}).preProcessSnapshot((snapshot: number) => ({
  count: snapshot,
})).actions(self => ({
  updateCount (num: number) {
    self.count = num
  },
})).actions(self => {
  const channel: Channel = getEnv(self).channel
  const onlineNum$ = listen$<OnlineNumMessage>(channel, 'update:onlineNum')
  let subscription: Subscription

  return {
    afterCreate () {
      subscription = onlineNum$.subscribe(({ onlineNum }) => self.updateCount(onlineNum))
    },
    beforeDestroy () {
      subscription.unsubscribe
    },
  }
})
