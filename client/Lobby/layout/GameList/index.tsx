import * as React from 'react'
import Paper from 'material-ui/Paper'
import Toolbar from 'material-ui/Toolbar'
import Table from 'material-ui/Table'
import Divider from 'material-ui/Divider'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import { ILobbyStore } from 'Lobby/store'
// import { IGame } from 'Lobby/store/GameList/Game'
import { IGameList } from 'Lobby/store/GameList'
import { injectStore } from 'utils/injectStore'
import * as style from 'Lobby/layout/GameList/style.css'

interface GameListProps {
  gameList: IGameList,
}

const GameListToolbar = (gameList: IGameList) => {
  const createGame = () => {
    gameList.createGame()
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

const GameListTable = (gameList: IGameList) => {
  if (gameList.games.size === 0) {
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

const GameListView: React.SFC<GameListProps> = ({ gameList }) => {

  return (
    <Paper className={style.gameListPaper}>
      { GameListToolbar(gameList) }
      <Divider />
      { GameListTable(gameList) }
    </Paper>
  )
}

function mapStore (store: ILobbyStore): GameListProps {
  return {
    gameList: store.gameList
  }
}

export const GameList = injectStore(mapStore, GameListView)
