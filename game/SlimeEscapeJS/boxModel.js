class BoxModel extends ObjectModel {

    constructor(x, y) {
        super(x, y);
    } // end constructor

    pushUp() {
        this.setY(this.getY()-1);
    } // end pushUp()

    pushDown() {
        this.setY(this.getY()+1);
    } // end pushDown()

    pushLeft() {
        this.setX(this.getX()-1);
    } // end pushLeft()

    pushRight() {
        this.setX(this.getX()+1);
    } // end pushRight()

} // end class BoxModel