function Churro() {
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
        // gameOverSound.play();
      // mySound.play() = false;
      // gameIsOver = true;
      // mySound.play();
      // bird.y = height-45;
      // bird.lift = 0;
      // bird.gravity = 0;
      // this.speed = 0;
      gameIsOver = true;
      fill(255, 0, 0);
    }
    // rect(this.x, 0, this.w, this.top);
    // rect(this.x, height - this.bottom, this.w, this.bottom);
  image(house,this.x, 0, this.w, this.top);
  image(house,this.x, height - this.bottom, this.w, this.bottom);
    
    if (bird.y > this.top && bird.y < this.bottom && bird.x > this.x && bird.x < this.w){
      score++
    }
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