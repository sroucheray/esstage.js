class ImageLoader {
    load(param){
        if(typeof param === "string"){
            param = [param];
        }
        var promises = param.map((url)=>{
            return new Promise(function(resolve, reject){
                let image = new Image()
                image.onload = ()=>{
                    resolve(image);
                };
                image.src= url;
            });
        })
        return Promise.all(promises).then((images)=>{
            this.images = images;
            return this;
        });
    }

    imagesData(){
        return this.images.map((image)=>{
            let canvas = document.createElement("canvas");
            canvas.width = image.width;
            canvas.height = image.height;
            let context = canvas.getContext("2d");
            context.drawImage(image, 0, 0);
            return context.getImageData(0, 0, image.width, image.height);
        });
    }
}

export default ImageLoader;