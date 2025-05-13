let c = document.getElementById("gameCanvas");
let ctx = null;
let squareW = 0;
let squareH = 0;
let isStarted = false;
let steps = 0;

const colour = {
  poppyRed: "#DC343B",
  orangePeel: "#FA7A35",
  lemonGrass: "#DCD494",
  kashmir: "#6F8D6A",
  dejaVuBlue: "#2E5283",
  damson: "#854C65",
  empty: "#717388",
};

let sqrtArray = [];

function init() {
  ctx = c.getContext("2d");
  c.width = Math.min(300, screen.availWidth);
  squareW = c.width / 5;
  c.height = Math.min(squareW * 8, screen.availWidth);
  squareH = c.height / 8;
  c.style = "background:#717388; border:1px solid #000000";
  titlePage();
}

function titlePage() {
  ctx.font = "50px serif";
  ctx.fillStyle = "white";
  ctx.fillText("COULOR", squareW, squareH * 2, squareW * 3);
  ctx.fillText("SCHEME", squareW, squareH * 3, squareW * 3);
  ctx.fillText("> START <", squareW, squareH * 5, squareW * 3);
}

function startGame() {
  isStarted = true;
  steps = 0;
  ctx.clearRect(0, 0, c.width, c.height);
  createLevel();
}

function createLevel() {
  let row1 = [colour.dejaVuBlue, colour.damson, colour.kashmir];
  let row2 = [colour.poppyRed, colour.orangePeel, colour.lemonGrass];
  let row3 = [colour.poppyRed, colour.lemonGrass, colour.kashmir];
  let row4 = [colour.orangePeel, colour.lemonGrass, colour.kashmir];
  let row5 = [colour.damson, colour.orangePeel, colour.dejaVuBlue];
  let row6 = [colour.orangePeel, colour.dejaVuBlue, colour.kashmir];

  sqrtArray.push(row1, row2, row3, row4, row5, row6);

  let x = squareW;
  let y = squareH;

  for (const row of sqrtArray) {
    for (const colour of row) {
      drawRect(x, y, colour);
      x += squareW;
    }
    x = squareW;
    y += squareH;
  }

  drawSteps();
}

function drawSteps() {
  ctx.clearRect(0, 0, squareW * 2, squareH);
  ctx.font = "20px serif";
  ctx.fillStyle = "white";
  ctx.fillText("Steps: " + steps, squareW / 2, squareH / 2);
}

function drawRect(x, y, colour) {
  ctx.fillStyle = colour;
  ctx.fillRect(x, y, squareW, squareH);
  ctx.strokeRect(x, y, squareW, squareH);
  ctx.stroke();
}

function changeColour(col, row, countSteps = false, isLogged = false) {
  if (col < 0 || col > 2 || row < 0 || row > 5) {
    return; // out of bounds
  }
  if (sqrtArray[row][col] === colour.poppyRed) {
    sqrtArray[row][col] = colour.orangePeel;
  } else if (sqrtArray[row][col] === colour.orangePeel) {
    sqrtArray[row][col] = colour.lemonGrass;
  } else if (sqrtArray[row][col] === colour.lemonGrass) {
    sqrtArray[row][col] = colour.kashmir;
  } else if (sqrtArray[row][col] === colour.kashmir) {
    sqrtArray[row][col] = colour.dejaVuBlue;
  } else if (sqrtArray[row][col] === colour.dejaVuBlue) {
    sqrtArray[row][col] = colour.damson;
  } else if (sqrtArray[row][col] === colour.damson) {
    sqrtArray[row][col] = colour.poppyRed;
  }
  drawRect(
    squareW + col * squareW,
    squareH + row * squareH,
    sqrtArray[row][col]
  );
  if (countSteps) {
    steps++;
    drawSteps();
  }
  if (isLogged) {
    console.log(`col: ${col}, row: ${row}, colour: ${sqrtArray[row][col]}`);
  }
}

c.addEventListener("click", function (event) {
  const xPos = event.clientX - c.getBoundingClientRect().left;
  const yPos = event.clientY - c.getBoundingClientRect().top;

  if (!isStarted) {
    if (
      xPos > squareW &&
      xPos < squareW * 4 &&
      yPos > squareH * 4 &&
      yPos < squareH * 5
    ) {
      startGame();
    }
    return;
  }

  if (
    xPos < squareW ||
    xPos > squareW * 4 ||
    yPos < squareH ||
    yPos > squareH * 7
  ) {
    return;
  }
  const col = (xPos - (xPos % squareW)) / squareW - 1;
  const row = (yPos - (yPos % squareH)) / squareH - 1;
  changeColour(col, row, true, true); // self
  changeColour(col, row - 1); // up
  changeColour(col, row + 1); // down
  changeColour(col - 1, row); // left
  changeColour(col + 1, row); // right
});

init();
