//キャンバスの描画・全体設定（幅・高さ）
var c = document.createElement("canvas");
var ctx = c.getContext("2d");
c.width = window.innerWidth;
c.height = window.innerHeight;
document.body.appendChild(c);

//スタートボタン座標設定
let start_w = 300;
let start_h = 100;
let start_x = c.width/2-start_w/2;
let start_y = c.height/2-start_h/2;

//設定ボタン座標設定
let setting_w = 100;
let setting_h = 100;
let setting_x = c.width-setting_w*3/2;
let setting_y = c.height-setting_h*3/2;

//カードを出すボタン座標設定
let decide_w =c.width/6;
let decide_h = c.height/14;
let decide_x = c.width/3-decide_w/2;
let decide_y = c.height*2/3-decide_h/2; 

//設定画面戻るボタン座標設定
let setting_back_x = c.width/16;
let setting_back_y = c.height/10;
let setting_back_w = 120;
let setting_back_h = 50;

//初期画面ボタン編
function start_buttons(){
  //ボタン全体設定
  ctx.fillStyle = 'white';

  ctx.fillRect(start_x, start_y, start_w, start_h);//スタートボタン配置  
  ctx.fillRect(setting_x, setting_y, setting_w, setting_h);//設定ボタン配置
  
  //文字の全体設定
  ctx.fillStyle = 'rgba(0,0,0)';
  ctx.textAlign = "center";
  ctx.textBaseline = "middle"; //座標の開始位置を中央に設定！
  
  //スタートボタンの文字
  let start_letter_x=c.width/2;
  let start_letter_y=c.height/2;
  ctx.font = '40pt メイリオ';
  ctx.fillText('スタート', start_letter_x, start_letter_y);
　
  //設定の文字
  let setting_letter_x=c.width-setting_w;
  let setting_letter_y=c.height-setting_h;
  ctx.font = '30pt メイリオ';
  ctx.fillText('設定',setting_letter_x, setting_letter_y);

  //商標の文字
  let trademark_box_x=150;
  let trademark_box_y=c.height-80;
  ctx.fillStyle = 'white';
  ctx.font = '15pt メイリオ';
  ctx.fillText('©2020 Musashi 91期 inc.', trademark_box_x, trademark_box_y); 
}

//初期画面ロゴ編
let logo = new function() {
  this.draw = function(){ //このthisはこのままでーす！letじゃ動かないです。なんで？
    this.img = new Image();
    this.img.src = "images/logo.png";
    let logo_x = c.width/2-this.img.width/2;
    let logo_y = c.height/5-this.img.height/2;
    ctx.drawImage(this.img, logo_x ,logo_y);
  }
}

//設定画面入力項目
function setting(){
  ctx.fillStyle = 'white';
  
  let setting =['comの数','縛り','スペ3','5飛ばし','7渡し','8切り','10捨て','11バック','革命','ドボン']
  let box={"x":c.width/16,"y":c.height/5,"w":c.width/3,"h":c.height/9}
  let check={"x":box.x+box.w*2/3,"y":box.y+box.h/8,"w":box.h*3/4,"h":box.h*3/4}
  /*let check=[]
  check.push({"x":box.x+box.w*2/3,"y":box.y+box.h/8,"w":box.h*3/4,"h":box.h*3/4})*/
  
  for (let index = 0; index < 10; index=index+2) {
    ctx.fillRect(box.x, box.y, box.w, box.h);
    ctx.fillRect(box.x*8, box.y, box.w, box.h);

    ctx.strokeStyle = 'black';
    ctx.strokeRect(check.x, check.y, check.w, check.h);
    ctx.strokeRect(check.x+box.x*7, check.y, check.w, check.h);

    ctx.fillStyle = 'rgba(0,0,0)';
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.font = '30pt メイリオ';
    ctx.fillText(setting[index], box.x+box.w/5, box.y+box.h/2)
    ctx.fillText(setting[index+1], box.x*8+box.w/5, box.y+box.h/2)
  
    //check.push({"x":box.x+box.w*2/3,"y":box.y+box.h/8,"w":box.h*3/4,"h":box.h*3/4});

    let distance=c.height/7;
    box.y=box.y+distance;
    check.y=check.y+distance;
    ctx.fillStyle = 'white';

  }

  //戻るボタン
  ctx.fillRect(setting_back_x, setting_back_y, setting_back_w,setting_back_h);
  
  //文字
  ctx.fillStyle = 'rgba(0,0,0)';
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = '20pt メイリオ';
  ctx.fillText('戻る', setting_back_x+setting_back_w/2, setting_back_y+setting_back_h/2);

  //設定画面チェックボタン
  let  rule_flag=[] 
  for (let index = 0; index < 10; index++) {
        rule_flag.push(false);
  }

  c.addEventListener('click',function(e){
    var rect = e.target.getBoundingClientRect();
    //let distance=(c.width*0.9-this.img.width)/19;

    for(let index =0;index<10;index++){
      if(!rule_flag[index]){
        if(position[index].x <= e.clientX && e.clientX <= position[index].x+distance && position[index].y <= e.clientY && e.clientY <= c.height){ 
          //position[index].y=position[index].y-this.img.height/3;
          rule_flag[index]=true; 
        }  
      } else {
        if(position[index].x <= e.clientX && e.clientX <= position[index].x+distance && position[index].y <= e.clientY && e.clientY <= position[index].y+this.img.height){ 
          //position[index].y=position[index].y+this.img.height/3;
          rule_flag[index]=false; 
        }  
      }
    }
  });

}


