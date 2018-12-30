let c = document.getElementById("c_matrix");
c.height = window.innerHeight;
c.width = window.innerWidth;
let font_size = 16;
let ctx, columns, drops, currentSize;

function init() {
  
  canvasResize();
  ctx = c.getContext("2d");
  columns = c.width / font_size; //number of columns for the rain
  drops = []; //an array of drops - one per column
  //x below is the x coordinate
  //1 = y co-ordinate of the drop(same for every drop initially)
  for(let x = 0; x < columns; x++) {
    drops[x] = 1;
  }
}

function canvasResize() {
  c.width = window.innerWidth;
  
  if (c.width >= 1200) {
    // Extra large devices (large laptops and desktops, 1200px and up)
    c.width = 1140;
  } else if (c.width < 1200 && c.width >= 992) {
    // Large devices (laptops/desktops, 992px and up)
    c.width = 960;
  } else if (c.width < 992 && c.width >= 768) {
    // Medium devices (landscape tablets, 768px and up)
    c.width = 720;
  } else if (c.width < 768 && c.width >= 600) {
    // Small devices (portrait tablets and large phones, 600px and up)
    c.width = 540;
  } else {
    // Extra small devices (phones, 600px and down)
  }
  
  c.height = window.innerHeight;
}

function selfWord() {
  
  let h1Size, h2Size;
  if (c.width >= 970) {
    h1Size = 50;
    h2Size = 42;
  } else {
    h1Size = 36;
    h2Size = 30;
  }
  
  ctx.fillStyle = "#FFF";
  ctx.textAlign = "center";
  ctx.shadowBlur = 1;
  ctx.shadowColor = "red";
  
  if (c.width >= 720){
    ctx.font = h1Size + "px Noto-Sans sans-serif";
    ctx.fillText("Chun Kit (Calvin) Li", c.width / 2, c.height / 3);

    ctx.font = h2Size + "px Noto-Sans sans-serif";
    ctx.fillText("Computational Mathematics & Statistics Student", c.width / 2, c.height / 3 + h1Size);

    ctx.font = h2Size + "px Noto-Sans sans-serif";
    ctx.fillText("University of Waterloo", c.width / 2, c.height / 3 + h1Size + h2Size);

    ctx.font = h2Size + "px Noto-Sans sans-serif";
    ctx.fillText("Class of 2020", c.width / 2, c.height / 3 + h1Size + h2Size * 2);
    
  } else if (c.width >= 540 && c.width < 720) {
    ctx.font = h1Size + "px Noto-Sans sans-serif";
    ctx.fillText("Chun Kit (Calvin) Li", c.width / 2, c.height / 3);

    ctx.font = h2Size + "px Noto-Sans sans-serif";
    ctx.fillText("Mathematics Student", c.width / 2, c.height / 3 + h1Size);

    ctx.font = h2Size + "px Noto-Sans sans-serif";
    ctx.fillText("University of Waterloo", c.width / 2, c.height / 3 + h1Size + h2Size);

    ctx.font = h2Size + "px Noto-Sans sans-serif";
    ctx.fillText("Class of 2020", c.width / 2, c.height / 3 + h1Size + h2Size * 2);
    
  } else {
    ctx.font = h1Size + "px Noto-Sans sans-serif";
    ctx.fillText("Hello", c.width / 2, c.height / 3);
    ctx.fillText("World", c.width / 2, c.height / 3 + h1Size);
    ctx.fillText("!", c.width / 2, c.height / 3 + h1Size * 2);
  }
  
}

//drawing the characters
function draw() {
  
	//Black BG for the canvas
	//translucent BG to show trail
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
	ctx.fillRect(0, 0, c.width, c.height);
  
  let char = "";
  
	//looping over drops
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
    
    ctx.fillText(char, i*font_size, drops[i]*font_size);
    
		//sending the drop back to the top randomly after it has crossed the screen
		//adding a randomness to the reset to make the drops scattered on the Y axis
		if(drops[i]*font_size > c.height && Math.random() > 0.975) {
			drops[i] = 0;
    }
		
		//incrementing Y coordinate
		drops[i]++;
    
    selfWord();
    ctx.shadowBlur = 0;   
	}
}

setInterval(draw, 33);