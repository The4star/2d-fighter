export interface GameState {
  gameInProgress: boolean
  gameTime: number
  intervalId: number
}

export type KeyName = 'up' | 'right' | 'left'

export interface ControlsState {
  lastKey: string | null
  keys: Record<KeyName, KeyState>
}

export interface KeyState {
  active: boolean
}
