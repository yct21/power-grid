import * as React from 'react'
import { Header } from 'Lobby/layout/Header'
import { GameList } from 'Lobby/layout/GameList'

export const Lobby: React.SFC<{}> = () => {
  return (
    <div>
      <Header />
      <GameList />
    </div>
  )
}

Lobby.displayName = 'Lobby'
