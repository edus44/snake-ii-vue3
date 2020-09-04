import { Figure, FigureMap } from './figures'
import { Dir, Position, Bounds } from './types'
import { Chunk } from './Chunk'
import * as figures from './figures'

export class ViperChunk extends Chunk {
  private dir: Dir
  private outDir: Dir
  private position: Position
  private figureMap: FigureMap
  private faded: boolean
  private digesting: boolean

  constructor(private readonly bounds: Bounds, position: Position, figureMap: FigureMap, dir: Dir) {
    super()
    this.position = { ...position }
    this.figureMap = figureMap
    this.dir = dir
    this.outDir = dir
  }

  clone(): ViperChunk {
    return new ViperChunk(this.bounds, this.position, this.figureMap, this.dir)
  }

  getPosition(): Position {
    return this.position
  }

  getDir(): Dir {
    return this.dir
  }

  getColor(): string {
    return this.faded ? 'rgb(34 64 192 / 50%)' : 'rgb(34 64 192 / 100%)'
  }

  setFaded(faded: boolean): Chunk {
    this.faded = faded
    return this
  }

  setDigesting(digesting: boolean): Chunk {
    this.digesting = digesting
    return this
  }

  setDir(dir: Dir): ViperChunk {
    this.dir = dir
    return this
  }

  getFigure(): Figure {
    if (this.digesting && this.figureMap === figures.Body)
      return figures.BodyDigesting[this.dir][this.outDir]
    return this.figureMap[this.dir][this.outDir]
  }

  setFigure(figureMap: FigureMap, dir?: Dir, outDir?: Dir): ViperChunk {
    this.figureMap = figureMap
    this.dir = dir || this.dir
    this.outDir = outDir || this.dir
    return this
  }

  move(step: 1 | -1): ViperChunk {
    if (this.dir == Dir.right) this.position.col += step
    else if (this.dir == Dir.left) this.position.col -= step
    else if (this.dir == Dir.up) this.position.row -= step
    else if (this.dir == Dir.down) this.position.row += step

    this.position = jail(this.position, this.bounds)

    return this
  }
}

function jail(position: Position, bounds: Bounds): Position {
  let col = position.col % bounds.cols
  let row = position.row % bounds.rows
  if (col < 0) col += bounds.cols
  if (row < 0) row += bounds.rows
  return { row, col }
}
