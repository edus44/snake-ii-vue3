import { Board } from './Board'
import { Viper } from './Viper'
import { Store } from './Store'
import { Dir, Position, Color } from './types'
import { bound } from './utils'

export class Game {
  private board: Board
  private store: Store
  private vipers: Viper[] = []

  constructor(private readonly movesPerSecond = 4, ...args: ConstructorParameters<typeof Board>) {
    this.board = new Board(...args)
    this.store = new Store(this.board.getBounds())
  }

  addViper(position: Position, dir: Dir, color: Color) {
    const viper = new Viper(this.board.getBounds(), position, dir, color)
    this.vipers.push(viper)
  }

  @bound turnViper(viperIdx: number, dir: Dir) {
    this.vipers[viperIdx]?.setDir(dir)
  }

  @bound tick(diff: number): boolean {
    if (diff < 1000 / this.movesPerSecond) return false

    this.getVipersSorted().forEach(x => x.advance(this.store, this.vipers))

    this.board.draw([this.store, ...this.vipers])

    return true
  }

  private getVipersSorted() {
    // Sort vipers by length and random if same
    return this.vipers.slice(0).sort((a, b) => {
      const al = a.getChunks().length
      const bl = b.getChunks().length
      return al === bl ? Math.random() - 0.5 : al > bl ? 1 : -1
    })
  }
}
