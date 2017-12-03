import * as td from 'testdouble'

describe('entry/index', () => {
  it('gets application started', () => {
    // Given we could initialize websocket
    const initSocket = td.function()
    td.replace('socket', { initSocket })

    // And we could initialize Vue and mount it to DOM
    const initVue = td.function()
    td.replace('entry/vue', { initVue })

    // When started
    require('../index')

    // Then websocket is initialized

    // Then Vue is initialized and mounted
    td.verify(initVue())
  })
})
