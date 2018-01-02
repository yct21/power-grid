import { types } from 'mobx-state-tree'
import { Color } from 'shared/models/Color'

export const Player = types
  .model('Player', {
    id: types.string,
    name: types.maybe(types.string),
    color: Color,
    joinAt: types.Date,
  })
  .preProcessSnapshot(({id, name, color, join_at: joinAt}) => ({
    id,
    name,
    color,
    joinAt: new Date(joinAt)
  }))

export type IPlayer = typeof Player.Type
