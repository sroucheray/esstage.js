import CanvasImage from "esstage/draw/CanvasImage";
import Clip from "esstage/base/Clip";

class Stage extends Clip{
    constructor(canvas){
        super();

        this.children = [];
        this.canvas = canvas;
    }

    get width(){
        return this.canvas.width;
    }

    get height(){
        return this.canvas.height;
    }

    get stageX(){
        return 0;
    }

    get stageY(){
        return 0;
    }

    image(){
        return this.requestAnimationFrame().then(() => {
            return new CanvasImage(this.ctx.getImageData(0, 0, this.width, this.height));
        });
    }

    requestAnimationFrame(){
        window.cancelAnimationFrame(this._paintRequest);
        return new Promise((resolve) => {
            this._paintRequest = window.requestAnimationFrame(() => {
                this.paint();
                resolve();
            });
        });
    }

    set canvas(canvas){
        this._canvas = canvas;
        this.context = canvas.getContext("2d");
    }

    get canvas(){
        return this._canvas;
    }

    get ctx(){
        return this.context;
    }

    addChild(child){
        child.on("update", ()=>{
            this.requestAnimationFrame();
        });

        super.addChild(child);
    }

    beforeRender(child){
        this.ctx.save();
    }

    afterRender(child){
        this.ctx.restore();
    }

    paint(){
        this.ctx.clearRect(0, 0, this.width, this.height);
        if(!this.numChildren){
            return;
        }

        for(let child of this){
            this.beforeRender(child);
            child.draw(this);
            this.afterRender(child)
        }
    }
}

export default Stage;