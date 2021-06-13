class LevelView {

    constructor(wallPath, floorPath, ctx) {
        this.wall = new Image();
        this.wallLoadDone = false;
        this.wall.onload = () => {this.wallLoadDone = true;};
        this.wall.src = wallPath;

        this.floor = new Image();
        this.floorLoadDone = false;
        this.floor.onload = () => {this.floorLoadDone = true;};
        this.floor.src = floorPath;

        this.ctx = ctx;
    } // end constructor()

    drawWall() {
        if (!this.wallLoadDone) return;
        this.ctx.drawImage(this.wall, 0, 0, 0, 0);
    } // end drawWall()

    drawFloor() {
        if (!this.floorLoadDone) return;
        this.ctx.drawImage(this.floor, 0, 0, 0, 0);
    } // end drawFloor()

    drawMap() {
        this.drawFloor();
        this.drawWall();
    } // end drawMap()

} // end class LevelView