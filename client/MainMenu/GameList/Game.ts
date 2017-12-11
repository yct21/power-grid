import { types } from 'mobx-state-tree'
import { Player } from 'MainMenu/GameList/Player'

export const Game = types.model({
  id: types.identifier(),
  players: types.map(Player),
  state: types.enumeration('GameState', ['not-started', 'started', 'ended']),
  createdAt: types.Date,
})

export type IGame = typeof Game.Type
