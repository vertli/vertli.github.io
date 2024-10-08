let c = document.getElementById("c_matrix");
let font_size = 16;
let ctx, columns, drops, rectX;
let size;
let buttonX, buttonY, ButtonW, buttonH;
let hSize; // array of h1 h2 h4

function init() {
  ctx = c.getContext("2d");
  canvasResize();
  selfWord();
  setButton();
  columns = (c.width - rectX) / font_size; // number of columns for the rain
  drops = []; // an array of drops - one pre column
  //x below is the x coordinate
  //1 = y co-ordinate of the drop(same for every drop initially)
  for (let x = 0; x < columns; x++) {
    drops[x] = 1;
  } // end for(x)
} // end init()

function canvasResize() {
  c.width = window.innerWidth - 2;
  size = c.width;
  rectX = (c.width - size) / 2;
  c.height = window.innerHeight - 4;
} // end canvasResize()

function selfWord() {
  let cPos = window.innerWidth / 2; // centre poition

  if (size >= 540) {
    hSize = [50, 42, 30];
  } else {
    hSize = [36, 30, 18];
  }

  ctx.fillStyle = "#cfe2ce";
  ctx.textAlign = "center";
  ctx.shadowBlur = 1;
  ctx.shadowColor = "black";

  if (size >= 960) {
    ctx.font = hSize[0] + "px Noto-Sans sans-serif";
    ctx.fillText("Calvin Vert Li", cPos, c.height / 3);

    ctx.font = hSize[1] + "px Noto-Sans sans-serif";
    ctx.fillText(
      "Daily Software QA, Nightly Developer",
      cPos,
      c.height / 3 + hSize[0]
    );
    ctx.fillText(
      "Weekend Pokémon TCG Trainer",
      cPos,
      c.height / 3 + hSize[0] + hSize[1]
    );

    ctx.font = hSize[2] + "px Noto-Sans sans-serif";
    ctx.fillText("About", cPos - 400, c.height / 3 + hSize[0] + hSize[1] * 4);
    // ctx.fillText("Contact", cPos - 200, c.height / 3 + hSize[0] + hSize[1] * 4);
    ctx.fillText(
      "Projects",
      cPos - 150,
      c.height / 3 + hSize[0] + hSize[1] * 4
    );
    // ctx.fillText("Projects", cPos, c.height / 3 + hSize[0] + hSize[1] * 4);
    ctx.fillText("Résume", cPos + 150, c.height / 3 + hSize[0] + hSize[1] * 4);
    // ctx.fillText("Arts", cPos + 200, c.height / 3 + hSize[0] + hSize[1] * 4);
    ctx.fillText("Pokémon", cPos + 400, c.height / 3 + hSize[0] + hSize[1] * 4);
    // ctx.fillText("Notes", cPos + 400, c.height / 3 + hSize[0] + hSize[1] * 4);
  } else if (size >= 720) {
    ctx.font = hSize[0] + "px Noto-Sans sans-serif";
    ctx.fillText("Calvin Vert Li", cPos, c.height / 3);

    ctx.font = hSize[1] + "px Noto-Sans sans-serif";
    ctx.fillText("Just a IT Guy", cPos, c.height / 3 + hSize[1]);
    ctx.fillText("&", cPos, c.height / 3 + hSize[0] + hSize[1]);
    ctx.fillText(
      "Pokémon Trainer",
      cPos,
      c.height / 3 + hSize[0] + hSize[1] * 2
    );

    theListX = window.innerWidth / 5;

    ctx.font = hSize[2] + "px Noto-Sans sans-serif";
    ctx.fillText("About", cPos - 200, c.height / 3 + hSize[0] + hSize[1] * 4);
    ctx.fillText("Projects", cPos - 70, c.height / 3 + hSize[0] + hSize[1] * 4);
    ctx.fillText("Résume", cPos + 70, c.height / 3 + hSize[0] + hSize[1] * 4);
    ctx.fillText("Pokémon", cPos + 200, c.height / 3 + hSize[0] + hSize[1] * 4);
    // ctx.fillText("Notes", cPos, c.height / 3 + hSize[0] + hSize[1] * 5.5);
  } else {
    ctx.font = hSize[0] + "px Noto-Sans sans-serif";
    ctx.fillText("Calvin Vert Li", cPos, c.height / 3);

    ctx.font = hSize[1] + "px Noto-Sans sans-serif";
    ctx.fillText("Just a IT Guy", cPos, c.height / 3 + hSize[0]);
    ctx.fillText("&", cPos, c.height / 3 + hSize[0] * 2);
    ctx.fillText("Pokémon Trainer", cPos, c.height / 3 + hSize[0] * 3);
    ctx.font = hSize[2] + "px Noto-Sans sans-serif";

    ctx.font = hSize[2] + "px Noto-Sans sans-serif";
    let str =
      String.fromCharCode(0x0003e) + " Enter " + String.fromCharCode(0x0003c);
    ctx.fillText(str, cPos, c.height / 3 + hSize[0] * 5);
  }
} // end selfWord()

