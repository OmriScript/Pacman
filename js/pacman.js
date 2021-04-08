'use strict';
const PACMAN = '😷';

var gPacman;
function createPacman(board) {
  // TODO
  gPacman = {
    location: {
      i: 6,
      j: 6,
    },
    isSuper: false,
  };

  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(ev) {
  if (!gGame.isOn) return;
  // use getNextLocation(), nextCell
  var nextLocation = getNextLocation(ev);
  //   console.log('nextLocation', nextLocation);

  var nextCell = gBoard[nextLocation.i][nextLocation.j];

  // return if cannot move
  if (nextCell === WALL) return;

  if (nextCell === GHOST) {
    // hitting a ghost?  call gameOver if isSuper = false
    if (!gPacman.isSuper) {
      renderCell(gPacman.location, EMPTY);
      gameOver('Game Over');
      return;
    } else {
      // can eat ghosts
      var ghostEatenLocation = {
        i: nextLocation.i,
        j: nextLocation.j,
      };
      for (var i = 0; i < gGhosts.length; i++) {
        var currGhost = gGhosts[i];
        if (
          currGhost.location.i === ghostEatenLocation.i &&
          currGhost.location.j === ghostEatenLocation.j
        ) {
          //   console.log(gGhosts);
          if (
            currGhost.currCellContent === FOOD ||
            currGhost.currCellContent === POWER_FOOD
          ) {
            updateScore(1);
            gFoodCount--;
            if (gFoodCount === 0) {
              gameOver('Victorious!');
            }
          }

          gDeletedGhosts.push(gGhosts.splice(i, 1));
          console.log('gGhosts', gGhosts);
          console.log('gDeletedGhosts', gDeletedGhosts);
        }
      }
    }
  }
  if (nextCell === FOOD) {
    updateScore(1);
    gFoodCount--;
    if (gFoodCount === 0) {
      gameOver('Victorious!');
    }
  }

  if (nextCell === POWER_FOOD) {
    makeGhostsEatable();
    updateScore(1);
    gFoodCount--;
    if (gFoodCount === 0) {
      gameOver('Victorious!');
    }

    // if (!gPacman.isSuper) {
    gPacman.isSuper = true;
    setTimeout(function () {
      gPacman.isSuper = false;
    }, 5000);
    // }
    // else {

    // }
  }

  if (nextCell === CHERRY) {
    updateScore(10);
    console.log('I ate a CHERRY');
  }
  //   console.log('gFoodCount', gFoodCount);

  // update the model
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // update the DOM
  renderCell(gPacman.location, EMPTY);

  // Move the pacman
  // update the model

  gPacman.location = nextLocation;
  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;

  // update the DOM
  renderCell(gPacman.location, PACMAN);
}

function getNextLocation(ev) {
  // figure out nextLocation
  // console.log('ev.code', ev.code)
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j,
  };

  switch (ev.code) {
    case 'ArrowUp':
      nextLocation.i--;
      break;
    case 'ArrowDown':
      nextLocation.i++;
      break;
    case 'ArrowLeft':
      nextLocation.j--;
      break;
    case 'ArrowRight':
      nextLocation.j++;
      break;
    default:
      return null;
  }
  return nextLocation;
}
