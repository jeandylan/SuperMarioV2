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
box2d.init();
function update() {
  box2d.world.Step(1 / 60, 8, 3);
  box2d.world.ClearForces();
  box2d.world.DrawDebugData();
  var timeStep = 1/60;
 // box2d.drawDebug();
  window.requestAnimationFrame (update);
};

//update()
//var marioAnimation = {'standFrw':[{x:0,y:0,width:125,height:188}],'walking':[{x:0,y:0,width:125,height:188},{x:125,y:0,width:125,height:188}],'jumpFrw':[{x:0,y:376,width:125,height:188}]};
//var mario=new Entity("mario1","marioRunning2.png",marioAnimation,10,{x:0,y:0,width:125,height:188});
mario =new Mario("e2de2");
var marioGame=new Game(["platformerGraphicsDeluxe_Updated/Tiles/tiles_spritesheet.png","marioRunning2.png","marioHDold.json"],[mario]);

marioGame.start();
window.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 37: // Left
mario.reverseRun();
      break;

    case 38: // Up
      mario.up();

      break;

    case 39: // Right
    mario.forwardRun();

      break;

    case 40: // Down
      mario.down();
      break;
    case 32:
      mario.jump();
      console.log("fg");
      break;
  }
}, false);


