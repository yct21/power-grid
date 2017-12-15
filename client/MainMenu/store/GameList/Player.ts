import { types } from 'mobx-state-tree'
import { Color } from 'shared/models/Color'

export const Player = types.model({
  id: types.identifier(),
  name: types.maybe(types.string),
  color: Color,
})

export type IPlayer = typeof Player.Type