//フラグ集（デフォルトはfalse）
let stop_title_flag = false;
let start_setting_flag=false;
let start_game_flag=false;

//クリックしたらフラグ起動(スタート＆設定画面)
c.addEventListener('click',function(e){
  if(!stop_title_flag){
    var rect = e.target.getBoundingClientRect();
    
    if(start_x <= e.clientX && e.clientX <= start_x+start_w && start_y <= e.clientY && e.clientY <= start_y+start_h){
      stop_title_flag=true; 
      start_game_flag=true;
    }
    if(setting_x <= e.clientX && e.clientX <= setting_x+setting_w && setting_y <= e.clientY && e.clientY <= setting_y+setting_h){
      stop_title_flag=true; 
      start_setting_flag=true;
    }
  }
  else if(setting_back_x <= e.clientX && e.clientX <= setting_back_x+setting_back_w && setting_back_y <= e.clientY && e.clientY <= setting_back_y+setting_back_h){
    start_setting_flag=false;
    stop_title_flag=false;
  }
});

//プレイ画面カード表示（場）
let card = new function() {
  this.draw = function(){ //このthisはこのままでーす！letじゃ動かないです。なんで？
    this.img = new Image();
    this.img.src = "images/heart3.jpg";
    let card_x = c.width/2-this.img.width/2;
    let card_y = c.height/2-this.img.height/2;
    ctx.drawImage(this.img, card_x ,card_y);
  }
}

//クリックしたらフラグ起動(カードを選ぶと飛び出る)カードの右上は対応していない
let choice_flag =[] 
for (let index = 0; index < 20; index++) {
      choice_flag.push(false);
}

c.addEventListener('click',function(e){
  var rect = e.target.getBoundingClientRect();
  this.img = new Image();
  this.img.src = "images/heart3.jpg";
  let distance=(c.width*0.9-this.img.width)/19;

  for(let index =0;index<20;index++){
    if(!choice_flag[index]){
      if(position[index].x <= e.clientX && e.clientX <= position[index].x+distance && position[index].y <= e.clientY && e.clientY <= c.height){ 
        position[index].y=position[index].y-this.img.height/3;
        choice_flag[index]=true; 
      }  
    } else {
      if(position[index].x <= e.clientX && e.clientX <= position[index].x+distance && position[index].y <= e.clientY && e.clientY <= position[index].y+this.img.height){ 
        position[index].y=position[index].y+this.img.height/3;
        choice_flag[index]=false; 
      }  
    }
  }
});

//クリックしたカードを場に出す
c.addEventListener('click',function(e){
  var rect = e.target.getBoundingClientRect();

  this.img = new Image();
  this.img.src = "images/heart3.jpg"; 

  if(decide_x <= e.clientX && e.clientX <= decide_x+decide_w && decide_y <= e.clientY && e.clientY <= decide_y+decide_h){
    //リストの中でTrueになっているindexを取得、position[]に新しいx座標y座標を代入

    const result = choice_flag.reduce(function(accumulator, currentValue, index) {
        if (currentValue === true) {
            accumulator.push(index);
        }
        return accumulator;
    }, [])

  for(let index=0;index<result.length;index++){
        position[result[index]].x=c.width/2-this.img.width/2;
        position[result[index]].y=c.height/2-this.img.height/2;
    }
  }
});

