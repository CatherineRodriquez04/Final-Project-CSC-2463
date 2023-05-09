# Save the Planet
## CSC 2463 Final Integration Project
### Project Description
Save the Planet is a game that you have to bounce an asteroid on a player moveable bar from hitting the Earth. The game allows a player 30 seconds to the defend the planet, but once the the asteroid passes the moveable bar it's game over. The game has a start screen, rules screen, in-game screen, win screen, and a lost-game screen. There is a background noise played during every screen and other noises produced from different triggers including the win screen, lost-game screen, rules screen, and when the asteroid hits the moveable bar.
When the arduino is connected a green LED light will turn on if the player wins the game and a red LED light will turn on if the player loses the game.

### Tech Stack
- Javascript (P5.js and Tone.js)
- HTML for guthub pages
- Arduino
- Audio files found on freesound
- Sprites created through Pixel App

### Rules
- Press 'ENTER' to change screens
  - start screen to in-game screen
  - win game / lost-game screen to start screen
- Press 'SHIFT' to change back and forth from the start screen and rules screen
- Press 'ESCAPE' to exit the in-game screen back to the start screen
- Use the mouse to click on the 'audio' and 'connect' arduino button

- Arrows on Keyboard:
  - The 'LEFT' and 'RIGHT' arrow keys move the bar back and forth on the in-game screen
  - Player cannot hold down on the arrow keys (press multiple times to continue moving the bar)
  - Move the bar to the location the asteroid is headed to avoid letting the asteroid hit Earth
  - Last the entire 30 seconds to win the game
  
- Joystick on Arduino:
  - Connect the joystick via 'connect' arduino button using the mouse
  - Move the jackstick left and right to move the bar on the in-game screen (moving the joystick up and down will not cause an affect to the bar)
  - Move the bar to the location the asteroid is headed to avoid letting the asteroid hit Earth
  - Last the enture 30 seconds to win the game

### Project Link:
### Project Youtube Link:
### Image of Game

### Image of Arduino Setup

### Future Developments
- Make this a multiplayer game...
  - One player would control the moveable bar 
  - Second player controls the direction of the asteroid
- Add multiple levels: easy, medium, and hard
  - different speeds
  - change the number of asteroids
  - change size of asteroid
  - shorten time 
- Add different sprites for player to choose from other than an asteroid
- Add different rounds or sceneries other than Earth
