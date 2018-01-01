import { types } from 'mobx-state-tree'
import { OnlineNum } from 'Lobby/store/OnlineNum'
import { GameMap } from 'Lobby/store/GameMap'

export const LobbyStore = types.model({
  userId: types.string,
  userName: types.maybe(types.string),
  onlineNum: OnlineNum,
  games: GameMap,
})

export type ILobbyStore = typeof LobbyStore.Type;
