import { types } from 'mobx-state-tree'
import { Game } from 'MainMenu/store/GameList/Game'
import { OnlineNum } from 'MainMenu/store/OnlineNum'

export const MainMenuModel = types.model({
  onlineNum: OnlineNum,
  gameList: types.map(Game),
})

export type IMainMenuModel = typeof MainMenuModel.Type;
