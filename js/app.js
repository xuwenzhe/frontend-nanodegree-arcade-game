// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // enemy coordinate (x,y)
    this.x = x;
    this.y = y;
    // enemy moving speed
    this.speed = Math.floor(100 + Math.random()*100);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x <= 505) this.x += this.speed * dt;
    else this.x = -10;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
	this.sprite = 'images/char-boy.png'
	this.x = 200;
	this.y = 400;
};

// reset player's location
Player.prototype.reset = function() {
	this.x = 200;
	this.y = 400;
};
// Update the player's position based on keyboard input
// if collision with an enemy, reset player's position
Player.prototype.update = function(dt) {
	if (this.pressedKey == 'left' && this.x > 0) this.x -= 101;
	if (this.pressedKey == 'right' && this.y > 0) this.x += 101;
	if (this.pressedKey == 'up' && this.y > 0) this.y -= 83;
	if (this.pressedKey == 'down' && this.y < 400) this.y += 83;
	// reset the pressedKey
	this.pressedKey = null;
	if (this.y < 0) this.reset();

	// test collision with Enemy
	for (let i = 0; i < 3; i++) {
		if (this.x >= allEnemies[i].x - 25 && this.x <= allEnemies[i].x + 25) {
			if (this.y >= allEnemies[i].y - 25 && this.y <= allEnemies[i].y + 25) {
				this.reset();
			}
		}
	}
};
// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(command) {
	this.pressedKey = command;
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player();
var allEnemies = [];
allEnemies.push(new Enemy(0, 50));
allEnemies.push(new Enemy(0, 140));
allEnemies.push(new Enemy(0, 230));




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
