import { types } from 'mobx-state-tree'
import { Game } from 'MainMenu/GameList/Game'

export const GameListModel = types.model({
  games: types.map(Game),
})

export type IGameListModel = typeof GameListModel.Type
