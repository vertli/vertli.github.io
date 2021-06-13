class SlimeModel extends ObjectModel {

    constructor(x, y) {
        super(x, y);
    } // end constructor()

    setPos(x, y) {
        this.setX(x);
        this.setY(y);
    } // end setPos()

    goUp() {
        this.setY(this.getY()-1);
    } // end goUp()

    goDown() {
        this.setY(this.getY()+1);
    } // end goDown()

    goLeft() {
        this.setX(this.getX()-1);
    } // end goLeft()

    goRight() {
        this.setX(this.getX()+1);
    } // end goRight()

} // end class SlimeModel