import { types } from 'mobx-state-tree'
import * as R from 'ramda'

const colors = ['gray', 'purple', 'red', 'blue', 'pink', 'orange', 'black']

export const Color = types.enumeration(colors)

export type IColor = typeof Color.Type

export function toggleColor(existedColors: IColor[]): IColor | null {
  const availableColors = R.without(existedColors, colors)

  if (availableColors.length > 0) {
    const randomIndex = Math.floor(availableColors.length * Math.random())
    return availableColors[randomIndex]
  } else {
    return null
  }
}
