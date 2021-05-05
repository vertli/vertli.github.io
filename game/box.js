class Box {

    constructor(path, width, height, x, y, context) {
        this.img = new Image();
        this.img.src = path;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.ctx = context;
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

    load() {
        this.img.onload = () => {
            this.draw();
        }
    } // end load()

    draw() {
        this.ctx.drawImage(this.img, this.width * this.x, this.height * this.y);
    }

} // end Box