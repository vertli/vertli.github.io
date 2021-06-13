class BoxView extends ObjectView {

    constructor(path, ctx, colSize, rowSize) {
        super(path, ctx, colSize, rowSize);
    } // end constructor

    drawBox(frame, x, y) {
        this.draw(0, frame, x, y-1);
    }

} // end class BoxView