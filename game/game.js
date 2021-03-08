let canvas = document.getElementById("gameCanvas");
canvas.width = 600;
canvas.height = 400;

let context = canvas.getContext("2d");

let curX = 0, curY = 4;
let whiteSmile;
let map;

function gameStart() {
    map = new GameMap("./assets/tempMap.png", 320, 320, context);
    whiteSmile = new Slime("./assets/redSlimeMove.png", 32, 32, curX * 32, curY * 32, 10, 32, context);
    console.log(whiteSmile);
    map.load();
    whiteSmile.load("down", 0);
}

document.addEventListener("keyup", (event) => {
    if (event.key == "ArrowUp") {
        if ((0 <= curY - 1) && map.isPassable(curX, curY - 1)) {
            whiteSmile.move("up", curX, curY, curX, curY - 1, map);
            curY = curY - 1;
        }
    } else if (event.key == "ArrowDown") {
        if ((curY + 1 < map.getMapSizeY()) && map.isPassable(curX, curY + 1)) {
            whiteSmile.move("down", curX, curY, curX, curY + 1, map);
            curY = curY + 1;
        }
    } else if (event.key == "ArrowLeft") {
        if ((0 <= curX - 1) && map.isPassable(curX - 1, curY)) {
            whiteSmile.move("left", curX, curY, curX - 1, curY, map);
            curX = curX - 1;
        }
    } else if (event.key == "ArrowRight") {
        if ((curX + 1 < map.getMapSizeX()) && map.isPassable(curX + 1, curY)) {
            whiteSmile.move("right", curX, curY, curX + 1, curY, map);
            curX = curX + 1;
        }
    }
});