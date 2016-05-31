/**
 * Created by dylan on 26-May-16.
 */

var canvas=document.getElementById("game");
context = canvas.getContext("2d");
var Entity=function (name,spriteSheetPath,animationObjects,minfps,coords) {
  this.currentFrame=0;
  this.maxFrames=0;
  this.name=name;
  this.currentAnimationName=null;
  this.minFps=minfps; //the minimum animation call before animation frame changes
  this.fps=0; // when this hit 30 reinitialize to 0
  this.animationsArray=animationObjects; //an array containing all animation coordinate
  this.continueAnimation=true;
  this.spritePath=spriteSheetPath;
  this.coordCanvas=coords;
  this.remove=false;
};

Entity.prototype.startAnimation=function (animationName) {
//let continue Animation be true so as previous Entity.animationStop effect is negated
  this.continueAnimation=true;
  this.startAnimation(animationName);
};
Entity.prototype.animate=function (animationName) {
  var img = AssetMgr.getAsset (this.spritePath);
  //get the array of animation coordinate i.e sx,sy,sw,sh
  this.currentAnimationName=null || animationName;
  
if(this.validateAnimation()) {

  this.maxFrames = this.animationsArray[this.currentAnimationName].length - 1;
  if (this.continueAnimation) {
    var currentAnimationCoordinate = this.animationsArray[this.currentAnimationName][this.currentFrame]; //get  the animation coordinate from image file based on name of current animation\
    // get the animation coordinate for current frame i.e an
   // console.log(currentAnimationCoordinate)
    //context.clearRect (this.coordCanvas.x, this.coordCanvas.y, this.coordCanvas.width, this.coordCanvas.height);
    context.drawImage (img,
      currentAnimationCoordinate.x, currentAnimationCoordinate.y, currentAnimationCoordinate.width, currentAnimationCoordinate.height,
      this.coordCanvas.x, this.coordCanvas.y, this.coordCanvas.width, this.coordCanvas.height);
    this.updateAnimation ();

  }
}
  else{
  console.log("animation failed check Name")
}
};

Entity.prototype.stopAnimation=function () {
  this.continueAnimation=false;
};
Entity.prototype.updateAnimation=function () {

  if (this.fps == 0) {
    if (this.currentFrame >= this.maxFrames) {
      //if current frame exceed the maximum animation tick.current frame return to zero for loop
      this.currentFrame = 0;
      //if user defined loop flase while callid function
    }
    else {
      //go to next image
      this.currentFrame++;

    }
  }
  this.fps++;
  if (this.fps >= this.minFps) {
    this.fps = 0;
  }

};

Entity.prototype.defaultAnimation=function () {
  if (Object.keys(this.animationsArray).length >0){

    for (var a in this.animationsArray){
      console.log(a);
      this.currentAnimationName=a;
      console.log("first element in animation array called")
      return;
    }
  }
  else{
   return false;
  }
}

Entity.prototype.validateAnimation=function () {
  var out=false;
  if (this.currentAnimationName==null){
    out=this.defaultAnimation();
  }
  else{
    if(Object.keys(this.animationsArray[this.currentAnimationName]).length >0){
      if(this.animationsArray[this.currentAnimationName].length-1 >= this.currentFrame){
        out=true;
      }
    }
  }
  return out;
}

