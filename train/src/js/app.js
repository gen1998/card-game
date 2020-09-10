var c = document.createElement("canvas");
var ctx = c.getContext("2d");
// c.width = window.innerWidth;
// c.height = window.innerHeight;
c.width = 600
c.height = 400;

document.body.appendChild(c);

function loop(){
  ctx.fillStyle = "#19f";
  ctx.fillRect(0, 0, c.width, c.height);
  requestAnimationFrame(loop);
}

loop();
