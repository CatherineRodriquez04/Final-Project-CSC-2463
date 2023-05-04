
//ball
var xBall = Math.floor(Math.random() * 500) + 50;
var yBall = 50;
var diameter = 20;
var xBallSpeed = 5;
var yBallSpeed = 5;

//paddle
var xPaddle;
var yPaddle;
var paddleWidth = 150;
var paddleHeight = 35;
var start = false;

//images & animations
let pixelEarth;
let asteroid;
let currentFrame = 0;
let star;
let starFrame = 0;
let lostMan;
let lostManFrame = 0;
let winMan;
let winManFrame = 0;


//game state
const GameState = {
  Start: "Start",
  PreGame: "Rules",
  Playing: "Playing",
  GameOver: "GameOver",
  LostGame: "LostGame"
};

let game = { score: 0, maxScore: 0, maxTime: 30, elapsedTime: 0, state: GameState.GameOver};

function preload(){ //preload background image and animations
  pixelEarth = loadImage('assets/Earth-Pixel.png');
  asteroid = loadImage('assets/Asteroid.png');
  star = loadImage('assets/Stars.png');
  lostMan = loadImage('assets/Kill Man.png');
  winMan = loadImage('assets/Clap.png');

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  reset();
}

function reset(){
  game.elapsedTime = 0;
  game.score = 0;

}


function draw() {
  
  switch(game.state){
    case GameState.Start: //start screen
      background(0);

      //creating stars
      image(star, 50, 150, 100, 115, 0 + 750 * starFrame, 100, 800, 0);
      image(star, 175, 700, 100, 115, 0 + 750 * starFrame, 100, 800, 0);
      image(star, 1200, 30, 100, 115, 0 + 750 * starFrame, 100, 800, 0);
      image(star, 1300, 800, 100, 115, 0 + 750 * starFrame, 100, 800, 0);
      image(star, 350, 450, 100, 115, 0 + 750 * starFrame, 100, 800, 0);
      image(star, 1000, 600, 100, 115, 0 + 750 * starFrame, 100, 800, 0);
      image(star, 1125, 325, 100, 115, 0 + 750 * starFrame, 100, 800, 0);
      image(star, 475, 10, 100, 115, 0 + 750 * starFrame, 100, 800, 0);

      starAnimation(); //star animation

      //creates the Earth
      image(pixelEarth, windowWidth/3, windowHeight/4, 525, 500);


      //title
      push();
      fill(255,255,0);
      textFont('Courier New');
      textSize(75);
      textAlign(CENTER);
      text("Save the Planet!", windowWidth/1.9, 150);
      //instructions
      textSize(40);
      // if(!reader){
      //   text("Press 'ENTER' to start!", 750, 800);
      // }
      // else{
      //   text("Press button to start!", 750, 800);
      // }
      text("Press 'ENTER' to start!", 750, 800);
      
      pop();
      break;

    case GameState.Rules: //rules screen
      background(100);

      break;

    case GameState.Playing: //game screen
      background(0);
      image(pixelEarth, -175, windowHeight/1.25, 1800, 900);

      //creating stars
      image(star, 50, 250, 100, 115, 0 + 750 * starFrame, 100, 800, 0);
      image(star, 230, 630, 100, 115, 0 + 750 * starFrame, 100, 800, 0);
      image(star, 1200, 30, 100, 115, 0 + 750 * starFrame, 100, 800, 0);
      image(star, 1300, 600, 100, 115, 0 + 750 * starFrame, 100, 800, 0);
      image(star, 540, 340, 100, 115, 0 + 750 * starFrame, 100, 800, 0);
      image(star, 900, 540, 100, 115, 0 + 750 * starFrame, 100, 800, 0);
      image(star, 1050, 290, 100, 115, 0 + 750 * starFrame, 100, 800, 0);
      image(star, 375, 10, 100, 115, 0 + 750 * starFrame, 100, 800, 0);
      image(star, 825, 75, 100, 115, 0 + 750 * starFrame, 100, 800, 0);
       
      starAnimation(); //star animation
      drawGame(); //creates pong game

      //score text
      fill(0, 255, 255);
      textSize(24);
      textFont('Courier New');
      text("Score: " + game.score, 10, 65);

      //counts down time
      let currentTime = game.maxTime - game.elapsedTime;
      text("Time: " + ceil(currentTime), 10,30);
      game.elapsedTime += deltaTime / 1000;

      //ends game when timer stops
      if (currentTime < 0) {
        game.state = GameState.GameOver;
      }
      
      //if ball hits ground
      if(yBall > windowHeight - 0.5 * diameter){
        game.state = GameState.LostGame;
      }

      break;

    case GameState.GameOver: //game over screen
      game.maxScore = max(game.score, game.maxScore); //changes max score if player scores higher
      background(0);

      push();
      fill(255);
      textSize(90);
      textAlign(CENTER);
      textFont('Courier New');
      text("GAME OVER", 750, 150);
      fill(255,255,0);
      textSize(60);
      text("The Planet has been DEFENDED!", 750, 300);
      fill(255);
      text("Earth is SAVED for now...", 750, 450);
      textSize(30);
      text("Press 'ENTER' to restart!", 1200, 850);
      pop();

      //happy mankind animation
      image(winMan, 500, 480, 500, 500, 0 + 750 * winManFrame, 100, 800, 0);

      if((frameCount % 20) === 0){
        winManFrame++;
      }
      if(winManFrame > 2){
        winManFrame = 0;
      }
    
      break;

    case GameState.LostGame: //player loses game (by not beating the clock)
      background(0);

      push();
      fill(255);
      textSize(90);
      textAlign(CENTER);
      textFont('Courier New');
      text("GAME OVER", 750, 150);
      fill(255,255,0);
      textSize(60);
      text("The Planet has been DESTROYED!", 750, 300);
      fill(255);
      text("Say GOODBYE to mankind :(", 750, 450);
      textSize(30);
      text("Press 'ENTER' to restart!", 1200, 850);
      pop();

      //kill mankind animation
      image(lostMan, 500, 480, 500, 500, 0 + 750 * lostManFrame, 100, 800, 0);

      if((frameCount % 20) === 0){
        lostManFrame++;
      }
      if(lostManFrame > 2){
        lostManFrame = 0;
      }
      
    
      break;
  }

}

