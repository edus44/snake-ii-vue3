import { Figure, FigureMap } from './figures'
import { Dir, Position, Bounds } from './types'
import { Chunk } from './Chunk'

export class ViperChunk extends Chunk {
  private dir: Dir
  private outDir: Dir
  private position: Position
  private figureMapDir: FigureMap
  private faded: boolean

  constructor(
    private readonly bounds: Bounds,
    position: Position,
    figureMapDir: FigureMap,
    dir: Dir,
  ) {
    super()
    this.position = { ...position }
    this.figureMapDir = figureMapDir
    this.dir = dir
    this.outDir = dir
  }

  clone(): ViperChunk {
    return new ViperChunk(this.bounds, this.position, this.figureMapDir, this.dir)
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

  setDir(dir: Dir): ViperChunk {
    this.dir = dir
    return this
  }

  getFigure(): Figure {
    return this.figureMapDir[this.dir][this.outDir]
  }

  setFigure(figureMapDir: FigureMap, dir?: Dir, outDir?: Dir): ViperChunk {
    this.figureMapDir = figureMapDir
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
