import { Chunk } from './Chunk'

export abstract class Drawable<T extends Chunk = Chunk> {
  abstract getChunks(): T[]
  intersects(chunk: Chunk): T {
    return this.getChunks().find(x => {
      return x.comparePosition(chunk)
    })
  }
}
