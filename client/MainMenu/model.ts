import { types } from 'mobx-state-tree'
import { Game } from 'MainMenu/GameList/Game'
import { OnlineNum } from 'MainMenu/OnlineNum'

export const MainMenuModel = types.model({
  onlineNum: OnlineNum,
  gameList: types.map(Game),
})

export type IMainMenuModel = typeof MainMenuModel.Type;
