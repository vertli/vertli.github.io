class LevelOne {

    wall = [
        [[0,3], [0,1], [0,4], [0,1], [0,4], [0,1], [0,4], [0,1], [0,4], [0,5]],
        [[1,3], [1,1], [1,1], [1,1], [1,1], [1,1], [1,1], [1,1], [1,1], [1,5]],
        [[2,3], null,  null,  null,  null,  null,  null,  null,  null,  [2,5]],
        [[2,3], null,  null,  null,  null,  null,  null,  null,  null,  [2,5]],
        [[2,3], null,  null,  null,  null,  null,  null,  null,  null,  [2,5]],
        [[2,3], null,  null,  null,  null,  null,  null,  null,  null,  [2,5]],
        [[2,3], null,  null,  null,  null,  null,  null,  null,  null,  [2,5]],
        [[2,3], null,  null,  null,  null,  null,  null,  null,  null,  [2,5]],
        [[2,3], [2,4], [2,4], [4,4], null,  null,  [4,7], [2,4], [2,4], [2,5]],
        [[3,3], [3,4], [3,4], [5,0], null,  null,  [5,3], [3,4], [3,4], [3,5]],
        [null,  null,  null,  null,  null,  null,  null,  null,  null,  null]
    ];

    floor = [
        [[1,4], [1,4], [1,4], [1,4], [1,4], [1,4], [1,4], [1,4], [1,4], [1,4]],
        [[1,4], [1,4], [1,4], [1,4], [1,4], [1,4], [1,4], [1,4], [1,4], [1,4]],
        [[1,4], [2,0], [2,1], [2,2], [2,0], [2,1], [2,2], [2,0], [2,1], [1,4]],
        [[1,4], [3,1], [3,1], [3,1], [3,1], [3,1], [3,1], [3,1], [3,1], [1,4]],
        [[1,4], [3,1], [3,1], [3,1], [3,1], [3,1], [3,1], [3,1], [3,1], [1,4]],
        [[1,4], [3,1], [3,1], [3,1], [3,1], [3,1], [3,1], [3,1], [3,1], [1,4]],
        [[1,4], [3,1], [3,1], [3,1], [3,1], [3,1], [3,1], [3,1], [3,1], [1,4]],
        [[1,4], [3,1], [3,1], [3,1], [3,1], [3,1], [3,1], [3,1], [3,1], [1,4]],
        [[1,4], [3,1], [3,1], [3,1], [3,1], [3,1], [3,1], [3,1], [3,1], [1,4]],
        [[1,4], [1,4], [1,4], [1,4], [3,1], [3,1], [1,4], [1,4], [1,4], [1,4]],
        [[1,4], [1,4], [1,4], [1,4], [1,4], [1,4], [1,4], [1,4], [1,4], [1,4]]
    ]

    mapPassable = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]

    constructor(ctx, asset, gridSize) {
        this.ctx = ctx;
        this.asset = asset;
        this.gridSize = gridSize;

        this.map = new baseMap(ctx, asset, gridSize, this.floor, this.wall);
        
        this.numOfBoxes = 2;
        this.boxes = this.createBoxes([[5, 5], [6, 5]], this.numOfBoxes);

        this.numOfTraps = 2;
        this.traps = this.createTraps([[1, 2], [4, 6]], this.numOfTraps);

        this.door = new Door(this.asset, [4, 8]);
        this.setPassable(4, 9, 0);
        this.setPassable(5, 9, 0);
    } // end constructor()

    getMapRow() {
        return this.mapPassable.length;
    }

    getMapCol() {
        return this.mapPassable[0].length;
    }

    createBoxes(position, num) {
        let dict = {};
        for (let i = 0; i < num; i++) {
            let box = new Box(this.ctx, this.asset, position[i]);
            dict[position[i]] = box;
            this.setPassable(box.getX(), box.getY(), 0);
        } // end for(i)
        return dict;
    } // end createBoxes()

    createTraps(position, num) {
        let dict = {};
        for (let i = 0; i < num; i++) {
            let trap = new Trap(this.asset, position[i], false);
            dict[position[i]] = trap;
        } // end for(i)
        return dict;
    }

    getBox(x, y) {
        return (this.boxes[[x, y]] === undefined) ? null : this.boxes[[x, y]];
    } // end getBox()


    resetTrapTrigger(x, y) {
        this.traps[[x, y]].setStatus();
    }

    pushBox(box, newX, newY) {
        this.setPassable(box.getX(), box.getY(), 1);
        delete this.boxes[[box.getX(), box.getY()]];
        
        if (this.traps[[box.getX(), box.getY()]]) {
            this.resetTrapTrigger(box.getX(), box.getY());
            if (this.door.getDoorStatus() === 2) {
                this.door.closeDoorAnimation(this.map);
                this.setPassable(4, 9, 0);
            this.setPassable(5, 9, 0);
            }
        }

        box.setX(newX);
        box.setY(newY);
        
        this.boxes[[newX, newY]] = box;
        this.setPassable(newX, newY, 0);

        if (this.traps[[newX, newY]]) {
            this.resetTrapTrigger(newX, newY);
            if (this.door.getDoorStatus() === 0 && this.isAllTrapTriggered()) {
                this.door.openDoorAnimation(this.map);
                this.setPassable(4, 9, 1);
                this.setPassable(5, 9, 1);
            }
        }
    } // end pushBox()

    drawTrap() {
        for(let key in this.traps) {
            this.traps[key].draw();
        }
    }

    isAllTrapTriggered() {
        for (let key in this.traps) {
            if (!this.traps[key].isTriggered()) return false;
        }
        return true;
    }

    isDoorClosed() {
        return this.door.setDoorStatus === 0;
    }

    drawDoor() {
        this.door.draw();
    }

    drawFloor() {
        this.map.drawFloor();
    }

    drawWall() {
        this.map.drawWall();
    }

    drawBoxTop() {
        for (let key in this.boxes) {
            this.boxes[key].drawTop();
        }
    }

    drawBoxBody() {
        for (let key in this.boxes) {
            this.boxes[key].drawBody();
        }
    }

    drawFloorGrid(x,y) {
        this.map.drawFloorGrid(x,y);
    }

    drawWallGrid(x, y) {
        this.map.drawWallGrid(x,y);
    }

    setPassable(x, y, status) {
        this.mapPassable[y][x] = status;
    } // end setPassable()

    isPassable(x, y) {
        return this.mapPassable[y][x] === 1;
    } // end isPassable()

} // end LevelOne