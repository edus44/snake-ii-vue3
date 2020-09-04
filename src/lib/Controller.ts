import { Size } from './types'

export class Controller {
  private readonly ctx: CanvasRenderingContext2D

  constructor(private readonly canvas: HTMLCanvasElement, private readonly size: Size) {
    this.ctx = canvas.getContext('2d')
    canvas.width = size.width
    canvas.height = size.height
    this.draw()
  }

  draw() {
    const centerX = this.size.width / 2
    const centerY = this.size.height / 2
    const radius = 70

    // Center
    this.ctx.beginPath()
    this.ctx.arc(centerX, centerY, 10, 0, 2 * Math.PI, false)
    this.ctx.fillStyle = 'rgb(50, 220, 147)'
    this.ctx.fill()

    // Outside
    this.ctx.beginPath()
    this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false)
    this.ctx.fillStyle = 'rgba(50, 220, 147, 0.3)'
    this.ctx.fill()
    this.ctx.strokeStyle = 'rgb(50, 220, 147)'
    this.ctx.lineWidth = 3
    this.ctx.stroke()

    // Handler
    this.ctx.beginPath()
    this.ctx.arc(centerX, centerY, 22, 0, 2 * Math.PI, false)
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'
    this.ctx.fill()
  }
}
