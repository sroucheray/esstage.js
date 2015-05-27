import MovieClip from "base/MovieClip";
import ImageLoader from "utils/ImageLoader";

class Sprite extends MovieClip {
    constructor(url, framesParam){
        super();

        this.framesParam = framesParam;
        this.createFrames();
        let loader = new ImageLoader();
        loader.load(url).then((loader) => {
            this.images = loader.images;
        });
    }

    createFrames(){
        this.framesParam.forEach((frameParam, frameNum)=>{
            this.addFrameScript(frameNum, (stage, frameNum) => {
                this.currentFrameParam = frameParam;
            })
        });
    }

    draw(stage){
        super.draw(stage);
        if(!this.images){
            return;
        }
        let params = this.currentFrameParam;
        stage.ctx.drawImage(
            this.images[0],
            params.x, params.y, params.width, params.height,
            this.stageX, this.stageY, params.width, params.height);
    }
}


export default Sprite;