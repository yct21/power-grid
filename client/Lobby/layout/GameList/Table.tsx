import * as React from 'react'
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table'
import { IGame } from 'Lobby/store/GameMap/Game'
import * as style from 'Lobby/layout/GameList/style.css'

function GameListRow (game: IGame) {
  return (
    <TableRow key={game.id}>
      <TableCell> { game.id } </TableCell>
      <TableCell> { game.status } </TableCell>
    </TableRow>
  )
}

export const GameListTable = (gameList: IGame[]) => {
  if (gameList.length === 0) {
    return (
      <div className={style.gameList}>
        <p className={style.noGameLabel}>No Games Found</p>
      </div>
    )
  } else {
    return (
      <div>
        <Table>
         <TableBody>
           { gameList.map((game) => GameListRow(game))}
         </TableBody>
        </Table>
      </div>
    )
  }
}
