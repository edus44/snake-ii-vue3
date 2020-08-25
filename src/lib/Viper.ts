import { Dir, Position, ReverseDir } from './types'
import { Chunk } from './Chunk'
import * as figures from './figures'

export class Viper {
  private chunks: Chunk[] = []

  constructor(private position: Position, private dir: Dir) {
    const head = new Chunk(position, figures.Head, dir)
    const tail = new Chunk(position, figures.Tail, dir).move(-1)

    this.chunks.push(head)
    this.chunks.push(tail)

    for (let i = 0; i < 3; i++) this.grow()
  }

  setDir(dir: Dir): Viper {
    // TODO: Dir buffer
    if (this.dir !== ReverseDir[dir]) this.dir = dir
    return this
  }

  getChunks(): Chunk[] {
    return this.chunks
  }

  getHead(): Chunk {
    return this.chunks[0]
  }

  getTail(): Chunk {
    return this.chunks[this.chunks.length - 1]
  }

  getPreTail(): Chunk {
    return this.chunks[this.chunks.length - 2]
  }

  grow() {
    const tail = this.getTail().setFigure(figures.Body)
    const newTail = tail.clone().move(-1).setFigure(figures.Tail)
    this.chunks.push(newTail)
  }

  advance() {
    // Head
    const head = this.getHead().setFigure(figures.Body, null, this.dir)
    const newHead = head.clone().setFigure(figures.Head, this.dir).move(1)
    this.chunks.unshift(newHead)

    // Tail
    this.chunks.pop()
    this.getTail().setFigure(figures.Tail, this.getPreTail().getDir())
  }
}
