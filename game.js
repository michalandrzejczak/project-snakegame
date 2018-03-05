let canvas = document.querySelector("canvas")
let cx = canvas.getContext("2d");

let step = 25;

let startSnakePosX = step, startSnakePosY = step, prevposX, prevposY;
let startSnakeLength = 6;
let snakeBodyParts = [];
let snakeLength = startSnakeLength;

let direction = "right";

function initSnake() {
    for (let i=0; i<startSnakeLength; i++) {
        snakeBodyParts.push({x: i, y: 0});
    };
};
initSnake();

function drawSnake() {
    cx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i=0; i<snakeBodyParts.length; i++) {
        cx.fillStyle = "#282833";
        cx.fillRect(snakeBodyParts[i].x*step, snakeBodyParts[i].y*step,25,25);
        cx.fillStyle = "#191921";
        cx.fillRect(snakeBodyParts[snakeBodyParts.length-1].x*step,
                   snakeBodyParts[snakeBodyParts.length-1].y*step, 25,25);
    };
        
    moveSnake();  
};


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
        }})
};

function moveSnake() {
    let posX = snakeBodyParts[snakeBodyParts.length-1].x;
    let posY = snakeBodyParts[snakeBodyParts.length-1].y;
    let prevposX = posX, prevposY = posY;
        switch (direction) {
        case "right":
            snakeBodyParts[snakeBodyParts.length-1].x++;
            break;
        case "left":
            snakeBodyParts[snakeBodyParts.length-1].x--;
            break;
        case "up":
            snakeBodyParts[snakeBodyParts.length-1].y--;
            break;
        case "down":
            snakeBodyParts[snakeBodyParts.length-1].y++;
            break;
        };
    for (let i=snakeBodyParts.length-2; i>=0; i--) {
        posX = snakeBodyParts[i].x;
        posY = snakeBodyParts[i].y;
        snakeBodyParts[i].x = prevposX;
        snakeBodyParts[i].y = prevposY;
        prevposX = posX;
        prevposY = posY;
    };
};
let paused = true;

function animateSnake() {
    directSnake();
    
    setInterval(function() {
        if (paused == false) 
        drawSnake()
        else;
    }, 150)
};

animateSnake();

function pause() {
    window.addEventListener("keydown", event =>  {
        if (event.keyCode == 32 && paused == true) {paused = false;}
        else if (event.keyCode == 32 && paused == false) {paused = true;};  
    });
};
pause();
 
