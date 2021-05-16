class Door {

    constructor(ctx, asset, topLeftPosition) {
        this.ctx = ctx;
        this.asset = asset;
        this.x = topLeftPosition[1];
        this.y = topLeftPosition[0];
        this.status = 2;
        this.position = this.setDoorPosition(this.x, this.y);
    } // end constructor()

    settopLeftX(x) {
        this.x = x;
    }

    settopLeftY(y) {
        this.y = y;
    }

    gettopLeftX() {
        return this.x;
    }

    gettopLeftY() {
        return this.y;
    }

    setDoorStatus(status) {
        this.status = status;
    }

    getDoorStatus() {
        return this.status;
    }

    setDoorPosition(topLeftX, topLeftY) {
        return [[topLeftY, topLeftX], [topLeftY, topLeftX+1], 
        [topLeftY+1, topLeftX], [topLeftY+1, topLeftX+1]];
    } // end setDoorPosition()

    isDoor(x, y) {
        for (let pos in this.position) {
            if (pos[0] === y && pos[1] === x) return true;
        } // end for()
        return false;
    } // end isDoor()

    draw() {
        for (let i = 0; i < 3; i++) {
            let x = this.position[i][0];
            let y = this.position[i][1];
            if (this.status === 0 || this.status === 1) {
                if (i === 0 || i === 1) {
                    this.asset.draw(4, i+1+(this.status*4), x, y);
                } else {
                    this.asset.draw(5, i-1+(this.status*4), x, y);
                } // end if..else
            } else { // this.status == 2
                if (i === 0) this.asset.draw(8, 4, x, y);
                if (i === 1) this.asset.draw(6, 4, x, y);
                if (i === 2) this.asset.draw(8, 5, x, y);
                if (i === 3) this.asset.draw(6, 5, x, y);
            } // end if..else(this.status)
        } // end for(i)
    } // end draw()

} // end Door