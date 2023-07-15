const rockImage = require("/assets/rock.png");
const paperImage = require("/assets/paper.png");
const scissorsImage = require("/assets/scissors.png");

const hands = [
  {
    name: "rock",
    image: rockImage,
    weakTo: "paper",
  },
  {
    name: "paper",
    image: paperImage,
    weakTo: "scissors",
  },
  {
    name: "scissors",
    image: scissorsImage,
    weakTo: "rock",
  },
];

export default hands;
