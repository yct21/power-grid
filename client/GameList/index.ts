import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Game } from 'GameList/Game'
import { Channel } from 'socket'

export interface GameList {
  // list of games
  games$: BehaviorSubject<Game[]>
}

export function getGames (gameList: GameList): Game[] {
  return gameList.games$.getValue()
}

export function initGameList (mainMenuChannel: Channel) {
  // const updateGameList$ = listen<Game[]>(mainMenuChannel, 'main-menu:update-game-list')
}