function setButton() {
  // let buttonX, buttonY, ButtonW, buttonH;
  let cPos = window.innerWidth / 2;

  buttonH = hSize[2] + 10;
  buttonW = [
    ctx.measureText("About").width + 10,
    ctx.measureText("Projects").width + 10,
    ctx.measureText("Résume").width + 10,
    ctx.measureText("Pokémon").width + 10,
  ];
  //             ctx.measureText("Notes").width + 10];

  if (size >= 960) {
    //    buttonX = [cPos - 400 - buttonW[0] / 2,
    //               cPos - 200 - buttonW[1] / 2,
    //               cPos - buttonW[2] / 2,
    //               cPos + 200 - buttonW[3] / 2,
    //               cPos + 400 - buttonW[4] / 2];
    //    buttonY = [c.height / 3 + hSize[0] * 4 - 10,
    //               c.height / 3 + hSize[0] * 4 - 10,
    //               c.height / 3 + hSize[0] * 4 - 10,
    //               c.height / 3 + hSize[0] * 4 - 10,
    //               c.height / 3 + hSize[0] * 4 - 10];
    buttonX = [
      cPos - 400 - buttonW[0] / 2,
      cPos - 150 - buttonW[1] / 2,
      cPos + 150 - buttonW[2] / 2,
      cPos + 400 - buttonW[3] / 2,
    ];
    buttonY = [
      c.height / 3 + hSize[0] * 4 - 10,
      c.height / 3 + hSize[0] * 4 - 10,
      c.height / 3 + hSize[0] * 4 - 10,
      c.height / 3 + hSize[0] * 4 - 10,
    ];
  } else if (size >= 720) {
    buttonX = [
      cPos - 200 - buttonW[0] / 2,
      cPos - 70 - buttonW[1] / 2,
      cPos + 70 - buttonW[2] / 2,
      cPos + 200 - buttonW[3] / 2,
    ];
    //               cPos - buttonW[4] / 2];
    buttonY = [
      c.height / 3 + hSize[0] + hSize[1] * 4 - 30,
      c.height / 3 + hSize[0] + hSize[1] * 4 - 30,
      c.height / 3 + hSize[0] + hSize[1] * 4 - 30,
      c.height / 3 + hSize[0] + hSize[1] * 4 - 30,
    ];
    //               c.height / 3 + hSize[0] + hSize[1] * 5.5 - 30];
  } else {
    let str =
      String.fromCharCode(0x0003e) + " Enter " + String.fromCharCode(0x0003c);
    buttonW = ctx.measureText(str).width + 10;
    buttonX = cPos - buttonW / 2;
    buttonY = c.height / 3 + hSize[0] * 5 - 20;
    //    ctx.fillStyle = "rgba(250, 0, 0, 0.5)";
    //	  ctx.fillRect(buttonX, buttonY, buttonW, buttonH);
  }

  //  if (size >= 720) {
  //    for (let i = 0; i < 5; i++) {
  //      ctx.fillStyle = "rgba(250, 0, 0, 0.5)";
  //      ctx.fillRect(buttonX[i], buttonY[i], buttonW[i], buttonH);
  //    } // end for(i)
  //  } //end if
} // end setButton()

