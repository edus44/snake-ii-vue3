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

export enum Color {
  black = '#060e0c',
  blue = 'rgb(34 64 192)',
  red = 'rgb(186 20 62)',
  yellow = 'rgb(255 180 16)',
  purple = 'rgb(140 53 238)',
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
  row: number
  col: number
}

export type Pos = {
  x: number
  y: number
}

export interface Config {
  numPlayers: 2 | 3 | 4
  speed: 1 | 2 | 3
  size: 1 | 2 | 3
}
