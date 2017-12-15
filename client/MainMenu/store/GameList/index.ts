import { types } from 'mobx-state-tree'
import { Game } from 'MainMenu/store/GameList/Game'

export const GameListModel = types.model({
  games: types.map(Game),
})

export type IGameListModel = typeof GameListModel.Type

// function initialize(games: )
