import { gameConfig } from '../config/config.js'
import {
  AttackBox,
  SpritePosition,
  Position,
  SpriteAnimations,
} from '../types/sprite.types'
import { ControlsState } from '../types/state.types'
import Sprite from './sprite.js'

type playerName = 'playerOne' | 'playerTwo'

class Fighter extends Sprite {
  public attackBox: AttackBox
  public isAttacking: boolean
  public sprites: SpriteAnimations
  public health: number
  public lastKey: string | null
  public controlsState: ControlsState
  public dead: boolean

  constructor(
    name: playerName,
    canvas: HTMLCanvasElement,
    c: CanvasRenderingContext2D,
    position: SpritePosition,
    imgSrc: string,
    imgOffset: Position,
    attackBox: AttackBox,
    scale: number,
    frames: number,
    framesHold: number,
    sprites: SpriteAnimations
  ) {
    super(name, canvas, c, position, imgSrc, imgOffset, scale, frames, framesHold)
    this.lastKey = null
    this.controlsState = {
      lastKey: null,
      keys: {
        up: {
          active: false,
        },
        left: {
          active: false,
        },
        right: {
          active: false,
        },
      },
    }
    this.attackBox = attackBox
    this.isAttacking = false
    this.health = 100
    this.sprites = sprites
    this.dead = false

    for (const sprite in sprites) {
      sprites[sprite].image = new Image()
      sprites[sprite].image!.src = sprites[sprite].imgSrc
    }
  }

  update() {
    this.draw()
    if (!this.dead) this.animateFrames()

    //attackbox
    this.attackBox.position.x = this.position.coordinates.x + this.attackBox.offset.x
    this.attackBox.position.y = this.position.coordinates.y + this.attackBox.offset.y
    // draw attack box
    // this.c.strokeRect(
    //   this.attackBox.position.x,
    //   this.attackBox.position.y,
    //   this.attackBox.width,
    //   this.attackBox.height
    // )

    // player position and gravity
    this.position.coordinates.x += this.position.velocity.x
    this.position.coordinates.y += this.position.velocity.y
    if (
      this.position.coordinates.y + this.height + this.position.velocity.y >=
      this.canvas.height - 96
    ) {
      this.position.velocity.y = 0
      this.position.coordinates.y = 330
    } else {
      this.position.velocity.y += gameConfig.gravity
    }
  }

  attack() {
    this.switchSprite('attackOne')
    this.isAttacking = true
  }

  takeHit() {
    this.health -= 10
    if (this.health <= 0) {
      this.switchSprite('death')
    } else {
      this.switchSprite('takeHit')
    }
  }

  switchSprite(sprite: string) {
    // if dead
    if (this.image === this.sprites.death.image) {
      if (this.framesCurrent === this.sprites.death.frames - 1) {
        this.dead = true
      }
      return
    }

    // if attacking
    if (
      this.image === this.sprites.attackOne.image &&
      this.framesCurrent < this.sprites.attackOne.frames - 1 &&
      this.health > 0
    )
      return

    // if hit
    if (
      this.image === this.sprites.takeHit.image &&
      this.framesCurrent < this.sprites.takeHit.frames - 1 &&
      this.health > 0
    )
      return

    if (this.image !== this.sprites[sprite].image!) {
      this.framesCurrent = 0
      this.image = this.sprites[sprite].image!
      this.frames = this.sprites[sprite].frames
    }
  }
}

export default Fighter
