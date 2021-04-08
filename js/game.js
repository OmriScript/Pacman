'use strict';
const WALL = '#';
const FOOD = '.';
const POWER_FOOD = '*';
const EMPTY = ' ';
const CHERRY = '🍒';

var gBoard;
var SIZE;
var gCherryInterval;
var gFoodCount = -1; // Pacman renders after food;
// var gWallCount = 0;
var gGame = {
  score: 0,
  isOn: false,
};

function init() {
  gBoard = buildBoard();
  createPacman(gBoard);
  createGhosts(gBoard);
  printMat(gBoard, '.board-container');
  gCherryInterval = setInterval(createCherry, 5000);

  // gFoodCount = SIZE * SIZE - 1 - gWallCount;

  gGame.isOn = true;
  var modal = document.querySelector('.modal');
  modal.style.visibility = 'hidden';

  resetScore();
  // console.log('gBoard', gBoard);
}

function buildBoard() {
  SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;
      if (
        i === 0 ||
        i === SIZE - 1 ||
        j === 0 ||
        j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)
      ) {
        board[i][j] = WALL;
      }
      if (board[i][j] === FOOD) gFoodCount++;
      if (
        (i === 1 && j === 1) ||
        (i === 1 && j === SIZE - 2) ||
        (i === SIZE - 2 && j === 1) ||
        (i === SIZE - 2 && j === SIZE - 2)
      ) {
        board[i][j] = POWER_FOOD;
      }
    }
  }

  return board;
}

function createCherry() {
  var emptyCells = [];
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[i].length; j++) {
      var currCell = gBoard[i][j];
      console.log('currCell', currCell);
      if (currCell === ' ') {
        emptyCells.push({ location: { i: i, j: j } });
      }
    }
  }
  var randomNum = getRandomIntInclusive(0, emptyCells.length);
  var randomCell = emptyCells[randomNum].location;
  console.log('randomCell', randomCell);

  renderCell(randomCell, CHERRY);
  console.log('emptyCells', emptyCells);
}

////

// update the model
gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
// update the DOM
renderCell(gPacman.location, EMPTY);

////

function updateScore(diff) {
  // update model
  gGame.score += diff;
  // and dom
  var elScore = document.querySelector('h2 span');
  elScore.innerText = gGame.score;
}

function resetScore() {
  // update model
  gGame.score = 0;
  // and dom
  var elScore = document.querySelector('h2 span');
  elScore.innerText = 0;
}

function gameOver(msg) {
  var elModal = document.querySelector('.modal');
  elModal.style.visibility = 'visible';
  var elH2Modal = document.querySelector('.modal h2');
  elH2Modal.innerText = msg;
  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  gIntervalGhosts = null;
  gFoodCount = -1;
  gDeletedGhosts = [];
  clearInterval(gCherryInterval);
}

function checkIfFoodIsGone() {}
