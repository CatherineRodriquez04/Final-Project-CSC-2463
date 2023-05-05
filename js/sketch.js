
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

//tone
let soundButton;
let initTone = true;
let winGame;
let lostGame;

let synth = new Tone.MembraneSynth().toDestination();
let synthA = new Tone.MembraneSynth().toDestination();

let melody = new Tone.Sequence((time, note) => {
  synth.triggerAttackRelease(note, 0.1, time);
}, ['C6', null, 'D4', null, 'D6', 'D4','E6', 'C4', 'E5', null]).start(0);

let pattern = new Tone.Pattern(function (time, note ){ 
  synth.triggerAttackRelease(note, 0.25, time); 
}, ['C6', 'E5', 'D4', 'C4', 'C6']);

//arduino
let connectButton;
let port;
let writer, reader;
const encoder = new TextEncoder();
const decoder = new TextDecoder();


//game state
const GameState = {
  Start: "Start",
  PreGame: "Rules",
  Playing: "Playing",
  GameOver: "GameOver",
  LostGame: "LostGame"
};

//game levels (affects speed)
//let level;
// const gameLevel = new Map([ 
//   ['Easy', 1],
//   ['Medium', 2],
//   ['Hard', 3]
// ]);

let game = { score: 0, maxScore: 0, maxTime: 30, elapsedTime: 0, state: GameState.Start};

function preload(){ //preload background image and animations
  pixelEarth = loadImage('assets/Earth-Pixel.png');
  asteroid = loadImage('assets/Asteroid.png');
  star = loadImage('assets/Stars.png');
  lostMan = loadImage('assets/Kill Man.png');
  winMan = loadImage('assets/Clap.png');

  //preload tone
  winGame = new Tone.Player('assets/WinGame.wav').toDestination();
  winGame.volume.value = -15;
  lostGame = new Tone.Player('assets/LostGame.mp4').toDestination();
  lostGame.volume.value = -35;

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  reset(); //restarts time with each game

  synth.volume.value = -45;

  //create level selection
  // level = createSelect();
  // level.position(10, 40);
  // level.option("Easy", 5);
  // level.option("Medium", 8);
  // level.option("Hard", 10);

  if ("serial" in navigator) {
    // The Web Serial API is supported
    connectButton = createButton("Connect");
    connectButton.position(1370, 40);
    connectButton.mousePressed(connect);
    connectButton.style('width', '60px');
    connectButton.style('height', '30px');
    connectButton.style('font-size', '12px');
    connectButton.style('background-color', 'black');
    connectButton.style('color', 'white');
  }

  soundButton = createButton('Activate Audio');
  soundButton.position(1330,5);
  soundButton.mousePressed(audio);
  soundButton.style('width', '100px');
  soundButton.style('height', '30px');
  soundButton.style('font-size', '12px');
  soundButton.style('background-color', 'black');
  soundButton.style('font', 'Courier New');
  soundButton.style('color', 'white');

}

function reset(){
  game.elapsedTime = 0;
  game.score = 0;
}

//activates tone.js
function audio(){
  if(initTone === true){
    Tone.start();
    initTone = false;
    Tone.Transport.start();
  } 
}

function draw() {
    
  
  switch(game.state){
    case GameState.Start: //start screen
      background(0);
      pattern.stop();
      melody.start();

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
      fill(255);
      textSize(20);
      textAlign(LEFT);
      text("Press 'SHIFT' to read rules", 10, 25);
      
      pop();
      break;

    case GameState.Rules: //rules screen
      background(100);
      pattern.start();
      melody.stop();

      push();
      fill(230);
      noStroke();
      textSize(60);
      textAlign(CENTER);
      textFont('Courier New');
      text("RULES: ", 750, 100);
      textSize(50);
      textAlign(CENTER);
      text("1. Use the 'LEFT' and 'RIGHT' arrow keys", 750, 220); //rule 1
      text("to move the bar back and forth", 750, 280);
      text("(or joystick if applicable)", 750, 340);
      text("2. Select a level for game mode to reflect", 750, 450); //rule 2
      text("how fast the asteroid will move", 750, 510);
      text("(level shown through LED lights)", 750, 570);
      text("Save the Planet before the time runs out!", 750, 720); //game objective
      text("Press 'SHIFT' to return back to start", 750, 780);

      pop();


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
      noStroke();
      fill(0, 255, 255);
      textSize(24);
      textFont('Courier New');
      text("Score: " + game.score, 10, 80);

      //counts down time
      let currentTime = game.maxTime - game.elapsedTime;
      text("Time: " + ceil(currentTime), 10,50);
      game.elapsedTime += deltaTime / 1000;

      push();
      fill(255);
      textSize(15);
      text("Press 'ESCAPE' to exit game", 10, 20);

      pop();

      //ends game when timer stops
      if (currentTime < 0) {
        game.state = GameState.GameOver;
        winGame.start();
      }
      
      //if ball hits ground
      if(yBall > windowHeight - 0.5 * diameter){
        game.state = GameState.LostGame;
        lostGame.start();
      }

      break;

    case GameState.GameOver: //game over screen
      game.maxScore = max(game.score, game.maxScore); //changes max score if player scores higher
      background(0);

      //box to hold score
      push();
      fill(0);
      stroke(255);
      rect(50, 600, 300, 110);
      pop();

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
      text("Score: " + game.score, 200, 635);
      text("Max Score: " + game.maxScore, 200, 685);
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
      game.maxScore = max(game.score, game.maxScore); //changes max score if player scores higher
      background(0);

      //box to hold score
      push();
      fill(0);
      stroke(255);
      rect(50, 600, 300, 110);
      pop();
      
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
      text("Score: " + game.score, 200, 635);
      text("Max Score: " + game.maxScore, 200, 685);
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
  else if(keyCode === SHIFT){
    switch(game.state){
      case GameState.Start:
        game.state = GameState.Rules;
        break;
      case GameState.Rules:
        game.state = GameState.Start;  
        break;
    }
  }
  else if(keyCode === ESCAPE){
    switch(game.state){
      case GameState.Playing:
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
  // xBallSpeed = level.value();
  // yBallSpeed = level.value();

  // if(level.value() === 5){
  //   xBallSpeed = 5;
  //   yBallSpeed = 5;
  // }
  // else if(level.value() === 8){
  //   xBallSpeed = 20;
  //   yBallSpeed = 20;
  // }

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
    synthA.triggerAttackRelease("C2", '2n'); //sound with collision
  }

  pattern.stop();
 
  //create asteriod
  image(asteroid, xBall, yBall, 175, 200, 0 + 750 * currentFrame, 100, 800, 0);

  if((frameCount % 18) === 0){
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

async function connect() {
  port = await navigator.serial.requestPort();
 
 
  await port.open({ baudRate: 9600 });
 
 
  writer = port.writable.getWriter();
 
 
  reader = port.readable
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(new TransformStream(new LineBreakTransformer()))
    .getReader();
 }
 
 class LineBreakTransformer {
  constructor() {
    // A container for holding stream data until a new line.
    this.chunks = "";
  }
 
  transform(chunk, controller) {
    // Append new chunks to existing chunks.
    this.chunks += chunk;
    // For each line breaks in chunks, send the parsed lines out.
    const lines = this.chunks.split("\n");
    this.chunks = lines.pop();
    lines.forEach((line) => controller.enqueue(line));
  }
 
  flush(controller) {
    // When the stream is closed, flush any remaining chunks out.
    controller.enqueue(this.chunks);
  }
 }
 


