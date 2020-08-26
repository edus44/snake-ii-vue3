import { Dir, Position, ReverseDir } from './types'
import { Chunk } from './Chunk'
import * as figures from './figures'

export class Viper {
  private chunks: Chunk[] = []
  private nextDirs: Dir[] = []

  constructor(private position: Position, private dir: Dir) {
    const head = new Chunk(position, figures.Head, dir)
    const tail = new Chunk(position, figures.Tail, dir).move(-1)

    this.chunks.push(head)
    this.chunks.push(tail)

    for (let i = 0; i < 50; i++) this.grow()
  }

  setDir(dir: Dir): Viper {
    const prevDir = this.nextDirs[this.nextDirs.length - 1] || this.dir
    if (this.nextDirs.length < 5 && dir !== ReverseDir[prevDir] && dir !== prevDir) {
      this.nextDirs.push(dir)
    }
    return this
  }

  getChunks(): Chunk[] {
    return this.chunks
  }

  getChunk(i: number) {
    if (i < 0) i += this.chunks.length
    return this.chunks[i]
  }

  grow() {
    const tail = this.getChunk(-1).setFigure(figures.Body)
    const newTail = tail.clone().move(-1).setFigure(figures.Tail)
    this.chunks.push(newTail)
  }

  advance() {
    this.dir = this.nextDirs.shift() || this.dir

    // Head
    const head = this.getChunk(0).setFigure(figures.Body, null, this.dir)
    const newHead = head.clone().setFigure(figures.Head, this.dir).move(1)
    this.chunks.unshift(newHead)

    // Tail
    this.chunks.pop()
    const preTailDir = this.getChunk(-2).getDir()
    this.getChunk(-1).setFigure(figures.Tail, preTailDir)
  }
}
