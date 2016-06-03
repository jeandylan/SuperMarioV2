/**
 * Created by dylan on 29-May-16.
 */

function float2int (value) {
  return value | 0;
}

var id=0;
function Map(path,mapTilePath) {
  this.mapJsonPath = path;
  this.mapJsonGraphics;
  this.mapJsonPhysics = [];
  this.mapJsonData=levels.getLevelData(); ///to be change with level
  this.mapTilesPath = mapTilePath;
  this.classifyData=function () {
    console.log("classify")
    for(var i=0; i < this.mapJsonData.layers.length; i++) {
      if (this.mapJsonData.layers[i].name == "graphic") {
        this.mapJsonGraphics = this.mapJsonData.layers[i].data;
      }
      if(this.mapJsonData.layers[i].name.startsWith("Phy")){
        this.mapJsonPhysics.push(this.mapJsonData.layers[i]);
      }
    }
  }

  this.renderGraphics=function () {
    var img= AssetMgr.getAsset(this.mapTilesPath); //tile image

    var posX=0; // future xPostion of  tile on canavas
    var posY=0; // future Y postion of tile on canavs
    for (var i = 0; i < this.mapJsonGraphics.length; i++) {  //loop the Json Array section where i have the graphic arrangement
      if ((i % 48) == 0) {
        posY += 68; //each tiles Height is 68 normally 72 because of offset
      }
      posX = (i % 48) * 67;  //each tile width is 67
      if (this.mapJsonGraphics[i] != 0) {
        var yImageSource = float2int((this.mapJsonGraphics[i]-1) / 12) * 72; //the y coordinate form the tileImage that i will use to draw on the canavs
        var xImageSource = (((this.mapJsonGraphics[i] - 1) % 12)) * 72; ////the x coordinate form the tileImage that i will use to draw on the canavs
        ctx.drawImage(img, xImageSource, yImageSource, 72, 72, posX, posY, 72, 72);
      }
    }
  }

  this.renderPhysicObject=function () {

    for (var i=0;i< this.mapJsonPhysics.length ;i++){

      switch (this.mapJsonPhysics[i].name){
        case "Phyfoe":
       for (var z=0;z< this.mapJsonPhysics[i].objects.length ;z++){
         id++; //increment id so as each object is unique
          box2d.createSingleBody ({
            name: this.mapJsonPhysics[i].name + id, shape: 'rectangle', density: 1, friction: 0.3, restitution: 0,
            x: this.mapJsonPhysics[i].objects[z].x + (this.mapJsonPhysics[i].objects[z].width / 2) - (0.04 * (this.mapJsonPhysics[i].objects[z].x)), //0.004 is because of offset
         y: (this.mapJsonPhysics[i].objects[z].y + (this.mapJsonPhysics[i].objects[z].height / 2)) + 68,
         width: this.mapJsonPhysics[i].objects[z].width,
         height: this.mapJsonPhysics[i].objects[z].height,
         type: 'k'
       });
         var foe=new Foe(this.mapJsonPhysics[i].name + id);
         entityManager.addEntity(foe);
          }

       break;
        case "Phycoins":
          for (var z=0;z< this.mapJsonPhysics[i].objects.length ;z++) {
            id++;
            box2d.createSingleBody ({
              name: this.mapJsonPhysics[i].name + id, shape: 'rectangle', density: 1, friction: 0.3, restitution: 0,
              x: this.mapJsonPhysics[i].objects[z].x + (this.mapJsonPhysics[i].objects[z].width / 2) - (0.04 * (this.mapJsonPhysics[i].objects[z].x)), //0.004 is because of offset
              y: (this.mapJsonPhysics[i].objects[z].y + (this.mapJsonPhysics[i].objects[z].height / 2)) + 68,
              width: this.mapJsonPhysics[i].objects[z].width,
              height: this.mapJsonPhysics[i].objects[z].height,
              type: 's',
              amount: 1
            });
          }
          break;
          break;
        case "PhyStopBck":
          for (var z=0;z< this.mapJsonPhysics[i].objects.length ;z++) {
            id++;
            box2d.createSingleBody ({
              name: this.mapJsonPhysics[i].name + id, shape: 'rectangle', density: 1, friction: 0.3, restitution: 0,
              x: this.mapJsonPhysics[i].objects[z].x + (this.mapJsonPhysics[i].objects[z].width / 2) - (0.04 * (this.mapJsonPhysics[i].objects[z].x)), //0.004 is because of offset
              y: (this.mapJsonPhysics[i].objects[z].y + (this.mapJsonPhysics[i].objects[z].height / 2)) + 68,
              width: this.mapJsonPhysics[i].objects[z].width,
              height: this.mapJsonPhysics[i].objects[z].height,
              type: 'k',
              amount: 1
            });
          }
          break;
        case "PhyStopFrw":
          for (var z=0;z< this.mapJsonPhysics[i].objects.length ;z++) {
            id++;
            box2d.createSingleBody ({
              name: this.mapJsonPhysics[i].name + id, shape: 'rectangle', density: 1, friction: 0.3, restitution: 0,
              x: this.mapJsonPhysics[i].objects[z].x + (this.mapJsonPhysics[i].objects[z].width / 2) - (0.04 * (this.mapJsonPhysics[i].objects[z].x)), //0.004 is because of offset
              y: (this.mapJsonPhysics[i].objects[z].y + (this.mapJsonPhysics[i].objects[z].height / 2)) + 68,
              width: this.mapJsonPhysics[i].objects[z].width,
              height: this.mapJsonPhysics[i].objects[z].height,
              type: 'k',
              amount: 1
            });
          }
          break;
        default:
          for (var z=0;z< this.mapJsonPhysics[i].objects.length ;z++) {
            id++;
            box2d.createSingleBody ({
              name: this.mapJsonPhysics[i].name + id, shape: 'rectangle', density: 1, friction: 1, restitution: 0,
              x: this.mapJsonPhysics[i].objects[z].x + (this.mapJsonPhysics[i].objects[z].width / 2) - (0.04 * (this.mapJsonPhysics[i].objects[z].x)), //0.004 is because of offset
              y: (this.mapJsonPhysics[i].objects[z].y + (this.mapJsonPhysics[i].objects[z].height / 2)) + 68,
              width: this.mapJsonPhysics[i].objects[z].width,
              height: this.mapJsonPhysics[i].objects[z].height,
              type: 's',
              amount: 1
            });
          }
          break;

   }
    }
  }

  this.load=function () {
      this.classifyData();
      this.renderGraphics();
      this.renderPhysicObject();


  }
}