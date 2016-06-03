/**
 * Created by dylan on 02-Jun-16.
 */
var ParralaxBackgroundNite=function (img1, img2, img3, velocityLayer1, velocityLayer2, velocityLayer3) { //min and max of 3 images done it for convience
  this.layer1={img:"Image/parallax/backgroundLevel2.png",velocity:0,fps:40,offset:0};
  this.layer2={img:"Image/parallax/stars.png",velocity:2,fps:20,offset:0};
  this.layer3={img:"Image/parallax/wood.png",velocity:velocityLayer3,fps:10,offset:0,lastOffset:0};
}

ParralaxBackgroundNite.prototype.draw=function () {
  this.offset();
  //layer 1 the maiin background
  context.drawImage(AssetMgr.getAsset(this.layer1.img), 0, 0);
  context.drawImage (AssetMgr.getAsset (this.layer1.img), AssetMgr.getAsset (this.layer1.img).width, -300);
  //draw layer 2 the moving part
  context.save();
  context.translate(-this.layer2.offset, 0);
  context.drawImage(AssetMgr.getAsset(this.layer2.img), 0, -500);
  context.drawImage( AssetMgr.getAsset(this.layer2.img),canvas.width-2, -500);
  context.restore();
  //draw layer 3 the non moving part
  context.drawImage (AssetMgr.getAsset (this.layer3.img), 0, -250);
  context.drawImage (AssetMgr.getAsset (this.layer3.img), AssetMgr.getAsset (this.layer3.img).width, -250); //due to image being too small i have draw it again,hen the first one finish
///

}
ParralaxBackgroundNite.prototype.offset=function () {
this.layer1.offset=this.layer1.offset< canvas.width ?
this.layer1.offset + this.layer1.velocity/this.layer1.fps : 0;

  this.layer2.offset=this.layer2.offset< canvas.width ?
  this.layer2.offset + this.layer2.velocity/this.layer2.fps : 0;

  this.layer3.offset=this.layer3.offset< canvas.width ?
  this.layer3.offset + this.layer3.velocity/this.layer3.fps : 0;
}


/////////////////the day parralax class
var ParralaxBackgroundDay=function () { //min and max of 3 images done it for convience
  this.layer1={img:"Image/parallax/backgroundLevel1.png",velocity:0,fps:40,offset:0};
  this.layer2={img:"Image/parallax/cloud.png",velocity:7,fps:20,offset:0};
  this.layer3={img:"Image/parallax/mountain.png",velocity:0,fps:10,offset:0,lastOffset:0};
}

ParralaxBackgroundDay.prototype.draw=function () {
  this.offset();
  //layer 1 the maiin background
  context.drawImage(AssetMgr.getAsset(this.layer1.img), 0, 0);
  context.drawImage (AssetMgr.getAsset (this.layer1.img), AssetMgr.getAsset (this.layer1.img).width, -300);
  //draw the mountain part
  context.drawImage (AssetMgr.getAsset (this.layer3.img), 0, -250);
  context.drawImage (AssetMgr.getAsset (this.layer3.img), AssetMgr.getAsset (this.layer3.img).width, -250); //due to image being too small i have draw it again,hen the first one finish
  //draw layer 2 the moving part
  context.save();
  context.translate(-this.layer2.offset, 0);
  context.drawImage(AssetMgr.getAsset(this.layer2.img), 0, 20);
  context.drawImage( AssetMgr.getAsset(this.layer2.img),canvas.width-2, 20);
  context.restore();


}
ParralaxBackgroundDay.prototype.offset=function () {
  this.layer1.offset=this.layer1.offset< canvas.width ?
  this.layer1.offset + this.layer1.velocity/this.layer1.fps : 0;

  this.layer2.offset=this.layer2.offset< canvas.width ?
  this.layer2.offset + this.layer2.velocity/this.layer2.fps : 0;

  this.layer3.offset=this.layer3.offset< canvas.width ?
  this.layer3.offset + this.layer3.velocity/this.layer3.fps : 0;
}
///city parralax
var ParralaxBackgroundCity=function () { //min and max of 3 images done it for convience
  this.layer1={img:"Image/parallax/backgroundLevel2.png",velocity:0,fps:40,offset:0};
  this.layer2={img:"Image/parallax/stars.png",velocity:7,fps:20,offset:0};
  this.layer3={img:"Image/parallax/city.png",velocity:0,fps:10,offset:0,lastOffset:0};
}

ParralaxBackgroundCity.prototype.draw=function () {
  this.offset();
  //layer 1 the maiin background
  context.drawImage(AssetMgr.getAsset(this.layer1.img), 0, 0);
  context.drawImage (AssetMgr.getAsset (this.layer1.img), AssetMgr.getAsset (this.layer1.img).width, -300);
  //draw the mountain part
  context.save();
  context.translate(-this.layer2.offset, 0);
  context.drawImage(AssetMgr.getAsset(this.layer2.img), 0, 200);
  context.drawImage( AssetMgr.getAsset(this.layer2.img),canvas.width-2, 20);
  context.restore();

  //
  context.drawImage (AssetMgr.getAsset (this.layer3.img), 0, -550);
  context.drawImage (AssetMgr.getAsset (this.layer3.img), AssetMgr.getAsset (this.layer3.img).width, -550); //due to image being too small i have draw it again,hen the first one finish
  //draw layer 2 the moving part



}
ParralaxBackgroundCity.prototype.offset=function () {
  this.layer1.offset=this.layer1.offset< canvas.width ?
  this.layer1.offset + this.layer1.velocity/this.layer1.fps : 0;

  this.layer2.offset=this.layer2.offset< canvas.width ?
  this.layer2.offset + this.layer2.velocity/this.layer2.fps : 0;

  this.layer3.offset=this.layer3.offset< canvas.width ?
  this.layer3.offset + this.layer3.velocity/this.layer3.fps : 0;
}

