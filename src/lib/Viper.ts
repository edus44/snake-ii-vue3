import { Dir, Position, ReverseDir, Bounds, Color } from './types'
import { ViperChunk } from './ViperChunk'
import * as figures from './figures'
import { Store } from './Store'
import { Drawable } from './Drawable'

export class Viper extends Drawable<ViperChunk> {
  private chunks: ViperChunk[] = []
  private nextDirs: Dir[] = []
  private minLength = 2

  constructor(
    private readonly bounds: Bounds,
    private readonly store: Store,
    position: Position,
    private dir: Dir,
    private readonly color: Color,
  ) {
    super()
    const head = new ViperChunk(bounds, position, figures.Head, dir, this.color)
    const tail = head.clone().setFigure(figures.Tail).move(-1)

    this.chunks.push(head, tail)

    for (let i = 0; i < 5; i++) this.grow()
  }

  setDir(dir: Dir): Viper {
    const prevDir = this.nextDirs[this.nextDirs.length - 1] || this.dir
    if (this.nextDirs.length < 5 && dir !== ReverseDir[prevDir] && dir !== prevDir) {
      this.nextDirs.push(dir)
    }
    return this
  }

  getChunks() {
    return this.chunks
  }

  getChunk(i: number): ViperChunk {
    if (i < 0) i += this.chunks.length
    return this.chunks[i]
  }

  getAhead() {
    return this.getChunk(0).clone().setDir(this.dir).move(1)
  }

  grow() {
    const tail = this.getChunk(-1).setFigure(figures.Body)
    const newTail = tail.clone().move(-1).setFigure(figures.Tail)
    this.chunks.push(newTail)
  }

  advance() {
    this.dir = this.nextDirs.shift() || this.dir
    const isCrashing = this.isCrashing()
    if (!isCrashing) {
      this.advanceHead()
    }
    this.advanceTail()

    this.updateHeadFigure()
    this.updateChunkAlert(isCrashing)
  }

  private updateHeadFigure() {
    const hasFoodAhead = this.store.intersects(this.getAhead())
    this.getChunk(0).setFigure(hasFoodAhead ? figures.HeadMouth : figures.Head)
  }

  private updateChunkAlert(isCrashing: boolean) {
    this.chunks.forEach(x => x.setFaded(isCrashing))
  }

  private isCrashing() {
    //TODO: Check other vipers
    const crashedChunk = this.intersects(this.getAhead())
    const canShrink = this.chunks.length > this.minLength
    const isSelfTail = crashedChunk === this.getChunk(-1)
    return crashedChunk && !isSelfTail && canShrink
  }

  private advanceHead() {
    // Move head one position to current dir
    const head = this.getChunk(0)
    head.setFigure(figures.Body, null, this.dir)
    const newHead = head.clone().setFigure(figures.Head, this.dir).move(1)
    this.chunks.unshift(newHead)

    // Eat
    if (this.store.eat(newHead)) {
      this.grow()
      newHead.setDigesting(true)
    }
  }

  private advanceTail() {
    this.chunks.pop()
    const preTailDir = this.getChunk(-2).getDir()
    this.getChunk(-1).setFigure(figures.Tail, preTailDir)
  }
}
