import { keyDownControls, keyUpControls } from './config/controls.js'
import { animate, runGame } from './utils/animation.js'
import { gameState } from './state/gameState.js'
import Fighter from './models/fighter.js'
import Sprite from './models/sprite.js'

const canvas = document.querySelector('canvas') as HTMLCanvasElement
const c = canvas?.getContext('2d') as CanvasRenderingContext2D

canvas.width = 1024
canvas.height = 576

const main = () => {
  const background = new Sprite(
    'background',
    canvas,
    c,
    {
      coordinates: { x: 0, y: 0 },
      velocity: { x: 0, y: 0 },
    },
    './img/background.png',
    { x: 0, y: 0 },
    1,
    1,
    0
  )
  const shop = new Sprite(
    'shop',
    canvas,
    c,
    {
      coordinates: { x: 600, y: 224 },
      velocity: { x: 0, y: 0 },
    },
    './img/shop.png',
    { x: 0, y: 0 },
    2,
    6,
    7
  )
  const playerOne = new Fighter(
    'playerOne',
    canvas,
    c,
    {
      coordinates: { x: 100, y: 0 },
      velocity: { x: 0, y: 10 },
    },
    './img/samuraiMack/Idle.png',
    { x: 160, y: 92 },
    {
      position: {
        x: 0,
        y: 0,
      },
      offset: { x: 118, y: 50 },
      width: 100,
      height: 50,
    },
    2,
    8,
    5,
    {
      idle: {
        imgSrc: './img/samuraiMack/Idle.png',
        frames: 8,
      },
      run: {
        imgSrc: './img/samuraiMack/Run.png',
        frames: 8,
      },
      jump: {
        imgSrc: './img/samuraiMack/Jump.png',
        frames: 2,
      },
      attackOne: {
        imgSrc: './img/samuraiMack/Attack1.png',
        frames: 6,
      },
      fall: {
        imgSrc: './img/samuraiMack/Fall.png',
        frames: 2,
      },
      takeHit: {
        imgSrc: './img/samuraiMack/Take Hit.png',
        frames: 4,
      },
      death: {
        imgSrc: './img/samuraiMack/Death.png',
        frames: 6,
      },
    }
  )
  playerOne.draw()

  const playerTwo = new Fighter(
    'playerTwo',
    canvas,
    c,
    {
      coordinates: { x: 800, y: 100 },
      velocity: { x: 0, y: 10 },
    },
    './img/kenji/Idle.png',
    { x: 160, y: 103 },
    {
      position: {
        x: 0,
        y: 0,
      },
      offset: { x: -127, y: 50 },
      width: 127,
      height: 50,
    },
    2,
    4,
    5,
    {
      idle: {
        imgSrc: './img/kenji/Idle.png',
        frames: 4,
      },
      run: {
        imgSrc: './img/kenji/Run.png',
        frames: 8,
      },
      jump: {
        imgSrc: './img/kenji/Jump.png',
        frames: 2,
      },
      fall: {
        imgSrc: './img/kenji/Fall.png',
        frames: 2,
      },
      attackOne: {
        imgSrc: './img/kenji/Attack1.png',
        frames: 4,
      },
      takeHit: {
        imgSrc: './img/kenji/Take Hit.png',
        frames: 3,
      },
      death: {
        imgSrc: './img/kenji/Death.png',
        frames: 7,
      },
    }
  )
  playerTwo.draw()
  animate(canvas, c, background, shop, playerOne, playerTwo)
  window.addEventListener('keydown', (e) =>
    keyDownControls(e, playerOne, playerTwo, canvas)
  )
  window.addEventListener('keyup', (e) => keyUpControls(e, playerOne, playerTwo))
  const timer = document.querySelector('.status__timer-time') as HTMLParagraphElement
  timer.innerHTML = `${gameState.gameTime}`
  runGame(timer, playerOne, playerTwo)
}

main()
