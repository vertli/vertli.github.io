class GameMap {

    constructor(path, width, height, context) {
        this.img = new Image();
        this.img.src = path;
        this.width = width;
        this.height = height;
        this.ctx = context;
        
        // [y][x]
        this.mapAbleToPass = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
    }

    load() {
        this.img.onload = () => {
            this.draw();
        }
    }

    draw() {
        this.ctx.drawImage(this.img, 0, 0)
    }

    isPassable(x, y) {
        return this.mapAbleToPass[y][x];
    }

    getMapSizeX() {
        return this.mapAbleToPass.length;
    }

    getMapSizeY() {
        return this.mapAbleToPass[1].length;
    }
}