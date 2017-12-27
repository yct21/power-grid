// import { mergeMap } from 'rxjs/operators/mergeMap'
import { Subscription } from 'rxjs/Subscription'
// import { tap } from 'rxjs/operators/tap'
import { types, getParent } from 'mobx-state-tree'
import { Game, IGame } from 'Lobby/store/GameList/Game'
import { Channel, push$, listen$ } from 'socket'
import { getChannel } from 'utils/getChannel'
import { toggleColor } from 'shared/models/Color'

// create game
// join game
// observe game
// refresh games
// control create game button
// toggle colors
// sort game

export const GameList = types
  .model({
    games: types.map(Game),
  })
  .preProcessSnapshot(games => ({
    games,
  }))
  .actions(self => {
    // new game
    const channel: Channel = getChannel(self)
    const newGame$ = listen$<IGame>(channel, 'game:new')
    let subscription: Subscription

    return {
      afterCreate() {
        subscription = newGame$.subscribe((game: IGame) => {
          self.games.put(game)
        })
      },
      beforeDestroy() {
        subscription.unsubscribe()
      }
    }
  })
  .extend(self => {
    const channel: Channel = getChannel(self)
    let waitForResponse = false

    const createGame = () => {
      waitForResponse = true
      const userName = getParent(self).userName
      const color = toggleColor([])

      // TODO: catch errors here
      push$(channel, 'game:create', { userName, color }).subscribe(() => {
        waitForResponse = false
      })
    }

    return {
      views: { get creatingGame() { return waitForResponse } },
      actions: { createGame },
    }
  })

export type IGameList = typeof GameList.Type
