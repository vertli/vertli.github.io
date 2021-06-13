class DoorModel extends ObjectModel {

    constructor(topLeftPos) {
        // (x, y) is the top left position
        super(topLeftPos[0], topLeftPos[1]);
        this.isOpened = false;
    } // end constructor()

    isOpened() {
        return this.isOpened;
    } // end getStatus()

    open() {
        this.isOpened = true;
    } // end open()

    close() {
        this.isOpened = false;
    } // end close()

    getTopLeftX() {
        return this.getX();
    } // end getTopLeftX()

    getTopLeftY() {
        return this.getY();
    } // end getTopLeftY()

} // end class DoorModel