let canvas = document.getElementById("gameCanvas");
canvas.width = 600;
canvas.height = 400;

let ctx = canvas.getContext("2d");

let asset;
let slime;
let map;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
} // end sleep()

async function gameStart() {

    asset = new Asset("./assets/asset.png", 32, ctx);
    while (!asset.isCompleted()) {
        await this.sleep(10);
    }

    slime = new Slime("./assets/redSlimeMove.png", 32, 32, 1, 2, ctx);
    while (!slime.isCompleted()) {
        await this.sleep(10);
    }
    slime.setUp();

    map = new LevelOne(ctx, asset, 32);
    updateMap("down");
}

function updateMap(direction) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    map.drawFloor();
    // map.drawBack();
    slime.draw(direction, 0);
    map.drawBoxBody();
    map.drawWall();
    map.drawBoxTop();
} // end updateMap()

document.addEventListener("keyup", (event) => {
    let x = slime.getX();
    let y = slime.getY();
    let direction;
    if (event.key == "ArrowUp") direction = "up";
    if (event.key == "ArrowDown") direction = "down";
    if (event.key == "ArrowLeft") direction = "left";
    if (event.key == "ArrowRight") direction = "right";

    if (event.key == "ArrowUp") {

        if (0 <= y-1 && map.isPassable(x, y-1)){
            slime.move("up", map);
        } else {
            let box = map.getBox(x, y-1);
            console.log(box);
            if (box && map.isPassable(x, y-2)) {
                console.log("push up");
                map.pushBox(box, x, y-2);
                console.log(box);
            }
        }
    } // end if

    if (event.key == "ArrowDown") {

        if ((y+1 < map.getMapRow()) && map.isPassable(x, y+1)) {
            slime.move("down", map);
        } else {
            let box = map.getBox(x, y+1);
            console.log(box);
            if (box && map.isPassable(x, y+2)) {
               map.pushBox(box, x, y+2);
              console.log("push down");
              console.log(box);
            }
        }
    } // end if

    if (event.key == "ArrowLeft") {
        if (0 <= x-1 && map.isPassable(x-1, y)) {
            slime.move("left", map);
        } else {
            let box = map.getBox(x-1, y);
            console.log(box);
            if (box && map.isPassable(x-2, y)) {
                map.pushBox(box, x-2, y);
                console.log("push left");
                console.log(box);
            } 
        }
    } // end if
    
    if (event.key == "ArrowRight") {
        if (0 <= x-1 && map.isPassable(x+1, y)) {
            slime.move("right", map);
        } else {
            let box = map.getBox(x+1, y);
            console.log(box);
            if (box && map.isPassable(x+2, y)) {
                map.pushBox(box, x+2, y);
                console.log("push right");
                console.log(box);
            }
        }
    } // end if
    
    updateMap(direction);

});