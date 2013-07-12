import processing.core.*; 
import processing.xml.*; 

import java.applet.*; 
import java.awt.Dimension; 
import java.awt.Frame; 
import java.awt.event.MouseEvent; 
import java.awt.event.KeyEvent; 
import java.awt.event.FocusEvent; 
import java.awt.Image; 
import java.io.*; 
import java.net.*; 
import java.text.*; 
import java.util.*; 
import java.util.zip.*; 
import java.util.regex.*; 

public class snake005 extends PApplet {

/* ***************************** Snake by Gal ******************* */
PFont fontA;

PImage splash;
int splashOn = 1;

int pixelHeight = 400;
int pixelWidth = 500;

int boardWidth = 25;
int boardHeight = 20;
int[][] gameboard = new int[boardHeight][boardWidth];

int headXPos = 15;
int headYPos = 10;
int headDir = 3;  //direction: 1 = up, 2 = down, 3 = left, 4 = right


//move in that direction if 1, do not if 0
int moveRightFlag = 0;
int moveLeftFlag = 0;
int moveDownFlag = 0;
int moveUpFlag = 0;

SnakeBlock snakeHead;

float frameRATE = 30;
float timeCounter = 0;
float accelaration = 1.5f;

FoodBlock food;
int foodX = 12;
int foodY = 10;
int grabbedFood = 0;

int SCORE = 0;
int gameEnded = 0;

int levelType = 0; // 0 = no obstacle, 1 = X mode, 2 = V mode

public void setup(){
  frameRate(PApplet.parseInt(frameRATE));
  size(500, 420);

  initializeGame();
  fontA = loadFont("Ziggurat-HTF-Black-32.vlw");

  splash = new PImage();
  splash = loadImage("data/splashScreen.jpg");


  /*
  addSnakeBlock(headDir);
   addSnakeBlock(headDir);
   */

  //printBoard();  

  //printLinkedList();
}


public void draw(){
  if (splashOn == 1){
    splashScreen();
    splashOn = 0; 
  }
  else{ 

    timeCounter++;

    if (grabbedFood == 1){
      createNewFood();
      SCORE = SCORE + 10;
      println("Score:"  + SCORE);
      grabbedFood = 0;
      //addSnakeBlockOLD();
      accelaration= accelaration + 0.25f;
      println("acce" + accelaration);
    }

    if (timeCounter > (frameRATE / accelaration)){

      if (moveUpFlag == 1){
        if (headDir != 2){
          headDir = 1;

          println("up");
        }
        moveUpFlag = 0;
      }
      else if (moveDownFlag == 1){
        if (headDir != 1){
          headDir = 2;

          println("down");
        }
        moveDownFlag = 0;
      }
      else if (moveLeftFlag == 1){
        if (headDir != 4){
          headDir = 3;

          println("left");
        }
        moveLeftFlag = 0;
      }
      else if (moveRightFlag == 1){
        if (headDir != 3){
          headDir = 4;

          println("right");
        }
        moveRightFlag = 0;
      }  

      moveSnake(headDir);
      printBoard();
      timeCounter = 0;
    }   

    drawGraphics();
    if (gameEnded == 1){
      endGame();   
    }
  }
}


public void printLinkedList(){
  SnakeBlock currentNode = snakeHead; 
  while (currentNode.next != null){
    println("x:"+currentNode.xpos + " y:" + currentNode.ypos);

    currentNode = currentNode.next;
  }
  if (currentNode.next == null){
    println("x:"+currentNode.xpos + " y:" + currentNode.ypos);
  }

}



public void eraseSnakeLocation(){
  SnakeBlock currentNode = snakeHead; 
  while (currentNode != null){
    gameboard[currentNode.ypos][currentNode.xpos] = 0;
    currentNode = currentNode.next;
  }
}


//move the snake in a given direction by traversing the linked list
//and changing the coordinates each node represents
public int moveSnake(int direction){
  int tempX = headXPos;
  int tempY = headYPos;

  int tempX2;
  int tempY2;

  eraseSnakeLocation();

  //direction: 1 = up, 2 = down, 3 = left, 4 = right
  if (direction == 1){
    headYPos = headYPos - 1;

  }
  else if (direction == 2){
    headYPos = headYPos + 1;

  }
  else if (direction == 3){
    headXPos = headXPos - 1;

  }
  else if (direction == 4){
    headXPos = headXPos + 1;

  }


  if (headXPos >= 25 ){
    println("HIT right wall");
    headXPos = 0;
    //return 0;
  }
  if (headXPos < 0 ){
    println("HIT left wall");
    headXPos = 24;
    //return 0;
  }
  if (headYPos < 0 ){
    println("HIT top wall");
    headYPos = 19;
    //return 0;
  }
  if (headYPos >= 20 ){
    println("HIT bottom wall");
    headYPos = 0;
    //return 0;
  }



  if (gameboard[headYPos][headXPos] == 5){
    println("grabbed food!");
    grabbedFood = 1;
    gameboard[headYPos][headXPos] = 0;
    addSnakeBlockOLD();
  }

  SnakeBlock currentNode = snakeHead;
  SnakeBlock prevNode = snakeHead;
  while(currentNode.next != null){
    println("xy:" + currentNode.xpos + ", " + currentNode.ypos);
    prevNode = currentNode;
    currentNode = currentNode.next;
  }


  if (currentNode.xpos >= 25 ){
    println("block created hit right wall");
    currentNode.xpos = 0;
  }
  if (currentNode.xpos < 0 ){
    println("block created hit left wall");
    currentNode.xpos = 24;
  }
  if (currentNode.ypos < 0 ){
    println("block created hit top wall");
    currentNode.ypos = 19;
  }
  if (currentNode.ypos >= 20 ){
    println("blocl created hit bottom wall");
    currentNode.ypos = 0;
  }


  gameboard[currentNode.ypos][currentNode.xpos] = 0;
  prevNode.next = null;

  tempX = snakeHead.xpos;
  tempY = snakeHead.ypos;
  SnakeBlock newNode = new SnakeBlock(tempX, tempY, snakeHead.next);
  snakeHead.next = newNode;

  snakeHead.xpos = headXPos;
  snakeHead.ypos = headYPos;


  /*
  tempX = snakeHead.xpos;
   tempY = snakeHead.ypos;
   gameboard[tempY][tempX] = 0;
   */
  //snakeHead.xpos = headXPos;
  //snakeHead.ypos = headYPos;
  /*
  println("headX:" + headXPos + " headY:" + headYPos);
   SnakeBlock currentNode = snakeHead;
   
   while(currentNode != null){
   tempX2 = currentNode.xpos;
   tempY2 = currentNode.ypos;
   
   currentNode.xpos = tempX;
   currentNode.ypos = tempY;
   
   tempX = tempX2;
   tempY = tempY2;
   currentNode = currentNode.next; 
   println("tempx:" + tempX + " tempY:" + tempY);
   }
   
   */
  //gameboard[tempY][tempX] = 0;
  //printLinkedList();

  placeSnakeBlocks();

  return 1; 
}


//adds another node to the end of the linked list
public void addSnakeBlock(int dir){
  SnakeBlock currentNode = snakeHead;
  int i = 0;
  while (currentNode.next != null){
    currentNode = currentNode.next;
    i++;
  }


  SnakeBlock newSnakeNode;

  if (dir == 1){
    newSnakeNode = new SnakeBlock(currentNode.xpos, currentNode.ypos - i, null);
  }
  else if (dir == 2){
    newSnakeNode = new SnakeBlock(currentNode.xpos, currentNode.ypos + i, null);
  }
  else if (dir == 3){
    newSnakeNode = new SnakeBlock(currentNode.xpos- i, currentNode.ypos, null);
  }
  else{
    newSnakeNode = new SnakeBlock(currentNode.xpos+ i, currentNode.ypos, null);
  }
  currentNode.next = newSnakeNode;

  println("new block added");
}


public void addSnakeBlockOLD(){
  SnakeBlock currentNode = snakeHead;
  while (currentNode.next != null){
    currentNode = currentNode.next;
  }

  SnakeBlock newSnakeNode = new SnakeBlock(currentNode.xpos+1, currentNode.ypos, null);

  currentNode.next = newSnakeNode;
  println("new block added");
}

//traverses the linked list of snakeblocks and adds them to the gameboard array
public int placeSnakeBlocks(){
  SnakeBlock currentNode = snakeHead;


  while (currentNode != null){
    if (gameboard[currentNode.ypos][currentNode.xpos] == 1){
      //println("GAME OVER");
      gameEnded = 1;
      //noLoop(); //remove for gameover method
    }
    else if (gameboard[currentNode.ypos][currentNode.xpos] == 5){
      //earn a point, increase speed, add a node to the snake list
    }
    else{
      gameboard[currentNode.ypos][currentNode.xpos] = 1;
    }
    currentNode = currentNode.next;
  }


  return 1;
}


public int placeFoodBlock(){
  if (gameboard[food.ypos][ food.xpos] == 0){
    gameboard[food.ypos][ food.xpos] = 5;
    return 1;
  } 

  return 0;
}


public void createNewFood(){

  int goodFoodPos;

  do {
    foodX = PApplet.parseInt(random(25));
    foodY = PApplet.parseInt(random(20));
    food.xpos = foodX;
    food.ypos = foodY;
    goodFoodPos =  placeFoodBlock();
  }
  while (goodFoodPos != 1);
}


//prints out a text representation of the gameboard array
public void printBoard(){
  println();
  for (int i = 0; i < boardHeight; i++){
    for (int j =0; j < boardWidth; j++){
      print(gameboard[i][j]);
    } 
    println();
  }

}


//initialize game
public void initializeGame(){

  headXPos = 15;
  headYPos = 10;
  headDir = 3;  //direction: 1 = up, 2 = down, 3 = left, 4 = right


  //move in that direction if 1, do not if 0
  moveRightFlag = 0;
  moveLeftFlag = 0;
  moveDownFlag = 0;
  moveUpFlag = 0;

  frameRATE = 30;
  timeCounter = 0;
  accelaration = 1.5f;

  foodX = 12;
  foodY = 10;
  grabbedFood = 0;

  SCORE = 0;

  gameEnded = 0;

  background(0);
  //fill(0, 30, 100);
  stroke(0,100,225);


  for (int i = 0; i < boardHeight; i++){
    for (int j =0; j < boardWidth; j++){
      gameboard[i][j] = 0;
    } 
  }

  snakeHead = new SnakeBlock(headXPos, headYPos, null);

  food = new FoodBlock(foodX, foodY);

  createNewFood();

  addSnakeBlockOLD();
  addSnakeBlockOLD();

  placeFoodBlock();
  placeSnakeBlocks();

  loop();
}


//end game method
public void endGame(){

  print("GAME OVER. SCORE:" + SCORE);
  noLoop();
  stroke(0,170,255);
  fill(0,0,255);
  rect(175, 125, 165, 150);


  fill(0,170,255);
  textFont(fontA, 20);
  text("Game Over", 185, 160);
  textFont(fontA, 15);
  text("Hit the Spacebar", 185, 200);
  text("to play again", 185, 225);


}


//splash screen before the game starts
public void splashScreen(){
  noLoop();
  println("TEST");
  image(splash, 0, 0);

}


//loops through the arrays and graphically represents the game
public void drawGraphics(){  
  background(0);

  noFill();
  rect(0, 0, pixelWidth-1, pixelHeight-1);

  stroke(0,170,255);
  fill(0,0,255);
  rect(0, 400, 500, 20);


  for (int i = 0; i < boardHeight; i++){
    for (int j = 0; j < boardWidth; j++){
      if (gameboard[i][j] == 1){
        rect(j * 20, i * 20 , 20, 20);
      }
      else if ( gameboard[i][j] == 5){
        rect(j * 20, i * 20 , 20, 20);
        ellipse(j * 20 + 10, i * 20 + 10, 18, 18);
        ellipse(j * 20 + 10, i * 20 + 10, 9, 9);
      }
    }
  }

  fill(0, 170, 255);
  textFont(fontA, 16);
  text("Score:", 10, 416);
  text(SCORE, 75, 416);
}


//registers key presses to control the game
public void keyPressed(){
  if (key == CODED){
    if (keyCode == DOWN){
      moveDownFlag = 1;
    } 
    else if (keyCode == LEFT){
      moveLeftFlag = 1;
    } 
    else if (keyCode == RIGHT){
      moveRightFlag = 1;
    }
    else if (keyCode == UP){
      moveUpFlag = 1;
    }
  } 
  else if (key == 32){
    initializeGame();
  }else   if (key == 115) { //s
   //if (moveUpFlag != 1){
   moveDownFlag = 1;
   //}
   } 
   else if (key == 97) { //a
   moveLeftFlag = 1;
   } 
   else if (key== 100) { //d
   moveRightFlag = 1;
   } 
   else if (key== 119) { //w
   moveUpFlag = 1;
   }
 
  
  
  /*
  if (key == 115) { //s
   //if (moveUpFlag != 1){
   moveDownFlag = 1;
   //}
   } 
   else if (key == 97) { //a
   moveLeftFlag = 1;
   } 
   else if (key== 100) { //d
   moveRightFlag = 1;
   } 
   else if (key== 119) { //w
   moveUpFlag = 1;
   }
   else if(key == 32){ // spacebar
   initializeGame();
   
   }
   */
  println("up:" + moveUpFlag);
  println("down:" + moveDownFlag);
  println("right:" + moveRightFlag);
  println("left:" + moveLeftFlag);
}







class FoodBlock{
  int xpos;
  int ypos;
  
  FoodBlock(int x, int y){
    xpos = x;
    ypos = y;
  }
  
}
class SnakeBlock{
  int xpos;
  int ypos;
  
  SnakeBlock next;
  
  SnakeBlock(int x, int y, SnakeBlock nextSnake){
    xpos = x;
    ypos = y;
    next = nextSnake;
  }
  
}

  static public void main(String args[]) {
    PApplet.main(new String[] { "--bgcolor=#FFFFFF", "snake005" });
  }
}
