import { types } from 'mobx-state-tree'
import { GameListModel } from 'MainMenu/GameList/model'

export const MainMenuModel = types.model({
  onlineNum: types.number,
  gameList: GameListModel,
})

export type IMainMenuModel = typeof MainMenuModel.Type;
