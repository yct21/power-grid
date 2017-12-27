import * as React from 'react'
import AppBar from 'material-ui/AppBar'
import Typography from 'material-ui/Typography'
import Toolbar from 'material-ui/Toolbar'
import { UserIcon } from 'icons/UserIcon'
import { ILobbyStore } from 'Lobby/store'
import { injectStore } from 'utils/injectStore'
import * as style from 'Lobby/layout/Header/style.css'

interface HeaderProps {
  onlineNum: number,
}

const HeaderOnlineNum = (onlineNum: number) => {
  const props = {
    width: 20,
    height: 20,
  }

  return (
    <div className={style.onlineNumDiv}>
      <UserIcon {...props}/>
      <span> {onlineNum} Online </span>
    </div>
  )
}

const HeaderView: React.SFC<HeaderProps> = ({ onlineNum }) => {
  return (
    <AppBar position='static'>
      <Toolbar className={style.appHeader}>
      <Typography type='title' color='inherit' className={style.typography}>
          Power Grid
        </Typography>
       { HeaderOnlineNum(onlineNum) }
      </Toolbar>
    </AppBar>
  )
}

function mapStore (store: ILobbyStore): HeaderProps {
  return {
    onlineNum: store.onlineNum.count
  }
}

export const Header = injectStore(mapStore, HeaderView)
