//Character definitions
const UNSELECTED = "."
const DISABLE = "_"
const MINE = "*"
const FLAG = "P"

//class definition
class Cell {
  
  constructor(x,y) {
    this.position = {x,y}
    this.options = {
      isFlagged:false,
      isRevealed:false,
      nearMines:0,
      isMine:false
    }
  }

  getPosition(){
    return this.position;
  }

  getOptions(){
    return this.options;
  }

  getCharacter(){
    if(this.options.isFlagged){
      return FLAG;
    }
    else if(!this.options.isRevealed){
      return UNSELECTED;
    }
    else if(this.options.isRevealed && this.options.isMine){
      return MINE;
    }
    else if(this.options.isRevealed && this.options.nearMines == 0){
      return DISABLE;
    }
    else if(this.options.isRevealed && this.options.nearMines != 0){
      return this.options.nearMines;
    }

  }

  setMine(){
    if(this.options.isMine)return false;
    else{
      this.options.isMine = true;
      return true;
    }
  }

  setRevealed(){
    this.options.isRevealed = true;
    this.options.isFlagged = false;
    return this.options.nearMines==0;
  }

  setFlagged(){
    if(!this.options.isRevealed){
      if(this.options.isFlagged){
        this.options.isFlagged = false;
        return -1;
      }
      else{
        this.options.isFlagged = true;
        return 1;
      }
    }

  }

  addNearMine(){
    this.options.nearMines+=1;
  }

  isMine(){
    return this.options.isMine;
  }

  isRevealed(){
    return this.options.isRevealed;
  }

  isFlagged(){
    return this.options.isFlagged;
  }
}

module.exports = Cell;
