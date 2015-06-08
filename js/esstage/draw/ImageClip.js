import Clip from "esstage/base/Clip";

class ImageClip extends Clip {
    constructor(image, width = undefined, height = undefined, x = 0, y = 0){
        super();
        this.assign({
            image: image
        });
        this.width = width === undefined ? image.width : width;
        this.height = height === undefined ? image.height : height;
        this.x = x;
        this.y = y;
    }

    draw(stage) {
        super.draw(stage);
        stage.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        return this;
    }
}


export default ImageClip;