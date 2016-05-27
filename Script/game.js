/**
 * Created by dylan on 22-May-16.
 */
var AssetMgr = new AssetManager();
function float2int (value) {
    return value | 0;
}

function Map(path,mapTilePath) {
    this.mapJsonPath = path;
    this.mapJsonGraphics;
    this.mapJsonPhysics = [];
    this.mapJsonData;
    this.mapTilesPath = mapTilePath;

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
            }
        }
    }

    this.renderPhysicObject=function () {
        for (var i = 0; i < this.mapJsonPhysics.length; i++) {

            for (var z = 0; z < this.mapJsonPhysics[i].objects.length; z++) {
                //console.log(this.mapJsonPhysics[i].name)
                box2d.createSingleBody({
                    name: this.mapJsonPhysics[i].name, shape: 'rectangle', density: 1, friction: 0.3, restitution: 0.6,
                    x: this.mapJsonPhysics[i].objects[z].x + (this.mapJsonPhysics[i].objects[z].width / 2) - (0.04 * (this.mapJsonPhysics[i].objects[z].x)),
                    y: this.mapJsonPhysics[i].objects[z].y + (this.mapJsonPhysics[i].objects[z].height/2),
                    width: this.mapJsonPhysics[i].objects[z].width,
                    height: this.mapJsonPhysics[i].objects[z].height,
                    type: 'k'
                })
            }

        }
    }

    this.load=function () {
        var that=this;
        $.getJSON( this.mapJsonPath, function( json ) {
           that.classifyData(json);
           // that.renderGraphics();
            that.renderPhysicObject();


        });

    }
}
///////////////////////////////////Game Function///////////////////////////////////////////////////////////////////
var Game=function (assets,entities) {
    this.entities=entities;
    this.assets=assets;
    this.map=null;
};

Game.prototype.renderMap=function () {
    this.map.load();
};
Game.prototype.renderEntity=function () {
    for(var i=0;i<this.entities.length;i++){
        this.entities[i].animate();
    }
};

Game.prototype.loadAssets=function () { //load all assets to cache
    for(var i=0;i<this.assets.length;i++){
        AssetMgr.queueDownload(this.assets[i]);
    }
};
Game.prototype.update=function () {
this.map.load()
}

Game.prototype.animate=function () {
    //this.update();
    var that=this;
   // ctx.clearRect(0,0,100,2000)
    window.requestAnimationFrame(function () {
        box2d.world.Step(1 / 60, 8, 3);
        box2d.world.ClearForces();
        box2d.world.DrawDebugData();
        var timeStep = 1/60;
        box2d.drawDebug();
      // that.renderEntity()
        mario.update();
        that.animate();

    });
}
Game.prototype.start=function () {

    box2d.init();
    this.loadAssets();
   this.map=new Map("marioHDold.json","platformerGraphicsDeluxe_Updated/Tiles/tiles_spritesheet.png");
    var that=this;

    AssetMgr.downloadAll(function () {
        that.map.load();
        that.animate();
        //Game.mario.moveRight();

        //that.renderEntity()
    });
};









