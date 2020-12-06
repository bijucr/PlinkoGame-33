const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var ground;
var engine,world;

var divisions = [];
var plinko = [];
var balls = [];
var Arrcount =0;
var turnCount = 5; //pro 33 - only 5 turns

var currentParticle; //Pro 33
var bScoreCounted = true; //pro 33
var score = 0; //Pro 33
var ScoreArray = []
var scores = [100,200,300,400,500]

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function setup() {
  createCanvas(700,800);

  engine = Engine.create();
  world = engine.world

  ground = new StaticRect(width/2,height-10,width,height/20)

  for (var i=5;i<width;i+=95)
  {
    divisions[Arrcount] = new StaticRect(i,(height-128),10,200);
    ScoreArray[Arrcount] = [i,Math.round(random(scores)),i]
    
    //console.log(ScoreArray[Arrcount][1])
    Arrcount++;
  }
  Arrcount = 0;
  var rowCt = 1;
  for (var i=50;i<height-200;i+=95)
  {

    for (var j=0;j<width;j+=50)
    {
      plinko[Arrcount] = new Plinko((rowCt%2*25)+j,i,10);
      Arrcount++;
    } 
    rowCt ++;  
  }
  Arrcount = 0;

  Engine.run(engine);
}


function draw() {
  var scoreX;
  background(0);  
if (gameState === PLAY)
{
  ground.display();
  for (var i=0;i<divisions.length;i++)
  {
    divisions[i].display();  
    //****display score from Score Array, xPosition for first element is 0 in i*107 */
      if (i===0)  
      scoreX = i + 20
      else
      scoreX = i*107
      text(ScoreArray[i][1],scoreX,height-200)
  }
  for (var i=0;i<plinko.length;i++)
  {
    plinko[i].display();
  }

  
  for (var k=0;k<balls.length;k++)
  {
    balls[k].display();
  }
  if(bScoreCounted === false)
  {   
   textSize(22);   //Pro 33
   text("Wait for the Score .......", width/2-150,height/2);  //Pro 33
  }
  if(currentParticle!==null&&currentParticle!==undefined)
  {
  calculateScore(); //Pro 33
  }
}
else
{
  fill("yellow");  //Pro 33
  textSize(40);   //Pro 33
  text("Game Over", width/2-100,height/2);  //Pro 33
}

  fill("yellow");  //Pro 33
  textSize(20);   //Pro 33
  text(" Score : " + score, width - 150,30);  //Pro 33
  text("Turns: " + turnCount , width - 250,30);  //Pro 33
}

//Pro 33
function calculateScore()
{
  
  if(currentParticle.body.position.y>height-200)
  {
    var particleX = currentParticle.body.position.x;
    var prevDivStart = 0;
    for(var i = 0; i<divisions.length;i++)
    {
      prevDivStart = ScoreArray[i][2];
      console.log(" Div Start " + prevDivStart + " Part X " + particleX)
      if(particleX >= prevDivStart && particleX <= ScoreArray[i+1][2] )
      {
        score = score  + ScoreArray[i][1]
        currentParticle = null;
        bScoreCounted = true;
        return;
      }
     if (i===divisions.length-1)
     {
      currentParticle = null;
      bScoreCounted = true;
     }

    }
        
  }

}
function mousePressed()//pro33
{
  console.log(bScoreCounted)
  if(bScoreCounted)
  {
  if(turnCount>0)
  {
  bScoreCounted = false;
  currentParticle = new Particles(mouseX,0,20);  //pro 33  
  balls.push(currentParticle);
  turnCount--;
 
  }
  else{
    gameState = END;
  }
}
}