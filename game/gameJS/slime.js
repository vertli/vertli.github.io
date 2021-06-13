class Slime {

    constructor(moveID, pushID, width, height, x, y, ctx) {
        this.moveImg = document.getElementById(moveID);
        this.moveImg.remove();
        this.pushImg = document.getElementById(pushID);
        this.pushImg.remove();
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.pushFrameCol = this.pushImg.width / this.width;
        this.pushFrameRow = this.pushImg.height / this.height;
        this.moveFrameCol = this.moveImg.width / this.width;
        this.moveFrameRow = this.moveImg.height / this.height;
        this.dx = this.width / (this.moveFrameCol - 1);
        this.dy = this.height / (this.moveFrameRow - 1);
    } // end constructor()


    sleep() {
        return new Promise(resolve => setTimeout(resolve, 10));
    } // end sleep()

    getX() {return this.x};
    getY() {return this.y};

    // sy: the y coordinate where to start clipping
    // drawImage() uses
    setSY(direction) {
        if (direction === "down") return 0;
        if (direction === "up") return this.height;
        if (direction === "left") return this.height * 2;
        if (direction === "right") return this.height * 3;
    } // end setSY()

    draw(direction, img, frame) {

        if (img === "move") img = this.moveImg;
        if (img === "push") img = this.pushImg;
        
        this.sx = frame * this.width;
        this.sy = this.setSY(direction);
        this.ctx.drawImage(img, this.sx, this.sy, this.width, this.height, 
            this.x * this.width, this.y * this.height, this.width, this.height);
    } // end draw()

    async push(direction, map, box) {
        let boxX = box.getX();
        let boxY = box.getY();
        let newX = boxX;
        let newY = boxY;
        if (direction === "up") newY--;
        if (direction === "down") newY++;
        if (direction === "left") newX--;
        if (direction === "right") newX++;

        for (let i = 0; i < 2; i++) {
            map.drawFloorGrid(this.x, this.y);
            map.drawTrap();
            this.draw(direction,this.pushImg, i);
            map.drawBoxBody();
            map.drawWallGrid(this.x, this.y);
            map.drawBoxTop();
            map.drawDoor();
            await this.sleep();
        } // end for(i)

        console.log("Rmove Box from Map");
        map.deleteBox(box);
        console.log(map.boxes);

        let dx = (newX - boxX) / (this.pushFrameCol-2);
        let dy = (newY - boxY) / (this.pushFrameCol-2);
        for (let i = 3; i < this.pushFrameCol; i++) {
            map.drawFloorGrid(this.x, this.y);
            map.drawFloorGrid(boxX, boxY-1);
            map.drawFloorGrid(newX, newY-1);
            map.drawFloorGrid(boxX, boxY);
            map.drawFloorGrid(newX, newY);
            map.drawWallGrid(boxX, boxY-1);
            map.drawWallGrid(newX, newY-1);
            map.drawWallGrid(boxX, boxY);
            map.drawWallGrid(newX, newY);
            map.drawTrap();
            this.draw(direction,"push", i);
            if (direction === "left" || direction === "right") box.setX(boxX + dx * (i-2));
            if (direction === "up" || direction === "down") box.setY(boxY + dy * (i-2));
            box.drawBody();
            map.drawBoxBody();
            map.drawWallGrid(this.x, this.y);
            box.drawTop();
            map.drawBoxTop();
            map.drawDoor();
            await this.sleep();
        } // end for(i)

        box.setX(newX);
        box.setY(newY);

        map.addBox(box);

        map.drawFloor();
        map.drawTrap();
        this.draw(direction, "move", 0);
        map.drawBoxBody();
        map.drawWall();
        map.drawDoor();
        map.drawBoxTop();
    } // end push()

    async move(direction, map) {
        let oldX = this.x;
        let oldY = this.y;
        let newX = this.x;
        let newY = this.y;
        if (direction === "up") newY--;
        if (direction === "down") newY++;
        if (direction === "left") newX--;
        if (direction === "right") newX++;

        for (let i = 0; i < this.moveFrameCol; i++) {
            map.drawFloorGrid(oldX, oldY);
            map.drawWallGrid(oldX, oldY);
            map.drawFloorGrid(newX, newY);
            map.drawTrap();
            this.draw(direction,"move", i);
            map.drawBoxBody();
            map.drawWallGrid(newX, newY);
            map.drawBoxTop();
            map.drawDoor();
            
            await this.sleep();
            this.x += (this.x - newX > 0) ? -this.dx:this.dx;
            this.y += (this.y - newY > 0) ? -this.dy:this.dy;
        }

        this.x = newX;
        this.y = newY;

        map.drawFloor();
        map.drawTrap();
        this.draw(direction, "move", 0);
        map.drawBoxBody();
        map.drawWall();
        map.drawDoor();
        map.drawBoxTop();
    }
}