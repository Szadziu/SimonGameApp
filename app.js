const gameButtons = [...document.querySelectorAll(".game__button")];
const gameInfo = document.querySelector(".game__info");
const gameTiles = [...document.querySelectorAll(".game__tile")];
const usedTiles = [];

// tile index randomization function
const drawTile = () => {
  return Math.floor(Math.random() * 9);
};

// enable/disable buttons function
const onOffModeButtons = (sign) => {
  gameButtons.forEach((button) => {
    button.disabled = sign;
  });
};

// loop function for tiles
const tilesLoop = (color, pointer) => {
  gameTiles.forEach((tile) => {
    tile.style.color = color;
    tile.style.backgroundColor = "white";
    tile.style.pointerEvents = pointer;
  });
};

// set colors for tiles function
const setTilesColors = (color, arg) => {
  for (let i = 0; i < usedTiles.length; i++) {
    setTimeout(() => {
      gameTiles[usedTiles[i]].style.backgroundColor = `rgb(${drawTile() * 28},${
        drawTile() * 28
      },${drawTile() * 28})`;
      gameTiles[usedTiles[i]].style.color = color;
    }, i * 700);
  }
  setTimeout(() => {
    if (arg > 7) {
      tilesLoop("white");
    } else {
      tilesLoop("black");
    }
  }, usedTiles.length * 800);
};

// check clicked tiles function
const checkClickedTiles = (event) => {
  event.target.style.backgroundColor = "green";
  if (String(usedTiles[0]) === event.target.dataset.value) {
    usedTiles.shift();
    console.log(usedTiles);
  } else {
    gameInfo.classList.add("game__info--lost");
    gameInfo.textContent = "Sorry! :( You lose!";
    tilesLoop("black", "none");
    onOffModeButtons("");
  }
  if (!usedTiles.length) {
    gameInfo.classList.add("game__info--won");
    gameInfo.textContent = "Congrats! You won!";
    onOffModeButtons("");
    tilesLoop("black", "none");
  }
};

// draw tiles function
const drawTiles = (arg) => {
  tilesLoop("black", "none");
  onOffModeButtons("true");
  gameInfo.textContent = "";
  usedTiles.length = 0;
  while (usedTiles.length < arg) {
    let index = drawTile();
    if (usedTiles.includes(index)) {
      continue;
    } else {
      usedTiles.push(index);
    }
  }
  setTimeout(() => {
    tilesLoop("black", "auto");
  }, usedTiles.length * 800);

  setTilesColors("white", arg);
};

// game start function
const startGame = (event) => {
  gameInfo.classList.remove("game__info--lost");
  gameInfo.classList.remove("game__info--won");
  switch (event.target.dataset.value) {
    case "1":
      drawTiles(5);
      break;
    case "2":
      drawTiles(7);
      break;
    case "3":
      drawTiles(9);
      break;
  }
};

// startup operations
for (let i = 0; i < gameButtons.length; i++) {
  gameButtons[i].addEventListener("click", startGame);
}
gameTiles.forEach((tile) => {
  tile.addEventListener("click", checkClickedTiles);
  tile.style.pointerEvents = "none";
});
