import { types, getEnv } from 'mobx-state-tree'
import { Subscription } from 'rxjs/Subscription'
import { Channel, listen$ } from 'socket'

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
  const onlineNum$ = listen$<number>(channel, 'update:onlineNum')
  let subscription: Subscription

  return {
    afterCreate () {
      subscription = onlineNum$.subscribe((num: number) => self.updateCount(num))
    },
    beforeDestroy () {
      subscription.unsubscribe
    },
  }
})
