import { types } from 'mobx-state-tree'
import { Subscription } from 'rxjs/Subscription'
import { Channel, listen$ } from 'socket'
import { getChannel } from 'utils/getChannel'

interface OnlineNumMessage {
  onlineNum: number,
}

export const OnlineNum = types
  .model('OnlineNum', {
    count: types.number,
  })
  .preProcessSnapshot((snapshot: number) => ({
    count: snapshot,
  }))
  .actions(self => ({
    updateCount (num: number) {
      self.count = num
    },
  }))
  .actions(self => {
    const channel: Channel = getChannel(self)
    const onlineNum$ = listen$<OnlineNumMessage>(channel, 'onlineNum:update')
    let subscription: Subscription

    return {
      afterCreate () {
        subscription = onlineNum$.subscribe(({ onlineNum }) => self.updateCount(onlineNum))
      },
      beforeDestroy () {
        subscription.unsubscribe()
      },
    }
  })
