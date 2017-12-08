import { Observable } from 'rxjs/Observable'
import { State as MainMenuState } from 'App/MainMenu/state'

export type State = {
  kind: 'MainManu',
  payload: MainMenuState,

  // event subject

}

export function initState(userId: string, currentGameId: string) {

}
