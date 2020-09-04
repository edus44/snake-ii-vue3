import { Board } from './Board'
import { Viper } from './Viper'
import { Store } from './Store'
import { Dir, Position } from './types'
export class Game {
  private board: Board
  private store: Store
  private vipers: Viper[] = []
  private movesPerSecond = 10
  private tickNumber = 0
  constructor(...args: ConstructorParameters<typeof Board>) {
    this.board = new Board(...args)
    this.store = new Store(this.board.getBounds())
  }

  addViper(position: Position, dir: Dir) {
    const viper = new Viper(this.board.getBounds(), this.store, position, dir)
    this.vipers.push(viper)
  }

  tick(diff: number): boolean {
    if (diff < 1000 / this.movesPerSecond) return false

    this.vipers.forEach(x => x.advance())

    this.board.draw([this.store, ...this.vipers])

    this.tickNumber++
    return true
  }
}
