//TODO: pauseGame
//TODO: endGame
/* ********************************** Snake by Gal **************************** */

var intervalId;
var canvas;
var context;

var SPLASH = 0;
var PLAYING_GAME = 1;
var PAUSED = 2;
var GAME_OVER = 3;
var GAME_WON = 8;

var gameState = SPLASH;

var pixelHeight = 400; //WIDTH
var pixelWidth = 500; //HEIGHT

var boardWidth = 25;
var boardHeight = 20;
var gameboard;

var headXPos = 15;
var headYPos = 10;
var headDir = 3;  //direction: 1 = up, 2 = down, 3 = left, 4 = right

var moveRightFlag = false;
var moveLeftFlag = false;
var moveDownFlag = false;
var moveUpFlag = false;

var snakeHead;

var frameRATE = 30;
var timeCounter = 0;
var accelaration = 1.5;

var food;
var foodX = 12;
var foodY = 10;
var grabbedFood = 0;

var SCORE = 0;
var gameEnded = false;

var splashImg = new Image();
splashImg.src = 'splashScreen.jpg';

var FoodBlock = function(x, y){
    this.xpos = x;
    this.ypos = y;
};



var SnakeBlock = function(x, y, nextSnake){
    this.xpos = x;
    this.ypos = y;
    this.next = nextSnake;
};



var setup = function(){
    //console.log("SETUP");
    context = document.getElementById('canvas');
    canvas = context.getContext('2d');

    gameState = SPLASH;
    splashScreen();
    initializeGame();
};



var initGameboard = function(cols, rows){
    //console.log("INITGAMEBOARD");
    gameboard = new Array(cols);
    
    for (var x = 0; x < cols; x++){
        gameboard[x] = new Array(rows);
    }
    
    for (var i = 0; i < cols; i++){
        for (var j = 0; j < rows; j++){
            gameboard[i][j] = 0;
        }
    }
};


var initializeGame = function(){
    //console.log("INITIALIZEGAME");
    pixelHeight = 400; //WIDTH
    pixelWidth = 500; //HEIGHT

    boardWidth = 25;
    boardHeight = 20;
    gameboard = null;

    headXPos = 15;
    headYPos = 10;
    headDir = 3;  //direction: 1 = up, 2 = down, 3 = left, 4 = right

    moveRightFlag = false;
    moveLeftFlag = false;
    moveDownFlag = false;
    moveUpFlag = false;

    snakeHead = null;

    frameRATE = 30;
    timeCounter = 0;
    accelaration = 1.5;

    food = null;
    foodX = 12;
    foodY = 10;
    grabbedFood = 0;

    SCORE = 0;
    gameEnded = false;

    initGameboard(boardHeight, boardWidth);

    snakeHead = new SnakeBlock(headXPos, headYPos, null);
    food = new FoodBlock(foodX, foodY);

    createNewFood();

    addSnakeBlockOLD();
    addSnakeBlockOLD();

    placeSnakeBlocks();
    printLinkedList();

};



var printLinkedList = function(){
    //console.log("printLinkedList");
    var currentNode = snakeHead;
    while (currentNode.next !== null){
        //console.log("x:"+currentNode.xpos+" y:"+currentNode.ypos);
        currentNode = currentNode.next;
    }
    if (currentNode.next === null){
        //console.log("x:"+currentNode.xpos+" y:"+currentNode.ypos);
    }

};



var eraseSnakeLocation = function(){
    //console.log("ERASESNAKELOCATION");
    var currentNode = snakeHead;
    while (currentNode !== null){
        gameboard[currentNode.ypos][currentNode.xpos] = 0;
        currentNode = currentNode.next;
    }
};



