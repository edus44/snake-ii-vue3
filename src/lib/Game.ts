import { Board } from './Board'
import { Viper } from './Viper'
import { Store } from './Store'
import { Dir, Position } from './types'
export class Game {
  private board: Board
  private store: Store
  private vipers: Viper[] = []
  constructor(private movesPerSecond = 10) {
    this.store = new Store()
  }

  setBoard(...args: ConstructorParameters<typeof Board>) {
    this.board = new Board(...args)
  }

  addViper(position: Position, dir: Dir) {
    const viper = new Viper(this.board.getBounds(), this.store, position, dir)
    this.vipers.push(viper)
  }

  tick(diff: number): boolean {
    if (diff < 1000 / this.movesPerSecond) return false

    this.vipers.forEach(x => x.advance())

    this.board.draw([this.store, ...this.vipers])

    return true
  }
}
