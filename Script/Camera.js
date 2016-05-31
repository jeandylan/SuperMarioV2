function clamp(value, min, max){
  if(value < min) return min;
  else if(value > max) return max;
  return value;
}
//map size 3456
var Camera=function (canvas,worldSize) {
  this.minOffset=200;
  this.maxOffset=worldSize-canvas.size;
  this.pos=44;

};
Camera.prototype.update=function (posX,ctx) {
  //this.pos=posX;
  camX = posX - this.pos;
  this.pos = posX;
  ctx.clearRect (0, 0, 3500, 1000) ///clear whole screen  said 'samuel L.Jackson'
  if(posX >this.minOffset) {
    ctx.translate (-camX, 0)
  }
};