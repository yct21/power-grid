import { Subscription } from 'rxjs/Subscription'
import { Channel, listen$ } from 'socket'

/**
 * Helper function to subscribe to a topic in channel in mobx-state-tree.
 *
 * @export
 * @param {Channel} channel The connected channel
 * @param {string} topic Topic to subscribe
 * @param {function(message: T) => void} callback The callback for Subscriber
 * @returns {Object} Hooks in mobx-state-tree to subscribe and unsubscribe to the stream
 */
export function channelMessageToAction<T> (
    channel: Channel,
    topic: string,
    callback: (message: T) => void) {
  let subscription: Subscription
  const message$ = listen$<T>(channel, topic)

  return {
    afterCreate () {
      subscription = message$.subscribe(callback)
    },
    beforeDestroy () {
      subscription.unsubscribe()
    }
  }
}
