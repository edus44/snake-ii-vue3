import { Board } from './Board'
import { Viper } from './Viper'
import { Store } from './Store'
import { Dir, Position, Color } from './types'
import { shuffle } from './utils'

export class Game {
  private board: Board
  private store: Store
  private vipers: Viper[] = []
  private movesPerSecond = 4
  private tickNumber = 0
  constructor(...args: ConstructorParameters<typeof Board>) {
    this.board = new Board(...args)
    this.store = new Store(this.board.getBounds())
  }

  addViper(position: Position, dir: Dir, color: Color) {
    const viper = new Viper(this.board.getBounds(), position, dir, color)
    this.vipers.push(viper)
  }

  turnViper(viperIdx: number, dir: Dir) {
    this.vipers[viperIdx]?.setDir(dir)
  }

  tick(diff: number): boolean {
    if (diff < 1000 / this.movesPerSecond) return false

    shuffle(this.vipers).forEach(x => x.advance(this.store, this.vipers))

    this.board.draw([this.store, ...this.vipers])

    this.tickNumber++
    return true
  }
}
