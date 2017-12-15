import * as React from 'react'
import { IAppModel } from 'App/model'
import { MainMenu } from 'MainMenu/view'

export const App: React.SFC<IAppModel> = (store: IAppModel) => {
  return (
    <MainMenu {...store} />
  )
}
