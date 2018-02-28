let canvas = document.querySelector("canvas")
let cx = canvas.getContext("2d");

let step = 25;

let startSnakePosX = 0, startSnakePosY = 0, prevposX, prevposY;

let snakeHead = function(posX, posY) {
cx.fillStyle = "#282833";
cx.fillRect(posX,posY,25,25);
prevposX = posX;
prevposY = posY;
} 
snakeHead(startSnakePosX, startSnakePosY);

let direction = "right";

function directSnake() {
    window.addEventListener("keydown", event => {
        switch (event.keyCode) {
        case 37:
            if (direction != "right")
            direction = "left";
            break;
        case 38:
            if (direction != "down")
            direction = "up";
            break;
         case 39:
            if (direction != "left")
            direction = "right";
            break;
         case 40:
            if (direction != "up")
            direction = "down";
            break;
        }
})};
directSnake();
function moveSnake() {
    directSnake();
    setInterval(function() {
        cx.clearRect(0, 0, canvas.width, canvas.height);
        switch (direction) {
        case "right":
            snakeHead(prevposX+step, prevposY);
            break;
        case "left":
            snakeHead(prevposX-step, prevposY);
            break;
        case "up":
            snakeHead(prevposX, prevposY-step);
            break;
        case "down":
            snakeHead(prevposX, prevposY+step); 
            break;
        }
    }, 150);
};
moveSnake();
 
