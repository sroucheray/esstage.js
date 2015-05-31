importScripts("../../node_modules/traceur/bin/traceur.js");
importScripts("../../node_modules/es6-module-loader/dist/es6-module-loader.js");
System.baseURL  = "/js/";
System.paths["underscore/*"] = "../node_modules/lodash-es/*.js"



onmessage = function(e) {
    var imageData = e.data.imageData;

    System.import("tools/SpriteAnalyser").then(function(imports){
        var SpriteAnalyser = imports.default;
        console.log(imageData, imageData.width,imageData.height)
        var spriteAnalyser = new SpriteAnalyser(imageData);

        spriteAnalyser.on("result", function(data){
            //console.log(data);
            postMessage(data);
        });
        /*spriteAnalyser.on("bg", function(data){
            //console.log(data);
            data.isBG = true;
            postMessage(data);
        });*/

        spriteAnalyser.analyse();
    });



};