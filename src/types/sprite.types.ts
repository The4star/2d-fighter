export interface Position {
  x: number
  y: number
}

export interface SpritePosition {
  coordinates: Position
  velocity: Position
}

export interface AttackBox {
  position: Position
  offset: Position
  width: number
  height: number
}

export type SpriteAnimations = Record<string, SpriteAnimation>

export interface SpriteAnimation {
  imgSrc: string
  frames: number
  image?: HTMLImageElement
}
