import * as React from 'react'
import Paper from 'material-ui/Paper'
import Toolbar from 'material-ui/Toolbar'
import Table from 'material-ui/Table'
import Divider from 'material-ui/Divider'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import { ILobbyStore } from 'Lobby/store'
import { IGameMap } from 'Lobby/store/GameMap'
import { IGame } from 'Lobby/store/GameMap/Game'
import { injectStore } from 'utils/injectStore'
import * as style from 'Lobby/layout/GameList/style.css'

interface GameListProps {
  games: IGameMap,
}

const GameListToolbar = (games: IGameMap) => {
  const createGame = () => {
    games.createGame()
  }

  return (
    <Toolbar className={style.toolbar}>
      <Typography>Games</Typography>
      <Button fab mini>
        <AddIcon onClick={createGame}/>
      </Button>
    </Toolbar>
  )
}

const GameListTable = (games: IGameMap) => {
  const gameList: IGame[] = games.gameList
  if (gameList.length === 0) {
    return (
      <div className={style.gameList}>
        <p className={style.noGameLabel}>No Games Found</p>
      </div>
    )
  } else {
    return (
      <div>
        <Table>

        </Table>
      </div>
    )
  }
}

const GameListView: React.SFC<GameListProps> = ({ games }) => {
  return (
    <Paper className={style.gameListPaper}>
      { GameListToolbar(games) }
      <Divider />
      { GameListTable(games) }
    </Paper>
  )
}

function mapStore (store: ILobbyStore): GameListProps {
  return {
    games: store.games,
  }
}

export const GameList = injectStore(mapStore, GameListView)
