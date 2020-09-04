import { Figure } from './figures'
import { Bounds, Size } from './types'
import { Drawable } from './Drawable'
import { Chunk } from './Chunk'

export class Board {
  private readonly ctx: CanvasRenderingContext2D
  private readonly chunkSize: number
  private readonly pixelSize: number
  private readonly gapSize: number

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly bounds: Bounds,
    private readonly size: Size,
  ) {
    this.ctx = canvas.getContext('2d')
    canvas.width = size.width
    canvas.height = size.height
    this.chunkSize = Math.min(size.width / bounds.cols, size.height / bounds.rows)
    this.pixelSize = this.chunkSize / 4
    this.gapSize = this.pixelSize * 0.05
  }

  getBounds() {
    return this.bounds
  }

  draw(drawables: Drawable[]) {
    this.ctx.clearRect(0, 0, this.size.width, this.size.height)
    for (const drawable of drawables) {
      const chunks = drawable.getChunks()
      for (const chunk of chunks) {
        this.drawChunk(chunk)
      }
    }
  }

  drawChunk(chunk: Chunk) {
    this.ctx.fillStyle = chunk.getColor()

    const { row, col } = chunk.getPosition()
    const figure = chunk.getFigure()

    const x = col * this.chunkSize
    const y = row * this.chunkSize

    for (let i = 0; i < figure.length; i++) {
      this.ctx.fillRect(
        x + figure[i][0] * this.pixelSize + this.gapSize,
        y + figure[i][1] * this.pixelSize + this.gapSize,
        this.pixelSize - this.gapSize,
        this.pixelSize - this.gapSize,
      )
    }
  }
}
