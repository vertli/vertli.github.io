let canvas = document.getElementById("gameCanvas");
canvas.width = 600;
canvas.height = 400;

let ctx = canvas.getContext("2d");

let asset;
let slime;
let map;

async function gameStart() {
    asset = new Asset("asset", 32, ctx);
    slime = new Slime("redSlimeMove", 32, 32, 1, 2, ctx);
    map = new LevelOne(ctx, asset, 32);
    updateMap("down");
}

function updateMap(direction) {
    map.drawFloor();
    map.drawTrap();
    slime.draw(direction, 0);
    map.drawBoxBody();
    map.drawWall();
    map.drawDoor();
    map.drawBoxTop();
} // end updateMap()

gameStart();

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
            if (box && map.isPassable(x, y-2)) {
                map.pushBox(box, x, y-2);
            }
        }
    } // end if

    if (event.key == "ArrowDown") {

        if ((y+1 < map.getMapRow()) && map.isPassable(x, y+1)) {
            slime.move("down", map);
        } else {
            let box = map.getBox(x, y+1);
            if (box && map.isPassable(x, y+2)) {
               map.pushBox(box, x, y+2);
            }
        }
    } // end if

    if (event.key == "ArrowLeft") {
        if (0 <= x-1 && map.isPassable(x-1, y)) {
            slime.move("left", map);
        } else {
            let box = map.getBox(x-1, y);
            if (box && map.isPassable(x-2, y)) {
                map.pushBox(box, x-2, y);
            } 
        }
    } // end if
    
    if (event.key == "ArrowRight") {
        if (0 <= x-1 && map.isPassable(x+1, y)) {
            slime.move("right", map);
        } else {
            let box = map.getBox(x+1, y);
            if (box && map.isPassable(x+2, y)) {
                map.pushBox(box, x+2, y);
            }
        }
    } // end if
    
    updateMap(direction);

});