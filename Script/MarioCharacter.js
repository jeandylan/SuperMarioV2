/**
 * Created by dylan on 27-May-16.
 */
/////Main Character
function Mario(imagePath){
  this.x=0;
  this.y=0;
  this.width=75;
  this.height=100;
  this.maxFrames=2;
  this.spritePath="marioRunning2.png";
  this.direction="N";
  this.currentFrame=0;
  this.minFps=10;
  this.fps=0;
  this.currentAnimationName="standFrw";
  this.animationsArray= {'walkingFrw':[{x:0,y:0,width:125,height:188},{x:125,y:0,width:125,height:188},{x:0,y:0,width:125,height:188}],
    'walkingBck':[{x:0,y:188,width:125,height:188},{x:125,y:188,width:125,height:188},{x:0,y:188,width:125,height:188}],
    'jumpFrw':[{x:0,y:376,width:125,height:188}],
    'jumpBck':[{x:188,y:376,width:125,height:188}],
    'downFrw':[{x:0,y:564,width:125,height:188}],
    'downBck':[{x:140,y:564,width:135,height:188}],
    'standFrw':[{x:0,y:0,width:125,height:188}]}; //array containing all animation coordinate from spritesheet
  this.currentAnimationCoordinate=this.animationsArray['standFrw'][this.currentFrame];
  this.isAnimation=false;
}
Mario.prototype.forwardRun=function () {
  this.x += 8;
  this.direction="F";
  this.currentAnimationName = 'walkingFrw';
  if (this.currentAnimationName=='walkingFrw' && this.currentFrame < this.animationsArray[this.currentAnimationName].length - 1 ) { //this have been done to proveide ability to animate when ->
                                                                                                                                 // is press multiple times
  }
  else{
    this.currentFrame=0;
  }

}

Mario.prototype.reverseRun=function () {
  this.x -= 8;
  this.direction="R";
  this.currentAnimationName = 'walkingBck';
  if (this.currentAnimationName=='walkingBck' && this.currentFrame < this.animationsArray[this.currentAnimationName].length - 1 ) { //this have been done to proveide ability to animate when ->
    // is press multiple times
  }
  else{
    this.currentFrame=0;
  }
}
Mario.prototype.jump=function () {
  this.currentFrame=0;
  this.y+=5;
  if(this.direction=="F"){
    this.x+=4;
    this.currentAnimationName="jumpFrw";
  }
  if(this.direction=="R"){
    if(this.x >4) {
      this.x -= 4;
    }
    this.currentAnimationName="jumpBck";
  }
}
Mario.prototype.down=function () {
  this.currentFrame=0;
  this.x+=4;
  if(this.direction=="F"){
    this.x+=4;
    this.currentAnimationName="downFrw";
  }
  if(this.direction=="R"){
    if(this.x >4) { //assure it does not get drawn outside canvas
      this.x -= 4;
    }
    this.currentAnimationName="downBck";
  }
}
Mario.prototype.updateAnimation=function () {
  this.maxFrames = this.animationsArray[this.currentAnimationName].length - 1;
  console.log(this.currentFrame);
  if (this.fps == 0) {
    if (this.currentFrame >= this.maxFrames) {
      //do nothing or something  all frame in animation played
     // this.currentFrame=0;
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

Mario.prototype.draw=function () {
  var img = AssetMgr.getAsset (this.spritePath);
  //context.clearRect (this.x, this.y, this.width, this.height);
  this.currentAnimationCoordinate=this.animationsArray[this.currentAnimationName][this.currentFrame];
  context.drawImage (img,
    this.currentAnimationCoordinate.x, this.currentAnimationCoordinate.y, this.currentAnimationCoordinate.width, this.currentAnimationCoordinate.height,
    this.x, this.y, this.width, this.height);
};


Mario.prototype.update=function () {
  this.draw();
  this.updateAnimation();
}
