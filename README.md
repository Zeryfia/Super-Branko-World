# Super Branko World Documentation

## Introduction
Super Branko World is a simple browser-based game where the player controls a character that jumps over obstacles to achieve the highest score possible. The game features dynamic gameplay with obstacles appearing at random intervals, requiring the player to react quickly to avoid collisions. This document serves as a comprehensive guide to understanding the game's features, mechanics, and implementation details.

## Game Overview
- **Objective:** The objective of the game is to achieve the highest score possible by jumping over obstacles without colliding with them.
- **Controls:** The player can control the character using keyboard inputs:
  - Use the "Space" or "ArrowUp" keys to jump.
  - Use the "ArrowLeft" and "ArrowRight" keys to move left and right respectively.
- **Scoring:** The player earns points continuously as they progress through the game. The score increases over time, and the highest score achieved is stored locally.

## Components
Super Branko World consists of several components, each responsible for different aspects of the gameplay:
1. **HTML Structure:** Defines the layout and structure of the game interface, including the character, obstacles, score display, and game screens (start screen, lose screen).
2. **CSS Styles:** Provides styling for the HTML elements to create a visually appealing game environment.
3. **JavaScript Files:**
   - **`script.js`:** Orchestrates the game mechanics, including initialization, updating game elements, handling collisions, managing score, and responding to player input.
   - **`ground.js`:** Manages the movement and positioning of ground elements in the game world.
   - **`character.js`:** Controls the behavior, animation, and interaction of the player character.
   - **`obstacle.js`:** Handles the creation, movement, and collision detection of obstacles.
   - **`updateCustomProperty.js`:** Provides utility functions for working with custom CSS properties used in the game.

## Game Flow
1. **Initialization:** When the game starts, the initial setup is performed, including setting up the ground, character, and obstacles.
2. **Game Loop:** The game loop continuously updates the game state, including the position of game elements, score, and checking for collisions.
3. **Player Interaction:** The player controls the character using keyboard inputs to jump and move horizontally.
4. **Obstacle Generation:** Obstacles appear at random intervals, challenging the player to navigate and avoid collisions.
5. **Scoring:** The player earns points continuously as they progress through the game, with the score increasing over time.
6. **Game Over:** The game ends if the player collides with an obstacle. The highest score achieved is stored locally and displayed on the lose screen.

## Conclusion
Super Branko World offers a simple yet engaging gameplay experience, challenging players to test their reflexes and agility. With dynamic obstacle generation, responsive controls, and local score storage, the game provides an enjoyable and competitive gaming experience for players of all ages. Whether you're looking for a quick gaming session or aiming to achieve the highest score, Super Branko World promises hours of fun and excitement.
