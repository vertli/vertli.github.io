class ObjectView {

    constructor(path, ctx, colSize, rowSize) {
        this.img = new Image();
        this.imgLoadDone = false;
        this.img.onload = () => {this.imgLoadDone = true;};
        this.img.src = path;
        this.ctx = ctx;
        this.colSize = colSize;
        this.rowSize = rowSize;
    } // end constructor()

    draw(row, col, x, y) {
        if (!this.imgLoadDone) return;
        this.ctx.drawImage(this.img, col * this.colSize, row * this.rowSize,
            this.colSize, this.rowSize, x * this.colSize, y * this.rowSize,
            this.colSize, this.rowSize);
    } // end draw()

} // end asset