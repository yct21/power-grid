import * as React from 'react'
import AppBar from 'material-ui/AppBar'
import Typography from 'material-ui/Typography'
import Toolbar from 'material-ui/Toolbar'
import { UserIcon } from 'Icons/UserIcon'
import { IMainMenuModel } from 'MainMenu/store'
import { injectStore } from 'utils/injectStore'
import * as style from 'MainMenu/layout/Header/style.css'

interface HeaderProps {
  onlineNum: number,
}

const HeaderOnlineNum = (onlineNum: number) => {
  const props = {
    width: 20,
    height: 20,
  }
  console.log(style)

  return (
    <div className={style.onlineNumDiv}>
      <UserIcon {...props}/>
    </div>
  )
}

const HeaderView: React.SFC<HeaderProps> = ({ onlineNum }) => {
  return (
    <AppBar>
      <Toolbar>
        <Typography type='title' color='inherit'>
          Power Grid
        </Typography>
      { HeaderOnlineNum(onlineNum) }
      </Toolbar>
    </AppBar>
  )
}

function mapStore (store: IMainMenuModel): HeaderProps {
  return {
    onlineNum: store.onlineNum.count
  }
}

export const Header = injectStore(mapStore, HeaderView)
