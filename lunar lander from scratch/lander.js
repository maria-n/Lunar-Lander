var canvas = document.getElementById("myCanvas");
 
var context = canvas.getContext('2d');
context.canvas.width = window.innerWidth; // setting the Canvas Size as big as your client window
context.canvas.height = window.innerHeight; // setting the Canvas Size as big as your client window
var x_speed = 0; // x-direction of movement
var y_speed = 0; // y direction of movement
var playerY = 50; // y-coodinate/ middle of the ball/ Object/ Lander
var playerX = 50; // x-coordinate/ middle of the ball/ Object/ Lander
var platformWidth = 100; // width of the Platform
var platformHeight = 20; // height of the Platform
var platformX = canvas.width - platformWidth; // x-coordinate of the Platform
var platformY = canvas.height - platformHeight; // y-coordinate of the Platform
var radius = 15; // radius of the ball/ Object/ Lander
var left = false;
var right = false;
var up = false;
var down = false;
var reset = false;
var gravity = 0.50;
var acc = 0.95; // acceleration of the Object, when moving
var fuel = 51;
var gameState = 0; // 0 = running, 1 = lost, 2 = win;
var end;
var lander;
var platform;


// End Screen
function End() {
    if (gameState === 1 || gravity > 0.5) {
        $("#text").text("YOU CRASHED! Press Enter to Reload the Game.");
    } else if (gameState === 2) {
        $("#text").text("YOU WON! Press Enter to Reload the Game.");
    }
}

// Checking for Winning or Loosing Conditions
function checkGameState() {
    if (playerY + y_speed > platformY && playerX > platformX + radius && playerX < canvas.width) {
        gameState = 2;
        end = new End();
    } else if (playerY > canvas.height) {
        gameState = 1;
        end = new End();
    } else {
        gameState = 0;
    }
}

// the Object/ Lander/ Thing you want to move onto the Platform
function Lander() {
    // drawing in Canvas
    context.beginPath();
    context.fillStyle = "#000000";
    context.arc(playerX, playerY, radius, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();

}

// The Platform you want to move the Object onto
function Platform() {
    // Drawing in Canvas
    context.beginPath();
    context.fillStyle = "#55995";
    context.rect(platformX, platformY, platformWidth, platformHeight);
    context.closePath();
    context.fill();
}

// updating the canvas/ Movement of the Lander
function update() {
    // if Game is running/ didn't end
    if (gameState === 0) {
        $("#text").text("Control the Object with left/ right/ up/ down on keyboard. You have " + fuel + " fuel.");
        // Check Winning/ Loosing Conditions before moving
        checkGameState();
        if (left) {x_speed--; }
        if (right) {x_speed++; }
        
        // Implementing fuel and loosing fuel
        if (up) {
            y_speed--;
            fuel--;
            // What happens, when there is no fuel left
            if (fuel <= 0.5) {
                fuel = 0;
                gravity = 1.0;
                up = false;
            }
        }
        
        // implementing Gravity
        if (!up) {
            y_speed++;
            y_speed *= gravity;
        }
        
        // Clearing Canvas, removing anything rendered before
        context.clearRect(0, 0, canvas.width, canvas.height);
        lander = new Lander();
        platform = new Platform();
        
        // Movement and Accleration
        playerX += x_speed;
        playerY += y_speed;
        x_speed *= acc;
        y_speed *= acc;
    }
}

// Checking for Key Press
document.onkeydown = function (event) {
    var key_pressed;
    // Checking keyCodes of the keys pressed
    if (event === null) {key_pressed = window.event.keyCode;
        } else {key_pressed = event.keyCode; }
    switch (key_pressed) {
    case 13:
        reset = true;
        break;
    case 37:
        left = true;
        break;
    case 38:
        up = true;
        break;
    case 39:
        right = true;
        break;
    case 40:
        down = true;
        break;
    }
    
    // Reseting Game/ Reloading the website, still a bit clunky
    if (reset) {
        document.location.reload();
    }
};
 
// Checking for Key Release
document.onkeyup = function (event) {
    var key_pressed;
    if (event === null) {key_pressed = window.event.keyCode;
        } else {key_pressed = event.keyCode; }
    
    switch (key_pressed) {
    case 13:
        reset = false;
        break;
    case 37:
        left = false;
        break;
    case 38:
        up = false;
        break;
    case 39:
        right = false;
        break;
    case 40:
        down = false;
        break;
    }
};

// what should get updated and Framerate
setInterval(update, 30);