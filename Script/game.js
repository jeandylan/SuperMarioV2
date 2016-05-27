/**
 * Created by dylan on 22-May-16.
 */
var Game=function () {
  this.level=0;

};

Game.prototype.renderLevel=function () {

};

var Level = function () {

}

Level.prototype.print=function () {
    jsp=AssetMgr.getAsset("marioHDold.json");
    console.log(jsp);
};

Level.prototype.renderMap=function () {

};

Level.prototype.renderPhysicObject=function () {

};



function float2int (value) {
    return value | 0;
}




function Map(path,mapTilePath){
    this.mapJsonPath=path;
    this.mapJsonGraphics;
    this.mapJsonPhysics=[];
    this.mapJsonData;
    this.mapTilesPath=mapTilePath;

    this.classifyData=function (array) {

        for(var i=0; i < array.layers.length; i++) {

            if (array.layers[i].name == "graphic") {
                this.mapJsonGraphics = array.layers[i].data;
            }
            if (array.layers[i].type == "objectgroup") {
               this.mapJsonPhysics.push(array.layers[i]);

            }
        }
    }

    this.renderGraphics=function () {
        var img= AssetMgr.getAsset(this.mapTilesPath);
        var canvas=document.getElementById("game");
        var ctx = canvas.getContext("2d");
        var posX=0;
        var posY=0;
        for (var i = 0; i < this.mapJsonGraphics.length; i++) {
            if ((i % 48) == 0) {
                posY += 68;
            }
            posX = (i % 48) * 67;
            if (this.mapJsonGraphics[i] != 0) {
                var yImageSource = float2int((this.mapJsonGraphics[i]-1) / 12) * 72;
                var xImageSource = (((this.mapJsonGraphics[i] - 1) % 12)) * 72; //seems good
               ctx.drawImage(img, xImageSource, yImageSource, 72, 72, posX, posY, 72, 72);  //change Y move the drawing to the right the whole drawing
//console.log(posX)
            }
        }
    }

    this.renderPhysicObject=function () {

        console.log(this.mapJsonPhysics);
        for (var i = 0; i < this.mapJsonPhysics.length; i++) {

            for (var z = 0; z < this.mapJsonPhysics[i].objects.length; z++) {
                console.log(this.mapJsonPhysics[i].name)
                box2d.createSingleBody({
                    name: this.mapJsonPhysics[i].name, shape: 'rectangle', density: 1, friction: 0.3, restitution: 0.6,
                    x: this.mapJsonPhysics[i].objects[z].x + (this.mapJsonPhysics[i].objects[z].width / 2) - (0.04 * (this.mapJsonPhysics[i].objects[z].x)),
                    y: this.mapJsonPhysics[i].objects[z].y + this.mapJsonPhysics[i].objects[z].height + 53,
                    width: this.mapJsonPhysics[i].objects[z].width,
                    height: this.mapJsonPhysics[i].objects[z].height, type: 'k'
                })
            }

        }
    }

    this.load=function () {
        var that=this;
        $.getJSON( "marioHDold.json", function( json ) {
           that.classifyData(json);
            that.renderGraphics();
            that.renderPhysicObject();


        });

    }
}

function float2int (value) {
    return value | 0;
}

function classifyDatas(array){

}




