import { Figure } from './figures'
import { Chunk } from './Chunk'
import { Bounds, Size, Position } from './types'

export class Board {
  private readonly ctx: CanvasRenderingContext2D
  private readonly chunkSize: number
  private readonly pixelSize: number

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
  }

  drawChunks(chunks: Chunk[]) {
    this.ctx.clearRect(0, 0, this.size.width, this.size.height)
    for (const chunk of chunks) {
      this.draw(chunk)
    }
  }

  jail(position: Position): Position {
    let col = position.col % this.bounds.cols
    let row = position.row % this.bounds.rows
    if (col < 0) col += this.bounds.cols
    if (row < 0) row += this.bounds.rows
    return { row, col }
  }

  draw(chunk: Chunk) {
    this.ctx.fillStyle = '#060e0c'

    const gap = this.pixelSize * 0.05

    const { row, col } = this.jail(chunk.getPosition())
    const figure = chunk.getFigure()

    const x = col * this.chunkSize
    const y = row * this.chunkSize

    for (let i = 0; i < figure.length; i++) {
      this.ctx.fillRect(
        x + figure[i][0] * this.pixelSize + gap,
        y + figure[i][1] * this.pixelSize + gap,
        this.pixelSize - gap,
        this.pixelSize - gap,
      )
    }
  }
}
