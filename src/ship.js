const Ship = (length) => {
  let body = [];

  const hit = (position) => {
    body[position].isHit = true;
  };

  const isSunk = () => {
    for (let part of body) {
      if (!part.isHit) {
        return false;
      }
    }
    return true;
  };

  return { length, hit, isSunk, body };
};

module.exports = Ship;
