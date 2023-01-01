import Fighter from '../models/fighter.js'
import { gameState } from '../state/gameState.js'

export const announce = (text: string) => {
  const announcement = document.querySelector('.announcement') as HTMLDivElement
  announcement.innerHTML = text
  announcement.style.display = 'block'
}

export const finishGame = (playerOne: Fighter, playerTwo: Fighter) => {
  clearInterval(gameState.intervalId)
  gameState.gameInProgress = false
  if (playerOne.health > playerTwo.health) {
    announce('Samurai Mack Wins')
  }

  if (playerOne.health < playerTwo.health) {
    announce('Kenji Wins')
  }

  if (playerOne.health === playerTwo.health) {
    announce('Stalemate')
  }
}
