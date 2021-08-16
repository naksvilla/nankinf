
var background, backImg ,shark, sharkImg, redfish, purplefish, bluefish,redfishImg, purplefishImg, bluefishImg, redfishGroup, purplefishGroup,  bluefishGroup;
    
var serve=0;
var gameState = serve;
var play=1;
var END =0;
function preload(){

sharkImg= loadImage("shark1.png");
bigsharkImg= loadImage("bigshark.jpeg");
backImg= loadImage("seaunderwater.jpg");

redfishImg=loadImage("redfish.jpg");
purplefishImg=loadImage("purplefish.jpg");
bluefishImg=loadImage("bluefish.png");
gameOverImg = loadImage("gameOver.png")
restartImg = loadImage("restart.png")


dieSound = loadSound("die.mp3")

}

function setup() {
createCanvas(600,400);
  
background= createSprite(0,0,600,400);
background.addImage(backImg);
background.scale=2;
//making moving background
background.x=background.width/2;
background.velocityX=-4;
  
gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;
  shark= createSprite(100,250,20,20);
  shark.addImage(sharkImg);
  shark.scale=0.07;

  
  redfishGroup = new Group();
  purplefishGroup = new Group();
  bluefishGroup = new Group();
  bigsharkGroup = new Group();
  score=0
}

function draw() {

  if(gameState == serve){
    background.velocityX = 0;
    shark.velocityY=0;
    redfishGroup.setVelocityXEach(0);
    purplefishGroup.setVelocityXEach(0);
    bluefishGroup.setVelocityXEach(0);
    bigsharkGroup.setVelocityXEach(0);
    stroke("black");
    strokeWeight(2);
    textSize(20); 
    fill("black");
    text("Press 'space' to play " , 200,200); }
  
  if(keyDown("space")){
    gameState=play;
    background.velocityX= -4
  }
  
  if(gameState==play){ 
   if(background.x<0) {
background.x=background.width/2;
}
  


      if (keyDown("UP_ARROW")) {

 shark.y=shark.y-7;
}


if (keyDown("DOWN_ARROW")) {

   shark.y=shark.y+7;
 }        

  if(redfishGroup.isTouching(shark)){
     redfishGroup.destroyEach();
     score=score+2
     }
  
  if(purplefishGroup.isTouching(shark)){
     purplefishGroup.destroyEach();
     score=score+1
  }
       
  
  if(bluefishGroup.isTouching(shark)){
     bluefishGroup.destroyEach();
     score=score+5
     }
  
     if(bigsharkGroup.isTouching(shark)){
      gameState = END
      dieSound.play()
      }

      if (gameState === END) {
        gameOver.visible = true;
        restart.visible = false;
        
        //set velcity of each game object to 0
        background.velocityX = 0;
        shark.velocityY = 0;
        redfishGroup.setVelocityXEach(0);
    purplefishGroup.setVelocityXEach(0);
    bluefishGroup.setVelocityXEach(0);
    bigsharkGroup.setVelocityXEach(0);
        
        //set lifetime of the game objects so that they are never destroyed
        redfishGroup.setLifetimeEach(-1);
        purplefishGroup.setLifetimeEach(-1);
        bluefishGroup.setLifetimeEach(-1);
        bigsharkGroup.setLifetimeEach(-1);
        
        if(touches.length>0 || keyDown("SPACE")) {      
          reset();
          touches = []
        }
      }
    
  redfishes(); 
  purplefishes();
  bluefishes();     
  bigsharkes();
  drawSprites();



  stroke("black");
strokeWeight(2);
textSize(20); 
fill("red");
text("Score: "+ score, 200,70);

    
    
}
}
function redfishes(){

  if (frameCount % 240 === 0) {
  redfish = createSprite(600,200,40,10);
  redfish.y = Math.round(random(120,200)); 
  redfish.velocityX=-7;
  redfish.addImage(redfishImg);
  redfish.scale=0.1;
  redfish.lifetime = 300;
  shark.depth = redfish.depth + 1;
  redfishGroup.add(redfish)
}
} 

function purplefishes(){  
 if (frameCount % 100 === 0) { 
 purplefish = createSprite(800,100,40,10);   
 purplefish.y = Math.round(random(180,300));    
 purplefish.velocityX=-7;
 purplefish.addImage(purplefishImg);  
 purplefish.scale=0.1; 
 purplefish.lifetime = 300;  
 shark.depth = purplefish.depth + 1; 
 purplefishGroup.add(purplefish); } }

function bluefishes(){
  if (frameCount % 400 === 0) {
  bluefish = createSprite(800,150,40,10);
  bluefish.y = Math.round(random(200,300)); 
  bluefish.velocityX=-10;
  bluefish.addImage(bluefishImg);
  bluefish.scale=0.1;
  bluefish.lifetime = 300;
  shark.depth = bluefish.depth + 1;
  bluefishGroup.add(bluefish);
}
}
function bigsharkes(){
  if (frameCount % 400 === 0) {
 bigshark = createSprite(800,150,40,10);
 bigshark.y = Math.round(random(200,300)); 
 bigshark.velocityX=-10;
 bigshark.addImage(bigsharkImg);
 bigshark.scale=0.3;
 bigshark.lifetime = 300;
  shark.depth = bigshark.depth + 1;
 bigsharkGroup.add(bigshark);
}
}

function reset(){
  
  gameOver.visible = false;
  restart.visible = false;
  
  
  bluefishGroup.destroyEach();
  redfishGroup.destroyEach();
 purplefishGroup.destroyEach();
 bigsharkGroup.destroyEach();

  
  score = 0;
  gameState = play;
}