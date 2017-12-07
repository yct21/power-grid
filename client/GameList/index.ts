import { Subject } from 'rxjs/Subject'
import { Game } from 'GameList/Game'

export interface GameList {
  // list of games
  games$: Subject<Game[]>
}

function getGames (gameList: GameList) {
  return gameList.games$.
}

export function initGameList () {
}
