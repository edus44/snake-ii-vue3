import { Figure } from './figures'

export enum Dir {
  left = 'left',
  right = 'right',
  up = 'up',
  down = 'down',
}
export const ReverseDir: Record<Dir, Dir> = {
  left: Dir.right,
  right: Dir.left,
  up: Dir.down,
  down: Dir.up,
}

export type Bounds = {
  cols: number
  rows: number
}
export type Size = {
  width: number
  height: number
}

export type Position = {
  col: number
  row: number
}

export class IChunk {
  getPosition: () => Position
  getFigure: () => Figure
}

export class Chunk {
  comparePosition(this: IChunk, chunk: IChunk) {
    const posA = this.getPosition()
    const posB = chunk.getPosition()
    return posA.col == posB.col && posA.row == posB.row
  }
}

export abstract class Drawable {
  getChunks: () => Chunk[]
}
