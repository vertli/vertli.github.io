class Asset {

    constructor(path, gridSize, ctx) {
        this.img = new Image();
        this.ctx = ctx;
        this.img.onload = () => {
            this.ctx.drawImage(this.img, 0, 0);
        };
        this.img.src = path;
        this.gridSize = gridSize;
    } // end constructor()

    isCompleted() {
        return this.img.complete;
    }

    draw(row, col, x, y) {
        if (0 <= x && x < 10 && 0 <= y && y < 10) {
            this.ctx.drawImage(this.img, col * this.gridSize, row * this.gridSize, 
                this.gridSize, this.gridSize, x * this.gridSize, y * this.gridSize, 
                this.gridSize, this.gridSize);
        } //end if
    } // end draw()

} // end asset