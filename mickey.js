// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, color, collideRectRect, colorMode, createCanvas, fill, frameRate, keyCode, height,
 *    loop, noFill, noLoop, noStroke, random, rect, round, stroke, sqrt, text, width
 *    UP_ARROW, soundFormats, textSize,textStyle, loadSound, loadFont, textFont, fontSize, square, backgroundImage,image, loadImage, frameCount, key,println, keyPressed, DOWN_ARROW, LEFT_ARROW, ellipse, RIGHT_ARROW
 */

// var bird;
// var pipes = [];
let spongebob,song, mySound, createAudio, fontRegular, house,mickeyMouse, score, sky;


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