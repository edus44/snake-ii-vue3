import { Dir, Position, ReverseDir, Drawable, Chunk, Bounds } from './types'
import { ViperChunk } from './ViperChunk'
import * as figures from './figures'
import { Store } from './Store'

export class Viper implements Drawable {
  private chunks: ViperChunk[] = []
  private nextDirs: Dir[] = []

  constructor(
    private readonly bounds: Bounds,
    private readonly store: Store,
    position: Position,
    private dir: Dir,
  ) {
    const head = new ViperChunk(bounds, position, figures.Head, dir)
    const tail = new ViperChunk(bounds, position, figures.Tail, dir).move(-1)

    this.chunks.push(head)
    this.chunks.push(tail)

    for (let i = 0; i < 4; i++) this.grow()
  }

  setDir(dir: Dir): Viper {
    const prevDir = this.nextDirs[this.nextDirs.length - 1] || this.dir
    if (this.nextDirs.length < 5 && dir !== ReverseDir[prevDir] && dir !== prevDir) {
      this.nextDirs.push(dir)
    }
    return this
  }

  getChunks(): Chunk[] {
    const head = this.getChunk(0)
    const ahead = head.clone().move(1)
    const foodAhead = this.store.getChunks().find(x => {
      return x.comparePosition(ahead)
    })
    head.setFigure(foodAhead ? figures.HeadMouth : figures.Head)
    return this.chunks
  }

  getChunk(i: number): ViperChunk {
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
