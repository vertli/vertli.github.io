let c = document.getElementById("c_matrix");
let font_size = 16;
let ctx, columns, drops, rectX;

function init() {
    ctx = c.getContext("2d");
    setCanvasSize();
    columns = Math.floor((c.width - rectX) / font_size); // number of columns for the rain
    drops = []; // an array of drops - one pre column
    //x below is the x coordinate
    //1 = y co-ordinate of the drop(same for every drop initially)
    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    } // end for(x)
}

function reset() {
    setCanvasSize();
    newCol = Math.floor((c.width - rectX) / font_size); // number of columns for the rain
    temp = [];

    if (newCol <= columns) {
        for (let x = 0; x < newCol; x++) {
            temp[x] = drops[x];
        } // end for(x)
    } else {
        temp = drops;
        for (let x = columns; x < newCol; x++) {
            temp[x] = drops[x - columns];
        } // end for(x)
    }
    columns = newCol;
    drops = temp;
}

function setCanvasSize() {
    c.width = window.innerWidth;

    if (c.width >= 1200) {
        // Extra large devices (large laptops and desktops, 1200px and up)
        size = 1140;
    } else if (c.width < 1200 && c.width >= 992) {
        // Large devices (laptops/desktops, 992px and up)
        size = 960;
    } else if (c.width < 992 && c.width >= 768) {
        // Medium devices (landscape tablets, 768px and up)
        size = 720;
    } else if (c.width < 768 && c.width >= 600) {
        // Small devices (portrait tablets and large phones, 600px and up)
        size = 540;
    } 
    
    if (size >= 540) {
        rectX =  (c.width - size) / 2;
        c.width = c.width - rectX; 
    } else {
        rectX = c.width * 0.05;
        c.width = c.width * 0.95;
    }
    
    c.height = window.innerHeight - 30;
}

//drawing the characters
function draw() {

    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
	ctx.fillRect(rectX, 0, c.width, c.height);
  
    let char = "";
  
    //looping over drops
	for(let i = 0; i < drops.length; i++) {
    
        ctx.fillStyle = "#0F0"; //green text
        ctx.font = font_size + "px Roboto";
        
        if (Math.round(Math.random())){
            char = String.fromCharCode(0x0041 + Math.round(Math.random()*25)); // A - Z
        } else {
            char = String.fromCharCode(0x0061 + Math.round(Math.random()*25)); // a - z
        } // end if..else..
        
        ctx.fillText(char, rectX + i*font_size, drops[i]*font_size);
        
        //sending the drop back to the top randomly after it has crossed the screen
        //adding a randomness to the reset to make the drops scattered on the Y axis
        if(drops[i]*font_size > c.height && Math.random() > 0.975) {
            drops[i] = 0;
        } // end if
            
        //incrementing Y coordinate
        drops[i]++;
        
        ctx.textAlign = "start";
        ctx.shadowBlur = 0;   
	} // end for(i)
} // end draw()

setInterval(draw, 33);