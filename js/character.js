import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js"

const characterElem = document.querySelector("[data-character]")
const JUMP_SPEED = 0.45
const GRAVITY = 0.0014
const CHR_FRAME_COUNT = 3
const FRAME_TIME = 100

let isJumping = false
let chrFrame = 0
let currentFrameTime = 0
let yVelocity = 0

export function setupCharacter() {
  resetCharacter()
  document.removeEventListener("keydown", onJump)
  document.addEventListener("keydown", onJump)
}

export function updateCharacter(delta, speedScale) {
  handleRun(delta, speedScale)
  handleJump(delta)
}

export function getCharacterRect() {
  return characterElem.getBoundingClientRect()
}

export function setCharacterLose() {
  characterElem.src = "../images/character-lose.png"
}

function resetCharacter() {
  isJumping = false
  chrFrame = 0
  currentFrameTime = 0
  yVelocity = 0
  setCustomProperty(characterElem, "--bottom", 6)
}

function handleRun(delta, speedScale) {
  if (isJumping) {
    characterElem.src = `../images/character-run-0.png`
    return
  }

  if (currentFrameTime >= FRAME_TIME) {
    chrFrame = (chrFrame + 1) % CHR_FRAME_COUNT
    characterElem.src = `../images/character-run-${chrFrame}.png`
    currentFrameTime -= FRAME_TIME
  }
  currentFrameTime += delta * speedScale
}

function handleJump(delta) {
  if (!isJumping) {
    return
  }

  incrementCustomProperty(characterElem, "--bottom", yVelocity * delta)
  
  if (getCustomProperty(characterElem, "--bottom") <= 6) {
    setCustomProperty(characterElem, "--bottom", 6)
    isJumping = false
  }

  yVelocity -= GRAVITY * delta
}

function onJump(e) {
  if (e.code !== "Space" || isJumping) {
    return
  }

  yVelocity = JUMP_SPEED
  isJumping = true
}