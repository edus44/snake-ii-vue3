import { Chunk } from './Chunk'

export abstract class Drawable {
  abstract getChunks(): Chunk[]
}
