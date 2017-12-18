import * as React from 'react'
import { Header } from 'MainMenu/layout/Header'
import { GameList } from 'MainMenu/layout/GameList'

export const MainMenu: React.SFC<{}> = () => {
  return (
    <div>
      <Header />
      <GameList />
    </div>
  )
}

MainMenu.displayName = 'MainMenu'
