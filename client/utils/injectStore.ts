import { SFC } from 'react'
import { inject } from 'mobx-react'

// M: model
// P: component props

// React context where mobx injects the store
type ReactContext<M> = { store: M }

// mapper function of each component
type MapFunction<P, M> = (store: M) => P

type ContextMapFunction<P, M> = (context: ReactContext<M>) => P
function unwrapStore<P, M> (mapFunction: MapFunction<P, M>): ContextMapFunction<P, M> {
  return (context: ReactContext<M>) => {
    return mapFunction(context.store)
  }
}

export function injectStore<P, M>(
  mapFunction: MapFunction<P, M>,
  component: SFC<P>,
): SFC<{}> {
  const realMapper = unwrapStore(mapFunction)
  return inject(realMapper)(component)
}
