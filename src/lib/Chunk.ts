import { Figure, FigureMap } from './figures'
import { Dir, Position } from './types'

export class Chunk {
  private dir: Dir
  private outDir: Dir
  private position: Position
  private figureMapDir: FigureMap

  constructor(position: Position, figureMapDir: FigureMap, dir: Dir) {
    this.position = { ...position }
    this.figureMapDir = figureMapDir
    this.dir = dir
    this.outDir = dir
  }

  clone(): Chunk {
    return new Chunk(this.position, this.figureMapDir, this.dir)
  }

  getPosition(): Position {
    return this.position
  }

  getDir(): Dir {
    return this.dir
  }

  getFigure(): Figure {
    return this.figureMapDir[this.dir][this.outDir]
  }

  setFigure(figureMapDir: FigureMap, dir?: Dir, outDir?: Dir): Chunk {
    this.figureMapDir = figureMapDir
    this.dir = dir || this.dir
    this.outDir = outDir || this.dir
    return this
  }

  move(step: 1 | -1): Chunk {
    if (this.dir == Dir.right) this.position.col += step
    else if (this.dir == Dir.left) this.position.col -= step
    else if (this.dir == Dir.up) this.position.row -= step
    else if (this.dir == Dir.down) this.position.row += step
    return this
  }
}
