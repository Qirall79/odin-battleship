const Gameboard = require("../src/gameboard");

// Coordinates
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

// creating gameboard
const boardPlayer = Gameboard(coordinatesPlayer);
const boardComputer = Gameboard(coordinatesComputer);

boardPlayer.receiveAttack(8, 1);
boardPlayer.receiveAttack(7, 1);

test("Creates surface", () => {
  expect(boardPlayer.surface[5][5]).toBe("");
});

test("Ship has body property", () => {
  expect(boardPlayer.surface[8][1].body.length).toBe(2);
});

test("Ship has correct body positions", () => {
  expect(boardPlayer.surface[8][1].body[0].position[0]).toBe(7);
});

test("Doesn't have more than 10 by 10 dimensions", () => {
  expect(boardPlayer.surface[9][10]).toBeFalsy();
});

test("Places Player length 2 ships correctly ", () => {
  expect(boardPlayer.surface[8][1].length).toBe(2);
});

test("Places Player length 4 ships correctly", () => {
  expect(boardPlayer.surface[1][6].length).toBe(4);
});

test("Ship receives attack", () => {
  expect(boardPlayer.surface[8][1].body[1].isHit).toBeTruthy();
});

test("Marks ship as sunk", () => {
  expect(boardPlayer.surface[8][1].isSunk()).toBeTruthy();
});

test("Places Computer length 1 ships correctly ", () => {
  expect(boardComputer.surface[2][8].length).toBe(1);
});

test("Places Computer length 3 ships correctly", () => {
  expect(boardComputer.surface[2][1].length).toBe(3);
});
