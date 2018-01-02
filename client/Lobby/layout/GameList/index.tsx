import * as React from 'react'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import { GameListToolbar } from 'Lobby/layout/GameList/Toolbar'
import { GameListTable } from 'Lobby/layout/GameList/Table'
import { ILobbyStore } from 'Lobby/store'
import { IGame } from 'Lobby/store/GameMap/Game'
import { injectStore } from 'utils/injectStore'
import * as style from 'Lobby/layout/GameList/style.css'

interface IGameListProps {
  gameList: IGame[],
  createGame: () => void,
}

const GameListView: React.SFC<IGameListProps> = ({ gameList, createGame }) => {
  console.log(gameList)
  return (
    <Paper className={style.gameListPaper}>
      { GameListToolbar(createGame) }
      <Divider />
      { GameListTable(gameList) }
    </Paper>
  )
}

function mapStore (store: ILobbyStore): IGameListProps {
  const games = store.games

  return {
    gameList: games.gameList,
    createGame: () => { games.createGame() },
  }
}

export const GameList = injectStore(mapStore, GameListView)
