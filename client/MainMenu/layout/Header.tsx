import * as React from 'react'
import { inject } from 'mobx-react'
import AppBar from 'material-ui/AppBar'
import Typography from 'material-ui/Typography'
import Toolbar from 'material-ui/Toolbar'
import Icon from 'material-ui/Icon'
import { IMainMenuModel } from 'MainMenu/store'

interface HeaderProps {
  onlineNum?: number,
}

const HeaderView: React.SFC<HeaderProps> = ({ onlineNum }) => {
  return (
    <AppBar>
      <Toolbar>
        <Typography type='title' color='inherit'>
          Power Grid
        </Typography>
        <Icon>person</Icon>
      </Toolbar>
    </AppBar>
  )
}

function mapStore (store: IMainMenuModel): HeaderProps {
  return {
    onlineNum: store.onlineNum.count
  }
}

export const Header = inject(mapStore)(HeaderView)
