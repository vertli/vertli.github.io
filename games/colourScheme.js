let c = document.getElementById("gameCanvas");
let ctx;

const colour = {
  poppyRed: "#DC343B",
  orangeade: "#E2552D",
  lemonGrass: "#DCD494",
  kashmir: "#6F8D6A",
  dejaVuBlue: "#2E5283",
  damson: "#854C65",
};

let sqrtArray = [];

function init() {
  ctx = c.getContext("2d");
  c.width = 500;
  c.height = 200;
  c.style = "background:#717388; border:1px solid #000000";
  createLevel();
}

function createLevel() {
  let row1 = [
    colour.poppyRed,
    colour.orangeade,
    colour.lemonGrass,
    colour.kashmir,
    colour.dejaVuBlue,
    colour.damson,
  ];
  let row2 = [
    colour.orangeade,
    colour.lemonGrass,
    colour.kashmir,
    colour.dejaVuBlue,
    colour.damson,
    colour.poppyRed,
  ];

  sqrtArray.push(row1, row2);
  console.log(sqrtArray);

  let x = 100;
  let y = 50;

  for (const colour of row1) {
    drawRect(x, y, 50, 50, colour);
    x += 50;
  }
  x = 100;
  y += 50;
  for (const colour of row2) {
    drawRect(x, y, 50, 50, colour);
    x += 50;
  }
}

function drawRect(x, y, w, h, colour) {
  ctx.fillStyle = colour;
  ctx.fillRect(x, y, w, h);
  ctx.strokeRect(x, y, w, h);
  ctx.stroke();
}

function changeColour(col, row) {
  if (col < 0 || col > 5 || row < 0 || row > 1) {
    return;
  }
  if (sqrtArray[row][col] === colour.poppyRed) {
    sqrtArray[row][col] = colour.orangeade;
  } else if (sqrtArray[row][col] === colour.orangeade) {
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
  drawRect(100 + col * 50, 50 + row * 50, 50, 50, sqrtArray[row][col]);
}

c.addEventListener("click", function (event) {
  const xPos = event.clientX - c.getBoundingClientRect().left;
  const yPos = event.clientY - c.getBoundingClientRect().top;
  console.log("X: " + xPos + " Y: " + yPos);
  if (xPos < 100 || xPos > 400 || yPos < 50 || yPos > 150) {
    return;
  }
  const col = (xPos - (xPos % 50)) / 50 - 2;
  const row = (yPos - (yPos % 50)) / 50 - 1;
  console.log("Row: " + row + " Col: " + col);
  changeColour(col, row); // self
  changeColour(col, row - 1); // up
  changeColour(col, row + 1); // down
  changeColour(col - 1, row); // left
  changeColour(col + 1, row); // right
});

init();
