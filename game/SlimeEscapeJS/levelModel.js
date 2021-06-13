class LevelModel {

    constructor(mapPassable, boxesInitPos, trapsInitPos, doorTopLeftPos, slimePos) {
        this.mapPassable = mapPassable;
        this.boxes = this.createBoxes(boxesInitPos);
        this.traps = this.createTraps(trapsInitPos);
        this.door = this.createDoor(doorTopLeftPos);
        this.slimeInitPos = slimePos;
    } // end constructor()

    getMapRow() {
        return this.mapPassable.length;
    } // end getMapRow()

    getMapCol() {
        return this.mapPassable[0].length;
    } // end getMapCol()

    createBoxes(position) {
        let dict = {};
        for (const idx in position) {
            let box = new BoxModel(position[idx][0], position[idx][1]);
            dict[position[idx]] = box;
            this.setPassable(position[idx][0], position[idx][1], 0);
        } // end for(idx)
        return dict;
    } // end createBoxes()

    isBox(x, y) {
        return this.boxes[[x, y]] !== undefined;
    } // end isBox()

    getBox(x, y) {
        if (!this.isBox(x, y)) throw "There is no box in the given position (" + x + ", " + y + ")!";
        return this.boxes[[x, y]];
    } // end getBox()

    getAllBoxes() {
        return this.boxes;
    } // end getAllBoxes()

    getAllBoxesKeys() {
        return Object.keys(this.boxes);
    } // end getAllBox()

    pushBox(box, direction) {
        this.setPassable(box.getX(), box.getY(), 1);
        delete this.boxes[[box.getX(), box.getY()]];

        if (direction === "up") box.pushUp();
        if (direction === "down") box.pushDown();
        if (direction === "left") box.pushLeft();
        if (direction === "right") box.pushRight();

        this.boxes[[box.getX(), box.getY()]] = box;

        this.setPassable(box.getX(), box.getY(), 0);

        return box;
    } // end pushBox()

    createTraps(position) {
        let dict = {};
        for (const idx in position) {
            let trap = new TrapModel(position[idx][0], position[idx][1], false);
            dict[position[idx]] = trap;
        } // end for(idx)
        return dict;
    } // end createTraps()

    getAllTraps() { 
        return this.traps; 
    } // end getAllTraps()

    isTrap(x, y) {
        return this.traps[[x, y]] !== undefined;
    } // end isTrap()

    resetTrapTrigger(x, y) {
        this.traps[[x, y]].setStatus();
    } // end resetTrapTrigger()

    isAllTrapTriggered() {
        for (let key in this.traps) {
            if (!this.traps[key].isTriggered()) return false;
        } // end for(key)
        return true;
    } // end isAllTrapTriggered()

    createDoor(topLeftPos) {
        let door = new DoorModel(topLeftPos);
        this.setPassable(topLeftPos[0], topLeftPos[1] + 1, 0);
        this.setPassable(topLeftPos[0] + 1, topLeftPos[1] + 1, 0);
        return door;
    } // end createDoor()

    getDoor() {
        return this.door;
    } // end getDoor()

    isDoorClosed() {
        return !this.door.getStatus();
    } // end isDoorClosed()

    openDoor() {
        this.door.open();
        this.setPassable(this.door.getTopLeftX(), this.door.getTopLeftY() + 1, 1);
        this.setPassable(this.door.getTopLeftX() + 1, this.door.getTopLeftY() + 1, 1);
    } // end operDoor()

    closeDoor() {
        this.door.close();
        this.setPassable(this.door.getTopLeftX(), this.door.getTopLeftY() + 1, 0);
        this.setPassable(this.door.getTopLeftX() + 1, this.door.getTopLeftY() + 1, 0);
    }

    getDoorTopLeftX() {
        return this.door.getTopLeftX();
    } // end getDoorTopLeftX()

    getDoorTopLeftY() {
        return this.door.getTopLeftY();
    } // end getDoorTopLeftY()

    setPassable(x, y, status) {
        this.mapPassable[y][x] = status;
    } // end setPassable()

    isPassable(x, y) {
        return this.mapPassable[y][x] === 1;
    } // end isPassable()

    getSlimeInitX() {
        return this.slimeInitPos[0];
    } // getSlimeInitX()

    getSlimeInitY() {
        return this.slimeInitPos[1];
    } // getSlimeInitY()

    getLeaveMapPositionY() {
        return this.door.getTopLeftY() + 1;
    } // end getLeaveMapPositions()

} // end LevelOne