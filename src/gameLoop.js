import Player from "./player";
import Gameboard from "./gameboard";

const GameLoop = () => {
  const player = Player();
  const computer = Player(true);

  // Allow player to attack
  function playerAttack() {
    assignTurn("player");
    const computerDOM = document.querySelector("#computer .board");

    if (computerDOM.classList[1] === "unlocked") {
      let cells = document.querySelectorAll("#computer .unlocked div");

      cells.forEach((cell) => {
        if (
          !cell.classList.contains("missed") &&
          !cell.classList.contains("attacked")
        ) {
          cell.addEventListener("click", clickHandler);
        }
      });
    }
  }

  function clickHandler(e) {
    const [x, y] = e.target.dataset.coordinates.split(", ");
    checkAttack(x, y, "player", "computer");
    updateDOM();
    checkWinner();
    assignTurn("computer");
  }

  playerAttack();

  // Gives turn to appropriate player by changing the DOM
  function assignTurn(name) {
    const computerBoard = document.querySelector("#computer .board");
    if (name === "player") {
      if (computerBoard.classList[1] !== "unlocked") {
        computerBoard.classList.add("unlocked");
      }
    } else {
      let cells = document.querySelectorAll("#computer .unlocked div");
      cells.forEach((cell) => {
        cell.removeEventListener("click", clickHandler);
      });
      computerBoard.classList.remove("unlocked");
      computerAttack();
      updateDOM();
      checkWinner();
      playerAttack();
    }
  }

  // Computer attacks at random cell
  function computerAttack() {
    const [x, y] = computer.randomPlay();
    checkAttack(x, y, "computer", "player");
  }

  // Check attack and add appropriate class
  function checkAttack(x, y, name, target) {
    const cell = document.querySelector(
      `#${target} [data-coordinates="${x}, ${y}"]`
    );
    if (
      !cell.classList.contains("missed") &&
      !cell.classList.contains("attacked")
    ) {
      if (name == "computer") {
        player.board.receiveAttack(x, y);
        if (player.board.surface[x][y]) {
          cell.classList.add("attacked");
        } else {
          cell.classList.add("missed");
        }
      } else {
        computer.board.receiveAttack(x, y);
        if (computer.board.surface[x][y]) {
          cell.classList.add("attacked");
        } else {
          cell.classList.add("missed");
        }
      }
    } else {
      //in case the computer attacks "missed" or "attacked" cell, he should reattack
      if (name === "computer") {
        computerAttack();
      }
    }
  }

  // Updates the DOM to be up-to-date with styles and content
  function updateDOM() {
    const attackedCells = document.querySelectorAll(".attacked");
    const missedCells = document.querySelectorAll(".missed");
    attackedCells.forEach((cell) => {
      cell.innerHTML = "X";
    });
    missedCells.forEach((cell) => {
      cell.innerHTML = ".";
    });
  }

  // Check if someone's ships have been all sunk
  function checkWinner() {
    if (computer.board.checkAllSunk() || player.board.checkAllSunk()) {
      document.querySelector("#winner").style.display = "flex";

      const winner = computer.board.checkAllSunk() ? "Player" : "Computer";

      document.querySelector("#winner h1").innerHTML = winner + "Won the game";
      document.querySelector("#winner button").addEventListener("click", () => {
        location.reload();
      });
    }
  }

  return { assignTurn, player, computer, computerAttack, updateDOM };
};

export default GameLoop;
