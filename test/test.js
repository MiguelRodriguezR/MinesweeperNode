var expect = require('chai').expect;
const Game = require('../controllers/Game');

// testing Game Class
game = new Game();

describe('game.validateInputs() (SETUP)',()=>{
  it('STAGE 1.1.1 : should validate all inputs are integer (decimal)', ()=> {

    // 1. ARRANGE
    var inputs = ['1' ,'3.2', '5'];
    var stage = 'setup';
    var correct = 'please enter integer numbers only, for example:(3 3 1)';

    // 2. ACT
    var res = game.validateInputs(inputs, stage);

    // 3. ASSERT
    expect(res.error).to.be.equal(correct);

  });
  it('STAGE 1.1.2 : should validate all inputs are integer (characters)', ()=> {

    // 1. ARRANGE
    var inputs = ['1' ,'/', '*'];
    var stage = 'setup';
    var correct = 'please enter integer numbers only, for example:(3 3 1)';

    // 2. ACT
    var res = game.validateInputs(inputs, stage);

    // 3. ASSERT
    expect(res.error).to.be.equal(correct);

  });
  it('STAGE 1.1.3 : should validate all inputs are integer (weird stuff)', ()=> {

    // 1. ARRANGE
    var inputs = ['1' ,'x=>{10*10}', '5'];
    var stage = 'setup';
    var correct = 'please enter integer numbers only, for example:(3 3 1)';

    // 2. ACT
    var res = game.validateInputs(inputs, stage);

    // 3. ASSERT
    expect(res.error).to.be.equal(correct);

  });

  it('STAGE 1.1.4 : should validate all inputs are integer (extremely weird stuff)', ()=> {

    // 1. ARRANGE
    var inputs = ['둘' ,'二十八', '5'];
    var stage = 'setup';
    var correct = 'please enter integer numbers only, for example:(3 3 1)';

    // 2. ACT
    var res = game.validateInputs(inputs, stage);

    // 3. ASSERT
    expect(res.error).to.be.equal(correct);

  });
  it('STAGE 1.2 : should validate correct amount of inputs(3)', ()=> {

    // 1. ARRANGE
    var inputs = ['3' ,'2', '5', '3', '4', '8', '10', '33'];
    var stage = 'setup';
    var correct = 'please enter the correct amount of setup options, for example:(3 3 1)';

    // 2. ACT
    var res = game.validateInputs(inputs, stage);

    // 3. ASSERT
    expect(res.error).to.be.equal(correct);

  });
  it('STAGE 1.3.1 : should validate quantity of mines extremely big + 1', ()=> {

    // 1. ARRANGE
    var inputs = ['10000','10000','100000001'];
    var stage = 'setup';
    var correct = 'the Number of cells must be less than the quantity of mines';

    // 2. ACT
    var res = game.validateInputs(inputs, stage);

    // 3. ASSERT
    expect(res.error).to.be.equal(correct);

  });
  it('STAGE 1.3.2 : should validate quantity of mines extremely big', ()=> {

    // 1. ARRANGE
    var inputs = ['10000','10000','100000000'];
    var stage = 'setup';
    var correct = true;

    // 2. ACT
    var res = game.validateInputs(inputs, stage);

    // 3. ASSERT
    expect(res).to.be.equal(correct);

  });
  it('STAGE 1.3.3 : should validate quantity of mines > 0', ()=> {

    // 1. ARRANGE
    var inputs = ['1','1','0'];
    var stage = 'setup';
    var correct = 'number of mines must be > 0';

    // 2. ACT
    var res = game.validateInputs(inputs, stage);

    // 3. ASSERT
    expect(res.error).to.be.equal(correct);

  });
  it('STAGE 1.4 : should validate quantity of cells > 0', ()=> {

    // 1. ARRANGE
    var inputs = ['0','0','1'];
    var stage = 'setup';
    var correct = 'number of cells must be > 0';

    // 2. ACT
    var res = game.validateInputs(inputs, stage);

    // 3. ASSERT
    expect(res.error).to.be.equal(correct);

  });
});

describe('game.validateInputs() (GAME)',()=>{
  it('STAGE 2.1.1 : should validate two first inputs are integer (decimal)', ()=> {

    // 1. ARRANGE
    var inputs = ['1' ,'3.2', '5'];
    var stage = 'game';
    var correct = 'please enter integer numbers only, for example:(3 3 u)';

    // 2. ACT
    var res = game.validateInputs(inputs, stage);

    // 3. ASSERT
    expect(res.error).to.be.equal(correct);

  });
  it('STAGE 2.1.2 : should validate two first inputs are integer (characters)', ()=> {

    // 1. ARRANGE
    var inputs = ['1' ,'/', '*'];
    var stage = 'game';
    var correct = 'please enter integer numbers only, for example:(3 3 u)';

    // 2. ACT
    var res = game.validateInputs(inputs, stage);

    // 3. ASSERT
    expect(res.error).to.be.equal(correct);

  });
  it('STAGE 2.1.3 : should validate two first inputs are integer (weird stuff)', ()=> {

    // 1. ARRANGE
    var inputs = ['1' ,'x=>{10*10}', '5'];
    var stage = 'game';
    var correct = 'please enter integer numbers only, for example:(3 3 u)';

    // 2. ACT
    var res = game.validateInputs(inputs, stage);

    // 3. ASSERT
    expect(res.error).to.be.equal(correct);

  });

  it('STAGE 2.1.3 : should validate two first inputs are integer (extremely weird stuff)', ()=> {

    // 1. ARRANGE
    var inputs = ['둘' ,'二十八', '5'];
    var stage = 'game';
    var correct = 'please enter integer numbers only, for example:(3 3 u)';

    // 2. ACT
    var res = game.validateInputs(inputs, stage);

    // 3. ASSERT
    expect(res.error).to.be.equal(correct);

  });

  it('STAGE 2.2 : should validate correct amount of inputs(3)', ()=> {

    // 1. ARRANGE
    var inputs = ['3' ,'2', '5', '3', '4', '8', '10', '33'];
    var stage = 'game';
    var correct = 'please enter the correct amount of game options, for example:(3 3 u)';

    // 2. ACT
    var res = game.validateInputs(inputs, stage);

    // 3. ASSERT
    expect(res.error).to.be.equal(correct);

  });

  it('STAGE 2.3 : should validate correct cell selection', ()=> {

    // 1. ARRANGE
    game.board.setBoard(3,3,2)
    var inputs = ['-1','-2','u'];
    var stage = 'game';
    var correct = 'cell [-1][-2] does not exist';

    // 2. ACT
    var res = game.validateInputs(inputs, stage);

    // 3. ASSERT
    expect(res.error).to.be.equal(correct);

  });
  it('STAGE 2.4.1 : should validate correct action', ()=> {

    // 1. ARRANGE
    game.board.setBoard(3,3,2)
    var inputs = ['1','2','/S'];
    var stage = 'game';
    var correct = 'third input must be \'m\' or \'u\'';

    // 2. ACT
    var res = game.validateInputs(inputs, stage);

    // 3. ASSERT
    expect(res.error).to.be.equal(correct);

  });

});
