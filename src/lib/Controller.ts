import { Size, Pos, Dir } from './types'
import { bound } from './utils'
import { ref } from 'vue'

export class Controller {
  private readonly ctx: CanvasRenderingContext2D
  private readonly center: Pos
  private readonly boundsRect: DOMRect

  private handlerPos: Pos = { x: 0, y: 0 }
  private handlerDir = ref<Dir>()
  private holding = false

  private outerRadius = 60
  private outerLineWidth = 3
  private innerRadius = 10
  private handlerRadius = 22

  private handlerColor = 'rgba(255, 255, 255, 0.4)'
  private mainColor = 'rgb(50, 220, 147)'
  private bgColor = 'rgb(50, 220, 147, 0.3)'

  constructor(private readonly canvas: HTMLCanvasElement, private readonly size: Size) {
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Invalid canvas')
    this.ctx = ctx
    canvas.width = size.width
    canvas.height = size.height

    this.boundsRect = canvas.getBoundingClientRect()

    this.center = {
      x: size.width / 2,
      y: size.height / 2,
    }
    this.resetHandler()
    this.bind()
    this.draw()
  }

  getHandlerDir() {
    return this.handlerDir
  }

  bind() {
    this.canvas.addEventListener('mousedown', this.start)
    this.canvas.addEventListener('mousemove', this.move)
    this.canvas.addEventListener('mouseup', this.end)
    this.canvas.addEventListener('mouseleave', this.end)
  }

  unbind() {
    this.canvas.removeEventListener('mousedown', this.start)
    this.canvas.removeEventListener('mousemove', this.move)
    this.canvas.removeEventListener('mouseup', this.end)
    this.canvas.removeEventListener('mouseleave', this.end)
  }

  @bound
  private start(e: MouseEvent) {
    this.holding = true
    this.updateHandler(e)
    requestAnimationFrame(this.draw)
  }

  @bound
  private move(e: MouseEvent) {
    if (!this.holding) return
    this.updateHandler(e)
    requestAnimationFrame(this.draw)
  }

  @bound
  private end(e: MouseEvent) {
    this.holding = false
    this.resetHandler()
    requestAnimationFrame(this.draw)
  }

  resetHandler() {
    this.handlerPos = { x: 0, y: 0 }
  }

  updateHandler(e: MouseEvent) {
    const coords: Pos = {
      x: e.pageX - this.boundsRect.left,
      y: e.pageY - this.boundsRect.top,
    }
    let dX = (coords.x - this.center.x) / this.outerRadius
    let dY = (coords.y - this.center.y) / this.outerRadius

    //Distance to center
    let mod = Math.sqrt(dX * dX + dY * dY)

    //Off limits
    if (mod > 1) {
      //Angle
      let angle = Math.atan(dY / dX)

      //Intersect position
      let limX = Math.cos(angle)
      let limY = Math.sin(angle)

      if (dX < 0) {
        dX = -limX
        dY = -limY
      } else {
        dX = limX
        dY = limY
      }
    }

    this.handlerPos = { x: dX, y: dY }
    this.handlerDir.value = getDir(this.handlerPos)
  }

  @bound draw() {
    this.ctx.clearRect(0, 0, this.size.width, this.size.height)

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
    const handlerX = this.center.x + this.handlerPos.x * this.outerRadius
    const handlerY = this.center.y + this.handlerPos.y * this.outerRadius
    this.ctx.beginPath()
    this.ctx.arc(handlerX, handlerY, this.handlerRadius, 0, 2 * Math.PI, false)
    this.ctx.fillStyle = this.handlerColor
    this.ctx.fill()
  }
}

function getDir({ x, y }: Pos): Dir | undefined {
  let deadZone = 0.2
  if (Math.abs(x) > Math.abs(y)) {
    if (x > deadZone) return Dir.right
    else if (x < -deadZone) return Dir.left
  } else {
    if (y > deadZone) return Dir.down
    else if (y < -deadZone) return Dir.up
  }
  return undefined
}
