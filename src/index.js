import "./style.css";
import GameLoop from "./gameLoop";

// initializing grid boards on the dom
const playerBoard = document.querySelector("#player .board");
const computerBoard = document.querySelector("#computer .board");

for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    const divPlayer = document.createElement("div");
    const divComputer = document.createElement("div");
    divPlayer.setAttribute("data-coordinates", `${i}, ${j}`);
    divComputer.setAttribute("data-coordinates", `${i}, ${j}`);

    playerBoard.appendChild(divPlayer);
    computerBoard.appendChild(divComputer);
  }
}

// initialize game loop
const game = GameLoop();

// Color all grid cells that contain ships
const player = game.player;

for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    const cell = player.board.surface[i][j];
    if (cell) {
      for (let part of cell.body) {
        const x = part.position[0];
        const y = part.position[1];
        const domCell = document.querySelector(
          `#player .board > div[data-coordinates = "${x}, ${y}"]`
        );
        domCell.style.backgroundColor = "red";
      }
    }
  }
}
