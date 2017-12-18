import { getEnv, IStateTreeNode } from 'mobx-state-tree'
import { Channel } from 'socket'

export function getChannel (node: IStateTreeNode): Channel {
  return getEnv(node).channel
}
