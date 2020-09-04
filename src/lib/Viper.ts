import { Dir, Position, ReverseDir, Bounds } from './types'
import { ViperChunk } from './ViperChunk'
import * as figures from './figures'
import { Store } from './Store'
import { Chunk } from './Chunk'
import { Drawable } from './Drawable'

export class Viper extends Drawable {
  private chunks: ViperChunk[] = []
  private nextDirs: Dir[] = []
  private minLength = 2

  constructor(
    private readonly bounds: Bounds,
    private readonly store: Store,
    position: Position,
    private dir: Dir,
  ) {
    super()
    const head = new ViperChunk(bounds, position, figures.Head, dir)
    const tail = new ViperChunk(bounds, position, figures.Tail, dir).move(-1)

    this.chunks.push(head)
    this.chunks.push(tail)

    for (let i = 0; i < 5; i++) this.grow()
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
    const foodAhead = this.store.intersects(ahead)
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

    if (!this.isCrashing()) {
      this.advanceHead()
    }
    this.advanceTail()
  }

  private isCrashing() {
    const ahead = this.getChunk(0).clone().setDir(this.dir).move(1)
    const crashedChunk = this.intersects(ahead) || this.store.intersects(ahead)
    const canShrink = this.chunks.length > this.minLength
    const isItsTail = crashedChunk === this.getChunk(-1)
    return crashedChunk && !isItsTail && canShrink
  }

  private advanceHead() {
    const head = this.getChunk(0)
    head.setFigure(figures.Body, null, this.dir)
    const newHead = head.clone().setFigure(figures.Head, this.dir).move(1)
    this.chunks.unshift(newHead)
  }

  private advanceTail() {
    this.chunks.pop()
    const preTailDir = this.getChunk(-2).getDir()
    this.getChunk(-1).setFigure(figures.Tail, preTailDir)
  }
}
