import { Figure } from './figures'
import { Dir, Orientation, Position } from './types'

export class Chunk {
  private orientation: Orientation
  private position: Position
  private figure: Figure

  constructor(position: Position, figure: Figure) {
    this.position = { ...position }
    this.figure = figure
  }

  clone(): Chunk {
    return new Chunk(this.position, this.figure)
  }

  getPosition(): Position {
    return this.position
  }

  getFigure(): Figure {
    return this.figure
  }

  getOrientation(): Orientation {
    return this.orientation
  }

  setFigure(figure: Figure): Chunk {
    this.figure = figure
    return this
  }

  move(dir: Dir, step: 1 | -1): Chunk {
    if (dir == Dir.right) this.position.col += step
    else if (dir == Dir.left) this.position.col -= step
    else if (dir == Dir.up) this.position.row -= step
    else if (dir == Dir.down) this.position.row += step
    return this
  }
}
