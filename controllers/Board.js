//imports
const Cell = require('../controllers/Cell');

//class definition
class Board {
  constructor() {
    this.gameState = "LOSE"
  }

  setBoard(x,y,m){
    this.size = {x,y}
    this.mines = m;
    this.flags = 0;
    this.minePositions = [];
    this.createCells();
    this.plantMines();
  }

  getSize(){
    return this.size;
  }

  getGameState(){
    return this.gameState;
  }

  getClose(cell){
    let close = [],
    x = cell.getPosition().x,
    y = cell.getPosition().y;
    
    //left near cell section
    if(x!=0){
      close.push(this.cells[x-1][y]);
      if(y!=0)close.push(this.cells[x-1][y-1]);
      if(y!=(this.size.y-1))close.push(this.cells[x-1][y+1]);
    }

    //center near cell section
    if(y!=0)close.push(this.cells[x][y-1]);
    if(y!=(this.size.y-1))close.push(this.cells[x][y+1]);

    //right near cell section
    if(x!=(this.size.x-1)){
      close.push(this.cells[x+1][y]);
      if(y!=0)close.push(this.cells[x+1][y-1]);
      if(y!=(this.size.y-1))close.push(this.cells[x+1][y+1]);
    }

    return close;
  }

  createCells(){
    this.cells = new Array(x);
    for (var x = 0; x < this.size.x; x++) {
      this.cells[x]= new Array(y);
      for (var y = 0; y < this.size.y; y++) {
        this.cells[x][y] = new Cell(x,y);
      }
    }
  }

  checkWin(){
    let ok = 0;

    if(this.mines == this.flags){
      this.minePositions.forEach((e)=>{
        if(this.cells[e.x][e.y].isFlagged()){
          ok+=1;
        }
      });
      if(ok == this.mines){
        this.gameState = "WIN"
        return true;
      }
    }
    return false;
  }

  drawBoard(){
    let output = "   |";

    for (var y = 0; y < this.size.y; y++) {
      output+=""+y+"|"
    }
    for (var x = 0; x < this.size.x; x++) {
      output+="\n|"+x+"|"
      for (var y = 0; y < this.size.y; y++) {
        output+=" "+this.cells[x][y].getCharacter();
      }
    }
    console.log(output);
  }

  uncoverBoard(){
    this.minePositions.forEach((e)=>{
      this.cells[e.x][e.y].setRevealed();
    });
  }

  plantMines(){
    let m=0,x=0,y=0,nears;
      while(m<this.mines){
        x = Math.floor(Math.random()*(this.size.x-1));
        y = Math.floor(Math.random()*(this.size.y-1));
        if(this.cells[x][y].setMine()){
          this.minePositions.push({x,y})
          this.getClose(this.cells[x][y]).forEach((e)=>{
            e.addNearMine();
          });
          m+=1;
        }
      }
  }

  executeAction(x,y,type){
    x = Number(x),
    y = Number(y);

    // if user select 'u' then uncover the position x,y
    if(type=="u"){
      if(this.cells[x][y].isMine()){
        this.cells[x][y].setRevealed()
        //GAME OVER
        return true
      }
      else if(!this.cells[x][y].isRevealed() && this.cells[x][y].setRevealed()){
        this.getClose(this.cells[x][y]).forEach((e)=>{
          this.executeAction(e.getPosition().x,e.getPosition().y,"u")
        });
      }
    }

    // if user select 'm' then mark the position x,y
    else{
      this.flags+=this.cells[x][y].setFlagged();
    }
  }
}

module.exports = Board
