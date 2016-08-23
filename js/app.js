// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.speed = Math.random() * 500;
    this.startPosition = -102;
    this.endPosition = 607;
    this.width = 101;
    this.height = 171;
    this.enemyLines = [60, 140, 220];  // Lines available for enemy (stone rows)
    this.reset();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
  this.x += this.speed * dt;

  if (this.x > this.endPosition) {  // Check and/or reset enemy to start from end position
    this.reset();
  }
};

// Choose random line to start movement
Enemy.prototype.getRandomLine = function() {
  return this.enemyLines[Math.floor(this.enemyLines.length * Math.random())];
};

Enemy.prototype.reset = function() {
  this.x = this.startPosition;
  this.y = this.getRandomLine();
  this.speed = Math.floor(Math.random() * 700);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// Now write your own player class
var Player = function() {
  this.sprite = 'images/char-horn-girl.png';
  this.x = 200;
  this.y = 380;
  this.width = 101;
  this.height = 171;
  this.topMargin = -20;
  this.bottomMargin = 380;
  this.leftMargin = -2;
  this.rightMargin = 402;
  this.score = 0;
};

// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.checkCollisions = function() {
  // If player and enemy are on the same line
  if (this.y >= 60 && this.y <= 220) {
    var self = this;
    allEnemies.forEach(function(enemy) {
      // If enemy and player are on the same line
      if (enemy.y === self.y) {
        // If enemy left and right borders match players
        if (enemy.x >= self.x - 80 && enemy.x <= self.x + 80) {
            self.reset();
        }
      }
    });
  }
};

Player.prototype.update = function(dt) {
  document.getElementById('score').innerHTML = "Score: " + this.score;
  if (this.y <= this.topMargin) {
    this.score += 1;
    this.reset();
  }
};

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
  if (key === 'up') {
    if (this.y - 80 < this.topMargin) {
      this.y -= 0;
    } else {
      this.y -= 80;
    }
  } else if (key === 'down') {
    if (this.y + 80 > this.bottomMargin) {
      this.y += 0;
    } else {
      this.y += 80;
    }
  } else if (key === 'right') {
    if (this.x + 101 > this.rightMargin) {
      this.x += 0;
    } else {
      this.x += 101;
    }
  } else if (key === 'left') {
    if (this.x - 101 < this.leftMargin) {
      this.x -= 0;
    } else {
      this.x -= 101;
    }
  }
};

Player.prototype.reset = function() {
  this.x = 200;
  this.y = 380;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy_1 = new Enemy();
var enemy_2 = new Enemy();
var enemy_3 = new Enemy();
var allEnemies = [enemy_1, enemy_2, enemy_3];

var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
