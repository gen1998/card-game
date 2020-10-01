var c = document.createElement("canvas");
var ctx = c.getContext("2d");
 c.width = window.innerWidth;
 c.height = window.innerHeight;
 //c.width = 600;
//c.height = 400;

document.body.appendChild(c);



let shikaku = new function(){
  this.draw = function(){
    c.addEventListener('click', test);
    console.log("hey!");
  }
}

function test(e){
  ctx.rect(20, 20, 200, 200);
  ctx.stroke();
  console.log("shikaku detayo");
}

let logo = new function() {
  this.x = c.width / 2;
  this.y = c.height / 5;
  this.rot = 0;

  this.img = new Image();
  this.img.src = "images/logo.png";

  this.draw = function() {
    ctx.drawImage(this.img, this.x-this.img.width/2 ,this.y-this.img.height/2);
    console.log("logo display!");
  }
}

function loop(){
  //ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
  ctx.globalAlpha = 0.1;
  ctx.fillRect(0, 0, c.width, c.height);
  shikaku.draw();
  logo.draw();
  //requestAnimationFrame(loop);
}

loop();



