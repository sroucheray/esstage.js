import Stage from "Stage";
import Arc from "draw/Arc";
import Circle from "draw/Circle";
import Rect from "draw/Rect";
import Sprite from "draw/Sprite";
import Clip from "base/Clip";

let stage = new Stage(document.querySelector('canvas'));
let radius = 20;


let rect = new Rect({
    x: 100,
    y: 100,
    width: 50,
    height: 50
});

let rect2 = new Rect({
    x: 100,
    y: 100,
    width: 50,
    height: 50
});

let sprite = new Sprite("assets/Donatello.gif", [
    {x: 18, y: 0, width:55, height:101},
    {x: 85, y: 0, width:55, height:101},
    {x: 154, y: 0, width:55, height:101},
    {x: 221, y: 0, width:55, height:101},
    {x: 287, y: 0, width:55, height:101},
    {x: 361, y: 0, width:53, height:101},
    {x: 433, y: 0, width:55, height:101},
    {x: 501, y: 0, width:55, height:101},

    {x: 18, y: 100, width:55, height:101},
    {x: 85, y: 100, width:55, height:101},
    {x: 159, y: 100, width:55, height:101},
    {x: 230, y: 100, width:55, height:101},
    {x: 306, y: 101, width:55, height:101},
    {x: 380, y: 101, width:53, height:101},
    {x: 461, y: 101, width:66, height:101},
]);

let clip = new Clip();

rect2.fillStyle = "red";

clip.addChild(rect2);
clip.addChild(rect);

stage.addChild(clip);
stage.addChild(sprite);

rect.center(25, 25);

var rotation = 0;
var centerX = 0;
var scale = 0;
setInterval(function(){
        //console.log("will radius", circle.radius)
        rotation = rotation +  Math.PI / 180;

        rect.resetTransforms();
        //rect.rotateAroundCenter(rotation);
        scale += 0.1;
        //rect.scale(Math.sin(scale), Math.sin(scale))
        //rect.center(0, 0)
        //rect.skew(0, 1)
        //rect.scale(0.2, 1.5)
        rect.skew(1, 0)
        centerX++;
        clip.x = centerX;
}, 50)

for (var i = 0; i < 2; i++) {
/*    let circle = new Circle({
            x: i * radius * 3,
            y: 100,
            radius: radius
    });

    stage.addChild(circle);

    setTimeout(function(){
        console.log("will radius", circle.radius)
        circle.radius = circle.radius * 1.5;
        console.log("has radius", circle.radius)
    }, i * 1000)*/
    /*let rect = new Rect({
            x: i * radius * 3,
            y: 100,
            width: 50,
            height: 50
    });
    stage.addChild(rect);
    let rotation = 0;
    setInterval(function(){
        //console.log("will radius", circle.radius)
        rotation = rotation +  Math.PI / 360;
        console.log(">", rotation)

    }, i + 1000)*/
};


/*var arc = new Arc({
        x: 100,
        y: 100,
        radius: 10,
        startAngle: 0,
        endAngle: 2 * Math.PI,
        anticlockwise: false
    }, undefined , false);*/



/*for(let pixel of stage.image().pixels()){
    console.log(pixel);
}*/


//console.log(stage.image())
/*let image = stage.image().then(function(image){
    image.pixel(0, 0, {
        r:255,
        g:0,
        b:0,
        a:255
    });

    stage.addChild(image);
});*/

/*image.pixel(0, 0, {
    r:255,
    g:255,
    b:255,
    a:255
});*/




/*let canvas = document.querySelector('canvas');
let ctx = canvas.getContext("2d");
ctx.strokeStyle = "1px black";



let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
let data = imageData.data;
let width = canvas.width;
let height = canvas.height;

function drawPx(x, y){
    let srcPixel = (y * width + x) * 4;
    data[srcPixel] = 0;
    data[srcPixel + 1] = 0;
    data[srcPixel + 2] = 0;
    data[srcPixel + 3] = 255;
    //console.log("draw", x, y)
}

function* range (begin, end, interval = 1) {
    for (let i = begin; i < end; i += interval) {
        yield i;
    }
}

function draw() {
    for (let i = 0; i < data.length; i += 4) {
        data[i] = 0; //255 - data[i];     // red
        data[i + 1] = 0; //255 - data[i + 1]; // green
        data[i + 2] = 0; //255 - data[i + 2]; // blue
        data[i + 3] = 255; //255 - data[i + 2]; // blue
    }
    ctx.putImageData(imageData, 0, 0);
};

//draw();
//height

    for (let x of range(0, 100)) {
        drawPx(x, 0);
    }
for (let y of range(0, 100)) {
}
ctx.rotate(Math.PI);
ctx.putImageData(imageData, 0, 0);*/