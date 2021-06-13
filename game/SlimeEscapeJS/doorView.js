class DoorView extends ObjectView {

    constructor(path, ctx, colSize, rowSize) {
        super(path, ctx, colSize, rowSize);
    } // end constructor()

    // (x, y) is the top left position
    drawDoor(frame, x, y) {
        this.draw(0, frame, x, y);
    } // end drawDoor()

} // end class DoorView