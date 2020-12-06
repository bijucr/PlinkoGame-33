class Plinko
{
  constructor(x,y,r)
  {
      var options = {isStatic:true}

      this.body = Bodies.circle(x,y,r/2,options);
      this.radius = r;
      World.add(world,this.body);
  }

display()
{
    var position = this.body.position;
    push()
      fill("white");
      ellipseMode(CENTER)
      ellipse(position.x,position.y,this.radius,this.radius)
    pop();
}


}