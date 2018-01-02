// import { mergeMap } from 'rxjs/operators/mergeMap'
import { Subscription } from 'rxjs/Subscription'
// import { tap } from 'rxjs/operators/tap'
import { types, getParent } from 'mobx-state-tree'
import { Game, IGame } from 'Lobby/store/GameMap/Game'
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

export const GameMap = types
  .model('GameMap', {
    games: types.map(Game),
  })
  .preProcessSnapshot(games => ({
    games,
  }))
  .views(self => ({
    get gameList(): IGame[] {
      return self.games.values()
    },
  }))
  // basic CRUD actions to games
  .actions(self => ({
    addGame (game: IGame) {
      self.games.set(game.id, game)
    },
  }))
  // listen to new games
  .actions(self => {
    // new game
    const channel: Channel = getChannel(self)
    const newGame$ = listen$<IGame>(channel, 'games:new')
    let subscription: Subscription

    return {
      afterCreate() {
        subscription = newGame$.subscribe((game: IGame) => {
          self.addGame(game)
        })
      },
      beforeDestroy() {
        subscription.unsubscribe()
      }
    }
  })
  // create games
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

export type IGameMap = typeof GameMap.Type
