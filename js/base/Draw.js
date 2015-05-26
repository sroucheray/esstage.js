import PubSub from "utils/PubSub";

class Draw extends PubSub {
    constructor(params = {
        x: 0,
        y: 0
    }, styles = {
        strokeStyle: "black",
        fillStyle: "black",
        shadowOffsetX: 0.0,
        shadowOffsetY: 0.0,
        shadowBlur: 0.0,
        shadowColor: "transparent black"
    }) {
        super();
        this.assign(params);
        this.assign(styles);

        this.resetTransforms();

        this.center(0, 0);
        this.parent = null;
    }

    /* Dynamically assign properties to the class that trigger update when they are set */
    assign(properties) {
        for (let property in properties){
            Object.defineProperty(this, property, {
                get: function() {
                    return this[`_${property}`];
                },
                set: function(value) {
                    this[`_${property}`] = value;
                    this.trigger("update", {
                        property: property,
                        value: value
                    });
                }
            });

            this[property] = properties[property];
        }
    }

    get parent() {
        return this._parent;
    }

    set parent(value) {
        this._parent = value;
    }

    hasParent(){
        return !!this._parent && this.parent.hasChild(this);
    }

    center(x, y){
        this.centerX = x;
        this.centerY = y;
    }

    get stageX(){
        return this.x + this.parent.stageX;
    }

    get stageY(){
        return this.y + this.parent.stageY;
    }

    resetTransforms(){
        this.transforms = [];
    }

    transform(prop, val) {
        if(!arguments.length){
            return this;
        }

        if(arguments.length === 1){
            for(let aprop in prop){
                this.transform(aprop, prop[prop]);
            }

            return this;
        }

        this.transforms.push({prop: prop, value: val});

        this.trigger("update", {
            property: prop,
            value: val
        });

        return this;
    }

    rotateAround(rx, ry, angle){
        const centerX = this.stageX + this.centerX;
        const centerY = this.stageY + this.centerY;
        rx += this.stageX;
        ry += this.stageY;
        const radius = Math.sqrt(Math.pow(rx - centerX, 2) + Math.pow(ry - centerY, 2));
        const dx = rx + radius * Math.sin(angle);
        const dy = ry - radius * Math.cos(angle);

        this.transform("translate", [dx, dy]);
        this.transform("rotate", angle);
        this.transform("translate", [-dx, -dy]);

        return this;
    }

    rotateAroundCenter(angle){
        return this.rotateAround(this.centerX, this.centerY, angle);
    }

    scale(x = 1, y = 1){
        const centerX = this.stageX + this.centerX;
        const centerY = this.stageY + this.centerY;
        this.transform("translate", [centerX, centerY]);
        this.transform("scale", [x, y]);
        this.transform("translate", [-centerX, -centerY]);

        return this;
    }

    applyTransforms(stage){
        for (let {prop, value} of this.transforms) {
            value = Array.isArray(value) ? value : [value];
            if(prop === "rotate"){
                stage.ctx.rotate.apply(stage.ctx, value);
            } else if(prop === "translate"){
                stage.ctx.translate.apply(stage.ctx, value);
            } else if(prop === "scale"){
                stage.ctx.scale.apply(stage.ctx, value);
            }
        }
    }

    draw(stage) {
        stage.ctx.strokeStyle = this.strokeStyle;
        stage.ctx.fillStyle = this.fillStyle;
        stage.ctx.shadowOffsetX = this.shadowOffsetX;
        stage.ctx.shadowOffsetY = this.shadowOffsetY;
        stage.ctx.shadowBlur = this.shadowBlur;
        stage.ctx.shadowColor = this.shadowColor;

        this.applyTransforms(stage);

        return this;
    }
}

export default Draw;