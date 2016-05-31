/**
 * Created by dylan on 30-May-16.
 */
function handleCollision(bodyA,bodyB){
  var bodyAUserData=bodyA.GetUserData();
  var bodyBUserData=bodyB.GetUserData();
//  console.log(bodyBUserData.name)
  if( bodyBUserData.name.startsWith("Phycoins" )){
    if(bodyBUserData.amount >0) { //coins animated only if has amount
      bodyBUserData.amount --; /// /Decrement Amont of coins
      mario.score++;
      console.log(mario.score);
      bodyB.SetUserData (bodyBUserData);//set new value in physical world
      console.log(bodyB.GetUserData())
      entityManager.addCoin({x:bodyBUserData.x,y:bodyBUserData.y}) //the user data contain the x,y coordiante animation should occure ,the EntityManager will mange the animation
    }
  }
  if(bodyAUserData.name.startsWith("Phyfoe") || bodyBUserData.name.startsWith("Phyfoe")){
    mario.lives--;
    console.log(mario.lives)
    if(mario.lives <0 ){
      location.reload();
    }

  }
  if(bodyAUserData.name.startsWith("Phywater") || bodyBUserData.name.startsWith("Phywater")){
    location.reload();
   // mario=new Mario();
    console.log("!!!!!!!!!!!!!!!!!!death")
  }

}
