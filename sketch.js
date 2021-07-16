//Create variables here
var dog,happyImg;
var dogImage;
var database;
var foodS,foodStock;
var foodObj,feed,addFood,feedTime,lastFed;

function preload()
{
	//load images here
  dogImage = loadImage ("images/dogImg.png");
  happyImg = loadImage ("images/happydog.png");
}

function setup() {
  database = firebase.database();
	createCanvas(1000,400);
  foodObj=new Food();
  dog = createSprite(800,200,150,150);
  dog.addImage(dogImage);
  dog.scale=0.2
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  feed = createButton("feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  addFood = createButton("add food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
  background(46,139,87); 
  foodObj.display(); 
  fedTime=database.ref('FeedTime');
   fedTime.on("value",function(data){ 
     lastFed=data.val(); });
      fill(255,255,254); textSize(15);
       if(lastFed>=12){ 
         text("Last Feed : "+ lastFed%12 + " PM", 350,30);
         }
         else if(lastFed==0){ text("Last Feed : 12 AM",350,30);
         }
         else{ text("Last Feed : "+ lastFed + " AM", 350,30); }
          drawSprites()
}

function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}



function feedDog(){ 
  dog.addImage(happyImg); 
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
   database.ref('/').update
   ({ Food:foodObj.getFoodStock(), FeedTime:hour() })
   } 
   
   //function to add food in stock
      
       function addFoods(){
      console.log("addFood");
       foodS++; 
       database.ref('/').update({ 
      Food:foodS })
        }
  
