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
    this.vipers.push(new Viper(this.board.getBounds(), position, dir))
  }

  tick(diff: number): boolean {
    if (diff < 1000 / this.movesPerSecond) return false

    this.vipers.forEach(x => x.advance())

    const foods = this.store.getChunks()
    const chunks = this.vipers.reduce((acc, x) => acc.concat(x.getChunks(foods)), [])

    chunks.push(...foods)
    this.board.drawChunks(chunks)

    return true
  }
}
