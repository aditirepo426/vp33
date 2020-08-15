//Create variables here
var  dog, dogImg , happyDogImg ,dataBase ;
var happyDog, foodS, foodStock ,dogeat  ;
var  shreyaImg , shreya;
var foodObj , fedTime , lastFed ;
var foodCount ;
var washroom , livingroom , garden , bedroom ;
var  runningRight , runningLeft;
var readState , gameState , currentTime;
var backgroundImg;

function preload()
{
  //load images here
  dogImg = loadImage("dogImg.png");
  happyDogImg = loadImage("dogImg1.png");
  runningRight = loadImage("running.png");
  runningLeft = loadImage("runningLeft.png");

  shreyaImg = loadImage("Shreya.jpg");

  washroom = loadImage("Wash Room.png");
  livingroom = loadImage("Living Room.png");
  garden = loadImage("Garden.png");
  bedroom = loadImage("Bed Room.png");
	
}

function setup() {

  dataBase = firebase.database();
  createCanvas(700, 700);
  
  dog = createSprite(480,590,50,50);
  dog.addImage(dogImg);
  dog.scale = 0.3;

  shreya = createSprite(200,550,50,50);
  shreya.addImage(shreyaImg,0,0);
  shreya.scale = 1.5;

  backgroundImg = createSprite(350,350,1,1);

  foodStock = dataBase.ref("Food");
  foodStock.on("value",readStock);

  foodObj = new Food();

  feed = createButton("Feed Jimmy ");
  feed.position(400,95);
  feed.mousePressed(feedDog);

  addFood = createButton(" Add Food ");
  addFood.position(300,95);
  addFood.mousePressed(addFoods);

  readState = dataBase.ref('gameState');
  readState.on("value" ,function(data){
    gameState = data.val();
  })

}


function draw() {  

  background(0, 129, 85);

  
  foodObj.display();    
  backgroundImg.display();


  drawSprites();

  fedTime = dataBase.ref('FeedTime');
  fedTime.on("value" ,function(data){
    lastFed = data.val();
  })
  
  fill("white");
  textSize(20);
  if(lastFed >= 12){
    text("Last Feed : " + lastFed%12 + "PM" ,350,30)
  } else if(lastFed === 0){
    text("Last Feed : 12 AM" ,350 ,30);
  } else {
    text("Last Feed : "+ lastFed + "AM" ,350,30);
  }

  //if(gameState != "hungry"){
   // feed.hide();
   // addFood.hide();
    //dog.remove();}
   if (gameState === "hungry"){
    //feed.show();
   // addFood.show();
    dog.addImage(dogImg);
  }
  
  textSize(20);
  fill("yellow");
  text("CLICK THE BUTTONS TO ADD OR FEED FOOD",40,50);
  textSize(15);
  //text("Food Remaining:" + foodRemaining,40,100);

}

function update (state){
  dataBase.ref('/').update({
    gameState: state
  });
}

function readStock (data){
    foodS = data.val();
    foodObj.updateFoodStock(foodS);
}

function writeStock (x){

  dataBase.ref('/').update({
    Food: x
  })
}

function feedDog (){
  dog.addImage(happyDogImg);
  dog.scale = 0.3;

  

  foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
  dataBase.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })

}

function addFoods (){
  dog.addImage(dogImg);
  foodS++;
  dataBase.ref('/').update({
    Food: foodS
  })
}