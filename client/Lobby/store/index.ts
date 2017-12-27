import { types } from 'mobx-state-tree'
import { OnlineNum } from 'Lobby/store/OnlineNum'
import { GameList } from 'Lobby/store/GameList'

export const LobbyStore = types.model({
  userId: types.string,
  userName: types.maybe(types.string),
  onlineNum: OnlineNum,
  gameList: GameList,
})

export type ILobbyStore = typeof LobbyStore.Type;
