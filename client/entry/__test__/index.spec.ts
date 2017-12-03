import * as td from 'testdouble'

describe('entry/index', () => {
  it('gets application started', () => {
    // Given we could initialize Vue and mount it to DOM
    const initVue = td.function()
    td.replace('entry/initVue', { initVue })

    // When started
    require('../index')

    // Then Vue is initialized and mounted
    td.verify(initVue())
  })
})
