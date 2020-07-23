// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, color, collideRectRect, colorMode, createCanvas, fill, frameRate, keyCode, height,
 *    loop, noFill, noLoop, noStroke, random, rect, round, stroke, sqrt, text, width
 *    UP_ARROW, square, image, loadImage, frameCount, key,println, keyPressed, DOWN_ARROW, LEFT_ARROW, ellipse, RIGHT_ARROW
 */

var bird;
var pipes = [];
let spongebob,house, sky;

function setup() {
  createCanvas(640, 480);
  spongebob = loadImage(
    "https://1.bp.blogspot.com/_OBIL8PqOcIY/SKWa02IeHKI/AAAAAAAAAO8/H4dHrsdw3D8/s200/Walking.png"
// "olaf.jpg"  
  );
  sky = loadImage (
  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTaHADyEqjR25xVuWh-uzFUidhKnhXT6PJB0w&usqp=CAU"
  );
  
  house = loadImage (
  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQUneXpZnmYUHpENNV1pPDC3RcAY4-lyvQ3IQ&usqp=CAU"
  );
  bird = new Bird();
  pipes.push(new Pipe());
}

function draw() {
  background(0);

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
}

function keyPressed() {
  if (key == ' ') {
    bird.up();
    //console.log("SPACE");
  }
}

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
      fill(255, 0, 0);
    }
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height - this.bottom, this.w, this.bottom);
    // image(sky,this.x, 0, this.w, this.top);
    // image(sky,this.x, height - this.bottom, this.w, this.bottom);
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

function Bird() {
  this.y = height / 2;
  this.x = 64;

  this.gravity = 0.7;
  this.lift = -12;
  this.velocity = 0;

  this.show = function() {
    fill(255);
    // ellipse(this.x, this.y, 32, 32);
    image(spongebob, this.x, this.y, 45, 45)
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