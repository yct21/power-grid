import * as React from 'react'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import * as style from 'Lobby/layout/GameList/style.css'

const GameListToolbarView = (createGame: () => void) => {
  return (
    <Toolbar className={style.toolbar}>
      <Typography>Games</Typography>
      <Button fab mini>
        <AddIcon onClick={createGame}/>
      </Button>
    </Toolbar>
  )
}

export const GameListToolbar = GameListToolbarView
