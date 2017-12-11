import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { mergeMap } from 'rxjs/operators'
import { loadParameters } from 'entry/loadParameters'
import { AppModel, IAppModel } from 'App/model'
import { initSocket, joinChannel, listen$, Socket, Channel } from 'socket'
import 'entry/global.css'

const { currentGameId, socketUrl} = loadParameters()
const channelName = currentGameId ?
  `GameBoard-${currentGameId}` :
  `MainMenu`

const socket: Socket = initSocket(socketUrl, channelName)
const channel: Channel = joinChannel(socket, channelName)

socket.onOpen$.pipe(
  mergeMap(() => channel.onOpen$),
  mergeMap(() => listen$(channel, 'initialize')),
).subscribe((initialState: IAppModel) => {
  const store = AppModel.create(initialState)
  render(store)
})

function render (store: IAppModel) {
  ReactDOM.render(
    <AppContainer>
      <p>Hello!</p>
    </AppContainer>,
    document.getElementById('app'),
  )
}