//トランプ座標管理（リスト）
let position =[] //{"x":30,"y":60},{"x":}
let space_x =c.width/20;

for (let index = 0; index < 20; index++) {
    
  this.img = new Image();
  this.img.src = "images/heart3.jpg";

  let space_y=c.height-this.img.height;
  let distance=(c.width*0.9-this.img.width)/19;
  
  position.push({"x":space_x,"y":space_y})
  space_x=space_x+distance;
}

//console.log(position);
//position[2]["x"]
//position[2].x

//プレイ画面カード手持ち表示
let  space =new function(){
  this.draw =function(){
    for (let index = 0; index < 20; index++) {
      this.img = new Image();
      this.img.src = "images/heart3.jpg";
      ctx.drawImage(this.img,position[index].x,position[index].y);
    }
  }
}

//プレイ画面プレーヤー表示1
let player1 = new function() {
  let x = c.width/2;
  let y = c.height/2;
  
  this.draw = function(){ //このthisはこのままでーす！letじゃ動かないです。なんで？
    this.img = new Image();
    this.img.src = "images/player/player1.png";
    let player_w = this.img.width/3;
    let player_h =this.img.height/3;
    let player_x = x-player_w/2;
    let player_y = 0;
    ctx.drawImage(this.img, player_x ,player_y,player_w,player_h);
  }
}

//プレイ画面プレーヤー表示2
let player2 = new function() {
  let x = c.width /2;
  let y = c.height / 2;
  
  this.draw = function(){ //このthisはこのままでーす！letじゃ動かないです。なんで？
    this.img = new Image();
    this.img.src = "images/player/player2.png";
    let player_w = this.img.width/3;
    let player_h =this.img.height/3;
    let player_x = player_w*2/3;
    let player_y = y-player_h/2;
    ctx.drawImage(this.img, player_x ,player_y,player_w,player_h);
  }
}

//プレイ画面プレーヤー表示3
let player3 = new function() {
  let x = c.width/2;
  let y = c.height/2;
  
  this.draw = function(){ //このthisはこのままでーす！letじゃ動かないです。なんで？
    this.img = new Image();
    this.img.src = "images/player/player3.png";
    let player_w = this.img.width/3;
    let player_h =this.img.height/3;
    let player_x = c.width-player_w*2;
    let player_y = y-player_h/2;
    ctx.drawImage(this.img, player_x ,player_y,player_w,player_h);
  }
}

//プレイ画面ボタン編
function play_buttons(){

  //ボタン全体設定
  ctx.fillStyle = 'white';

  //カードを出すボタン
  ctx.fillRect(decide_x, decide_y, decide_w, decide_h);

  //パスボタン座標設定
  let pass_w =c.width/6;
  let pass_h = c.height/14;
  let pass_x = c.width*2/3-pass_w/2;
  let pass_y = c.height*2/3-pass_h/2;
    
  //パスボタン
  ctx.fillRect(pass_x, pass_y, pass_w, pass_h);

  //文字の全体設定
  ctx.fillStyle = 'rgba(0,0,0)';
  ctx.textAlign = "center";
  ctx.textBaseline = "middle"; //座標の開始位置を中央に設定！
  
  //決定ボタンの文字
  let decide_letter_x=c.width/3;
  let decide_letter_y=c.height*2/3;
  ctx.font = '25pt メイリオ';
  ctx.fillText('カードを出す', decide_letter_x, decide_letter_y);

   //パスボタンの文字
   let pass_letter_x=c.width*2/3;
   let pass_letter_y=c.height*2/3;
   ctx.font = '25pt メイリオ';
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
    setting();
    requestAnimationFrame(loop);
  }
  if(start_game_flag){
    ctx.fillStyle = "#005731";
    ctx.globalAlpha = 1.0;
    ctx.fillRect(0, 0, c.width, c.height);
    card.draw();
    space.draw();
    player1.draw();
    player2.draw();
    player3.draw();
    play_buttons();
    requestAnimationFrame(loop);
  }
}

loop();