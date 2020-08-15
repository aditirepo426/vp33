class Food {
    constructor(){

        this.foodStock = 0;
        this.lastFed;
        this.image = loadImage("Milk.png");

    }

    getFoodStock(){
        //foodStock = dataBase.ref('Food'); 
      //  foodStock.on("value",(data) =>{
       // foodCount = data.val(); }) 

       return this.foodStock;
    } 

    updateFoodStock(count){
       // dataBase.ref('/').update({
       // foodCount: count }); 
       this.foodStock = count;
    }

    deductFood(){
       // writeStock(foodS);
       // dog.addImage(happyDogImg,0,0);
        //foodRemaining = foodRemaining - 1;

        if(this.foodStock > 0){
            this.foodStock = this.foodStock - 1;
        }
    }

    getFedTime(lastFed){
        this.lastFed = lastFed;
    }

    washRoom (){
        backgroundImg.addImage(washroom , 200,200 );
    }

    livingRoom (){
        backgroundImg.addImage(livingroom , 200, 200);
    }

    garden(){
        backgroundImg.addImage(garden , 200, 200 );
    }

    bedRoom(){
        backgroundImg.addImage(bedroom , 200, 200 );
    }

    display(){

        var x = 80 , y = 100;

        imageMode(CENTER);
        image(this.image,200,470,70,70);

        if(this.foodStock != 0){
            for(var i = 0; i<this.foodStock; i++){
                if(i%10 === 0){
                    x =80;
                    y =y +50;
                }

                image(this.image,x,y,50,50);
                x = x+ 30;
            }
        }

        currentTime = hour();
        if(currentTime == (lastFed + 1)){
            update("Sitting");
            livingRoom();
        } else if(currentTime ==(lastFed + 2)){
            update("Playing");
            garden();
        } else if(currentTime == (lastFed + 3)){
            update("Washroom");
            washRoom();
        } else if(currentTime > (lastFed + 4) && currentTime <= (lastFed + 5)){
            update("Sleeping");
            bedRoom();
        } 
        
        if(currentTime > (lastFed + 5)){
            update("hungry");
            foodObj.display();
            text("I am hungry ☹, please feed me !!" ,200 , 200);
        }

    }

}



    
