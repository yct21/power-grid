// import { initVue } from 'entry/initVue'
// import { startApp } from 'App'
// import { loadParameters } from 'entry/loadParameters'

// const { userId, currentGameId, socketUrl } = loadParameters()
// initVue()
// startApp(socketUrl, userId, currentGameId)

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import 'entry/global.css'

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <p>Hello!</p>
    </AppContainer>,
    document.getElementById('app'),
  )
}

render()
