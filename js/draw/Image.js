import Draw from "base/Draw";

class Image extends Draw {
    constructor(image, width = 0, height = 0, x = 0, y = 0){
        super();
        this.image = image;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
    }

    draw(stage) {
        stage.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        return this;
    }
}


export default Image;