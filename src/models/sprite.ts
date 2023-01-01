import { SpritePosition, Position } from '../types/sprite.types.js'

class Sprite {
  public name: string
  public canvas: HTMLCanvasElement
  public c: CanvasRenderingContext2D
  public position: SpritePosition
  public height: number
  public width: number
  public scale: number
  public frames: number
  public framesCurrent: number
  public framesElapsed: number
  public framesHold: number
  public imageOffset: Position
  public image: HTMLImageElement

  constructor(
    name: string,
    canvas: HTMLCanvasElement,
    c: CanvasRenderingContext2D,
    position: SpritePosition,
    imgSrc: string,
    imgOffset: Position,
    scale: number,
    frames: number,
    framesHold: number
  ) {
    this.name = name
    this.canvas = canvas
    this.c = c
    this.position = position
    this.height = 150
    this.width = 50
    this.image = new Image()
    this.image.src = imgSrc
    this.imageOffset = imgOffset
    this.scale = scale
    this.frames = frames
    this.framesCurrent = 0
    this.framesElapsed = 0
    this.framesHold = framesHold
  }

  draw() {
    this.c.drawImage(
      this.image,
      this.framesCurrent * (this.image.width / this.frames),
      0,
      this.image.width / this.frames,
      this.image.height,
      this.position.coordinates.x - this.imageOffset.x,
      this.position.coordinates.y - this.imageOffset.y,
      (this.image.width / this.frames) * this.scale,
      this.image.height * this.scale
    )
  }

  animateFrames() {
    this.framesElapsed++

    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.frames - 1) {
        this.framesCurrent++
      } else {
        this.framesCurrent = 0
      }
    }
  }

  update() {
    this.draw()
    this.animateFrames()
  }
}

export default Sprite