var moveSnake = function(direction){
    //console.log("moveSnake");
    var tempX = headXPos;
    var tempY = headYPos;

    var tempX2;
    var tempY2;

    eraseSnakeLocation();

    //direction: 1 = up, 2 = down, 3 = left, 4 = right
    if (direction === 1){
        headYPos = headYPos - 1;
           
    } else if (direction === 2){
        headYPos = headYPos + 1;
    } else if (direction === 3){
        headXPos = headXPos - 1;
    } else if (direction === 4){
        headXPos = headXPos + 1;
    } 


    if (headXPos >= 25 ){
        //console.log("HIT right wall");
        headXPos = 0;
    } 
    
    if (headXPos < 0 ){
        //console.log("HIT left wall");
        headXPos = 24;
    }
    
    if (headYPos < 0 ){
        //console.log("HIT top wall");
        headYPos = 19;
    }

    if (headYPos >= 20 ){
        //console.log("HIT bottom wall");
        headYPos = 0;
    }
                                           
    if (gameboard[headYPos][headXPos] === 5){
        //console.log("grabbed food!");
        grabbedFood = 1;
        gameboard[headYPos][headXPos] = 0;
        addSnakeBlockOLD();
    }

    var currentNode = snakeHead;
    var prevNode = snakeHead;
    while(currentNode.next !== null){
        //console.log("xy:" + currentNode.xpos + ", " + currentNode.ypos);
        prevNode = currentNode;
        currentNode = currentNode.next;
    }

    if (currentNode.xpos >= 25 ){
        //console.log("block created hit right wall");
        currentNode.xpos = 0;
    }

    if (currentNode.xpos < 0 ){
        //console.log("block created hit left wall");
        currentNode.xpos = 24;
    }

    if (currentNode.ypos < 0 ){
        //console.log("block created hit top wall");
        currentNode.ypos = 19;
    }
    if (currentNode.ypos >= 20 ){
        //console.log("blocl created hit bottom wall");
        currentNode.ypos = 0;
    }

    gameboard[currentNode.ypos][currentNode.xpos] = 0;
    prevNode.next = null;

    tempX = snakeHead.xpos;
    tempY = snakeHead.ypos;
    var newNode = new SnakeBlock(tempX, tempY, snakeHead.next);
    snakeHead.next = newNode;

    snakeHead.xpos = headXPos;
    snakeHead.ypos = headYPos;

    placeSnakeBlocks();

    return 1; 
};



var addSnakeBlock = function(dir){
    //console.log("addSnakeBlock");
    var currentNode = snakeHead;
    var i = 0;

    while (currentNode.next !== null){
        currentNode = currentNode.next;
        i++;
    }

    var newSnakeNode;

    if (dir === 1){
        newSnakeNode = new SnakeBlock(currentNode.xpos, currentNode.ypos - i, null);
    } else if (dir === 2){
        newSnakeNode = new SnakeBlock(currentNode.xpos, currentNode.ypos + i, null);
    } else if (dir === 3){
        newSnakeNode = new SnakeBlock(currentNode.xpos- i, currentNode.ypos, null);
    } else {
        newSnakeNode = new SnakeBlock(currentNode.xpos+ i, currentNode.ypos, null);
    }
    
    currentNode.next = newSnakeNode;

    //console.log("new block added");

};



var addSnakeBlockOLD = function(){
    //console.log("addSnakeBlockOLD");
    var currentNode = snakeHead;
    while (currentNode.next !== null){
        currentNode = currentNode.next;
    }

    var newSnakeNode = new SnakeBlock(currentNode.xpos+1, currentNode.ypos, null);

    currentNode.next = newSnakeNode;
    //console.log("new block added");
};



var placeSnakeBlocks = function(){
    //console.log("placeSnakeBlocks");
    var currentNode = snakeHead;
    while (currentNode.next !== null){
        if (gameboard[currentNode.ypos][currentNode.xpos] === 1){
            gameEnded = true;
            //console.log("stepped on a snake");
        } else if (gameboard[currentNode.ypos][currentNode.xpos] === 5){
            // earn a point, increase speed, add a node to snake list
            // not sure about this part
            //console.log("handle this case@@");
        }else {
            gameboard[currentNode.ypos][currentNode.xpos] = 1;
        }

        currentNode = currentNode.next;
    }

    if (gameboard[currentNode.ypos][currentNode.xpos] === 1){
        gameEnded = true;
        //console.log("stepped on a snake");
    } else if (gameboard[currentNode.ypos][currentNode.xpos] === 5){
        // earn a point, increase speed, add a node to snake list
        // not sure about this part
        //console.log("handle this case@@");
    }else {
        gameboard[currentNode.ypos][currentNode.xpos] = 1;
    }

    return 1;
};


var placeFoodBlock = function(){
    //console.log("PLACEFOODBLOCKS");

    if (gameboard[food.ypos][food.xpos] === 0){
        gameboard[food.ypos][food.xpos] = 5;
        return 1;
    }
    return 0;
};



var createNewFood = function(){
    //console.log("CREATENEWFOOD");
    var goodFoodPos;

    do {
        foodX = Math.floor(Math.random()*25);
        foodY = Math.floor(Math.random()*20);
        food.xpos = foodX;
        food.ypos = foodY;
        goodFoodPos = placeFoodBlock();
    } while (goodFoodPos !== 1);
};



