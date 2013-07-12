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
