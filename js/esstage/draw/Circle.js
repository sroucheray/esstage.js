import Arc from "esstage/draw/Arc";
import _ from "underscore/object";

class Circle extends Arc {
    constructor(params = { x: 0, y: 0, radius: 10 }, styles, fill = true){
        super(undefined, styles, fill);
        _.assign(this, params)
    }

    draw(stage) {
        super.draw(stage);
    }
}


export default Circle;