import { Dir, Position } from './types'
import { Chunk } from './Chunk'
import * as figures from './figures'

export class Viper {
  private chunks: Chunk[] = []

  constructor(private position: Position, private dir: Dir) {
    const head = new Chunk(position, figures.Head[dir])
    const tail = head.clone().move(dir, -1).setFigure(figures.Tail[dir])
    this.chunks.push(head)
    console.log(tail)
    this.chunks.push(tail)
    // this.grow()
  }

  getChunks(): Chunk[] {
    return this.chunks
  }

  // grow() {
  //   const tail = this.chunks[this.chunks.length - 1]
  //   console.log(tail.orientation)
  // }
}
