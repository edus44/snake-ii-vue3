import { Dir } from './types'

export enum FoodType {
  regular = 'regular',
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
}

export type Figure = [number, number][]
export type FigureMap = Record<Dir, Partial<Record<Dir, Figure>>>
export type FigureMapFood = Record<FoodType, Figure[]>

export const Head: FigureMap = {
  up: {
    up: [
      [0, 3],
      [2, 3],
      [1, 1],
      [1, 2],
      [2, 1],
      [2, 2],
    ],
  },
  right: {
    right: [
      [0, 0],
      [0, 2],
      [1, 1],
      [1, 2],
      [2, 1],
      [2, 2],
    ],
  },
  down: {
    down: [
      [0, 0],
      [2, 0],
      [1, 1],
      [1, 2],
      [2, 1],
      [2, 2],
    ],
  },
  left: {
    left: [
      [3, 0],
      [3, 2],
      [1, 1],
      [1, 2],
      [2, 1],
      [2, 2],
    ],
  },
}
export const HeadMouth: FigureMap = {
  up: {
    up: [
      [0, 3],
      [2, 3],
      [1, 2],
      [2, 2],
      [0, 1],
      [3, 1],
    ],
  },

  right: {
    right: [
      [0, 0],
      [0, 2],
      [1, 1],
      [1, 2],
      [2, 0],
      [2, 3],
    ],
  },

  down: {
    down: [
      [0, 0],
      [2, 0],
      [1, 1],
      [2, 1],
      [0, 2],
      [3, 2],
    ],
  },

  left: {
    left: [
      [3, 0],
      [3, 2],
      [1, 0],
      [1, 3],
      [2, 1],
      [2, 2],
    ],
  },
}

export const Tail: FigureMap = {
  up: {
    up: [
      [1, 0],
      [2, 0],
      [1, 1],
      [2, 1],
      [2, 2],
      [2, 3],
    ],
  },

  right: {
    right: [
      [3, 1],
      [3, 2],
      [2, 1],
      [2, 2],
      [1, 2],
      [0, 2],
    ],
  },

  down: {
    down: [
      [1, 3],
      [2, 3],
      [1, 2],
      [2, 2],
      [2, 0],
      [2, 1],
    ],
  },

  left: {
    left: [
      [0, 1],
      [0, 2],
      [1, 1],
      [1, 2],
      [2, 2],
      [3, 2],
    ],
  },
}
export const Body: FigureMap = {
  up: {
    up: [
      [1, 0],
      [2, 0],
      [2, 1],
      [1, 2],
      [1, 3],
      [2, 3],
    ],
    right: [
      [2, 1],
      [3, 1],
      [1, 2],
      [3, 2],
      [1, 3],
      [2, 3],
    ],
    left: [
      [0, 1],
      [1, 1],
      [0, 2],
      [2, 2],
      [1, 3],
      [2, 3],
    ],
  },

  right: {
    right: [
      [0, 1],
      [0, 2],
      [1, 1],
      [2, 2],
      [3, 2],
      [3, 1],
    ],
  },

  down: {
    down: [
      [1, 0],
      [2, 0],
      [1, 1],
      [2, 2],
      [1, 3],
      [2, 3],
    ],
    right: [
      [1, 0],
      [2, 0],
      [1, 1],
      [3, 1],
      [2, 2],
      [3, 2],
    ],
    left: [
      [1, 0],
      [2, 0],
      [0, 1],
      [2, 1],
      [0, 2],
      [1, 2],
    ],
  },

  left: {
    left: [
      [0, 1],
      [0, 2],
      [2, 1],
      [1, 2],
      [3, 2],
      [3, 1],
    ],
  },
}

if (Body.right && Body.down && Body.up && Body.left) {
  Body.right.up = Body.down.left
  Body.right.down = Body.up.left
  Body.left.up = Body.down.right
  Body.left.down = Body.up.right
}

export const BodyDigesting: FigureMap = {
  up: {
    up: [
      [1, 0],
      [2, 0],
      [0, 2],
      [1, 2],
      [3, 2],
      [0, 1],
      [2, 1],
      [3, 1],
      [1, 3],
      [2, 3],
    ],
    right: [
      [2, 1],
      [3, 1],
      [1, 2],
      [3, 2],
      [1, 3],
      [2, 3],
      [3, 3],
    ],
    left: [
      [0, 1],
      [1, 1],
      [0, 2],
      [2, 2],
      [1, 3],
      [2, 3],
      [0, 3],
    ],
  },
  right: {
    right: [
      [1, 0],
      [2, 0],
      [0, 1],
      [1, 1],
      [3, 1],
      [0, 2],
      [2, 2],
      [3, 2],
      [1, 3],
      [2, 3],
    ],
  },
  left: {},
  down: {
    right: [
      [3, 0],
      [1, 0],
      [2, 0],
      [1, 1],
      [3, 1],
      [2, 2],
      [3, 2],
    ],
    left: [
      [0, 0],
      [1, 0],
      [2, 0],
      [0, 1],
      [2, 1],
      [0, 2],
      [1, 2],
    ],
  },
}

if (BodyDigesting.right && BodyDigesting.down && BodyDigesting.up && BodyDigesting.left) {
  BodyDigesting.left.left = BodyDigesting.up.up
  BodyDigesting.down.down = BodyDigesting.right.right

  BodyDigesting.right.up = BodyDigesting.down.left
  BodyDigesting.right.down = BodyDigesting.up.left

  BodyDigesting.left.up = BodyDigesting.down.right
  BodyDigesting.left.down = BodyDigesting.up.right
}

export const Food: FigureMapFood = {
  regular: [
    [
      [1, 0],
      [0, 1],
      [2, 1],
      [1, 2],
    ],
  ],
  A: [
    [
      [2, 0],
      [3, 0],
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 1],
      [0, 2],
      [2, 2],
      [3, 2],
      [0, 3],
      [2, 3],
    ],
    [
      [0, 0],
      [1, 0],
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 1],
      [0, 2],
      [1, 2],
      [3, 2],
      [1, 3],
      [3, 3],
    ],
  ],
  B: [
    [
      [0, 0],
      [1, 0],
      [0, 1],
      [1, 1],
      [2, 2],
      [3, 2],
    ],
    [
      [1, 0],
      [0, 1],
      [1, 1],
      [2, 1],
      [0, 2],
      [1, 2],
      [2, 2],
      [3, 2],
      [0, 3],
      [2, 3],
    ],
  ],
  C: [
    [
      [0, 1],
      [3, 1],
      [0, 2],
      [2, 2],
      [3, 2],
      [1, 3],
      [2, 3],
      [3, 3],
    ],
    [
      [0, 0],
      [1, 0],
      [0, 1],
      [2, 1],
      [0, 2],
      [1, 2],
      [2, 2],
      [0, 3],
      [1, 3],
      [2, 3],
      [3, 3],
    ],
  ],
  D: [
    [
      [1, 0],
      [3, 0],
      [0, 1],
      [2, 1],
      [3, 1],
      [0, 2],
      [1, 2],
      [2, 2],
      [3, 2],
      [2, 3],
    ],
    [
      [1, 0],
      [0, 1],
      [1, 1],
      [2, 1],
      [0, 2],
      [1, 2],
      [2, 2],
      [3, 2],
      [1, 3],
    ],
  ],
  E: [
    [
      [0, 1],
      [0, 2],
      [1, 2],
      [2, 2],
      [3, 2],
      [1, 3],
      [3, 3],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
      [3, 2],
      [1, 3],
      [3, 3],
    ],
  ],
}
