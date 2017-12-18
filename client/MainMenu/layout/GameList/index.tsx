import * as React from 'react'
import Paper from 'material-ui/Paper'
import Toolbar from 'material-ui/Toolbar'
import Table from 'material-ui/Table'
import Divider from 'material-ui/Divider'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import { IMainMenuModel } from 'MainMenu/store'
// import { IGame } from 'MainMenu/store/GameList/Game'
import { IGameList } from 'MainMenu/store/GameList'
import { injectStore } from 'utils/injectStore'
import * as style from 'MainMenu/layout/GameList/style.css'

interface GameListProps {
  gameList: IGameList,
}

const GameListToolbar = () => {
  return (
    <Toolbar className={style.toolbar}>
      <Typography>Games</Typography>
      <Button raised mini>
        <AddIcon />
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
      { GameListToolbar() }
      <Divider />
      { GameListTable(gameList) }
    </Paper>
  )
}

function mapStore (store: IMainMenuModel): GameListProps {
  return {
    gameList: store.gameList
  }
}

export const GameList = injectStore(mapStore, GameListView)
