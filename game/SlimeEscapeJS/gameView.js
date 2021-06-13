class GameView {

    constructor() {
        this.canvas = document.getElementById("gameCanvas");
        this.canvas.width = 13 * 32;
        this.canvas.height = 18 * 32;
        thisctx = canvas.getContext("2d");
    } // end constructor

} // end class GameView



let slimeView = new SlimeView("./assets/greenSlimeMove.png", ctx, 32, 32);
let boxView = new BoxView("./assets/box.png", ctx, 32, 64);
let doorView = new DoorView("./assets/door.png", ctx, 64, 64);

async function pushBoxAnimation(direction, moveBox) {

    let isPreviousBehindWall = !map.isPassable(moveBox.previousX(), moveBox.previousY() + 1);
    let isCurrentBehindWall = !map.isPassable(moveBox.getX(), moveBox.getY() + 1);
    let frameArr = [0, 0, 0];
    if (!isPreviousBehindWall && !isCurrentBehindWall) {
        frameArr = [1, 1, 1];
    } // end if
    if (!isPreviousBehindWall && isCurrentBehindWall && direction === "left") {
        frameArr = [0, 3, 1];
    } // end if
    if (!isPreviousBehindWall && isCurrentBehindWall && direction === "right") {
        frameArr = [0, 2, 1];
    } // end if
    if (isPreviousBehindWall && !isCurrentBehindWall && direction === "left") {
        frameArr = [1, 2, 0];
    } // end if
    if (isPreviousBehindWall && !isCurrentBehindWall && direction === "right") {
        frameArr = [1, 3, 0];
    } // end if

    for (let i = 0; i < 3; i++) {
        drawCurrentMap();

        let boxes = map.getAllBoxes();
        for (let box in boxes) {
            if (boxes !== moveBox) {
                if (map.isPassable(box.getX(), box.getY() + 1)) {
                    boxView.drawBox(0, box.getX(), box.getY());
                } else {
                    boxView.drawBox(1, box.getX(), box.getY());
                } // end if..else
            } // end if
        } // end for(box)

        if (i === 0) {
            boxView.drawBox(frameArr[0], moveBox.previousX(), moveBox.previousY());
        } else if (i === 1) {
            let dx = moveBox.getPreviousX() + (direction === "left") ? -16 : (direction === "right") ? +16 : 0;
            let dy = moveBox.getPreviousY() + (direction === "up") ? -16 : (direction === "down") ? +16 : 0;
            boxView.drawBox(frameArr[1], dx, moveBox.previousY());
        } else {
            boxView.drawBox(frameArr[2], moveBox.getX(), moveBox.getY());
        } // end if..else if..else

        slimeView.drawSlime(direction, 0, slime.getX(), slimegetY());

        sleep();
    } // end for(i)

} // end pushBoxAnimation()

async function SlimeWalkAnimation(direction) {
    for (let i = 0; i < 10; i++) {
        drawCurrentMap(direction);
        drawAllBoxes();
        let x = slime.getPreviousX() + (direction === "left") ? Math.floor(-3.2 * i) : (direction === "right") ? Math.floor(3.2 * i) : 0;
        let y = slime.getPreviousY();
        if (direction === "left" || direction === "right") {
            if (i === 1 || i === 7) y += 4;
            if (i === 2 || i === 6) y += 8;
            if (i === 3 || i === 5) y += 12;
            if (i === 4) y += 16;
        } else {
            y = y + 4 * i * (direction === "up") ? -1 : 1; 
        } // end if..else
        slimeView.drawSlime(direction, i, x, y);
        sleep();
    } // end for(i)
} // end SlimeWalkAnimation()

async function DoorAnimation(direction) {
    frame = [3, 1, 0];
    if (map.isDoorClosed) frame = [0, 1, 2];
    for (let i = 0; i < 3; i++) {
        mapView.drawMap();
        drawAllBoxes();
        doorView.drawDoor(frame[i], map.getDoorTopLeftX(), map.getDoorTopLeftY());
        slimeView.drawSlime(direction, 0, slime.getX(), slimegetY());
        sleep();
    } // end for(i)
} // end DoorAnimation

function drawCurrentMap(direction) {
    mapView.drawMap();
    doorView.drawDoor(
        map.isDoorClosed() ? 0 : 2,
        map.getDoorTopLeftX(),
        map.getDoorTopLeftY());
} // end drawCurrentState()

function drawAllBoxes() {
    let keySet = map.getAllBoxesKeys();
    for (let i = 0; i < keySet.length; i++) {
        let key = keySet[i].split(",");
        key[0] = parseInt(key[0]);
        key[1] = parseInt(key[1]);
        if (map.isPassable(key[0], key[1] + 1)) {
            boxView.drawBox(0, key[0], key[1]);
        } else {
            boxView.drawBox(1, key[0], key[1]);
        } // end if..else
    } // end for(box)
}

function drawAll(direction) {
    drawCurrentMap(direction);
    drawAllBoxes();
    slimeView.drawSlime(direction, 0, slime.getX(), slime.getY());
} // end drawAll()