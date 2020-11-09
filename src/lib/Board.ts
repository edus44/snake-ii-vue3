import { Bounds, Size } from './types'
import { Drawable } from './Drawable'
import { Chunk } from './Chunk'

export class Board {
  private readonly ctx: CanvasRenderingContext2D
  private chunkSize: number = 0
  private pixelSize: number = 0
  private gapSize: number = 0
  private size: Size = { width: 0, height: 0 }

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly bounds: Bounds,
    size: Size,
  ) {
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Invalid canvas')
    this.ctx = ctx
    this.setSize(size)
  }

  setSize(size: Size) {
    this.size = size

    const dpr = window.devicePixelRatio
    const boundsR = this.bounds.cols / this.bounds.rows
    const sizeR = size.width / size.height
    let width = size.width
    let height = size.height
    if (boundsR < sizeR) {
      width = height * boundsR
    } else {
      height = width / boundsR
    }

    this.canvas.style.width = width + 'px'
    this.canvas.style.height = height + 'px'
    this.canvas.width = width * dpr
    this.canvas.height = height * dpr
    this.ctx.scale(dpr, dpr)

    this.chunkSize = Math.min(size.width / this.bounds.cols, size.height / this.bounds.rows)
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
