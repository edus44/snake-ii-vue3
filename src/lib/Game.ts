import { Board } from './Board'
import { Viper } from './Viper'

export class Game {
  private board: Board
  private vipers: Viper[] = []
  private movesPerSecond = 10

  setBoard(board: Board) {
    this.board = board
  }

  addViper(viper: Viper) {
    this.vipers.push(viper)
  }

  tick(diff: number): boolean {
    if (diff < 1000 / this.movesPerSecond) return false

    this.vipers.forEach(x => x.advance())

    const chunks = this.vipers.reduce((acc, x) => acc.concat(x.getChunks()), [])
    this.board.drawChunks(chunks)

    return true
  }
}
