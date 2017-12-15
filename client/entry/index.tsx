import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'mobx-react'
import { mergeMap } from 'rxjs/operators'
import { loadParameters } from 'entry/loadParameters'
import { AppModel, IAppModel } from 'App/store'
import { App } from 'App/view'
import { initSocket, joinChannel, listen$, Socket, Channel } from 'socket'
import 'entry/global.css'
import 'typeface-roboto' // font

const { userId, currentGameId, socketUrl} = loadParameters()
const channelName = currentGameId ?
  `GameBoard-${currentGameId}` :
  `MainMenu`

const socket: Socket = initSocket(socketUrl, userId, channelName)
const channel: Channel = joinChannel(socket, channelName)

socket.onOpen$.pipe(
  mergeMap(() => channel.onOpen$),
  mergeMap(() => listen$<IAppModel>(channel, 'initialize')),
).subscribe((initialState: IAppModel) => {
  const store = AppModel.create(initialState, { channel })
  render(store)
})

function render (store: IAppModel) {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <App />
      </Provider>
    </AppContainer>,
    document.getElementById('app'),
  )
}
