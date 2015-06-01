import PubSub from "utils/PubSub";

class SpriteAnalyser extends PubSub{
    constructor(imageData, params = {
            backgroundPixel: {r: 0, g: 0, b: 0, a: 0},
            borders: {top: 3, right: 3, bottom: 3, left:3}
        }){
        super();
        this.imageData = imageData;
        this.width = imageData.width;
        this.height = imageData.height;
        this.backgroundPixel = params.backgroundPixel;
        this.results = [];
        this.borders = params.borders;
    }

    isBackground(x, y){
        let {r, g, b, a} = this.getPixel(x, y);

        return (
            r === this.backgroundPixel.r &&
            g === this.backgroundPixel.g &&
            b === this.backgroundPixel.b &&
            a === this.backgroundPixel.a);
        //return false;
    }

    getPixel(x, y){
        let srcPixel = (y * this.imageData.width + x) * 4;

        return {
            r: this.imageData.data[srcPixel],
            g: this.imageData.data[srcPixel + 1],
            b: this.imageData.data[srcPixel + 2],
            a: this.imageData.data[srcPixel + 3]
        }
    }

    analyse(){
        this.results = [];
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                let existingResult = this.inExistingResult(x, y);
                if(existingResult){
                    //console.log(">in",x, y, existingResult)
                    x = x + existingResult.width - 1
                    continue;
                }
                //x = x + offset;
                if(this.isBackground(x, y)){
                    this.trigger("bg", {x:x, y:y, width : 1, height:1});
                    //console.log("isbg", x, y)
                }else{
                    let result = this.buildSprite(x, y);
                    console.log(result)
                    this.trigger("result", result);
                    this.results.push(result);
                    //return;
                }
            }
        }
        console.log("end", x, y)
    }

    inExistingResult(x, y){
        for(let result of this.results){
            if(
                x >= result.x &&
                x < result.x + result.width &&
                y >= result.y &&
                y < result.y + result.height){
                return result;
            }
        }
        //console.log("not is", x, y)

        return false;
    }

    isRowBackground(fromX, toX, y){
        for (let x = fromX; x <= toX; x++) {
            if(!this.isBackground(x, y)){
                return false
            }
        }

        return true;
    }

    isColBackground(fromY, toY, x){
        for (let y = fromY; y <= toY; y++) {
            if(!this.isBackground(x, y)){
                return false
            }
        }

        return true;
    }

    buildSprite(startX, startY, startWidth = 1, startHeight = 1, borders = {top: 1, right: 1, bottom: 1, left:1}){
        //console.log(startX, startY, startWidth, startHeight)
        let topRowIsBackground = this.isRowBackground(startX, startX + startWidth, startY);
        let bottomRowIsBackground = this.isRowBackground(startX, startX + startWidth, startY + startHeight);
        let leftColIsBackground = this.isColBackground(startY, startY + startHeight, startX);
        let rightColIsBackground = this.isColBackground(startY, startY + startHeight, startX + startWidth);

        if(!topRowIsBackground){
            startY = startY - 1;
            startHeight = startHeight + 1;
        }

        if(!bottomRowIsBackground){
            startHeight = startHeight + 1;
        }

        if(!leftColIsBackground){
            startX = startX - 1;
            startWidth = startWidth + 1;
        }

        if(!rightColIsBackground){
            startWidth = startWidth + 1;
        }

        startX = Math.max(0, startX);
        startY = Math.max(0, startY);
        //TODO: improve those limit
        startWidth = Math.min(startWidth, this.width);
        startHeight = Math.min(startHeight, this.height);
        //console.log(startX, startY, startWidth, startHeight, `(${this.width}, ${this.height})`)

        let hasBackgroundBorder = (topRowIsBackground && bottomRowIsBackground && leftColIsBackground && rightColIsBackground);
        let isFullArea = (startX === 0 && startWidth >= this.width && startY === 0 && startHeight >= this.height);

        //console.log(hasBackgroundBorder, isFullArea)
        if(hasBackgroundBorder || isFullArea){
            if(
                borders.top === this.borders.top &&
                borders.right === this.borders.right &&
                borders.bottom === this.borders.bottom &&
                borders.left === this.borders.left
            ){
                return {x: startX, y: startY, width: startWidth, height: startHeight};
            }

            if(this.borders.top > borders.top){
                borders.top++;
                startY = startY - 1;
                startHeight = startHeight + 1;
            }

            if(this.borders.left > borders.left){
                borders.left++;
                startX = startX - 1;
                startWidth = startWidth + 1;
            }

            if(this.borders.bottom > borders.bottom){
                borders.bottom++;
                startHeight = startHeight + 1;
            }

            if(this.borders.right > borders.right){
                borders.right++;
                startWidth = startWidth + 1;
            }
        }

        return this.buildSprite(startX, startY, startWidth, startHeight, borders);
    }
}

export default SpriteAnalyser;