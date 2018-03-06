let canvas = document.querySelector("canvas")
let cx = canvas.getContext("2d");

let step = 25;

let startSnakePosX = step, startSnakePosY = step;
let startSnakeLength = 6;
let snakeBodyParts = [];
let snakeLength = startSnakeLength;

let foodX, foodY;

let direction = "right";

let score = 0;

function initSnake() {
    for (let i=0; i<startSnakeLength; i++) {
        snakeBodyParts.push({x: i, y: 0});
    };
    direction = "right";
    score = 0;
};
initSnake();
positionFood();

function drawSnake() {
    cx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i=0; i<snakeBodyParts.length; i++) {
        cx.fillStyle = "#282833";
        cx.fillRect(snakeBodyParts[i].x*step, snakeBodyParts[i].y*step,25,25);
        cx.fillStyle = "#191921";
        cx.fillRect(snakeBodyParts[snakeBodyParts.length-1].x*step,
                   snakeBodyParts[snakeBodyParts.length-1].y*step, 25, 25);
    };
        
    moveSnake();
    checkCollision();
    drawFood();
    cx.font = "15px monospace";
    cx.fillText("Score:"+score, 0, 495)
};



function positionFood() {
    foodX = Math.floor(Math.random()*20);
    foodY = Math.floor(Math.random()*20);
};

function drawFood() {
    cx.fillStyle = "#191921";
    cx.fillRect(foodX*step+8.5, foodY*step, 8, 8)
    cx.fillRect(foodX*step+17, foodY*step+8.5, 8, 8)
    cx.fillRect(foodX*step+8.5, foodY*step+17, 8, 8)
    cx.fillRect(foodX*step, foodY*step+8.5, 8, 8)
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
           drawSnake();
        else;
    }, 150)
};

animateSnake();

function pause() {
    window.addEventListener("keydown", event =>  {
        if (event.keyCode == 32 && paused == true) {
            paused = false;
        }
        else if (event.keyCode == 32 && paused == false) {
            paused = true; 
            cx.font = "30px monospace";
            cx.fillText("Pause",210,250)
        };  
    });
};
pause();

function gameOver() {
    snakeBodyParts = [];
    paused = true;
    cx.clearRect(0, 0, canvas.width, canvas.height);
    cx.font = "30px monospace";
    cx.fillText("Game over", 180, 250);
    cx.font = "20px monospace";
    cx.fillText("Your score: "+score, 180, 290); 
    initSnake();
};
 
function checkCollision() {
let snakeHeadX = snakeBodyParts[snakeBodyParts.length-1].x;
let snakeHeadY = snakeBodyParts[snakeBodyParts.length-1].y;
    if (snakeHeadX<-1 ||
        snakeHeadX>20 ||
        snakeHeadY<-1 ||
        snakeHeadY>20)
        gameOver();
    for (let i=0; i<snakeBodyParts.length-1; i++) {
        if (snakeHeadX == snakeBodyParts[i].x && 
            snakeHeadY == snakeBodyParts[i].y)
            gameOver();
    };
    if (snakeHeadX == foodX && snakeHeadY == foodY) {
        snakeLength++;
        score+=100;
        snakeBodyParts.unshift({x:-1, y:-1});
        positionFood();
    };
};