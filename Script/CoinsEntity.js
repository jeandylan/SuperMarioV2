/**
 * Created by dylan on 29-May-16.
 */

///coins classs extends Entity Mgr
var Coins=function (coordXY) {
  this.coinAnimation={
    normal:[{x:0,y:0,width:44,height:40},{x:44,y:0,width:44,height:40},{x:88,y:80,width:44,height:40},{x:132,y:0,width:44,height:40},{x:176,y:0,width:44,height:40}]};
  this.coorD={x:coordXY.x, y:coordXY.y, width:35,height:35};
  //this.coorD=coord;
  this.entityOb = new Entity("coin","coin.png",this.coinAnimation,3,this.coorD);
  this.timeToRemove=null;
}
Coins.prototype.animate=function () {
  if(this.coorD.x != null) {
    this.entityOb.animate ("normal");
    this.entityOb.coordCanvas.y = this.entityOb.coordCanvas.y - 5;
  }
}
Coins.prototype.toRemove=function () {
 if  (this.entityOb.coordCanvas.y < 0){
   return true;
 }
  else{
   return false;
 }
}



////flying enememy goubi/////////////////
var Foe=function (name) {
  this.foeAnimation={
    forward:[{x:0,y:0,width:100,height:100},{x:100,y:0,width:100,height:100}],
    back:[{x:0,y:100,width:100,height:100},{x:100,y:100,width:100,height:100}] //moving back animation
  };
  this.coorD={x:200, y:300, width:35,height:35}; //original coordinate as defined by tiled
  this.entityOb = new Entity("foe","foe.png",this.foeAnimation,20,this.coorD);
  this.initialPos=208;
  this.name=name;
  this.currentAnima="back";
  this.startMoving();

}
Foe.prototype.animate=function () {
  var foes = box2d.getMapBodyPositionCanvas (this.name);
  //var pos=box2d.getMapBodyPositionCanvas("Phyfoe27");
  //console.log(this.physicalName)//get the body from physic world of box2d
  //console.log(foes.x)
  this.entityOb.animate (this.currentAnima);
  this.entityOb.coordCanvas.y = foes.y; //apply the body x postion to image on canvas
  this.entityOb.coordCanvas.x = foes.x;

  }
Foe.prototype.moveForward=function () {
  var bodyToForce=box2d.getBodyByName(this.name);
  bodyToForce.SetLinearVelocity(
    new b2Vec2(-1,0),
    bodyToForce.GetWorldCenter()
  );
  this.currentAnima="forward";
}
Foe.prototype.moveBack=function () {
  //console.log(this.name)//move down along x axis
  var bodyToForce=box2d.getBodyByName(this.name);
  bodyToForce.SetLinearVelocity(
    new b2Vec2(1,0 ),
    bodyToForce.GetWorldCenter()
  );
  this.currentAnima="back";
}
Foe.prototype.changeDirection=function () {
  //console.log(this.name)
  if(this.currentAnima=="back"){

    this.moveForward(this.name)
  }
  else{
    this.moveBack(this.name)
  }
}
Foe.prototype.startMoving=function () {
  var that =this;
 setInterval(function(){ that.changeDirection()
  }, 10000);

}
Foe.prototype.toRemove=function () {
  return false;
}



/////////////////////////Entity mgr////////////////////
var EntityManager=function () {
  this.entitiesArrayCoins=[];
}
EntityManager.prototype.addCoin=function (coordXY) {
  var coin=new Coins(coordXY);
  this.entitiesArrayCoins.push(coin);
};
EntityManager.prototype.addEntity=function (entity) {
  this.entitiesArrayCoins.push(entity);
}
EntityManager.prototype.animateEntities=function () {
  for(var i=0; i<this.entitiesArrayCoins.length;i++){
    if(! this.entitiesArrayCoins[i].toRemove()) {
      //console.log(this.entitiesArrayCoins[i].name)
      this.entitiesArrayCoins[i].animate ()
    }
    else{
      this.entitiesArrayCoins.splice(i, 1);
    }

  }
}
///