function keyPressed(){
  //switch between game states
  if (keyCode === ENTER){
    switch(game.state){ 
      case GameState.Start:
        game.state = GameState.Rules;
        break;
  
      case GameState.Rules:
        game.state = GameState.Playing;
        break;
  
       case GameState.GameOver:
        reset();
        game.state = GameState.Start;
        break; 
  
       case GameState.LostGame:
        reset();
        game.state = GameState.Start;
        break; 
    }
  }

  //move paddle
  if (keyCode === LEFT_ARROW){
    xPaddle -= 50;
  }
  else if (keyCode === RIGHT_ARROW){
    xPaddle += 50;
  }
}

function drawGame(){
 //continuously change the ball's location
  xBall += xBallSpeed;
  yBall += yBallSpeed;

  //keeps ball within screen
  if (xBall < diameter/2 || xBall > windowWidth - 0.5 * diameter){
    xBallSpeed *= -1;
  }
  if (yBall < diameter/2 || yBall > windowHeight - 0.5 * diameter){
    yBallSpeed *= -1;
  }


  //checks for collision with paddle
  if ((xBall > xPaddle &&
    xBall < xPaddle + paddleWidth) &&
    (yBall + (diameter * 6) >= yPaddle)) {
    xBallSpeed *= -1;
    yBallSpeed *= -1;
    game.score++;
  }
 
  //create asteriod
  image(asteroid, xBall, yBall, 175, 200, 0 + 750 * currentFrame, 100, 800, 0);

  if((frameCount % 20) === 0){
    currentFrame++;
  }
  if(currentFrame > 3){
    currentFrame = 0;
  }

  //places paddle in the middle when the game has not started
  if (!start){
    xPaddle = windowWidth / 2
    yPaddle = windowHeight - 200;
    start = true;
  }

  //create paddle
  fill(0);
  stroke(255);
  rect(xPaddle, yPaddle, paddleWidth, paddleHeight);
}

function starAnimation(){ //animation for stars
  if((frameCount % 20) === 0){
    starFrame++;
  }
  if(starFrame > 1){
    starFrame = 0;
  }
}


