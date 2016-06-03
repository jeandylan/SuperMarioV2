/**
 * Created by dylan on 30-May-16.
 */
function handleCollision(bodyA,bodyB) {
  var bodyAUserData = bodyA.GetUserData ();
  var bodyBUserData = bodyB.GetUserData ();
//  console.log(bodyBUserData.name)
  if (bodyBUserData.name.startsWith ("Phycoins")) {
    if (bodyBUserData.amount > 0) { //coins animated only if has amount
      bodyBUserData.amount--; /// /Decrement Amont of coins from Physical user data Object
      mario.score++; // increase mario score
      bodyB.SetUserData (bodyBUserData);//set new value of the affected element coin  in physical world
      entityManager.addCoin ({x: bodyBUserData.x, y: bodyBUserData.y}) //the user data contain the x,y coordiante animation should occure ,the EntityManager will mange the animation
    coinAudio.play();
    }
  }
  if (bodyAUserData.name.startsWith ("Phyfoe") || bodyBUserData.name.startsWith ("Phyfoe")) {
    bodyB.SetBullet(true);
    mario.lives--;
    console.log (mario.lives)
    if (mario.lives < 0) {
      location.reload ();
    }

  }
  if (bodyAUserData.name.startsWith ("Phywater") || bodyBUserData.name.startsWith ("Phywater")) {
    mario.alive=false;
    loseAudio.play()
    setTimeout(function(){localStorage.setItem ("lives",3);
      localStorage.setItem ("score",0);
      location.reload (); }, 3000);


  }
  if (bodyAUserData.name.startsWith ("Phyfinish") || bodyBUserData.name.startsWith ("Phyfinish")) {
    if (levels.currentLevel == 1) {
      console.log("level changed")
      localStorage.setItem ("level",2);
     location.reload ();
    }
    if (levels.currentLevel == 2) {
      localStorage.setItem ("level",3);
      location.reload ();
    }
    if (levels.currentLevel == 3) {
      window.location.href = "MainScreen.html";
    }
    else{
       // localStorage.setItem ("level",1);
      localStorage.setItem("score",mario.score);
      localStorage.setItem("lives",mario.lives);
        //location.reload ();

    }


  }
}
