'use strict';
const GHOST = '&#9781;';

var gGhosts = [];
var gDeletedGhosts = [];
var gIntervalGhosts;
var gNumOfGhosts = 4;

function createGhost(board) {
  // TODO
  var ghost = {
    location: {
      i: 3,
      j: 3,
    },
    currCellContent: FOOD,
    currColor: getRandomColor(),
    prevColor: null,
    isEatable: false,
  };
  gGhosts.push(ghost);
  board[ghost.location.i][ghost.location.j] = GHOST;
}

function createGhosts(board) {
  //  4 ghosts and an interval
  gGhosts = [];
  for (var i = 0; i < gNumOfGhosts; i++) {
    createGhost(board);
  }

  gIntervalGhosts = setInterval(moveGhosts, 2000);
}

function moveGhosts() {
  // loop through ghosts
  for (var i = 0; i < gGhosts.length; i++) {
    var ghost = gGhosts[i];
    moveGhost(ghost);
  }
}
function moveGhost(ghost) {
  // figure out moveDiff, nextLocation, nextCell

  var moveDiff = getMoveDiff();

  var nextLocation = {
    i: ghost.location.i + moveDiff.i,
    j: ghost.location.j + moveDiff.j,
  };

  var nextCell = gBoard[nextLocation.i][nextLocation.j];

  // return if cannot move
  if (nextCell === WALL) return;
  if (nextCell === GHOST) return;

  // hitting a pacman?  call gameOver
  if (nextCell === PACMAN) {
    gameOver('Game Over');
    return;
  }

  // if (nextCell === FOOD) {
  //   ghost.currCellContent = FOOD;
  // }

  // if (nextCell === POWER_FOOD) {
  //   ghost.currCellContent = POWER_FOOD;
  // }

  // update the model
  gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;

  // update the DOM
  renderCell(ghost.location, ghost.currCellContent);

  // Move the ghost
  ghost.location = nextLocation;

  // update the model
  ghost.currCellContent = nextCell;
  gBoard[ghost.location.i][ghost.location.j] = GHOST;

  // update the DOM
  renderCell(ghost.location, getGhostHTML(ghost));
}

function getMoveDiff() {
  var randNum = getRandomIntInclusive(1, 100);
  if (randNum <= 25) {
    return { i: 0, j: 1 };
  } else if (randNum <= 50) {
    return { i: -1, j: 0 };
  } else if (randNum <= 75) {
    return { i: 0, j: -1 };
  } else {
    return { i: 1, j: 0 };
  }
}

function getGhostHTML(ghost) {
  return `<span style="color:${ghost.currColor}">${GHOST}</span>`;
}

function makeGhostsEatable() {
  for (var i = 0; i < gGhosts.length; i++) {
    gGhosts[i].isEatable = true;
    gGhosts[i].prevColor = gGhosts[i].currColor;
    gGhosts[i].currColor = 'blue';
  }

  setTimeout(function () {
    // ghosts back to life
    gGhosts =
      gGhosts.length < gNumOfGhosts - 1
        ? gDeletedGhosts.flat()
        : gGhosts.flat().concat(gDeletedGhosts.flat());

    // return original's ghosts color and makes uneatable after 5 sec
    for (var i = 0; i < gGhosts.length; i++) {
      gGhosts[i].isEatable = false;
      gGhosts[i].currColor = gGhosts[i].prevColor;
    }
  }, 5000);
}
