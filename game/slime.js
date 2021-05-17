class Slime {

    constructor(moveID, width, height, x, y, ctx) {
        this.moveImg = document.getElementById(moveID);
        this.moveImg.remove();
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.moveFrameCol = this.moveImg.width / this.width ;
        this.moveFrameRow = this.moveImg.height / this.height ;
        this.dx = this.width / (this.moveFrameCol - 1);
        this.dy = this.height / (this.moveFrameRow - 1);
    } // end constructor()


    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
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

    draw(direction, frame) {
        this.sx = frame * this.width;
        this.sy = this.setSY(direction);
        this.ctx.drawImage(this.moveImg, this.sx, this.sy, this.width, this.height, 
            this.x * this.width, this.y * this.height, this.width, this.height);
    } // end draw()

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
            this.draw(direction, i);
            map.drawBoxBody();
            map.drawWallGrid(newX, newY);
            map.drawBoxTop();
            map.drawDoor();
            
            await this.sleep(15);
            this.x += (this.x - newX > 0) ? -this.dx:this.dx;
            this.y += (this.y - newY > 0) ? -this.dy:this.dy;
        }

        this.x = newX;
        this.y = newY;
        this.draw(direction, 0);
        map.drawBoxBody();
        map.drawWallGrid(newX, newY);
        map.drawDoor();
        map.drawBoxTop();
    }
}