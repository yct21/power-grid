import * as React from 'react'
import { IMainMenuModel } from 'MainMenu/store'
import { IGameListModel } from 'MainMenu/store/GameList'

interface GameListProps {
  games: IGameListModel,
}

const GameListView: React.SFC<GameListProps> = ({ games }) => {

}

function mapStore (store: IMainMenuModel): GameListProps {
  return {
    games: store.gameList
  }
}
