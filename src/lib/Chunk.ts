import { Figure } from './figures'
import { Position } from './types'

export abstract class Chunk {
  abstract getPosition(): Position
  abstract getFigure(): Figure
  abstract getColor(): string
  comparePosition(chunk: Chunk) {
    const posA = this.getPosition()
    const posB = chunk.getPosition()
    return posA.col == posB.col && posA.row == posB.row
  }
}
