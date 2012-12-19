/* ************************************* DRAWINGS ****************************** */


var draw = function(){
    //console.log("DRAW?");
    if (gameState === PLAYING_GAME){
        clear();

        timeCounter++;

        if (grabbedFood === 1){
            createNewFood();
            SCORE = SCORE + 10;
            //console.log("Score:"  + SCORE);
            grabbedFood = 0;
            accelaration= accelaration + 0.20;
            //console.log("acce" + accelaration);
        }        

        if (timeCounter > (frameRATE / accelaration)){
        
            if (moveUpFlag === true){
                if (headDir !== 2){
                    headDir = 1;                      
                    //console.log("up");
                }
                moveUpFlag = false;
            } else if (moveDownFlag === true){
                if (headDir !== 1){
                    headDir = 2;
                    //console.log("down");
                }
                moveDownFlag = false;
            } else if (moveLeftFlag === true){
                if (headDir !== 4){
                    headDir = 3;  
                    //console.log("left");
                }
                moveLeftFlag = false;
            } else if (moveRightFlag === true){
                if (headDir != 3){
                    headDir = 4;
                    //console.log("right");
                }
                moveRightFlag = false;
            }  
        
            moveSnake(headDir);
            //printBoard();
            timeCounter = 0;
        }

        drawGraphics();

        if (gameEnded === true){
            gameState = GAME_OVER;
        }

    }else if (gameState === PAUSED){
        pauseGame();

    }else if (gameState === GAME_OVER){
        endGame();

    }else if (gameState === SPLASH){
        clear();
        splashScreen();
    }
};


var pauseGame = function(){
    //console.log("PAUSEGAME");
    clearInterval(intervalId);

    var w = 150;
    var h = 100;
        
    canvas.lineWidth = 1;
    canvas.strokeStyle = 'rgb(0, 170, 255)';
    canvas.strokeRect(pixelWidth/2 - w/2, pixelHeight/2 - h/2, w, h);

    canvas.fillStyle = 'rgb(0, 0, 255)';
    canvas.fillRect(pixelWidth/2 - w/2, pixelHeight/2 - h/2, w, h);

                        
    canvas.font = '19pt Calibri';
    canvas.fillStyle = 'rgb(0, 170, 255)';
    canvas.fillText("Game Paused", pixelWidth/2 -70 , pixelHeight/2 - 15);
                                
    canvas.font = '16pt Calibri';
    canvas.fillText("Hit the P key", pixelWidth/2 -55 , pixelHeight/2 + 15);
    canvas.font = '16pt Calibri';
    canvas.fillText("to unpause", pixelWidth/2 -55 , pixelHeight/2 + 35);
};




var endGame = function(){
    //console.log("ENDGAME");

    var w = 150;
    var h = 100;

    canvas.strokeStyle = 'rgb(0, 170, 255)';
    canvas.strokeRect(pixelWidth/2 - w/2, pixelHeight/2 - h/2, w, h);

    canvas.fillStyle = 'rgb(0, 0, 255)';
    canvas.fillRect(pixelWidth/2 - w/2, pixelHeight/2 - h/2, w, h);


    canvas.font = '19pt Calibri';
    canvas.fillStyle = 'rgb(0, 170, 255)';
    canvas.fillText("Game Over!", pixelWidth/2 -63 , pixelHeight/2 - 25);

    canvas.font = '14pt Calibri';
    canvas.fillText("Score: "+SCORE, pixelWidth/2 - 55 , pixelHeight/2  );

    canvas.font = '12pt Calibri';
    canvas.fillText("Hit the Spacebar", pixelWidth/2 -55 , pixelHeight/2 + 25);
    canvas.font = '12pt Calibri';
    canvas.fillText("to play again", pixelWidth/2 -40 , pixelHeight/2 + 40);
};



var splashScreen = function(){
    //console.log("SPLASHSCREEN");
    canvas.drawImage(splashImg, 0, 0, splashImg.width, splashImg.height);
};



var drawGraphics = function(){
    canvas.lineWidth = 3;
   
        //snake and food
    for (var i = 0; i < boardHeight; i++){
        for (var j = 0; j < boardWidth; j++){
            
            if (gameboard[i][j] === 1){
                //snake block outline
                canvas.strokeStyle = 'rgb(0, 170, 255)';
                canvas.strokeRect(j * 20, i * 20, 20, 20 );

                //snake outline
                canvas.fillStyle = 'rgb(0, 0, 255)';
                canvas.fillRect(j * 20, i * 20, 20, 20 );
                //console.log("x:"+j+" y:"+i);
            }else if (gameboard[i][j] === 5){
                
                canvas.lineWidth = 3;
                //food block outline
                canvas.strokeStyle = 'rgb(0, 170, 255)';
                canvas.strokeRect(j * 20, i * 20, 20, 20 );

                //food block
                canvas.fillStyle = 'rgb(0, 0, 255)';
                canvas.fillRect(j * 20, i * 20, 20, 20 );

                //food outline
                canvas.strokeStyle = 'rgb(0, 170, 255)';
                canvas.strokeRect(j * 20+5, i * 20+5, 10, 10 );

            }
        }
    }

    //scoreboard outline
    canvas.strokeStyle = 'rgb(0, 170, 255)';
    canvas.strokeRect(0, 400, 500, 30);

    //scoreboard background
    canvas.fillStyle = 'rgb(0, 0, 255)';
    canvas.fillRect(0, 400, 500, 30);
   
    //score
    canvas.fillStyle = 'rgb(0, 170, 225)';
    canvas.font = '15pt Calibri';
    canvas.fillText("Score: "+SCORE, 6 , 419);


};


/**
 * * Clears the canvas for the next iteration of the game loop
 * */
var clear = function () {
    //draws the background
    canvas.fillStyle="black";
    canvas.fillRect(1,1,pixelWidth-2,pixelHeight+25-2);
};

