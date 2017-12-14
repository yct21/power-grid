import { types } from 'mobx-state-tree'
import { Game } from 'MainMenu/GameList/Game'

export const MainMenuModel = types.model({
  onlineNum: types.number,
  gameList: types.map(Game),
})

export type IMainMenuModel = typeof MainMenuModel.Type;
