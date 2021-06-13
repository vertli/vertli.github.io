class baseMap {

    constructor(ctx, asset, gridSize, floor, wall) {
        this.ctx = ctx;
        this.asset = asset;
        this.gridSize = gridSize;
        this.floor = floor;
        this.wall = wall;

        if (this.floor.length != this.wall.length) {
            throw new Error("The array of floor and the array of wall should have the same number of row.");
        }
        if (this.floor[0].length != this.wall[0].length) {
            throw new Error("The array of floor and the array of wall should have the same number of column.");
        }

        this.height = this.floor.length;
        this.width = this.floor[0].length;
    } // end constructor()

    draw() {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                this.asset.draw(this.floor[y][x][0], this.floor[y][x][1], x, y);
                if (this.wall[y][x]) { // not null
                    this.asset.draw(this.wall[y][x][0], this.wall[y][x][1], x, y);
                }
            } // end for(j)
        } // end for(i)
    } // end draw()

    drawFloor() {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                this.asset.draw(this.floor[y][x][0], this.floor[y][x][1], x, y);
            } // end for(j)
        } // end for(i)
    }

    drawWall() {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (this.wall[y][x]) { // not null
                    this.asset.draw(this.wall[y][x][0], this.wall[y][x][1], x, y);
                }
            } // end for(j)
        } // end for(i)
    }


    drawFloorGrid(x,y) {
        this.asset.draw(this.floor[y][x][0], this.floor[y][x][1], x, y);
    }

    drawWallGrid(x, y) {
        if (this.wall[y][x]) { // not null
            this.asset.draw(this.wall[y][x][0], this.wall[y][x][1], x, y);
        }
    }

    clear(x, y) {
        this.ctx.clearRect(x * this.gridSize, y * this.gridSize, this.gridSize, this.gridSize);
    } // end clear()

} // end baseMap()