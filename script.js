// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, color, collideRectRect, colorMode, createCanvas, fill, frameRate, keyCode, height,
 *    loop, noFill, noLoop, noStroke, random, rect, round, stroke, sqrt, text, width
 *    UP_ARROW, soundFormats, textSize,textStyle, loadSound, loadFont, textFont, fontSize, square, backgroundImage,image, loadImage, frameCount, key,println, keyPressed, DOWN_ARROW, LEFT_ARROW, ellipse, RIGHT_ARROW
 */

var bird;
var pipes = [];
let spongebob,song, mySound, createAudio, fontRegular, house,mickeyMouse, score, sky;

function preload() {
  // fontRegular = loadFont('assets/waltograph42.otf');
  fontRegular = loadFont("https://cdn.glitch.com/d7c94f98-a88e-4708-85f3-ac8a5a2b52ec%2Fwaltograph42.otf?v=1595527371109");
    soundFormats('mp3','ogg');
  mySound = loadSound("https://cdn.glitch.com/d7c94f98-a88e-4708-85f3-ac8a5a2b52ec%2FThere%20s%20a%20Great%20Big%20Beautiful%20Tomorrow%20(From%20The%20Carousel%20of%20Progress).mp3?v=1595531520384");
  
}

//SETUP

function setup() {
let cnv = createCanvas(800, 600);
  cnv.mousePressed(canvasPressed);
  mickeyMouse = loadImage(
    // "https://1.bp.blogspot.com/_OBIL8PqOcIY/SKWa02IeHKI/AAAAAAAAAO8/H4dHrsdw3D8/s200/Walking.png"
"https://cdn.glitch.com/d7c94f98-a88e-4708-85f3-ac8a5a2b52ec%2F580b57fbd9996e24bc43bd2f.png?v=1595522428738"  
  );
  sky = loadImage (
  "https://cdn.glitch.com/d7c94f98-a88e-4708-85f3-ac8a5a2b52ec%2Fdisney1.jpg?v=1595522898449"
  );
  
  house = loadImage (
  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQUneXpZnmYUHpENNV1pPDC3RcAY4-lyvQ3IQ&usqp=CAU"
  );
  bird = new Bird();
  pipes.push(new Pipe());
  score = 0
  
//   song = loadSound("https://cdn.glitch.com/d7c94f98-a88e-4708-85f3-ac8a5a2b52ec%2FMickey%20Mouse%20-%20Steamboat%20Willie%20-%20Whistle.mp3?v=1595529035632")
// song.autoplay(true);
}


//DRAW

function draw() {
  background(0);
  image (sky,0,0,width,height)
  displayScore(); 

  for (var i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();

    if (pipes[i].hits(bird)) {
      console.log('HIT');
    }

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }

  bird.update();
  bird.show();

  if (frameCount % 75 == 0) {
    pipes.push(new Pipe());
  }
   if (bird.y >= height){
      score ++;
    }
  
  // mySound.play();
}


//ACTION

function keyPressed() {
  if (key == ' ') {
    bird.up();
    //console.log("SPACE");
  }
}



//PIPE
function Pipe() {
  this.spacing = 175;
  this.top = random(height / 6, (3 / 4) * height);
  this.bottom = height - (this.top + this.spacing);
  this.x = width;
  this.w = 80;
  this.speed = 6;

  this.highlight = false;

  this.hits = function(bird) {
    if (bird.y < this.top || bird.y > height - this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        this.highlight = true;
        return true;
      }
    }
    this.highlight = false;
    return false;
  };

  this.show = function() {
    fill(255);
    //THIS IS WHERE YOU CHANGE COLOR IF HIT
    if (this.highlight) {
      displayScore();
      // mySound.play();
      // bird.y = height-45;
      // bird.lift = 0;
      // bird.gravity = 0;
      // this.speed = 0;
      // pipes = 2
      fill(255, 0, 0);
    }
    // rect(this.x, 0, this.w, this.top);
    // rect(this.x, height - this.bottom, this.w, this.bottom);
    image(house,this.x, 0, this.w, this.top);
    image(house,this.x, height - this.bottom, this.w, this.bottom);
  };

  this.update = function() {
    this.x -= this.speed;
  };

  this.offscreen = function() {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  };
}



//MICKEY

function Bird() {
  this.y = height / 2;
  this.x = 64;

  this.gravity = 0.7;
  this.lift = -12;
  this.velocity = 0;

  this.show = function() {
    fill(255);
    // ellipse(this.x, this.y, 32, 32);
    image(mickeyMouse, this.x, this.y, 60, 60)
  };

  this.up = function() {
    this.velocity += this.lift;
  };

  this.update = function() {
    this.velocity += this.gravity;
    // this.velocity *= 0.9;
    this.y += this.velocity;

    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }

  };
}

//SCORE
 
function displayScore(){
  fill("yellow")
  textSize(30);
  textFont(fontRegular);
  text(`score: ${score}`,20,40)
}


function canvasPressed(){
  mySound.play();
}