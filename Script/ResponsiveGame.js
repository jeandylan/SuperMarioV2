/**
 * Created by dylan on 07-May-16.
 */

var canvas=document.getElementById("game");
context = canvas.getContext("2d");
scale=1/20;
viewport = { "x": 5, "y": 5, "size": 10 };
translationMatrix = [1, 0, 0, 1, 0, 0];
floorY = viewport.y + viewport.size - 2;

function OnResizeCalled() {

 // var scale = 128;
  var bufferlen = 1 / scale * viewport.size;
  var windowHeight = $(window).height();
  var windowWidth = $(window).width();

  // Make sure the canvas buffer is big enough to
  // contain the whole viewport while preserving the window dimensions ratio.
  canvas.width = (windowHeight > windowWidth) ? bufferlen : bufferlen * windowWidth / windowHeight;
  canvas.height = (windowHeight > windowWidth) ? bufferlen * windowHeight / windowWidth : bufferlen;

  // Use the full window size for this tutorial.
  canvas.style.width = windowWidth + "px";
  canvas.style.height = windowHeight + "px";

  // Set the unit scale.
  // This transformation matrix is applied to every drawing instruction sent
  // to the context to allow abstraction of the actual windows size.
  unitMatrix = [1/scale, 0, 0, 1/scale, 0, 0];
}

//OnResizeCalled();
//context.fillStyle = "#FF0000";
//context.setTransform.apply(context, unitMatrix);
//context.fillRect(1,0,18,9);
/*
var mapTiles;
$.ajaxSetup({
  async: false
});

$.getJSON( "marioHDold.json", function( json ) {
  mapTiles=json;
});
Img1 = new Image();
Img1.src="platformerGraphicsDeluxe_Updated/Tiles/tiles_spritesheet.png";
//DrawingData=mapTiles.layers[2].data;
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#FF0000";

var posX=0;
var posY=0;
var col=0;
function float2int (value) {
  return value | 0;
}

/*
Img1.onload = function() {
  for (var i = 0; i < DrawingData.length; i++) {

    if ((i % 48) == 0) {
      posY += 68;

    }
    posX = (i % 48) * 67;

    if (DrawingData[i] != 0) {
      //ctx.drawImage(Img1, Math.round((DrawingData[i] + 1 / 12) * 72), Math.round((DrawingData[i] + 1 % 12) * 72), 72, 72, posX, posY, 72, 72);
        var yImageSource = float2int((DrawingData[i]-1) / 12) * 72;
        var xImageSource = (((DrawingData[i] - 1) % 12)) * 72; //seems good
        //console.log(DrawingData[i] - 1 + " " + xImageSource + " " + yImageSource)
      if(DrawingData[i]-1==47){
        //console.log("---------------- "+47/12+" moa"+ float2int(47/12))
      }
        ctx.drawImage(Img1, xImageSource, yImageSource, 72, 72, posX, posY, 72, 72)  //change Y move the drawing to the right the whole drawing

      }
//57 650 280

    }
   // console.log(posX);
    //console.log(posY)
  }

*/
/*
ground= mapTiles.layers[4].objects;
groundM=[];
box2d.init();
for(var s=0; s<ground.length;s++){
  console.log(s)
  console.log(ground[s].y)
ty={name:"goal",shape:'rectangle',density:1,friction:0.3,restitution:0.6, x:ground[s].x+(ground[s].width/2)-(0.04*(ground[s].x)), y:ground[s].y+ground[s].height+53,width:ground[s].width,height:ground[s].height, type:'k'}
groundM.push(ty);
}

var velocityIterations = 8;
var positionIterations = 3;

console.log(groundM);
var timeStep = 1/60;
for (var z=0;z<groundM.length;z++){
  box2d.createSingleBody(groundM[z]);

}

//box2d.drawDebug();

ty={name:"goal",shape:'rectangle',density:1,friction:0.3,restitution:0.6, x:100, y:100,width:100,height:100, type:'k'}
box2d.createSingleBody(ty);
*/
box2d.init();
ty={name:"goal",shape:'rectangle',density:1,friction:0.3,restitution:0.6, x:100, y:100,width:100,height:100, type:'k'}
//box2d.createSingleBody(ty);
function update() {
  box2d.world.Step(1 / 60, 8, 3);
  box2d.world.ClearForces();
  box2d.world.DrawDebugData();
  var timeStep = 1/60;
  //box2d.drawDebug();
  window.requestAnimationFrame (update);
};

update()
///formula y:int( tileNumber+1/12)*72
//x:( titlenumber+1 mod 12)*72

var AssetMgr = new AssetManager();
var map=new Map("marioHDold.json","platformerGraphicsDeluxe_Updated/Tiles/tiles_spritesheet.png");
AssetMgr.queueDownload("platformerGraphicsDeluxe_Updated/Tiles/tiles_spritesheet.png");

AssetMgr.downloadAll(function () {
//map.renderGraphics()
  map.load();
//map.renderPhysicObject();
});



