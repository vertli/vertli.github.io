class Asset {

    constructor(id, gridSize, ctx) {
        this.img = document.getElementById(id);
        this.img.remove();
        this.ctx = ctx;
        this.gridSize = gridSize;
    } // end constructor()

    draw(row, col, x, y) {
        if (0 <= col && col < 10 && 0 <= row && row < 10) {
            this.ctx.drawImage(this.img, col * this.gridSize, row * this.gridSize, 
                this.gridSize, this.gridSize, x * this.gridSize, y * this.gridSize, 
                this.gridSize, this.gridSize);
        } //end if
    } // end draw()

} // end asset