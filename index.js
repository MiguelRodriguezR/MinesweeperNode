//AUTHOR
const AUTHOR =
"///////////////////////////////////////////\n"+
"// Minesweeper - Miguel Rodriguez - 2018 //\n"+
"///////////////////////////////////////////\n"
console.log(AUTHOR);

const Game = require('./controllers/Game.js');

game = new Game();
game.start();
