import { Chunk } from './Chunk'

export abstract class Drawable {
  abstract getChunks(): Chunk[]
  intersects(chunk: Chunk) {
    return this.getChunks().find(x => {
      return x.comparePosition(chunk)
    })
  }
}
