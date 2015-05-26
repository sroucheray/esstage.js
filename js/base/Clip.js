import Draw from "base/Draw";

class Clip extends Draw {
    constructor(params, styles){
        super(params, styles);
        this.children = [];
    }

    * [Symbol.iterator]() {
        for (let child of this.children) {
            yield child;
        }
    }

    bubbleEvent(event, originalChild){
        return (data) =>{
            if(!!this.parent){
                data = data || {};
                data.child = originalChild;
                this.trigger(event, data);
            }
        }
    }

    addChild(child){
        this.children.push(child);
        child.parent = this;
        this.trigger("child:added", child);
        child.on("update", this.bubbleEvent("update", child));
    }

    get numChildren(){
        return this.children.length;
    }

    hasChild(child){
        return this.children.indexOf(child) > -1;
    }

    beforeRender(child){
        if(!!this.parent){
            this.parent.beforeRender(child);
        }
    }

    afterRender(child){
        if(!!this.parent){
            this.parent.afterRender(child);
        }
    }

    draw(stage){
        super.draw(stage);
        if(!this.numChildren){
            return;
        }

        for(let child of this){
            this.beforeRender(child);
            child.draw(stage);
            this.afterRender(child)
        }
    }
}

export default Clip;