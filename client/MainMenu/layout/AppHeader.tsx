import * as React from 'react'
import { observer } from 'mobx-react'
import AppBar from 'material-ui/AppBar'
import Typography from 'material-ui/Typography'
import Toolbar from 'material-ui/Toolbar'
import { IMainMenuModel } from 'MainMenu/model'

export const Header = (model: IMainMenuModel) => {
  return (
    <AppBar>
      <Toolbar>
        <Typography type='title' color='inherit'>
          Power Grid
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
