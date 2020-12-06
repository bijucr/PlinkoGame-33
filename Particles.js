class Particles
{
  constructor(x,y,r)
  {
      var options = {friction:.8,
                     restitution:.5}

      this.body = Bodies.circle(x,y,r/2,options);
      this.radius = r;
      this.color = color(random(0,255),random(0,255),random(0,255))
      World.add(world,this.body);
  }

display()
{
    var position = this.body.position;
    push()
     
     // fill(position.x,position.y,position.x);
      fill(this.color)
      ellipseMode(CENTER)
      ellipse(position.x,position.y,this.radius,this.radius)
    pop();
}


}