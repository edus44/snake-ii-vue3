import * as figures from './figures'
import { Chunk } from './Chunk'
import { Drawable } from './Drawable'

export class Food extends Chunk {
  getFigure() {
    return figures.Food.regular[0]
  }
  getPosition() {
    return {
      col: 5,
      row: 5,
    }
  }
  getColor() {
    return '#060e0c'
  }
}

export class Store extends Drawable {
  private foods: Food[]
  constructor() {
    super()
    this.foods = [new Food()]
  }
  getChunks() {
    return this.foods
  }
}
