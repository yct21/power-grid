import { types } from 'mobx-state-tree'
import { Game } from 'MainMenu/store/GameList/Game'

export const GameList = types.model({
  games: types.map(Game),
}).preProcessSnapshot(games => ({
  games,
}))

export type IGameList = typeof GameList.Type
