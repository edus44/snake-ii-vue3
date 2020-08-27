import { Chunk, Drawable, IChunk } from './types'
import * as figures from './figures'

export class Food extends Chunk implements IChunk {
  getFigure() {
    return figures.Food.regular[0]
  }
  getPosition() {
    return {
      col: 5,
      row: 5,
    }
  }
}

export class Store implements Drawable {
  private foods: Food[]
  constructor() {
    this.foods = [new Food()]
  }
  getChunks() {
    return this.foods
  }
}
