export enum Dir {
  left = 'left',
  right = 'right',
  up = 'up',
  down = 'down',
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
