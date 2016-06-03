/**
 * Created by dylan on 22-May-16.
 */

var canvas=document.getElementById("game");
var ctx = canvas.getContext("2d");

///////////////////////////////////Game Function///////////////////////////////////////////////////////////////////

var Game=function (assets,entities,map) {
    this.entities=entities;
    this.assets=assets;
    this.map=map;
};

Game.prototype.renderEntity=function () {
    for(var i=0;i<this.entities.length;i++){
        this.entities[i].animate();
    }
};

Game.prototype.loadAssets=function () { //load all assets to cache
    for(var i=0;i<this.assets.length;i++){
        AssetMgr.queueDownload(this.assets[i]);
    }
};

Game.prototype.animate=function () {
    var that=this;
    window.requestAnimationFrame(function () {
        box2d.world.Step(1 / 60, 8, 3);
        box2d.world.ClearForces();
        box2d.world.DrawDebugData();
        var timeStep = 1/60;
        box2d.drawDebug();
        ctx.clearRect (0, 0, 3500, 1000);
        parallaxDrawer(); //decide what to draw
        mario.update();

        that.map.renderGraphics();
        that.HUD();

      //that.renderEntity();
        entityManager.animateEntities();

       that.animate();
    });
}

Game.prototype.start=function () {
    this.loadAssets();
    var that=this;
    AssetMgr.downloadAll(function () {
        that.map.load();
        that.animate();
     
    });
};


Game.prototype.HUD=function () {
    ctx.font="30px Verdana";
    ctx.fillStyle = "#000099";
    var imgCoin=AssetMgr.getAsset("coin.png")
    var imgMarioHead=AssetMgr.getAsset("marioHead.png")
    var pos=box2d.getMapBodyPositionCanvas("mario")
ctx.drawImage(imgMarioHead,pos.x+30,100,40,40)
    ctx.fillText(mario.lives.toString(),pos.x+60,100);
    ctx.drawImage(imgCoin,0,0,44,40,pos.x+150,100,40,40);
    ctx.fillText(mario.score.toString(),pos.x+190,100);
}




