import * as React from 'react'
import AppBar from 'material-ui/AppBar'
import Typography from 'material-ui/Typography'
import Toolbar from 'material-ui/Toolbar'
import { IMainMenuModel } from 'MainMenu/model'

// layouts
const Header: React.SFC<{}> = () => {
  return (
    <AppBar>
      <Toolbar>
        <Typography type="title" color="inherit">
          Power Grid
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export const MainMenu: React.SFC<IMainMenuModel> = (store: IMainMenuModel) => {
  return (
    <div>
      <Header />
    </div>
  )
}
