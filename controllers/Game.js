//imports
const Board = require('../controllers/Board');
const conif = require('node-console-input');

//class definition
class Game {
  constructor() {
    this.board = new Board();
    this.gameOver = false;
  }

  start(){

    this.setup();
    this.game();
    console.log("GAME OVER YOU "+this.board.getGameState()+" !");
    this.board.uncoverBoard();
    this.board.drawBoard();

  }

  setup(){
    let ok=false;
    let inputs;

    // setup
    while(ok!=true){
      inputs = conif.getConsoleInput("enter the height, width, and number of mines: ", false);
      inputs = inputs.split(" ");
      ok = this.validateInputs(inputs,1)
      if(ok == true){
        this.board.setBoard(inputs[0],inputs[1],inputs[2]);
      }
      else{
        console.clear()
        console.log(ok.error);
      }
    }
  }


  game(){
    let ok=false;
    let inputs;

    while(!this.gameOver){
      // console.clear()
      this.board.drawBoard();
      if(ok.hasOwnProperty('error'))console.log(ok.error);
      inputs = conif.getConsoleInput("select one cell by entering its row and column index and an action(u=uncover/m=mark) ", false);
      inputs = inputs.split(" ");
      ok = this.validateInputs(inputs,2);
      if(ok== true){
        this.gameOver = this.board.executeAction(inputs[0],inputs[1],inputs[2]);
        if(!this.gameOver){
          this.gameOver = this.board.checkWin();
        }
      }
    }
  }

  validateInputs(inputs,stage){
    if(stage == 1){
      if(inputs.length!=3){
        return {error:"please enter the correct amount of setup options, for example:(3 3 1)"}
      }
      if(!Number.isInteger(Number(inputs[0]))||
      !Number.isInteger(Number(inputs[1]))||
      !Number.isInteger(Number(inputs[2]))){
        return {error:"please enter integer numbers only, for example:(3 3 1)"}
      }
      if(Number(inputs[0])*Number(inputs[1])<Number(inputs[2])){
        return {error:"the Number of cells must be less than the quantity of mines"}
      }
    }
    else{
      if(inputs.length!=3){
        return {error:"please enter the correct amount of game options, for example:(3 3 u)"}
      }

      if(!Number.isInteger(Number(inputs[0]))||
      !Number.isInteger(Number(inputs[1]))){
        return {error:"please enter integer numbers only, for example:(3 3 u)"}
      }
      console.log(this.board.getSize().x);
      if(this.board.getSize().x<=inputs[0] ||
         this.board.getSize().y<=inputs[1]){
        return {error:"cell ["+inputs[0]+"]["+inputs[1]+"] does not exist"}
      }
      if(inputs[2]!='u' && inputs[2]!='m'){
        return {error:"third input must be 'm' or 'u'"}
      }
    }
    return true
  }

}

module.exports = Game;