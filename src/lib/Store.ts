import * as figures from './figures'
import { Chunk } from './Chunk'
import { Drawable } from './Drawable'
import { Bounds, Position } from './types'

export class Food extends Chunk {
  constructor(
    private position: Position,
    private readonly foodType: figures.FoodType,
    private readonly section: 0 | 1,
  ) {
    super()
  }
  getFigure() {
    return figures.Food[this.foodType][this.section]
  }
  getPosition() {
    return this.position
  }
  getColor() {
    return '#060e0c'
  }
}

const Bugs = [
  figures.FoodType.A,
  figures.FoodType.B,
  figures.FoodType.C,
  figures.FoodType.D,
  figures.FoodType.E,
]

export class Store extends Drawable<Food> {
  private foods: Food[] = []

  constructor(private readonly bounds: Bounds) {
    super()
    this.addFood()
  }

  add(...args: ConstructorParameters<typeof Food>) {
    this.foods.push(new Food(...args))
  }

  addBug() {
    const col = rnd(this.bounds.cols - 1)
    const row = rnd(this.bounds.rows)
    const foodType = Bugs[rnd(Bugs.length)]

    this.add({ col, row }, foodType, 0)
    this.add({ col: col + 1, row }, foodType, 1)
  }

  addFood() {
    this.add(
      {
        col: rnd(this.bounds.cols),
        row: rnd(this.bounds.rows),
      },
      figures.FoodType.regular,
      0,
    )
  }

  getChunks(): Food[] {
    return this.foods
  }

  eat(chunk: Chunk) {
    const food = this.intersects(chunk)
    if (!food) return false

    const idx = this.foods.indexOf(food)
    this.foods.splice(idx, 1)
    this.addFood()
    return true
  }
}

const rnd = (n: number) => (Math.random() * n) | 0
