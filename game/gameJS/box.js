class Box {

    constructor(ctx, asset, position) {
        this.ctx = ctx;
        this.asset = asset;
        this.x = position[0];
        this.y = position[1];
    } // end constructor()

    setX(x) {
        this.x = x;
    }

    setY(y) {
        this.y = y;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    isBoxBody(x, y) {
        return this.x === x && this.y === y;
    } // end isBoxBody()

    isBoxTop(x, y) {
        return this.x === x && this.y-1 === y;
    } // end isBoxTop()

    drawTop() {
        this.asset.draw(4, 9, this.x, this.y-1);
    }

    drawBody() {
        this.asset.draw(5, 9, this.x, this.y);
    } // end draw()

} // end Box