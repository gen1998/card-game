//キャンバスの描画・全体設定（幅・高さ）
var c = document.createElement("canvas");
var ctx = c.getContext("2d");

c.width = window.innerWidth;
c.height = window.innerHeight;

document.body.appendChild(c);

//初期画面ボタン編
function start_buttons(){

  //ボタン全体設定
  ctx.fillStyle = 'white';

  //スタートボタン座標設定
  let start_w = 300;
  let start_h = 100;
  let start_x = c.width/2-start_w/2;
  let start_y = c.width/2-start_h/2;
  
  //スタートボタン
  ctx.fillRect(start_x, start_y, start_w, start_h);
  
  //設定ボタン座標設定
  let setting_w = 100;
  let setting_h = 100;
  let setting_x = c.width-setting_w*3/2;
  let setting_y = c.width-setting_h*3/2;

  //設定ボタン
  ctx.fillRect(setting_x, setting_y, setting_w, setting_h);
  
  //文字の全体設定
  ctx.fillStyle = 'rgba(0,0,0)';
  ctx.textAlign = "center";
  ctx.textBaseline = "middle"; //座標の開始位置を中央に設定！
  
  //スタートボタンの文字
  let start_letter_x=c.width/2;
  let start_letter_y=c.width/2;
  ctx.font = '40pt メイリオ';
  ctx.fillText('スタート', start_letter_x, start_letter_y);
　
  //設定の文字
  let setting_letter_x=c.width-setting_h;
  let setting_letter_y=c.width-setting_w;
  ctx.font = '30pt メイリオ';
  ctx.fillText('設定',setting_letter_x, setting_letter_y);

  //商標の文字
  let trademark_setting_x=150;
  let trademark_setting_y=c.width-80;
  ctx.fillStyle = 'white';
  ctx.font = '15pt メイリオ';
  ctx.fillText('©2020 Musashi 91期 inc.', trademark_setting_x, trademark_setting_y); 
}

//初期画面ロゴ編
let logo = new function() {
  let x = c.width / 2;
  let y = c.height / 5;
  let rot = 0;

  this.draw = function(){ //このthisはこのままでーす！letじゃ動かないです。なんで？
    this.img = new Image();
    this.img.src = "images/logo.png";
    let logo_x = x-this.img.width/2;
    let logo_y = y-this.img.height/2;
    ctx.drawImage(this.img, logo_x ,logo_y);
  }
}

//フラグ集（デフォルトはfalse）
let stop_title_flag = false;
let start_setting_flag=false;
let start_game_flag=false;

//変数再定義（改善したいです）
let start_w = 300;
let start_h = 100;
let start_x = c.width/2-start_w/2;
let start_y = c.width/2-start_h/2;
let setting_w = 100;
let setting_h = 100;
let setting_x = c.width-setting_w*3/2;
let setting_y = c.width-setting_h*3/2;

//クリックしたらフラグ起動
c.addEventListener('click',function(e){
  if(!stop_title_flag){
    var rect = e.target.getBoundingClientRect();
    //console.log(e.clientX)
    
    if(start_x <= e.clientX && e.clientX <= start_x+start_w && start_y <= e.clientY && e.clientY <= start_y+start_h){
      ctx.clearRect(0,0,c.width,c.height); 
      stop_title_flag=true; 
      start_game_flag=true;
      
    }
    
    if(setting_x <= e.clientX && e.clientX <= setting_x+setting_w && setting_y <= e.clientY && e.clientY <= setting_y+setting_h){
      ctx.clearRect(0,0,c.width,c.height);
      stop_title_flag=true; 
      start_setting_flag=true;
    }    
  }
});

//プレイ画面カード表示
let card = new function() {
  let x = c.width / 2;
  let y = c.height / 2;
  let rot = 0;
  
  this.draw = function(){ //このthisはこのままでーす！letじゃ動かないです。なんで？
    this.img = new Image();
    this.img.src = "images/heart3.jpg";
    let card_x = x-this.img.width/2;
    let card_y = y-this.img.height/2;
    ctx.drawImage(this.img, card_x ,card_y);
  }
}

