import Fighter from '../models/fighter.js'
import Sprite from '../models/sprite.js'
import { gameState } from '../state/gameState.js'
import { finishGame } from './general.js'

const isColliding = (player: Fighter, enemy: Fighter) => {
  return (
    player.attackBox.position.x + player.attackBox.width >=
      enemy.position.coordinates.x &&
    player.attackBox.position.x <= enemy.position.coordinates.x + enemy.width &&
    player.attackBox.position.y + player.attackBox.height >=
      enemy.position.coordinates.y &&
    player.attackBox.position.y <= enemy.position.coordinates.y + enemy.height
  )
}

const playerAnimation = (player: Fighter, enemy: Fighter, canvas: HTMLCanvasElement) => {
  //movement
  player.position.velocity.x = 0
  if (
    player.controlsState.keys.left.active &&
    player.position.coordinates.x >= 0 &&
    player.lastKey === 'left'
  ) {
    player.position.velocity.x = -5
    player.switchSprite('run')
  } else if (
    player.controlsState.keys.right.active &&
    player.position.coordinates.x + player.width <= canvas.width &&
    player.lastKey === 'right'
  ) {
    player.position.velocity.x = 5
    player.switchSprite('run')
  } else {
    player.switchSprite('idle')
  }

  //jumping
  if (player.position.velocity.y < 0) {
    player.switchSprite('jump')
  } else if (player.position.velocity.y > 0) {
    player.switchSprite('fall')
  }
  // collision
  if (
    player.isAttacking &&
    player.framesCurrent === (player.name === 'playerOne' ? 4 : 2)
  ) {
    if (isColliding(player, enemy)) {
      const enemyHealthBar = document.querySelector(
        `.status__${enemy.name}-health`
      ) as HTMLDivElement
      enemy.takeHit()
      enemyHealthBar.style.width = `${enemy.health}%`
    }
    player.isAttacking = false
  }

  if (gameState.gameInProgress) {
    if (player.health <= 0 || enemy.health <= 0) {
      const [playerOne, playerTwo] =
        player.name === 'playerOne' ? [player, enemy] : [enemy, player]
      finishGame(playerOne, playerTwo)
    }
  }
}

export const runGame = (
  timer: HTMLParagraphElement,
  playerOne: Fighter,
  playerTwo: Fighter
) => {
  gameState.intervalId = setInterval(() => {
    if (gameState.gameTime > 0) {
      gameState.gameTime -= 1
      timer.innerHTML = `${gameState.gameTime}`
    }

    if (gameState.gameTime === 0) {
      finishGame(playerOne, playerTwo)
    }
  }, 1000)
}

export const animate = (
  canvas: HTMLCanvasElement,
  c: CanvasRenderingContext2D,
  background: Sprite,
  shop: Sprite,
  playerOne: Fighter,
  playerTwo: Fighter
) => {
  window.requestAnimationFrame(() =>
    animate(canvas, c, background, shop, playerOne, playerTwo)
  )
  background.update()
  shop.update()
  c.fillStyle = 'rgba(255, 255, 255, 0.1)'
  c.fillRect(0, 0, canvas.width, canvas.height)
  playerOne.update()
  playerTwo.update()
  playerAnimation(playerOne, playerTwo, canvas)
  playerAnimation(playerTwo, playerOne, canvas)
}
