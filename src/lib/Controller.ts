import { Size, Pos, Dir } from './types'
import { bound } from './utils'
import { ref } from 'vue'

const isTouch = 'ontouchstart' in window

const OUTER_RADIUS = 60
const OUTER_LINE_WIDTH = 3
const INNER_RADIUS = 4
const HANDLER_RADIUS = 25

export class Controller {
  private readonly ctx: CanvasRenderingContext2D
  private size: Size = { width: 0, height: 0 }
  private center: Pos = { x: 0, y: 0 }
  private boundsRect: DOMRect = new DOMRect()

  private handlerPos: Pos = { x: 0, y: 0 }
  private handlerDir = ref<Dir>()
  private holding = false

  private outerRadius = OUTER_RADIUS
  private outerLineWidth = OUTER_LINE_WIDTH
  private innerRadius = INNER_RADIUS
  private handlerRadius = HANDLER_RADIUS

  private handlerColor = 'rgba(255, 255, 255, 0.4)'
  private dirColor = 'rgba(255, 255, 255, 0.2)'
  private mainColor = 'rgb(50, 220, 147)'
  private bgColor = 'rgb(50, 220, 147, 0.3)'

  constructor(private readonly canvas: HTMLCanvasElement, size: Size) {
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Invalid canvas')
    this.ctx = ctx

    this.resetHandler()
    this.bind()
    this.setSize(size)
  }

  setSize(size: Size) {
    const dpr = window.devicePixelRatio
    this.size = size

    this.canvas.style.width = size.width + 'px'
    this.canvas.style.height = size.height + 'px'
    this.canvas.width = size.width * dpr
    this.canvas.height = size.height * dpr
    this.ctx.scale(dpr, dpr)

    this.center = {
      x: size.width / 2,
      y: size.height / 2,
    }

    this.setRadius(size.height * 0.7)

    this.draw()
  }

  setRadius(value: number) {
    const r = value / 2 / OUTER_RADIUS
    this.outerRadius = OUTER_RADIUS * r
    this.outerLineWidth = OUTER_LINE_WIDTH * r
    this.innerRadius = INNER_RADIUS * r
    this.handlerRadius = HANDLER_RADIUS * r
  }

  getHandlerDir() {
    return this.handlerDir
  }

  bind() {
    if (isTouch) {
      this.canvas.addEventListener('touchstart', this.start)
      this.canvas.addEventListener('touchmove', this.move)
      this.canvas.addEventListener('touchend', this.end)
    } else {
      this.canvas.addEventListener('mousedown', this.start)
      this.canvas.addEventListener('mousemove', this.move)
      this.canvas.addEventListener('mouseup', this.end)
      this.canvas.addEventListener('mouseleave', this.end)
    }
  }

  unbind() {
    if (isTouch) {
      this.canvas.removeEventListener('touchstart', this.start)
      this.canvas.removeEventListener('touchmove', this.move)
      this.canvas.removeEventListener('touchend', this.end)
    } else {
      this.canvas.removeEventListener('mousedown', this.start)
      this.canvas.removeEventListener('mousemove', this.move)
      this.canvas.removeEventListener('mouseup', this.end)
      this.canvas.removeEventListener('mouseleave', this.end)
    }
  }

  @bound
  private start(e: MouseEvent | TouchEvent) {
    this.boundsRect = this.canvas.getBoundingClientRect()
    this.holding = true
    this.updateHandler(e)
    requestAnimationFrame(this.draw)
  }

  @bound
  private move(e: MouseEvent | TouchEvent) {
    if (!this.holding) return
    this.updateHandler(e)
    requestAnimationFrame(this.draw)
  }

  @bound
  private end() {
    this.holding = false
    this.resetHandler()
    requestAnimationFrame(this.draw)
  }

  resetHandler() {
    this.handlerPos = { x: 0, y: 0 }
    this.handlerDir.value = undefined
  }

  updateHandler(e: MouseEvent | TouchEvent) {
    const coords = getCoords(e, this.boundsRect)

    const d: Pos = {
      x: (coords.x - this.center.x) / this.outerRadius,
      y: (coords.y - this.center.y) / this.outerRadius,
    }

    //Distance to center
    let mod = Math.sqrt(d.x * d.x + d.y * d.y)

    //Off limits
    if (mod > 1) {
      //Angle
      let angle = Math.atan(d.y / d.x)

      //Intersect position
      let limX = Math.cos(angle)
      let limY = Math.sin(angle)

      if (d.x < 0) {
        d.x = -limX
        d.y = -limY
      } else {
        d.x = limX
        d.y = limY
      }
    }

    this.handlerPos = d
    this.handlerDir.value = getDir(this.handlerPos)
  }

  @bound draw() {
    this.ctx.clearRect(0, 0, this.size.width, this.size.height)

    // Dir
    const dir = this.handlerDir.value
    if (dir) {
      this.ctx.beginPath()

      const c = this.center
      const des = this.size.width
      this.ctx.moveTo(c.x, c.y)

      if (dir == Dir.up) this.ctx.lineTo(c.x - des, c.y - des)
      if (dir == Dir.right) this.ctx.lineTo(c.x + des, c.y - des)
      if (dir == Dir.down) this.ctx.lineTo(c.x + des, c.y + des)
      if (dir == Dir.left) this.ctx.lineTo(c.x - des, c.y + des)

      if (dir == Dir.up) this.ctx.lineTo(c.x + des, c.y - des)
      if (dir == Dir.right) this.ctx.lineTo(c.x + des, c.y + des)
      if (dir == Dir.down) this.ctx.lineTo(c.x - des, c.y + des)
      if (dir == Dir.left) this.ctx.lineTo(c.x - des, c.y - des)

      this.ctx.fillStyle = this.dirColor
      this.ctx.fill()
    }

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

function getCoords(e: MouseEvent | TouchEvent, bounds: DOMRect): Pos {
  const ev = 'targetTouches' in e ? e.targetTouches[0] : e
  return {
    x: ev.pageX - bounds.left,
    y: ev.pageY - bounds.top,
  }
}