//プレイ画面プレーヤー表示1
let player1 = new function() {
  let x = c.width / 2;
  let y = c.height / 5;
  let rot = 0;
  
  this.draw = function(){ //このthisはこのままでーす！letじゃ動かないです。なんで？
    this.img = new Image();
    this.img.src = "images/player/player1.png";
    let player_width = this.img.width/3;
    let player_height =this.img.height/3;
    let player_x = x-player_width/2;
    let player_y = 0;
    ctx.drawImage(this.img, player_x ,player_y,player_width,player_height);
  }
}

//プレイ画面プレーヤー表示2
let player2 = new function() {
  let x = c.width /2;
  let y = c.height / 2;
  let rot = 0;
  
  this.draw = function(){ //このthisはこのままでーす！letじゃ動かないです。なんで？
    this.img = new Image();
    this.img.src = "images/player/player2.png";
    let player_width = this.img.width/3;
    let player_height =this.img.height/3;
    let player_x = 0;
    let player_y = y-player_height/2;
    ctx.drawImage(this.img, player_x ,player_y,player_width,player_height);
  }
}

//プレイ画面プレーヤー表示3
let player3 = new function() {
  let x = c.width /2;
  let y = c.height / 2;
  let rot = 0;
  
  this.draw = function(){ //このthisはこのままでーす！letじゃ動かないです。なんで？
    this.img = new Image();
    this.img.src = "images/player/player3.png";
    let player_width = this.img.width/3;
    let player_height =this.img.height/3;
    let player_x = c.width-player_width;
    let player_y = y-player_height/2;
    ctx.drawImage(this.img, player_x ,player_y,player_width,player_height);
  }
}

//プレイ画面ボタン編
function play_buttons(){

  //ボタン全体設定
  ctx.fillStyle = 'white';

  //決定ボタン座標設定
  let decide_w =c.width/3;
  let decide_h = c.height/10;
  let decide_x = c.width/3-decide_w/2;
  let decide_y = c.width/2-decide_h/2;
  
  //決定ボタン
  ctx.fillRect(decide_x, decide_y, decide_w, decide_h);

  //パスボタン座標設定
  let pass_w =c.width/3;
  let pass_h = c.height/10;
  let pass_x = c.width*2/3-pass_w/2;
  let pass_y = c.width/2-pass_h/2;
    
  //パスボタン
  ctx.fillRect(pass_x, pass_y, pass_w, pass_h);

  
  //文字の全体設定
  ctx.fillStyle = 'rgba(0,0,0)';
  ctx.textAlign = "center";
  ctx.textBaseline = "middle"; //座標の開始位置を中央に設定！
  
  //決定ボタンの文字
  let decide_letter_x=c.width/3;
  let decide_letter_y=c.width/2;
  ctx.font = '40pt メイリオ';
  ctx.fillText('カードを出す', decide_letter_x, decide_letter_y);

   //パスボタンの文字
   let pass_letter_x=c.width*2/3;
   let pass_letter_y=c.width/2;
   ctx.font = '40pt メイリオ';
   ctx.fillText('パス', pass_letter_x, pass_letter_y);
}



//表示
function loop(){
  if(!stop_title_flag){
    ctx.fillStyle = "#005731";
    ctx.globalAlpha = 1.0;
    ctx.fillRect(0, 0, c.width, c.height);
    start_buttons();
    logo.draw();
    requestAnimationFrame(loop);
  }
  if(start_setting_flag){
    ctx.fillStyle = "#005731";
    ctx.globalAlpha = 1.0;
    ctx.fillRect(0, 0, c.width, c.height);
    requestAnimationFrame(loop);
  }
  if(start_game_flag){
    ctx.fillStyle = "#005731";
    ctx.globalAlpha = 1.0;
    ctx.fillRect(0, 0, c.width, c.height);
    card.draw();
    player1.draw();
    player2.draw();
    player3.draw();
    play_buttons();
    requestAnimationFrame(loop);
  }
}



loop();

