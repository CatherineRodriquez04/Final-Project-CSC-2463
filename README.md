# Save the Planet
## CSC 2463 Final Integration Project
### Project Description
Save the Planet is a game that you have to bounce an asteroid on a moveable bar from hitting the Earth. The game allows a player 30 seconds to the defend the planet, but once the the asteroid passes the moveable bar it's game over. There are three game modes that adjust the speed of the asteroid from easy, medium, and hard. There is a volume slider that adjusts the volume of all tone implementations. The game has a start screen, rules screen, in-game screen, win screen, and a lost-game screen. There is a background noise played during every screen and other noises produced from different triggers including the win screen, lost-game screen, rules screen, and when the asteroid hits the moveable bar.
When the arduino is connected a the volume slider can modify the brightness of an LED light.

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
- Use the mouse to select a game mode (game is automatically set to 'Easy')
- Use the mouse to adjust the slider to modify the volume and brightness of an LED light
  
- Joystick on Arduino:
  - Connect the joystick via 'connect' arduino button using the mouse
  - Move the joystick left and right to move the bar on the in-game screen (moving the joystick on the y-axis will not change the bar's location)
  - Move the bar to the location the asteroid is headed to avoid letting the asteroid hit Earth
  - Last the entire 30 seconds to win the game

### Project Link: https://catherinerodriquez04.github.io/Final-Project-CSC-2463/
### Project Youtube Link:
### Image of Game Screens:
#### Start Screen
![Start-Screen](https://github.com/CatherineRodriquez04/Final-Project-CSC-2463/assets/114537594/54c27d0f-c6e8-4f15-b89e-9dd5ec10a13d)
#### Rules Screen
![Rules-Screen](https://github.com/CatherineRodriquez04/Final-Project-CSC-2463/assets/114537594/6aa9f4fd-bab6-4fbd-8818-0bbccc665338)
#### In-Game Screen
![In-Game-Screen](https://github.com/CatherineRodriquez04/Final-Project-CSC-2463/assets/114537594/cc5d4ee6-8e57-4b2b-91aa-f80a6d0fc11d)
#### Win Screen
![Win-Game-Screen](https://github.com/CatherineRodriquez04/Final-Project-CSC-2463/assets/114537594/75a69fab-ea54-4167-a14a-2e6e752dae56)
#### Lost-Game Screen
![Lost-Game-Screen](https://github.com/CatherineRodriquez04/Final-Project-CSC-2463/assets/114537594/e2526a76-4b10-4456-a78c-1c46af3923b6)

### Image of Arduino Setup:
![Arduino Set Up](https://github.com/CatherineRodriquez04/Final-Project-CSC-2463/assets/114537594/92057630-331b-42c9-8bf9-a29546aca566)

### Future Developments
- Make this a multiplayer game...
  - One player would control the moveable bar 
  - Second player controls the direction of the asteroid
- Add more modifications to game levels: easy, medium, and hard
  - change the number of asteroids
  - change size of asteroid
  - shorten time 
- Add different sprites for player to choose from other than an asteroid
- Add different rounds or sceneries other than Earth
