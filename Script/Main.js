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
var levels=new Level();


var AssetMgr = new AssetManager(); //asset manager tyo be used by whole game

var mario =new Mario();
if(localStorage.level !=null) {
  levels.currentLevel = localStorage.level;
  console.log(levels.currentLevel)
  mario.lives= localStorage.lives;
  mario.score=localStorage.score;
 // localStorage.removeItem ("level");
 // localStorage.removeItem ("lives");
 // localStorage.removeItem ("score");
}

var map=new Map("marioHDold.json","platformerGraphicsDeluxe_Updated/Tiles/tiles_spritesheet.png");
var marioGame=new Game(["platformerGraphicsDeluxe_Updated/Tiles/tiles_spritesheet.png","marioRunning2.png","coin.png",
  "foe.png","marioHead.png",
  "Image/parallax/cloud.png","Image/parallax/backgroundLevel1.png","Image/parallax/mountain.png",
  "Image/parallax/backgroundLevel2.png","Image/parallax/stars.png","Image/parallax/wood.png"
  ,"Image/parallax/backgroundLevel3.png","Image/parallax/cloudCity.png","Image/parallax/city.png"],[],map);
var entityManager=new EntityManager();
var parallaxNite=new ParralaxBackgroundNite();
var parallaxDay=new ParralaxBackgroundDay();
var parallaxCity=new ParralaxBackgroundCity();

function  parallaxDrawer () {
  switch (localStorage.level){
    case "1":
      parallaxDay.draw();
      break;
    case "2":
      parallaxNite.draw();
      break;
    case "3":
      parallaxCity.draw();
      break;
    default:
      parallaxDay.draw();
      console.log("defau")
      break;
  }

}
marioGame.start();

//entityManager.addEntity(foe)
window.addEventListener('keydown', function(event) {
  event.preventDefault();
  switch (event.keyCode) {
    case 37: // Left
mario.reverseRun();
      break;

    case 38: // Up
      mario.jumpUp();
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
