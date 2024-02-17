import { setupGround, updateGround } from './ground.js';
import { setupCharacter, updateCharacter, getCharacterRect, setCharacterLose } from './character.js';
import { setupObstacle, updateObstacle, getObstacleRects } from './obstacle.js';

const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;
const SPEED_SCALE_INCREASE = 0.00001;

const worldElem = document.querySelector('[data-world]');
const scoreElem = document.querySelector('[data-score]');
const startScreenElem = document.querySelector('[data-start-screen]');
const loseScreenElem = document.querySelector('[data-lose-screen]');
const replayButton = document.querySelector('[data-replay-button]');
const scoreDisplay = document.querySelector('[data-score-display]');
const highestScoreDisplay = document.querySelector('[data-highest-score]');
const deathSound = new Audio('./Sounds/Mario Death  Sound Effect HD.mp3');
const milestoneSound = new Audio('./Sounds/Mario Bros Life up Sound Effect.mp3');
const jumpSound = new Audio('./Sounds/Mario Jump Sound Effect.mp3');
const gameOverSound = new Audio('./Sounds/Mario Death  Sound Effect HD.mp3');

setPixelToWorldScale();
window.addEventListener("resize", setPixelToWorldScale);
document.addEventListener("keydown", handleStart, { once: true });

let lastTime;
let speedScale;
let score;
let highestScore = parseInt(localStorage.getItem('highestScore')) || 0;

function update(time) {
  if (lastTime == null) {
    lastTime = time;
    window.requestAnimationFrame(update);
    return;
  }
  const delta = time - lastTime;
  
  updateGround(delta, speedScale);
  updateCharacter(delta, speedScale);
  updateObstacle(delta, speedScale);
  updateSpeedScale(delta);
  updateScore(delta);
  if (checkLose()) return handleLose();

  lastTime = time;
  window.requestAnimationFrame(update);
}

function checkLose() {
  const characterRect = getCharacterRect();
  return getObstacleRects().some(rect => isCollision(rect, characterRect));
}

function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right && 
    rect1.top < rect2.bottom && 
    rect1.right > rect2.left && 
    rect1.bottom > rect2.top
  );
}

function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE;
}

function updateScore(delta) {
  score += delta * 0.01;
  scoreElem.textContent = 'Score: ' + Math.floor(score);
  if (score > highestScore) {
    highestScore = score;
    localStorage.setItem('highestScore', Math.floor(highestScore));
    updateHighestScore();
  }
}


function updateHighestScore() {
  highestScoreDisplay.textContent = Math.floor(highestScore);
}

function handleStart() {
  lastTime = null;
  speedScale = 1;
  score = 0;
  scoreElem.textContent = 'Score: ' + Math.floor(score);
  playBackgroundMusic();
  setupGround();
  setupCharacter();
  setupObstacle();
  startScreenElem.classList.add("hide");
  loseScreenElem.classList.add("hide");
  localStorage.removeItem('highestScore');
  updateHighestScore();
  window.requestAnimationFrame(update);
}


function handleLose() {
  setCharacterLose();
  stopBackgroundMusic();
  scoreDisplay.textContent = 'Score: ' + Math.floor(score);
  loseScreenElem.classList.remove("hide");
  updateHighestScore();
  deathSound.play();
}

function setPixelToWorldScale() {
  let worldToPixelScale;
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldToPixelScale = window.innerWidth / WORLD_WIDTH;
  } else {
    worldToPixelScale = window.innerHeight / WORLD_HEIGHT;
  }
  worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`;
  worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`;
}

function playBackgroundMusic() {
  const bgMusic = document.getElementById('bgMusic');
  bgMusic.play();
}

function stopBackgroundMusic() {
  const bgMusic = document.getElementById('bgMusic');
  bgMusic.pause();
}

function stopAllSoundEffects() {
  jumpSound.pause();
  jumpSound.currentTime = 0;
  
  gameOverSound.pause();
  gameOverSound.currentTime = 0;
}

replayButton.addEventListener('click', () => {
  handleStart();
  playBackgroundMusic();
  stopAllSoundEffects();
});

