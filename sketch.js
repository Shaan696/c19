var backgroundImg, backgroundSprite;
var meteorImg, meteor, meteorGroup;
var rocket, rocketImg;
var star, starImg, starGroup;
var gameoverImg, gameOver;
var stars = 0;
var distance = 0;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  backgroundImg = loadImage("background.png");
  meteorImg = loadImage("meteor.png");
  rocketImg = loadImage("rocket.png");
  starImg = loadImage("star.png");
  gameoverImg = loadImage("gameOver.png");
}

function setup(){
  createCanvas(600,520);


  backgroundSprite = createSprite(100,100,100,100);
  backgroundSprite.addImage("bg", backgroundImg);
  backgroundSprite.scale = 1;
  
  
  
  meteorGroup = new Group();
  starGroup = new Group();
  
  rocket = createSprite(200,200,50,50);
  rocket.scale = 0.3;
  rocket.addImage("rocket", rocketImg);
}

function draw(){
  
  background(0);
  drawSprites();

  if(backgroundSprite.y > 450 ){
    backgroundSprite.y = 0;
  }

  backgroundSprite.velocityY = 2;

  if (gameState === PLAY) {
    
    if(keyDown("left_arrow") || keyDown("a")){
      rocket.x = rocket.x - 3;
    }
    
    textSize(15);
    text("Distance: " + distance + "km", 0,15);
    text("Stars collected: " + stars, 0,32);


    if(keyDown("right_arrow") || keyDown("d")){
      rocket.x = rocket.x + 3; 
    }
    
    if(keyDown("space") || keyDown("w") || keyDown("up_arrow")){
      rocket.velocityY = -10;
    }
    
    rocket.velocityY = rocket.velocityY + 0.8
  
    
    spawnMeteors();
    spawnStars();
    
    if (frameCount % 5 === 0) {
    distance = distance + 1;
    }

    if(starGroup.isTouching(rocket)){
      stars = stars + 1;
      starGroup.destroyEach();
    }
    
    if(meteorGroup.isTouching(rocket) || rocket.y > 600){
      gameState = END;
      meteorGroup.destroyEach();
      starGroup.destroyEach();
      rocket.destroy();
    }
  }
  
  if (gameState === END){
    gameOver = createSprite(300,200,10,10);
    gameOver.addImage("gameover", gameoverImg);

    
    
  }

  
}

function spawnMeteors() {

  if (frameCount % 100 === 0) {
    var meteor = createSprite(200, -50);

    meteor.scale = 0.4;
    
    meteor.x = Math.round(random(120,400));

    
    meteor.addImage(meteorImg);
    
    meteor.velocityY = 3;

    meteor.setCollider("rectangle", 0, 0, 10,10);

    
    rocket.depth = meteor.depth;
    meteor.depth +=1;

    meteor.lifetime = 600;

    meteorGroup.add(meteor);

  
    
  }
}

function spawnStars() {

  if (frameCount % 200 === 0) {
    var star = createSprite(200, -50);

    star.scale = 0.1;
    
    star.x = Math.round(random(120,400));

    
    star.addImage("star",starImg);
    
    star.velocityY = 4;

    star.setCollider("rectangle", 0, 0, 10,10);

    
    rocket.depth = star.depth;
    star.depth +=1;

    star.lifetime = 600;

    starGroup.add(star);
  }
}
