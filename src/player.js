const Gameboard = require("./gameboard");

const coordinatesPlayer = {
  length1: [
    [0, 0],
    [5, 0],
    [7, 8],
    [5, 4],
  ],
  length2: [
    [
      [7, 1],
      [8, 1],
    ],
    [
      [5, 6],
      [5, 7],
    ],
    [
      [7, 3],
      [7, 4],
    ],
  ],

  length3: [
    [
      [3, 2],
      [4, 2],
      [5, 2],
    ],
    [
      [3, 5],
      [3, 6],
      [3, 7],
    ],
  ],
  length4: [
    [1, 4],
    [1, 5],
    [1, 6],
    [1, 7],
  ],
};

const coordinatesComputer = {
  length1: [
    [3, 4],
    [8, 1],
    [2, 8],
    [8, 7],
  ],
  length2: [
    [
      [5, 2],
      [5, 3],
    ],
    [
      [4, 6],
      [5, 6],
    ],
    [
      [1, 4],
      [1, 5],
    ],
  ],

  length3: [
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [7, 3],
      [7, 4],
      [7, 5],
    ],
  ],
  length4: [
    [6, 9],
    [7, 9],
    [8, 9],
    [9, 9],
  ],
};

const Player = (isComputer) => {
  const board = isComputer
    ? Gameboard(coordinatesComputer)
    : Gameboard(coordinatesPlayer);

  // Make random play for computer player
  const randomPlay = () => {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);

    return [x, y];
  };

  return { board, randomPlay };
};

module.exports = Player;
