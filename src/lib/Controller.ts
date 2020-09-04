import { Size, Pos } from './types'

export class Controller {
  private readonly ctx: CanvasRenderingContext2D
  private readonly center: Pos

  private outerRadius = 60
  private outerLineWidth = 3
  private innerRadius = 10
  private handlerRadius = 22

  private handlerColor = 'rgba(255, 255, 255, 0.4)'
  private mainColor = 'rgb(50, 220, 147)'
  private bgColor = 'rgb(50, 220, 147, 0.3)'

  constructor(private readonly canvas: HTMLCanvasElement, private readonly size: Size) {
    this.ctx = canvas.getContext('2d')
    canvas.width = size.width
    canvas.height = size.height
    this.center = {
      x: size.width / 2,
      y: size.height / 2,
    }
    this.draw()
  }

  draw() {
    // Outer
    this.ctx.beginPath()
    this.ctx.arc(this.center.x, this.center.y, this.outerRadius, 0, 2 * Math.PI, false)
    this.ctx.fillStyle = this.bgColor
    this.ctx.fill()
    this.ctx.strokeStyle = this.mainColor
    this.ctx.lineWidth = this.outerLineWidth
    this.ctx.stroke()

    // Inner
    this.ctx.beginPath()
    this.ctx.arc(this.center.x, this.center.y, this.innerRadius, 0, 2 * Math.PI, false)
    this.ctx.fillStyle = this.mainColor
    this.ctx.fill()

    // Handler
    this.ctx.beginPath()
    this.ctx.arc(this.center.x, this.center.y, this.handlerRadius, 0, 2 * Math.PI, false)
    this.ctx.fillStyle = this.handlerColor
    this.ctx.fill()
  }
}
