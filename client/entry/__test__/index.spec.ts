import * as td from 'testdouble'

describe('entry/index', () => {
  it('gets application started', () => {
    // Given we could load application parameters from URL query and localStorage
    const loadParameters = td.function()
    const socketUrl = 'stubSocketUrl'
    const userId = 'stubUserId'
    const currentGameId = 'stubCurrentGameId'
    td.when(loadParameters()).thenReturn({ socketUrl, userId, currentGameId })
    td.replace('entry/loadParameters', { loadParameters })

    // And we could initialize Vue and install plugins on it
    const initVue = td.function()
    td.replace('entry/initVue', { initVue })

    // And we could start application with loaded parameters
    const startApp = td.function()
    td.replace('App', { startApp })

    // When started
    require('../index')

    // Then Vue is configured and installed with plugins
    td.verify(initVue())

    // And the real application is started with loaded parameters
    td.verify(startApp(socketUrl, userId, currentGameId))
  })
})
