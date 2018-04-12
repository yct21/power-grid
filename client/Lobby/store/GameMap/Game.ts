import { types } from 'mobx-state-tree'
import { Player } from 'Lobby/store/GameMap/Player'

export const Game = types
  .model('Game', {
    id: types.string,
    status: types.enumeration('GameStatus', ['waiting', 'started', 'ended']),
    map: types.enumeration('GameMap', ['germany']),
    players: types.array(Player),
    createdAt: types.Date,
  })
  .preProcessSnapshot(({id, status, players, created_at: createdAt}) => ({
    id,
    status,
    players,
    createdAt: new Date(createdAt)
  }))

export type IGame = typeof Game.Type
