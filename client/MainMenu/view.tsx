import * as React from 'react'
import { Header } from 'MainMenu/layout/Header'

export const MainMenu: React.SFC<{}> = () => {
  return (
    <div>
      <Header />
    </div>
  )
}

MainMenu.displayName = 'MainMenu'
