/**
 * Created by dylan on 26-May-16.
 */

var canvas=document.getElementById("game");
context = canvas.getContext("2d");
var Entity=function (spriteSheetPath,animationObjects,minfps) {
  this.currentFrame=0;
  this.maxFrames=0;
  this.minFps=minfps; //the minimum animation call before animation frame changes
  this.fps=0; // when this hit 30 reinitialize to 0
  this.animationsArray=animationObjects; //an array containing all animation coordinate
  this.continueAnimation=true;
  this.spritePath=spriteSheetPath;
};
Entity.prototype.startAnimation=function (animationName) {
//let continue Animation be true so as previous Entity.animationStop effect is negated
  this.continueAnimation=true;
  this.startAnimation(animationName);
};
Entity.prototype.animate=function (animation_Name,canvasCoord) {
  var img = AssetMgr.getAsset (this.spritePath);
  //get the array of animation coordinate i.e sx,sy,sw,sh
  var animationCoordinates = this.animationsArray[animation_Name]; //loading the appropriate animation coordinate
  this.maxFrames=animationCoordinates.length-1;
  if (this.continueAnimation) {
    var currentAnimationCoordinate = animationCoordinates[this.currentFrame]; //get the animation coordinate for current frame i.e an
    context.clearRect(canvasCoord.x,canvasCoord.y,canvasCoord.width,canvasCoord.height);
    context.drawImage (img,
      currentAnimationCoordinate.x, currentAnimationCoordinate.y, currentAnimationCoordinate.width, currentAnimationCoordinate.height,
      canvasCoord.x,canvasCoord.y,canvasCoord.width,canvasCoord.height);
    this.updateAnimation();

  }
};

Entity.prototype.stopAnimation=function () {
  this.continueAnimation=false;
};
Entity.prototype.updateAnimation=function () {
  if (this.fps==0 ) {
    console.log("a")
    if (this.currentFrame >= this.maxFrames) {
      //if current frame exceed the maximum animation tick.current frame return to zero for loop
      this.currentFrame = 0;
    }
    else {
      //go to next image
      this.currentFrame++;

    }
  }
  this.fps++;
  if (this.fps >= this.minFps){
    this.fps=0;
  }

};







var AssetMgr = new AssetManager();
var foo = {'walking':[{x:0,y:0,width:125,height:188},{x:125,y:0,width:125,height:188}],'jumpingFrw':[{x:0,y:0,width:125,height:188},{x:0,y:376,width:125,height:188}]};
var canvasc={x:0,y:0,width:125,height:188};
var canvasc2={x:0,y:400,width:125,height:188};
var mario=new Entity("marioRunning2.png",foo,10);
var mario2=new Entity("marioRunning2.png",foo,10);
AssetMgr.queueDownload("platformerGraphicsDeluxe_Updated/Tiles/tiles_spritesheet.png");
AssetMgr.queueDownload("marioRunning2.png");
AssetMgr.downloadAll(function () {
//map.renderGraphics()
  //map.load();
//map.renderPhysicObject();
start();


});

function start(){

    window.requestAnimationFrame(function () {
      mario.animate('walking',canvasc2);
      mario2.animate('jumpingFrw',canvasc);
      //console.log("yes");
      start();
    });
  }




