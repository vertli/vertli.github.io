class Slime {

    constructor(path, width, height, x, y, frameNum, gridSize, context) {
        this.img = new Image();
        this.img.src = path;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.frameNum = frameNum;
        this.gridSize = gridSize;
        this.ctx = context;
    } // end constructor()

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    } // end sleep()

    // sy: the y coordinate where to start clipping
    // drawImage() uses
    setSY(direction) {
        if (direction === "down") return 0;
        if (direction === "up") return this.gridSize;
        if (direction === "left") return this.gridSize * 2;
        if (direction === "right") return this.gridSize * 3;
    } // end setSY()

    load(direction, frame) {
        this.img.onload = () => {
            this.draw(direction, frame);
        }
    } // end load()

    draw(direction, frame) {
        this.sx = frame * this.width;
        this.sy = this.setSY(direction);
        this.ctx.drawImage(this.img, this.sx, this.sy, this.width, this.height, this.x, this.y, this.width, this.height);
    } // end draw()

    async move(direction, curX, curY, newX, newY, box, map) {
        
        for (let i = 0; i < this.frameNum; i++) {
            map.draw();
            box.draw();
            this.draw(direction, i);
            await this.sleep(20);
            this.x = this.x + (newX - curX) * (this.gridSize / (this.frameNum - 1));
            this.y = this.y + (newY - curY) * (this.gridSize / (this.frameNum - 1));
        }

        this.x = this.x - (newX - curX) * (this.gridSize / (this.frameNum - 1));
        this.y = this.y - (newY - curY) * (this.gridSize / (this.frameNum - 1));
    }
}