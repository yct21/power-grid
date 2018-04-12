import * as React from 'react'
import GemanyFlag from 'node_modules/flag-icon-css/flags/1x1/de.svg'

export function FlagIcon (nation: string, width = 50, height = 50) {
  // TODO: css in js here?
  const styles = {
    wrapper: {
      backgroundSize: 'contain',
      backgroundPosition: '50%',
      backgroundRepeat: 'no-repeat',
    }
  }

  return (
    <span style={styles.wrapper}/>
  )
}
