class SlimeView extends ObjectView {

    constructor(path, ctx, colSize, rowSize) {
        super(path, ctx, colSize, rowSize);
        this.frameCol = this.img.width / this.colSize;
        this.frameRow = this.img.height / this.rowSize;
    } // end constructor()

    drawSlime(direction, frame, x, y) {
        if (direction === "down") this.draw(frame, 0, x, y);
        if (direction === "up") this.draw(frame, 1, x, y);
        if (direction === "left") this.draw(frame, 2, x, y);
        if (direction === "right") this.draw(frame, 3, x, y);
    } // end drawSlime()

} // end SlimeView