class ObjectModel {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.preX = x;
        this.preY = y;
    } // end constructor

    getX() {
        return this.x;
    } // end getX()

    getY() {
        return this.y;
    } // end getY()

    getPreviousX() {
        return this.preX;
    } // end getPreviousX()

    getPreviousY() {
        return this.preY;
    } // end getPreviousY()

    setX(x) {
        this.preX = this.x;
        this.x = x;
    } // end setX()

    setY(y) {
        this.preY = this.y;
        this.y = y;
    } // end setY()

} // end class ObjectModel