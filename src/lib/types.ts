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

export abstract class Chunk {
  getPosition: () => Position
  getFigure: () => Figure
}

export abstract class Drawable {
  getChunks: () => Chunk[]
}
