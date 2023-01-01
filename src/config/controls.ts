import Fighter from '../models/fighter.js'
import { gameState } from '../state/gameState.js'
import { gameConfig } from './config.js'

export const keyDownControls = (
  e: KeyboardEvent,
  playerOne: Fighter,
  playerTwo: Fighter,
  canvas: HTMLCanvasElement
) => {
  if (gameState.gameInProgress) {
    switch (e.code) {
      case 'KeyW':
        if (
          playerOne.position.coordinates.y + playerOne.height - canvas.height >=
          -gameConfig.groundHeight
        ) {
          playerOne.position.velocity.y = -20
        }
        break
      case 'KeyD':
        playerOne.controlsState.keys.right.active = true
        playerOne.lastKey = 'right'
        break
      case 'KeyA':
        playerOne.controlsState.keys.left.active = true
        playerOne.lastKey = 'left'
        break
      case 'Space':
        playerOne.attack()
        break
      case 'ArrowUp':
        if (
          playerTwo.position.coordinates.y + playerTwo.height - canvas.height >=
          -gameConfig.groundHeight
        ) {
          playerTwo.position.velocity.y = -20
        }
        break
      case 'ArrowRight':
        playerTwo.controlsState.keys.right.active = true
        playerTwo.lastKey = 'right'
        break
      case 'ArrowLeft':
        playerTwo.controlsState.keys.left.active = true
        playerTwo.lastKey = 'left'
        break
      case 'ControlRight':
        playerTwo.attack()
        break
      default:
        break
    }
  }
}

export const keyUpControls = (
  e: KeyboardEvent,
  playerOne: Fighter,
  playerTwo: Fighter
) => {
  if (gameState.gameInProgress) {
    switch (e.code) {
      case 'KeyW':
        playerOne.controlsState.keys.up.active = false
        break
      case 'KeyD':
        playerOne.controlsState.keys.right.active = false
        break
      case 'KeyA':
        playerOne.controlsState.keys.left.active = false
        break
      case 'ArrowUp':
        playerTwo.controlsState.keys.up.active = false
        break
      case 'ArrowRight':
        playerTwo.controlsState.keys.right.active = false
        break
      case 'ArrowLeft':
        playerTwo.controlsState.keys.left.active = false
        break
      default:
        break
    }
  }
}
