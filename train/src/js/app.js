var c = document.createElement("canvas");
var ctx = c.getContext("2d");
 c.width = window.innerWidth;
 c.height = window.innerHeight;
 //c.width = 600;
//c.height = 400;

document.body.appendChild(c);

/*
let shikaku = new function(){
  this.draw = function(){
    c.addEventListener('click', test);
    console.log("hey!");
  }
}
*/

function start_buttons(){
  this.x = c.width / 2;
  this.y = c.height / 2;
  
  let start_x = 300;
  let start_y = 100;
  
  let setting_x = 100;
  let setting_y = 100;

  
  ctx.fillStyle = 'white';
  ctx.fillRect(c.width/2-start_x/2, c.width/2-start_y/2, start_x, start_y);
  ctx.fillRect(c.width-setting_x-50, c.width-setting_y-50, setting_x, setting_y);
  //ctx.rect(this.x-this.img.width/2, 40, 100, 100);
  ctx.stroke();
  
  ctx.fillStyle = 'rgba(0,0,0)';
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.font = '40pt メイリオ';
  ctx.fillText('スタート', c.width/2, c.width/2);

  ctx.font = '30pt メイリオ';
  ctx.fillText('設定',c.width-setting_x, c.width-setting_y);

  ctx.fillStyle = 'white';
  ctx.font = '15pt メイリオ';
  ctx.fillText('©2020 Musashi 91期 inc.', 150, c.width-80); 

  console.log("shikaku detayo");
}


c.addEventListener('click',function(e){
  if(!stop_title_flag){
    ctx.clearRect(0,0,c.width,c.height);
  }
  stop_title_flag=true;
},false);


let stop_title_flag = false;


let logo = new function() {
  this.x = c.width / 2;
  this.y = c.height / 5;
  this.rot = 0;

  this.draw = function() {
    this.img = new Image();
    this.img.src = "images/logo.png";
    ctx.drawImage(this.img, this.x-this.img.width/2 ,this.y-this.img.height/2);
    console.log("logo display!");
  }
}

function loop(){
  if(!stop_title_flag){
    ctx.fillStyle = "#005731";
    ctx.globalAlpha = 1.0;
    ctx.fillRect(0, 0, c.width, c.height);
    start_buttons();
    logo.draw();
    requestAnimationFrame(loop);
  }
}

loop();

