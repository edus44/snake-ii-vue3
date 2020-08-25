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
export type FigureMapDir = Record<Dir, Figure>
export type FigureMapCorner = Partial<Record<Dir, Partial<FigureMapDir>>>
export type FigureMapFood = Record<FoodType, Figure[]>

export const Head: FigureMapDir = {
  up: [
    [0, 3],
    [2, 3],
    [1, 1],
    [1, 2],
    [2, 1],
    [2, 2],
  ],
  right: [
    [0, 0],
    [0, 2],
    [1, 1],
    [1, 2],
    [2, 1],
    [2, 2],
  ],
  down: [
    [0, 0],
    [2, 0],
    [1, 1],
    [1, 2],
    [2, 1],
    [2, 2],
  ],
  left: [
    [3, 0],
    [3, 2],
    [1, 1],
    [1, 2],
    [2, 1],
    [2, 2],
  ],
}
export const HeadMouth: FigureMapDir = {
  up: [
    [0, 3],
    [2, 3],
    [1, 2],
    [2, 2],
    [0, 1],
    [3, 1],
  ],

  right: [
    [0, 0],
    [0, 2],
    [1, 1],
    [1, 2],
    [2, 0],
    [2, 3],
  ],

  down: [
    [0, 0],
    [2, 0],
    [1, 1],
    [2, 1],
    [0, 2],
    [3, 2],
  ],

  left: [
    [3, 0],
    [3, 2],
    [1, 0],
    [1, 3],
    [2, 1],
    [2, 2],
  ],
}

export const Tail: FigureMapDir = {
  up: [
    [1, 0],
    [2, 0],
    [1, 1],
    [2, 1],
    [2, 2],
    [2, 3],
  ],

  right: [
    [3, 1],
    [3, 2],
    [2, 1],
    [2, 2],
    [1, 2],
    [0, 2],
  ],

  down: [
    [1, 3],
    [2, 3],
    [1, 2],
    [2, 2],
    [2, 0],
    [2, 1],
  ],

  left: [
    [0, 1],
    [0, 2],
    [1, 1],
    [1, 2],
    [2, 2],
    [3, 2],
  ],
}
export const Body: FigureMapDir = {
  up: [
    [1, 0],
    [2, 0],
    [2, 1],
    [1, 2],
    [1, 3],
    [2, 3],
  ],

  right: [
    [0, 1],
    [0, 2],
    [1, 1],
    [2, 2],
    [3, 2],
    [3, 1],
  ],

  down: [
    [1, 0],
    [2, 0],
    [1, 1],
    [2, 2],
    [1, 3],
    [2, 3],
  ],

  left: [
    [0, 1],
    [0, 2],
    [2, 1],
    [1, 2],
    [3, 2],
    [3, 1],
  ],
}

export const BodyCorner: FigureMapCorner = {
  up: {
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

  down: {
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
}
BodyCorner.right = {
  up: BodyCorner.down.left,
  down: BodyCorner.up.left,
}
BodyCorner.left = {
  up: BodyCorner.down.right,
  down: BodyCorner.up.right,
}

export const BodyFood: Partial<FigureMapDir> = {
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
}

BodyFood.left = BodyFood.up
BodyFood.down = BodyFood.right

export const BodyFoodCorner: FigureMapCorner = {
  up: {
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
BodyFoodCorner.right = {
  up: BodyFoodCorner.down.left,
  down: BodyFoodCorner.up.left,
}
BodyFoodCorner.left = {
  up: BodyFoodCorner.down.right,
  down: BodyFoodCorner.up.right,
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
