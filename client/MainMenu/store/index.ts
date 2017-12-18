import { types } from 'mobx-state-tree'
import { OnlineNum } from 'MainMenu/store/OnlineNum'
import { GameList } from 'MainMenu/store/GameList'

export const MainMenuModel = types.model({
  userId: types.string,
  onlineNum: OnlineNum,
  gameList: GameList,
})

export type IMainMenuModel = typeof MainMenuModel.Type;
