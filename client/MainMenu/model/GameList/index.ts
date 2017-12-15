import { types } from 'mobx-state-tree'
import { Game, IGame } from 'MainMenu/model/GameList/Game'

export const GameListModel = types.model({
  games: types.map(Game),
}).preProcessSnapshot(games => ({

}))

export type IGameListModel = typeof GameListModel.Type

function initialize(games: )
