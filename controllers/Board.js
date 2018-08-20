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
        console.log(e);
      });
      console.log(ok);
      if(ok == this.mines){
        this.gameState = "WON"
        return true;
      }
    }
    return false;
  }

  plantMines(){
    let m=0;
    let x=0;
    let y=0;
    while(m<this.mines){
      x = Math.floor(Math.random()*(this.size.x-1))
      y = Math.floor(Math.random()*(this.size.y-1))
      if(this.cells[x][y].setMine()){

        this.minePositions.push({x,y})
        //left near Mine's section
        if(x!=0){
          this.cells[x-1][y].addNearMine();
          if(y!=0)this.cells[x-1][y-1].addNearMine();
          if(y!=(this.size.y-1))this.cells[x-1][y+1].addNearMine();
        }
        //center near Mine's section
        if(y!=0)this.cells[x][y-1].addNearMine();
        if(y!=(this.size.y-1))this.cells[x][y+1].addNearMine();

        //right near Mine's section
        if(x!=(this.size.x-1)){
          this.cells[x+1][y].addNearMine();
          if(y!=0)this.cells[x+1][y-1].addNearMine();
          if(y!=(this.size.y-1))this.cells[x+1][y+1].addNearMine();
        }
        m+=1;
      }
    }
  }

  drawBoard(){
    let output = "   |"
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

  executeAction(x,y,type){
    x = Number(x);
    y = Number(y);
    if(type=="u"){
      if(this.cells[x][y].isMine()){
        this.cells[x][y].setRevealed()
        //GAME OVER

        return true

      }
      else if(!this.cells[x][y].isRevealed() && this.cells[x][y].setRevealed()){

        //left disable section
        if(x!=0){
          this.executeAction(x-1,y,"u");
          if(y!=0)this.executeAction(x-1,y-1,"u");
          if(y!=(this.size.y-1))this.executeAction(x-1,y+1,"u");
        }

        //center disable section
        if(y!=0)this.executeAction(x,y-1,"u");
        if(y!=(this.size.y-1))this.executeAction(x,y+1,"u");

        //right disable section
        if(x!=(this.size.x-1)){
          this.executeAction(x+1,y,"u");
          if(y!=0)this.executeAction(x+1,y-1,"u");
          if(y!=(this.size.y-1))this.executeAction(x+1,y+1,"u");
        }

      }
    }
    else{
      this.flags+=this.cells[x][y].setFlagged();

    }
  }


}

module.exports = Board
