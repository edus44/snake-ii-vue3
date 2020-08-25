import { Figure, FigureMapDir } from './figures'
import { Dir, Position } from './types'

export class Chunk {
  private dir: Dir
  private position: Position
  private figureMapDir: FigureMapDir

  constructor(position: Position, figureMapDir: FigureMapDir, dir: Dir) {
    this.position = { ...position }
    this.figureMapDir = figureMapDir
    this.dir = dir
  }

  clone(): Chunk {
    return new Chunk(this.position, this.figureMapDir, this.dir)
  }

  getPosition(): Position {
    return this.position
  }

  setDir(dir: Dir): Chunk {
    this.dir = dir
    return this
  }

  getDir(): Dir {
    return this.dir
  }

  getFigure(): Figure {
    return this.figureMapDir[this.dir]
  }

  setFigure(figureMapDir: FigureMapDir, dir?: Dir): Chunk {
    this.figureMapDir = figureMapDir
    this.dir = dir || this.dir
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
