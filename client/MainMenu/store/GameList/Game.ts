import { types } from 'mobx-state-tree'
import { Player } from 'MainMenu/store/GameList/Player'

export const Game = types
  .model({
    id: types.identifier(),
    state: types.enumeration('GameState', ['waiting', 'started', 'ended']),
    players: types.map(Player),
    createdAt: types.Date,
  })
  .preProcessSnapshot(({id, state, players, createdAt}) => ({
    id,
    state,
    players,
    createdAt: new Date(createdAt)
  }))

export type IGame = typeof Game.Type
