class GameController {

    constructor(slime) {
        this.slime = slime;
        this.endCurLvl = false;
        this.isMoved = [false, false]; // [box, slime]
    } // end constructor

    setMap(curLvl) {
        switch (curLvl) {
            case 1: return new LevelOneModel();
            // add the rest
        } // end switch
    } // setMap()

    update(choice) {
        this.isMoved = [false, false];
        let curX = slime.getCurX();
        let curY = slime.getCurY();
        if (choice === 0) {
            this.moveUp(curX, curY);
        } // end if
        if (choice === 1) {
            this.moveDown(curX, curY);
        } // end if
        if (choice === 2) {
            this.moveLeft(curX, curY);
        } // end if
        if (choice === 3) {
            this.moveRight(curX, curY);
        } // end if
        return this.isMoved;
    } // end update()

    moveUp(curX, curY) {
        if (isBox(curX, curY - 1) && map.isPassable(curX, curY - 2)) {
            let box = map.getBox(curX, curY - 1);
            box = map.pushBox(box, "up");
            setTrip(box);
            this.isMoved[0] = true;
        } else if (0 < curY && map.isPassable(curX, curY - 1)) {
            slime.goUp();
            this.isMoved[1] = true;
        } // end if..else if
    } // end moveUp()

    moveDown(curX, curY) {
        if (isBox(curX, curY + 1) && map.isPassable(curX, curY + 2)) {
            let box = map.getBox(curX, curY + 1);
            box = map.pushBox(box, "down");
            setTrip(box);
            this.isMoved[0] = true;
        } else if (curY < map.getMapRow() && map.isPassable(curX, curY + 1)) {
            slime.goDown();
            this.isMoved[1] = true;
        } else if (curY === map.getLeaveMapPositionY()) {
            endCurLvl = true;
        } // end if..else if
    } // end moveDown()

    moveLeft(curX, curY) {
        if (isBox(curX - 1, curY) && map.isPassable(curX - 2, curY)) {
            let box = map.getBox(curX - 1, curY);
            box = map.pushBox(box, "left");
            setTrip(box);
            this.isMoved[0] = true;
        } else if (0 < curX && map.isPassable(curX - 1, curY)) {
            slime.goLeft();
            this.isMoved[1] = true;
        } // end if..else if
    } // end moveLeft()

    moveRight(curX, curY) {
        if (isBox(curX + 1, curY) && map.isPassable(curX + 2, curY)) {
            let box = map.getBox(curX + 1, curY);
            box = map.pushBox(box, "right");
            setTrip(box);
            this.isMoved[0] = true;
        } else if (curX < map.getMapCol() && map.isPassable(curX + 1, curY)) {
            slime.goRight();
            this.isMoved[1] = true;
        } // end if..else if
    } // end moveRight()

    setTrip(box) {
        if (map.isTrap(box.getPreviousX(), box.getPreviousY())) {
            map.resetTrapTrigger(box.getPreviousX(), box.getPreviousY());
        } // end if
        if (map.isTrap(box.getX(), box.getY())) {
            map.resetTrapTrigger(x, y);
        } // end if
    } // end setTrip()

    modifyDoorStatus() {
        if (map.isAllTrapTriggered() && map.isDoorClosed()) {
            map.openDoor();
            return 1;
        } // end if
        if (!map.isAllTrapTriggered() && !map.isDoorClosed()) {
            map.closeDoor();
            return 2;
        } // end if
        return 0;
    } // end modifyDoorStatus()

    checkEndCurLvl() {
        return this.endCurLvl;
    } // end checkEndCurLvl()

} // end class GameController

