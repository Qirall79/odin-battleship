const Ship = require("./ship");

const Gameboard = (coordinates) => {
  let surface = [];

  let ships = [];

  // Creating the rows and columns
  const drawSurface = () => {
    for (let i = 0; i < 10; i++) {
      let row = [];
      for (let j = 0; j < 10; j++) {
        row.push("");
      }

      surface.push(row);
    }
  };

  drawSurface();

  //Create Ships
  const createShips = () => {
    // Creating 4 ships of length 1
    for (let i = 0; i < 4; i++) {
      let ship = Ship(1);
      ships.push(ship);
    }

    // Creating 3 ships of length 2
    for (let i = 0; i < 3; i++) {
      let ship = Ship(2);
      ships.push(ship);
    }

    // Creating 2 ships of length 3
    for (let i = 0; i < 2; i++) {
      let ship = Ship(3);
      ships.push(ship);
    }

    // Creating 1 ship of length 4
    ships.push(Ship(4));
  };

  createShips();

  // Loop through every ship and place it at coordinates using placeShip()
  for (let i = 0; i < ships.length; i++) {
    const ship = ships[i];
    if (ship.length === 1) {
      const [x, y] = coordinates["length1"][i];

      placeShip(x, y, ship);
    } else if (ship.length === 2) {
      const [[a, b], [c, d]] = coordinates["length2"][i - 4];

      placeShip(a, b, ship);
      placeShip(c, d, ship);
    } else if (ship.length === 3) {
      const [[a, b], [c, d], [e, f]] = coordinates["length3"][i - 7];

      placeShip(a, b, ship);
      placeShip(c, d, ship);
      placeShip(e, f, ship);
    } else {
      const [[a, b], [c, d], [e, f], [g, h]] = coordinates["length4"];

      placeShip(a, b, ship);
      placeShip(c, d, ship);
      placeShip(e, f, ship);
      placeShip(g, h, ship);
    }
  }

  // Place ship at specific coordinates and add position
  function placeShip(x, y, ship) {
    surface[x][y] = ship;
    ship.body.push({ position: [x, y], isHit: false });
  }

  // Check if box has no surrounding full Boxes
  let isEmpty = (x, y, length) => {
    if (x < 0 || x > 9 || y < 0 || y > 9) return false;

    if (length == 1) {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          let currentBox;
          if (x + i >= 0 && y + j >= 0 && x + i < 10 && y + j < 10) {
            currentBox = surface[x + i][y + j];
          } else {
            currentBox = "";
          }

          if (currentBox !== "") {
            return false;
          }
        }
      }
    }

    if (length == 2) {
      if (isEmpty(x, y, 1)) {
        if (isEmpty(x, y + 1, 1)) {
          return [x, y + 1];
        } else if (isEmpty(x, y - 1, 1)) {
          return [x, y - 1];
        } else if (isEmpty(x + 1, y, 1)) {
          return [x + 1, y];
        } else if (isEmpty(x - 1, y, 1)) {
          return [x - 1, y];
        } else {
          return false;
        }
      } else {
        return false;
      }
    }

    if (length == 3) {
      if (isEmpty(x, y, 2)) {
        const [a, b] = isEmpty(x, y, 2);
        if (a == x && b == y + 1 && isEmpty(a, b + 1, 1))
          return [
            [x, y + 1],
            [x, y + 2],
          ];
        else if (a == x && b == y - 1 && isEmpty(a, b - 1, 1))
          return [
            [x, y - 1],
            [x, y - 2],
          ];
        else if (a == x + 1 && b == y && isEmpty(a + 1, b, 1))
          return [
            [x + 1, y],
            [x + 2, y],
          ];
        else if (a == x - 1 && b == y && isEmpty(a - 1, b, 1))
          return [
            [x - 1, y],
            [x - 2, y],
          ];
        else return false;
      } else return false;
    }

    if (length == 4) {
      if (isEmpty(x, y, 3)) {
        const [[a, b], [c, d]] = isEmpty(x, y, 3);

        if (d == y + 2 && isEmpty(x, d + 1, 1))
          return [
            [a, b],
            [c, d],
            [x, d + 1],
          ];
        else if (d == y - 2 && isEmpty(x, d - 1, 1))
          return [
            [a, b],
            [c, d],
            [x, d - 1],
          ];
        else if (c == x + 2 && isEmpty(c + 1, y, 1))
          return [
            [a, b],
            [c, d],
            [c + 1, y],
          ];
        else if (c == x - 2 && isEmpty(c - 1, y, 1))
          return [
            [a, b],
            [c, d],
            [c - 1, y],
          ];
        else return false;
      } else return false;
    }

    return true;
  };

  // Receive Attack and check if it hit a ship
  function receiveAttack(x, y) {
    if (surface[x][y]) {
      // Find attacked position in ship
      const ship = surface[x][y];
      for (let i = 0; i < ship.body.length; i++) {
        const part = ship.body[i];

        if (part.position.join("") == [x, y].join("")) {
          ship.hit(i);
        }
      }
    }
  }

  // Checks if all board ships are sunk
  function checkAllSunk() {
    for (let ship of ships) {
      if (!ship.isSunk()) return false;
    }

    return true;
  }

  return { surface, placeShip, ships, receiveAttack, checkAllSunk };
};

module.exports = Gameboard;