//drawing the characters
function draw() {
  //Black BG for the canvas
  //translucent BG to show trail
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(rectX, 0, c.width, c.height);

  let char = "";

  //looping over drops
  for (let i = 0; i < drops.length; i++) {
    ctx.fillStyle = "#0F0"; //green text
    ctx.font = font_size + "px arial";

    if (Math.round(Math.random())) {
      // A - Z
      char = String.fromCharCode(0x0041 + Math.round(Math.random() * 25));
    } else {
      // a - z
      char = String.fromCharCode(0x0061 + Math.round(Math.random() * 25));
    } // end if..else..

    ctx.fillText(char, rectX + i * font_size, drops[i] * font_size);

    //sending the drop back to the top randomly after it has crossed the screen
    //adding a randomness to the reset to make the drops scattered on the Y axis
    if (drops[i] * font_size > c.height && Math.random() > 0.975) {
      drops[i] = 0;
    } // end if

    //incrementing Y coordinate
    drops[i]++;

    selfWord();
    ctx.textAlign = "start";
    ctx.shadowBlur = 0;
  } // end for(i)
} // end draw()

setInterval(draw, 33);

c.addEventListener("click", function (event) {
  if (size >= 720) {
    if (
      event.x > buttonX[0] &&
      event.x < buttonX[0] + buttonW[0] &&
      event.y > buttonY[0] &&
      event.y < buttonY[0] + buttonH
    ) {
      // Executes if button was clicked!
      window.location.assign("./about.html");
    } else if (
      event.x > buttonX[1] &&
      event.x < buttonX[1] + buttonW[1] &&
      event.y > buttonY[1] &&
      event.y < buttonY[1] + buttonH
    ) {
      // Executes if button was clicked!
      window.location.assign("./projects.html");
    } else if (
      event.x > buttonX[2] &&
      event.x < buttonX[2] + buttonW[2] &&
      event.y > buttonY[2] &&
      event.y < buttonY[2] + buttonH
    ) {
      // Executes if button was clicked!
      window.location.assign("./resume.html");
    } else if (
      event.x > buttonX[3] &&
      event.x < buttonX[3] + buttonW[3] &&
      event.y > buttonY[3] &&
      event.y < buttonY[3] + buttonH
    ) {
      // Executes if button was clicked!
      window.location.assign("./pokemonEventList.html");
    }
    //    else if (event.x > buttonX[4] && event.x < buttonX[4] + buttonW[4] &&
    //        event.y > buttonY[4] && event.y < buttonY[4] + buttonH) {
    //        // Executes if button was clicked!
    //        window.location.assign("/notes.html");
    //      }
  } else {
    if (
      event.x > buttonX &&
      event.x < buttonX + buttonW &&
      event.y > buttonY &&
      event.y < buttonY + buttonH
    ) {
      // Executes if button was clicked!
      window.location.assign("./about.html");
    } // end if
  } // end if..else..
});

c.addEventListener("mousemove", function (event) {
  if (size >= 720) {
    if (
      event.x > buttonX[0] &&
      event.x < buttonX[0] + buttonW[0] &&
      event.y > buttonY[0] &&
      event.y < buttonY[0] + buttonH
    ) {
      // executes if cursor points to "About".
      document.body.style.cursor = "pointer";
    } else if (
      event.x > buttonX[1] &&
      event.x < buttonX[1] + buttonW[1] &&
      event.y > buttonY[1] &&
      event.y < buttonY[1] + buttonH
    ) {
      // executes if cursor points to "Contact".
      document.body.style.cursor = "pointer";
    } else if (
      event.x > buttonX[2] &&
      event.x < buttonX[2] + buttonW[2] &&
      event.y > buttonY[2] &&
      event.y < buttonY[2] + buttonH
    ) {
      // executes if cursor points to "Projects".
      document.body.style.cursor = "pointer";
    } else if (
      event.x > buttonX[0] &&
      event.x < buttonX[3] + buttonW[3] &&
      event.y > buttonY[3] &&
      event.y < buttonY[3] + buttonH
    ) {
      // executes if cursor points to "Arts".
      document.body.style.cursor = "pointer";
    }
    //    else if (event.x > buttonX[4] && event.x < buttonX[4] + buttonW[4] &&
    //                 event.y > buttonY[4] && event.y < buttonY[4] + buttonH) {
    //        // executes if cursor points to "Notes".
    //        document.body.style.cursor = "pointer";
    //      }
    else {
      document.body.style.cursor = "auto";
    }
  } else {
    if (
      event.x > buttonX &&
      event.x < buttonX + buttonW &&
      event.y > buttonY &&
      event.y < buttonY + buttonH
    ) {
      // executes if cursor points to "Enter".
      document.body.style.cursor = "pointer";
    } else {
      document.body.style.cursor = "auto";
    } // end if
  } // end if..else..
});
