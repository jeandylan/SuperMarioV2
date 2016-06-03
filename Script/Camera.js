
//map size 3456
var Camera=function (canvas,worldSize) {
  this.minOffset=200;  //camera will never move if mario is less than this value
  this.maxOffset=worldSize-canvas.size;
  this.pos=44; //assume mario inital position is 44 ,whatever value less than min offset

};
Camera.prototype.update=function (posX,ctx) {
  //this.pos=posX;
  camX = posX - this.pos;
  this.pos = posX;
 // ctx.clearRect (0, 0, 3500, 1000) ///clear whole screen  said 'samuel L.Jackson'
  if(posX >this.minOffset) {
    ctx.translate (-camX, 0) //move the camera by translating it to postion not shown only X asis affected
  }
};