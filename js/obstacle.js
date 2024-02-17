import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js";

const SPEED = 0.03;
const OBSTACLE_INTERVAL_MIN = 400;
const OBSTACLE_INTERVAL_MAX = 3000;
const worldElement = document.querySelector("[data-world]");

let nextObstacleTime;
let obstacleDelay = 0;

export function setupObstacle() {
  nextObstacleTime = OBSTACLE_INTERVAL_MIN;
  document.querySelectorAll("[data-obstacle]").forEach(obstacle => {
    obstacle.remove();
  })
}

export function updateObstacle(delta, speedScale) {
  document.querySelectorAll("[data-obstacle]").forEach(obstacle => {
    incrementCustomProperty(obstacle, "--left", delta * speedScale * SPEED * -1)
    if (getCustomProperty(obstacle, "--left") <= -100) {
      obstacle.remove()
    }
  })

  if (obstacleDelay > 0) {
    obstacleDelay -= delta;
  }

  if (obstacleDelay <= 0) {
    if (nextObstacleTime <= 0) {
      createObstacle()
      nextObstacleTime = randomNumberBetween(OBSTACLE_INTERVAL_MIN, OBSTACLE_INTERVAL_MAX) / speedScale

      obstacleDelay = 500;
    }
    nextObstacleTime -= delta;
  }
}

export function getObstacleRects() {
  return[...document.querySelectorAll("[data-obstacle")].map(obstacle => {
    return obstacle.getBoundingClientRect()
  })
}

function createObstacle() {
  const obstacle = document.createElement("img");
  obstacle.dataset.obstacle = true;
  const listOb = ['tag','div'];
  let random = Math.floor(Math.random()*listOb.length);
  let currentOb = listOb[random];
  const pictures = [ {name: 'tag', src: './images/obstacle.png'}, {name: 'div', src: './images/div.png'}];
  
  let temp = pictures.filter(item => item.name === `${currentOb}`);
  obstacle.src = temp[0].src;
  obstacle.classList.add("obstacle");
  setCustomProperty(obstacle, "--left", 100);
  worldElement.append(obstacle);
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
