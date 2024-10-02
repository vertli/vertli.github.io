class Trap {

    constructor(asset, position, status) {
        this.asset = asset;
        this.x = position[0];
        this.y = position[1];
        this.status = status;
    } // end constructor()

    isTriggered() {
        return this.status;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    setStatus() {
        this.status = !this.status;
    }

    draw() {
        if (!this.status) this.asset.draw(3, 0, this.x, this.y);
    }

} // end class Trap