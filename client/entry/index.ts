import { initVue } from 'entry/initVue'
import { startApp } from 'App'
import { loadParameters } from 'entry/loadParameters'

const { userId, currentGameId, socketUrl } = loadParameters()
initVue()
startApp(socketUrl, userId, currentGameId)
