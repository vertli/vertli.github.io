let canvas = document.getElementById("gameCanvas");
canvas.width = 600;
canvas.height = 400;

let context = canvas.getContext("2d");

let curX = 0, curY = 4;
let whiteSmile;
let map;
let box;

function gameStart() {
    map = new GameMap("./assets/tempMap.png", 320, 320, context);
    whiteSmile = new Slime("./assets/redSlimeMove.png", 32, 32, curX * 32, curY * 32, 10, 32, context);
    box = new Box("./assets/woodBox.png", 32, 32, 5, 5, context);
    console.log(whiteSmile);
    map.load();
    whiteSmile.load("down", 0);
    box.load();
}

function updateMap(direction) {
    map.draw();
    box.draw();
    whiteSmile.draw(direction, 0);
}

document.addEventListener("keyup", (event) => {
    if (event.key == "ArrowUp") {
        if ((0 <= curY - 1) && map.isPassable(curX, curY - 1)) {
            if (box.getX() == curX && box.getY() == curY - 1 && map.isPassable(curX, curY - 2)) {
                box.setY(box.getY()-1);
                updateMap("up");
            } else if (!(box.getX() == curX && box.getY() == curY - 1)) {
                whiteSmile.move("up", curX, curY, curX, curY - 1, box, map);
                curY = curY - 1;
            }
        }
    } else if (event.key == "ArrowDown") {
        if ((curY + 1 < map.getMapSizeY()) && map.isPassable(curX, curY + 1)) {
            if (box.getX() == curX && box.getY() == curY + 1 && map.isPassable(curX, curY + 2)) {
                box.setY(box.getY()+1);
                updateMap("down");
            } else if (!(box.getX() == curX && box.getY() == curY + 1)) {
                whiteSmile.move("down", curX, curY, curX, curY + 1, box, map);
                curY = curY +1 ;
            }
        }
    } else if (event.key == "ArrowLeft") {
        if ((0 <= curX-1) && map.isPassable(curX-1, curY)) {
            if (box.getX() == curX-1 && box.getY() == curY && map.isPassable(curX-2, curY)) {
                box.setX(box.getX()-1);
                updateMap("left");
            } else if (!(box.getX() == curX-1 && box.getY() == curY)) {
                whiteSmile.move("left", curX, curY, curX-1, curY,  box, map);
                curX = curX - 1;
            }
        }
    } else if (event.key == "ArrowRight") {
        if ((curX + 1 < map.getMapSizeX()) && map.isPassable(curX + 1, curY)) {
            if (box.getX() == curX+1 && box.getY() == curY && map.isPassable(curX+2, curY)) {
                box.setX(box.getX()+1);
                updateMap("right");
            } else if (!(box.getX() == curX+1 && box.getY() == curY)) {
                whiteSmile.move("right", curX, curY, curX + 1, curY, box, map);
                curX = curX + 1;
            }
        }
    }
});