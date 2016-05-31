/**
 * Created by dylan on 07-May-16.
 */

var canvas=document.getElementById("game");
context = canvas.getContext("2d");
scale=1/20;
var ctx = canvas.getContext("2d");


///////////////////////////////////Game Function///////////////////////////////////////////////////////////////////

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
box2d.CollisionDetection();


var AssetMgr = new AssetManager(); //asset manager tyo be used by whole game
var levels=new Level();
var map=new Map("marioHDold.json","platformerGraphicsDeluxe_Updated/Tiles/tiles_spritesheet.png"); //declare all map here
var mario =new Mario();
//var foe= new Foe();
var marioGame=new Game(["platformerGraphicsDeluxe_Updated/Tiles/tiles_spritesheet.png","marioRunning2.png","coin.png","foe.png","marioHead.png"],[],map);
var entityManager=new EntityManager();

marioGame.start();
//entityManager.addEntity(foe)
window.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 37: // Left
mario.reverseRun();
      break;

    case 38: // Up
      coin.animate("normal");

      break;

    case 39: // Right
    mario.forwardRun();

      break;

    case 40: // Down
      mario.down();
      break;
    case 32:
      mario.jump();
     
      break;
  }
}, false);


