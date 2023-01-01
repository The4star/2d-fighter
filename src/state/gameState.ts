import { gameConfig } from '../config/config.js'
import { GameState } from '../types/state.types.js'

export const gameState: GameState = {
  gameTime: gameConfig.gameTime,
  gameInProgress: true,
  intervalId: 0,
}
