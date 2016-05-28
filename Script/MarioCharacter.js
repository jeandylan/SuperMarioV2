/**
 * Created by dylan on 27-May-16.
 */
/////Main Character

function Mario(imagePath){
  this.width=75;
  this.height=100;
  this.maxFrames=2;
  this.spritePath="marioRunning2.png";
  this.direction="F"; //default  Direction  movement is Forward
  this.currentFrame=0;
  this.minFps=10;
  this.fps=0;
  this.offset=this.width/4;
  this.currentAnimationName="standFrw"; //initialize default animation
  this.animationsArray= {'walkingFrw':[{x:0,y:0,width:125,height:188},{x:125,y:0,width:125,height:188},{x:0,y:0,width:125,height:188}],
    'walkingBck':[{x:0,y:188,width:125,height:188},{x:125,y:188,width:125,height:188},{x:0,y:188,width:125,height:188}],
    'jumpFrw':[{x:0,y:376,width:125,height:188}],
    'jumpBck':[{x:125,y:376,width:125,height:188}],
    'downFrw':[{x:0,y:580,width:125,height:140}],
    'downBck':[{x:140,y:580,width:135,height:140}],
    'standFrw':[{x:0,y:0,width:125,height:188}]}; //array containing all animation coordinate from spritesheet
  this.currentAnimationCoordinate=this.animationsArray['standFrw'][this.currentFrame];
  this.isAnimation=false;
  this.init(); //create Physic body
  this.physicBody=box2d.getBodyByName("mario"); //cache the box2d body in this variable

}
Mario.prototype.init=function () {
  box2d.createRectangle({
    name: "mario", shape: 'rectangle', density: 1, friction: 0.3, restitution: 0.1,
    x: 70,
    y: 510,
    width: this.width/2,
    height:this.height,
    type: 'd'
  });
} //function that create Physic body
Mario.prototype.applyForce=function (forceX,forceY) {
  if(this.physicBody !=null) {
    this.physicBody.ApplyForce (
      new b2Vec2 (forceX, forceY),
      this.physicBody.GetWorldCenter ()
    );
  }
  else{
    console.log("cannot apply force object Mario not found")
  }
}
Mario.prototype.forwardRun=function () {
  this.direction="F";
  this.applyForce(500,0);
  this.currentAnimationName = 'walkingFrw';
  if (this.currentAnimationName=='walkingFrw' && this.currentFrame < this.animationsArray[this.currentAnimationName].length - 1 ) { //this have been done to proveide ability to animate when ->
                                                                                                                                 // is press multiple times
  }
  else{
    this.currentFrame=0;
  }

}

Mario.prototype.reverseRun=function () {
  this.direction="R"; //this is impose so as jump animation and crawl knows to show Reverse animations frame
  this.applyForce(-500,0);
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
  if(this.direction=="F"){
    this.applyForce(7500,20000);
    this.currentAnimationName="jumpFrw";
  }
  if(this.direction=="R"){
    this.applyForce(-7500,20000);
    this.currentAnimationName="jumpBck";
  }
}
Mario.prototype.down=function () {
  this.currentFrame=0;
  if(this.direction=="F"){
    this.currentAnimationName="downFrw";
  }
  if(this.direction=="R"){
    this.currentAnimationName="downBck";
  }
}
Mario.prototype.updateAnimation=function () {
  this.maxFrames = this.animationsArray[this.currentAnimationName].length - 1;
  if (this.fps == 0) {
    if (this.currentFrame >= this.maxFrames) {
      //do nothing or something , at this stage  all frame in animation played!! to loop simply put  currentFrame=0;
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
  var marioBody=box2d.getMapBodyPositionCanvas("mario");
  var img = AssetMgr.getAsset (this.spritePath);
  //context.clearRect (this.x, this.y, this.width, this.height);
  this.currentAnimationCoordinate=this.animationsArray[this.currentAnimationName][this.currentFrame];
  context.drawImage (img,
    this.currentAnimationCoordinate.x, this.currentAnimationCoordinate.y, this.currentAnimationCoordinate.width, this.currentAnimationCoordinate.height,
    marioBody.x-(this.offset), marioBody.y, this.width, this.height);
};


Mario.prototype.update=function () {
  this.draw();
  this.updateAnimation();
}
Mario.prototype.drawPh=function () {

}
