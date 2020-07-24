// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, color, collideRectRect, colorMode, createCanvas, fill, frameRate, keyCode, height,
 *    loop, noFill, noLoop, noStroke, random, rect, round, stroke, sqrt, text, width
 *    UP_ARROW, soundFormats, textSize,textStyle, loadSound, loadFont, textFont, fontSize, square, backgroundImage,image, loadImage, frameCount, key,println, keyPressed, DOWN_ARROW, LEFT_ARROW, ellipse, RIGHT_ARROW
 */

var bird;
var churros = [];
let song, gameIsOver,gameOverSound, mySound, createAudio, fontRegular, house,mickeyMouse, score, sky;

function preload() {
  // fontRegular = loadFont('assets/waltograph42.otf');
  fontRegular = loadFont("https://cdn.glitch.com/d7c94f98-a88e-4708-85f3-ac8a5a2b52ec%2Fwaltograph42.otf?v=1595527371109");
    soundFormats('mp3','ogg');
  mySound = loadSound("https://cdn.glitch.com/d7c94f98-a88e-4708-85f3-ac8a5a2b52ec%2FThere%20s%20a%20Great%20Big%20Beautiful%20Tomorrow.mp3?v=1595532779031");
  // gameOverSound = loadSound("https://cdn.glitch.com/d7c94f98-a88e-4708-85f3-ac8a5a2b52ec%2FMickey%20Mouse%20-%20Steamboat%20Willie%20-%20Whistle.mp3?v=1595529035632")
}

//SETUP

function setup() {
createCanvas(1500, 600);
  // cnv.mousePressed(canvasPressed);
  mickeyMouse = loadImage(
    // "https://1.bp.blogspot.com/_OBIL8PqOcIY/SKWa02IeHKI/AAAAAAAAAO8/H4dHrsdw3D8/s200/Walking.png"
"https://cdn.glitch.com/d7c94f98-a88e-4708-85f3-ac8a5a2b52ec%2F580b57fbd9996e24bc43bd2f.png?v=1595522428738"  
  );
  sky = loadImage (
  "https://cdn.glitch.com/d7c94f98-a88e-4708-85f3-ac8a5a2b52ec%2Fdisney1.jpg?v=1595522898449"
  );
  
  house = loadImage (
  "https://cdn.glitch.com/d7c94f98-a88e-4708-85f3-ac8a5a2b52ec%2FClipartKey_691388.png?v=1595551277441"
  );
 
  bird = new Bird();
  churros.push(new Churro());
  score = 0
  gameIsOver = false;
  mySound.play();
//   song = loadSound("https://cdn.glitch.com/d7c94f98-a88e-4708-85f3-ac8a5a2b52ec%2FMickey%20Mouse%20-%20Steamboat%20Willie%20-%20Whistle.mp3?v=1595529035632")
// song.autoplay(true);
}


//DRAW

function draw() {
  background(0);
  image (sky,0,0,width,height)
  displayScore(); 

  for (var i = churros.length - 1; i >= 0; i--) {
    churros[i].show();
    churros[i].update();

    if (churros[i].hits(bird)) {
      console.log('HIT');
    }

    if (churros[i].offscreen()) {
      churros.splice(i, 1);
    }
  }
 
  bird.update();
  bird.show();

  if (frameCount % 75 == 0) {
    churros.push(new Pipe());
  }
   // if (bird.y >= height){
   //    score ++;
   //  }
  // if (gameIsOver){
  //   textSize(70);
  //   text ("GAME OVER", width/3+20, height/2)
  //   textSize(60);
  //   text(`score: ${score}`, width/3+110, height/2 + 40)
  // }
  // mySound.play();
}


//ACTION

function keyPressed() {
  if (key == ' ') {
    bird.up();
    //console.log("SPACE");
  }
}






//SCORE
 
function displayScore(){
  fill("white")
  textSize(30);
  textFont(fontRegular);
  text(`score: ${score}`,20,40)
  if (gameIsOver){
    textSize(70);
    text ("GAME OVER", width/3+20, height/2)
    textSize(60);
    text(`score: ${score}`, width/3+110, height/2 + 40)
    // gameIsOver = true;
      // mySound.play();
      bird.y = height-45;
      bird.lift = 0;
      bird.gravity = 0;
      pipes.speed = 0;
  }
}

