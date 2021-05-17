class Door {

    constructor(asset, topLeftPosition) {
        this.asset = asset;
        this.x = topLeftPosition[0];
        this.y = topLeftPosition[1];
        this.status = 0;
        this.position = this.setDoorPosition(this.x, this.y);
    } // end constructor()

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    } // end sleep()

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
        return [[topLeftX, topLeftY], [topLeftX + 1, topLeftY],
        [topLeftX, topLeftY + 1], [topLeftX + 1, topLeftY + 1]];
    } // end setDoorPosition()

    isDoor(x, y) {
        for (let pos in this.position) {
            if (pos[0] === y && pos[1] === x) return true;
        } // end for()
        return false;
    } // end isDoor()

    draw() {
        for (let i = 0; i < 4; i++) {
            let x = this.position[i][0];
            let y = this.position[i][1];
            if (this.status === 0) {
                if (i === 0) this.asset.draw(4, 1, x, y);
                if (i === 1) this.asset.draw(4, 2, x, y);
                if (i === 2) this.asset.draw(5, 1, x, y);
                if (i === 3) this.asset.draw(5, 2, x, y);
            } else if (this.status === 1) {
                if (i === 0) this.asset.draw(4, 5, x, y);
                if (i === 1) this.asset.draw(4, 6, x, y);
                if (i === 2) this.asset.draw(5, 5, x, y);
                if (i === 3) this.asset.draw(5, 6, x, y);
            } else {
                if (i === 0) this.asset.draw(4, 8, x, y);
                if (i === 1) this.asset.draw(4, 6, x, y);
                if (i === 2) this.asset.draw(5, 8, x, y);
                if (i === 3) this.asset.draw(5, 6, x, y);
            } // end if..else(this.status)
        } // end for(i)
    } // end draw()

    async openDoorAnimation(map) {
        for (let i = 0; i < 3; i++) {
            this.status = i;
            for (let j = 0; j < 4; j++) {
                let x = this.position[j][0];
                let y = this.position[j][1];
                map.drawFloorGrid(x, y);
            } // end for(j)
            this.draw();
            await this.sleep(15);
        } // end for(i)
    } // end openDoorAnimation()

    async closeDoorAnimation(map) {
        for (let i = 2; i >= 0; i--) {
            this.status = i;
            for (let j = 0; j < 4; j++) {
                let x = this.position[j][0];
                let y = this.position[j][1];
                map.drawFloorGrid(x, y);
            } // end for(j)
            this.draw();
            await this.sleep(15);
        } // end for(i)
    }

} // end Door