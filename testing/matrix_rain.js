let c = document.getElementById("c_matrix");
c.height = window.innerHeight;
c.width = window.innerWidth;
let font_size = 16;
let ctx, columns, drops, rectX, sizeType;
let buttonX, buttonY, ButtonW, buttonH;

ctx = c.getContext("2d");

function init() {
  canvasResize();
  ctx = c.getContext("2d");
  columns = (c.width - rectX) / font_size; //number of columns for the rain
  drops = []; //an array of drops - one per column
  //x below is the x coordinate
  //1 = y co-ordinate of the drop(same for every drop initially)
  for(let x = 0; x < columns; x++) {
    drops[x] = 1;
  }
}

function canvasResize() {
  c.width = window.innerWidth;
  let temp = c.width;
  let size = 0;
  
  if (c.width >= 1200) {
    // Extra large devices (large laptops and desktops, 1200px and up)
    size = 1140;
    sizeType = 0;
  } else if (c.width < 1200 && c.width >= 992) {
    // Large devices (laptops/desktops, 992px and up)
    size = 960;
    sizeType = 1;
  } else if (c.width < 992 && c.width >= 768) {
    // Medium devices (landscape tablets, 768px and up)
    size = 720;
    sizeType = 2;
  } else if (c.width < 768 && c.width >= 600) {
    // Small devices (portrait tablets and large phones, 600px and up)
    size = 540;
    sizeType = 3;
  } else {
    c.width = c.width * 0.95;
    rectX = temp * 0.05;
    sizeType = 4;
  }
  
  if (sizeType != 4) {
    rectX =  (c.width - size) / 2;
    c.width = c.width - rectX; 
    
  }
  
  c.height = window.innerHeight;
}

function selfWord() {
  
  let centerPosition = window.innerWidth / 2;
  let h1Size, h2Size;
  if (sizeType < 3) {
    h1Size = 50;
    h2Size = 42;
    h4Size = 30;
  } else {
    h1Size = 36;
    h2Size = 30;
    h4Size = 18;
  }
  
  ctx.fillStyle = "#FFF";
  ctx.textAlign = "center";
  ctx.shadowBlur = 1;
  ctx.shadowColor = "red";
  
  let char = String.fromCharCode(0x2193);
  let str = "Press me for more!";
  
  if (sizeType < 2){
    ctx.font = h1Size + "px Noto-Sans sans-serif";
    ctx.fillText("Chun Kit (Calvin) Li", centerPosition, c.height / 3);

    ctx.font = h2Size + "px Noto-Sans sans-serif";
    ctx.fillText("Computational Mathematics & Statistics Student", centerPosition, c.height / 3 + h1Size);

    ctx.fillText("University of Waterloo", centerPosition, c.height / 3 + h1Size + h2Size);

    ctx.fillText("Class of 2020", centerPosition, c.height / 3 + h1Size + h2Size * 2);
    
    ctx.font = h4Size + "px Noto-Sans sans-serif";
    ctx.fillText(str, centerPosition, c.height / 3 + h1Size + h2Size * 4);
    
  } else if (sizeType < 4 || window.innerWidth >= 360) {
    
    ctx.font = h1Size + "px Noto-Sans sans-serif";
    ctx.fillText("Chun Kit (Calvin) Li", centerPosition, c.height / 3);

    ctx.font = h2Size + "px Noto-Sans sans-serif";
    ctx.fillText("Mathematics Student", centerPosition, c.height / 3 + h1Size);

    ctx.fillText("University of Waterloo", centerPosition, c.height / 3 + h1Size + h2Size);

    ctx.fillText("Class of 2020", centerPosition, c.height / 3 + h1Size + h2Size * 2);
    
    ctx.font = h4Size + "px Noto-Sans sans-serif";
    ctx.fillText(str, centerPosition, c.height / 3 + h1Size + h2Size * 4);
    
  } else {
    ctx.font = h1Size + "px Noto-Sans sans-serif";
    ctx.fillText("Chun Kit", centerPosition, c.height / 3);
    ctx.fillText("(Calvin)", centerPosition, c.height / 3 + h1Size);
    ctx.fillText("Li", centerPosition, c.height / 3 + h1Size * 2);
    ctx.font = h2Size + "px Noto-Sans sans-serif";
    ctx.fillText("UWaterloo", centerPosition, c.height / 3 + h1Size * 3);
    ctx.fillText("Maths", centerPosition, c.height / 3 + h1Size * 3 + h2Size);
    ctx.fillText("Student", centerPosition, c.height / 3 + h1Size * 3 + h2Size * 2);
    ctx.fillText("Class 2021", centerPosition, c.height / 3 + h1Size * 3 + h2Size * 3);
    ctx.font = h4Size + "px Noto-Sans sans-serif";
    ctx.fillText(str, centerPosition, c.height / 3 + h1Size * 3 + h2Size * 5);
  }
  buttonY = c.height / 3 + h1Size * 4 - 10;
  buttonH = h4Size +10;
 // alert(ctx.measureText(str).height);
  buttonW = ctx.measureText(str).width;
  buttonX = centerPosition - (buttonW / 2);
  
}


//drawing the characters
function draw() {
  
//  ctx.fillStyle = "blue";
//  ctx.fillRect(Math.floor(rectX), 0, c.width, c.height);
  
	//Black BG for the canvas
	//translucent BG to show trail
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
	ctx.fillRect(rectX, 0, c.width, c.height);
  
  let char = "";
  
//	//looping over drops
	for(let i = 0; i < drops.length; i++) {
    
    ctx.fillStyle = "#0F0"; //green text
	  ctx.font = font_size + "px arial";
    
    if (Math.round(Math.random())){
    // A - Z
      char = String.fromCharCode(0x0041 + Math.round(Math.random()*25));
    } else {
      // a - z
      char = String.fromCharCode(0x0061 + Math.round(Math.random()*25));
    }
    
    ctx.fillText(char, rectX + i*font_size, drops[i]*font_size);
    
		//sending the drop back to the top randomly after it has crossed the screen
		//adding a randomness to the reset to make the drops scattered on the Y axis
		if(drops[i]*font_size > c.height && Math.random() > 0.975) {
			drops[i] = 0;
    }
		
		//incrementing Y coordinate
		drops[i]++;
    
    selfWord();
    ctx.textAlign = "start";
    ctx.shadowBlur = 0;   
	}
}



setInterval(draw, 33);
c.addEventListener('click', function(event) {
      // Control that click event occurred within position of button
      // NOTE: This assumes canvas is positioned at top left corner 
      if (
        event.x > buttonX && 
        event.x < buttonX + buttonW &&
        event.y > buttonY && 
        event.y < buttonY + buttonH
      ) {
        // Executes if button was clicked!
        window.location.assign(window.location.href + "#myTopnav");
      }
});