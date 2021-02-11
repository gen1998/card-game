//キャンバスの描画・全体設定（幅・高さ）
var c = document.createElement("canvas");
var ctx = c.getContext("2d");
c.width = window.innerWidth;
c.height = window.innerHeight;
document.body.appendChild(c);

//スタートボタン座標設定
let start_w = c.width/4;//start_wを変更すれば他は全て変更される
let start_h = start_w/3;
let start_x = c.width/2-start_w/2;
let start_y = c.height/2-start_h/2;

//設定ボタン座標設定
let setting_w = c.width/14;
let setting_h = setting_w;
let setting_x = c.width-setting_w*3/2;
let setting_y = c.height-setting_h*3/2;

//カードを出すボタン座標設定
let decide_w = c.width/6;
let decide_h = decide_w/3;
let decide_x = c.width/3-decide_w/2;
let decide_y = c.height*2/3-decide_h/2; 

//パスボタン座標設定
let pass_w = c.width/6;
let pass_h = pass_w/3;
let pass_x = c.width*2/3-pass_w/2;
let pass_y = c.height*2/3-pass_h/2;

//設定画面戻るボタン座標設定
let setting_back_x = c.width/16;
let setting_back_y = c.height/10;
let setting_back_w = c.width/12;
let setting_back_h = setting_back_w*5/12;

//ルールのONOFF
let  choiced_box=[] 
  for (let index = 0; index < 10; index++) {
        choiced_box.push(-1);//初期値はOFF
  }

//初期のcomの数
let com_num=3;

//↑ここまでがグローバル変数

//初期画面ボタン編
function first_display(){

  //文字の全体設定
  ctx.fillStyle = 'rgba(0,0,0)';
  ctx.textAlign = "center";
  ctx.textBaseline = "middle"; //座標の開始位置を中央に設定！

  //タイトルロゴ・・ボタンとして使用しない
  logopic = new Image();
  logopic.src="images/button/title_logo.png";
  let logo_x = c.width/2-logopic.width/2;
  let logo_y = c.height/4-logopic.height/2;
  ctx.drawImage(logopic, logo_x ,logo_y);

  //スタートボタン
  start_button = new Image();
  start_button.src="images/button/start.png";
  ctx.drawImage(start_button, start_x ,start_y,start_w,start_h);  
  
  //設定ボタン
  setting_button = new Image();
  setting_button.src="images/button/setting.png";
  ctx.drawImage(setting_button, setting_x ,setting_y,setting_w,setting_h);  

  //商標の文字
  let trademark_box_x=150;
  let trademark_box_y=c.height-80;
  ctx.fillStyle = 'white';
  ctx.font = '15pt メイリオ';
  ctx.fillText('©2020 Musashi 91期 inc.', trademark_box_x, trademark_box_y); 
  
}

//設定画面入力項目
function setting(){
  ctx.fillStyle = 'white';
  
  let setting =['縛り','スペ3','5飛ばし','7渡し','8切り','10捨て','11バック','革命','階段革命','ドボン']
  let box={"x":c.width/16,"y":c.height/5,"w":c.width/3,"h":c.height/9}
  let check=[]
  let y1 = box.y+box.h/8;
  let y2 = box.y+box.h/8;

  box_button = new Image();
  box_button.src="images/button/FINISHのコピーのコピーのコピー.png";
  ctx.drawImage(box_button, 0 ,0,720,120);  

  /*
  let box_pic = new Array();

  box_pic[0] = new Image();
  box_pic[0].src = "images/button/.png";
  box_pic[1] = new Image();
  box_pic[1].src = "images/button/.png";
  box_pic[2] = new Image();
  box_pic[2].src = "images/button/.png";
  box_pic[3] = new Image();
  box_pic[3].src = "images/button/.png";
  box_pic[4] = new Image();
  box_pic[4].src = "images/button/.png";
  box_pic[5] = new Image();
  box_pic[5].src = "images/button/.png";
  box_pic[6] = new Image();
  box_pic[6].src = "images/button/.png";
  box_pic[7] = new Image();
  box_pic[7].src = "images/button/.png";
  box_pic[8] = new Image();
  box_pic[8].src = "images/button/.png";
  box_pic[9] = new Image();
  box_pic[9].src = "images/button/.png";

  ctx.drawImage(box_pic[index],,,,);
  */  


  for (let index = 0; index < 10; index++){
    if(index>=0 && index<5){
      check.push({"x":box.x+box.w*2/3,"y":y1,"w":box.h*3/4,"h":box.h*3/4})
      let distance=c.height/7;
      y1=y1+distance;
    }else{
      check.push({"x":box.x*8+box.w*2/3,"y":y2,"w":box.h*3/4,"h":box.h*3/4})
      let distance=c.height/7;
      y2=y2+distance;
    }
  }

  let yy1 = box.y;
  let yy2 = box.y;
  
  for (let index = 0; index < 10; index++) {
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.font = '30pt メイリオ';

    if(index>=0 && index<5){
      ctx.fillRect(box.x, yy1, box.w, box.h);
      ctx.fillStyle = 'black';
      ctx.fillText(setting[index], box.x+box.w/5, yy1+box.h/2)
      let distance=c.height/7;
      yy1=yy1+distance;
    }else{
      ctx.fillRect(box.x*8, yy2, box.w, box.h);
      ctx.fillStyle = 'black';
      ctx.fillText(setting[index], box.x*8+box.w/5, yy2+box.h/2)
      let distance=c.height/7;
      yy2=yy2+distance;
    }
    if(index==choiced_box[index]){
      ctx.fillStyle = 'black';
      ctx.fillRect(check[index].x, check[index].y, check[index].w, check[index].h);
    }else{
      ctx.strokeRect(check[index].x, check[index].y, check[index].w, check[index].h);
    }
  }

  //人数設定ボタン
  ctx.fillStyle = 'white';
  let player={x:box.x*8,y:box.y-c.height/7} 
  let up_box = {x:player.x+box.w*2/3-box.h/3,y:player.y+box.h/3,w:box.h/4,h:box.h/4}
  let down_box ={x:player.x+box.w*2/3+box.h/3+box.h*3/4-up_box.w,y:player.y+box.h/3,w:box.h/4,h:box.h/4}
  
  ctx.fillRect(player.x, player.y, box.w, box.h);
  ctx.strokeRect(player.x+box.w*2/3,player.y+box.h/8,box.h*3/4,box.h*3/4);
  ctx.strokeRect(up_box.x,up_box.y,up_box.w,up_box.h);
  ctx.strokeRect(down_box.x,down_box.y,down_box.w,down_box.h);

  ctx.fillStyle = 'black';
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.font = '30pt メイリオ';
  ctx.fillText('comの数',player.x+box.w/5,player.y+box.h/2);

  ctx.textAlign = "center";
  ctx.font = '16pt メイリオ';
  ctx.fillText('▲',up_box.x+up_box.w/2,up_box.y+up_box.h/2);
  ctx.fillText('▼',down_box.x+down_box.w/2,down_box.y+down_box.h/2);

  //comの数入力
  ctx.fillStyle = 'black';
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = '30pt メイリオ';
  ctx.fillText(com_num,player.x+box.w*2/3+box.h*3/8,player.y+box.h/8+box.h*3/8);

  //戻るボタン
  setting_back_button = new Image();
  setting_back_button.src="images/button/setting_back.png";
  ctx.drawImage(setting_back_button, setting_back_x ,setting_back_y,setting_back_w,setting_back_h);  

  //設定画面チェックボタン
  c.addEventListener('click',function(e){
    var rect = e.target.getBoundingClientRect();

    for(let index =0;index<10;index++){
      if(choiced_box[index] == -1){
        if(check[index].x <= e.clientX && e.clientX <= check[index].x+check[index].w && check[index].y <= e.clientY && e.clientY <= check[index].y+check[index].h){ 
          choiced_box[index] = index;
        }  
      }else {
        if(check[index].x <= e.clientX && e.clientX <= check[index].x+check[index].w && check[index].y <= e.clientY && e.clientY <= check[index].y+check[index].h){ 
          choiced_box[index]=-1; 
        }  
      }
    }
  });

}

//comの数変更(とても直したい)
let box={"x":c.width/16,"y":c.height/5,"w":c.width/3,"h":c.height/9}
let player={x:box.x*8,y:box.y-c.height/7} 
let up_box = {x:player.x+box.w*2/3-box.h/3,y:player.y+box.h/3,w:box.h/4,h:box.h/4}
let down_box ={x:player.x+box.w*2/3+box.h/3+box.h*3/4-up_box.w,y:player.y+box.h/3,w:box.h/4,h:box.h/4}

c.addEventListener('click',function(e){
  var rect = e.target.getBoundingClientRect();
  if(start_setting_flag){
    if(com_num <6 && up_box.x <= e.clientX && e.clientX <= up_box.x+up_box.w && up_box.y <= e.clientY && e.clientY <= up_box.y+up_box.h){
      com_num=com_num+1;
    }else if(2 < com_num && down_box.x <= e.clientX && e.clientX <= down_box.x+down_box.w && down_box.y <= e.clientY && e.clientY <= down_box.y+down_box.h){
      com_num=com_num-1;
    }
  }
});


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

//クリックしたらフラグ起動(カードを選ぶと飛び出る)カードの右上は対応していない
let choice_flag =[] 
for (let index = 0; index < 20; index++) {
      choice_flag.push(false);
}

c.addEventListener('click',function(e){
  var rect = e.target.getBoundingClientRect();
  this.img = new Image();
  this.img.src = "images/card/heart3.jpg";
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
  this.img.src = "images/card/heart3.jpg"; 

  if(decide_x <= e.clientX && e.clientX <= decide_x+decide_w && decide_y <= e.clientY && e.clientY <= decide_y+decide_h){
    //リストの中でTrueになっているindexを取得、position[]に新しいx座標y座標を代入

    const result = choice_flag.reduce(function(accumulator, currentValue, index) {
        if (currentValue === true) {
            accumulator.push(index);
        }
        return accumulator;
    }, [])

  //カードを詰めて表示するところ
  for(let index=0;index<result.length;index++){
        position[result[index]].x=c.width/2-this.img.width/2;
        position[result[index]].y=c.height/2-this.img.height/2;
        for(let k=result[index]+1;k<position.length;k++){
          position[k].x=position[k].x-(c.width*0.9-this.img.width)/19
        }
    }
  }
});

//トランプ座標管理（リスト）
let position =[] //{"x":30,"y":60},{"x":}
let space_x =c.width/20;

for (let index = 0; index < 20; index++) {
    
  this.img = new Image();
  this.img.src = "images/card/heart3.jpg";

  let space_y=c.height-this.img.height;
  let distance=(c.width*0.9-this.img.width)/19;
  
  position.push({"x":space_x,"y":space_y})
  space_x=space_x+distance;
}


//プレイ画面カード手持ち表示
let  space =new function(){
  this.draw =function(){
    this.img = new Image();
    this.img.src = "images/card/heart3.jpg";

    if(com_num==2){
      for (let index = 0; index < 18; index++) {
        ctx.drawImage(this.img,position[index].x,position[index].y);
      }
    }else if(com_num==3){
      for (let index = 0; index < 13; index++) {
        ctx.drawImage(this.img,position[index].x,position[index].y);
      }
    }else if(com_num==4){
      for (let index = 0; index < 10; index++) {
        ctx.drawImage(this.img,position[index].x,position[index].y);
      }
    }else if(com_num==5){
      for (let index = 0; index < 9; index++) {
        ctx.drawImage(this.img,position[index].x,position[index].y);
      }
    }else if(com_num==6){
      for (let index = 0; index < 7; index++) {
        ctx.drawImage(this.img,position[index].x,position[index].y);
      }
    }
  }
}

//プレイヤー表示
let playerpic = new Array();

playerpic[0] = new Image();
playerpic[0].src = "images/player/player1.png";
playerpic[1] = new Image();
playerpic[1].src = "images/player/player2.png";
playerpic[2] = new Image();
playerpic[2].src = "images/player/player3.png";
playerpic[3] = new Image();
playerpic[3].src = "images/player/player4.png";
playerpic[4] = new Image();
playerpic[4].src = "images/player/player5.png";
playerpic[5] = new Image();
playerpic[5].src = "images/player/player6.png";

card_ura = new Image();
card_ura.src = "images/card/ura5.jpg";
ctx.textBaseline = "middle";

let com_card_num =[
  {"a":18,"b":18},
  {"a":14,"b":14,"c":13},
  {"a":11,"b":11,"c":11,"d":11},
  {"a":9,"b":9,"c":9,"d":9,"e":9},
  {"a":8,"b":8,"c":8,"d":8,"e":8,"f":7}
];

function player_num(){

  let com2 =[
    {"x":playerpic[0].width*2/9,"y":c.height/2-playerpic[0].height/6,"w":playerpic[0].width/3,"h":playerpic[0].height/3},
    {"x":c.width-playerpic[1].width*2/3,"y":c.height/2-playerpic[1].height/6,"w":playerpic[1].width/3,"h":playerpic[1].height/3}
  ];

  let com3 =[
    {"x":playerpic[0].width*2/9,"y":c.height/2-playerpic[0].height/6,"w":playerpic[0].width/3,"h":playerpic[0].height/3},
    {"x":c.width/2-playerpic[1].width/6,"y":10,"w":playerpic[1].width/3,"h":playerpic[1].height/3},
    {"x":c.width-playerpic[2].width*2/3,"y":c.height/2-playerpic[2].height/6,"w":playerpic[2].width/3,"h":playerpic[2].height/3}
  ];

  let com4 =[
    {"x":playerpic[0].width*2/9,"y":c.height/2-playerpic[0].height/6,"w":playerpic[0].width/3,"h":playerpic[0].height/3},
    {"x":playerpic[1].width*2/9,"y":10,"w":playerpic[1].width/3,"h":playerpic[1].height/3},
    {"x":c.width-playerpic[2].width*2/3,"y":10,"w":playerpic[2].width/3,"h":playerpic[2].height/3},
    {"x":c.width-playerpic[3].width*2/3,"y":c.height/2-playerpic[3].height/6,"w":playerpic[3].width/3,"h":playerpic[3].height/3}
  ];

  let com5 =[
    {"x":playerpic[0].width*2/9,"y":c.height/2-playerpic[0].height/6,"w":playerpic[0].width/3,"h":playerpic[0].height/3},
    {"x":playerpic[1].width*2/9,"y":10,"w":playerpic[1].width/3,"h":playerpic[1].height/3},
    {"x":c.width/2-playerpic[2].width/6,"y":10,"w":playerpic[2].width/3,"h":playerpic[2].height/3},
    {"x":c.width-playerpic[3].width*2/3,"y":10,"w":playerpic[3].width/3,"h":playerpic[3].height/3},
    {"x":c.width-playerpic[4].width*2/3,"y":c.height/2-playerpic[4].height/6,"w":playerpic[4].width/3,"h":playerpic[4].height/3}
  ];

  let com6 =[
    {"x":playerpic[0].width*2/9,"y":c.height/2-playerpic[0].height/6,"w":playerpic[0].width/3,"h":playerpic[0].height/3},
    {"x":playerpic[1].width*2/9,"y":c.height/4-playerpic[1].height/12,"w":playerpic[1].width/3,"h":playerpic[1].height/3},
    {"x":playerpic[2].width*2/9,"y":10,"w":playerpic[2].width/3,"h":playerpic[2].height/3},
    {"x":c.width-playerpic[3].width*2/3,"y":10,"w":playerpic[3].width/3,"h":playerpic[3].height/3},
    {"x":c.width-playerpic[4].width*2/3,"y":c.height/4-playerpic[4].height/12,"w":playerpic[4].width/3,"h":playerpic[4].height/3},
    {"x":c.width-playerpic[5].width*2/3,"y":c.height/2-playerpic[5].height/6,"w":playerpic[5].width/3,"h":playerpic[5].height/3}
  ];

  //comのカードの枚数
  for(let i=0;i<com_num;i++){
    ctx.font = '40pt メイリオ';
    ctx.fillStyle = 'black';
    ctx.textAlign = "left";

    if(com_num==2){
      ctx.drawImage(playerpic[i], com2[i].x ,com2[i].y,com2[i].w,com2[i].h);
      ctx.drawImage(card_ura,com2[0].x+playerpic[0].width*1.5/3,com2[0].y,card_ura.width/3,card_ura.height/3);
      ctx.drawImage(card_ura,com2[1].x-playerpic[1].width*0.5/3-100-card_ura.width*1.5/3,com2[1].y,card_ura.width/3,card_ura.height/3);
    
      ctx.fillText('×'+ String(com_card_num[0].a),com2[0].x+playerpic[0].width*1.5/3+card_ura.width*1.5/3, com2[0].y+card_ura.height/6);
    
      ctx.textAlign = "right";
      ctx.fillText('×'+ String(com_card_num[0].b),com2[1].x-playerpic[1].width*0.5/3, com2[1].y+card_ura.height/6);


    }else if(com_num==3){
      ctx.drawImage(playerpic[i], com3[i].x ,com3[i].y,com3[i].w,com3[i].h);
      ctx.drawImage(card_ura,com3[0].x+playerpic[0].width*1.5/3,com3[0].y,card_ura.width/3,card_ura.height/3);//0人目
      ctx.drawImage(card_ura,com3[1].x+playerpic[1].width*1.5/3,com3[1].y,card_ura.width/3,card_ura.height/3);//1人目
      ctx.drawImage(card_ura,com3[2].x-playerpic[2].width*0.5/3-100-card_ura.width*1.5/3,com3[2].y,card_ura.width/3,card_ura.height/3);//2人目
    
      ctx.fillText('×'+ String(com_card_num[1].a),com3[0].x+playerpic[0].width*1.5/3+card_ura.width*1.5/3, com3[0].y+card_ura.height/6);
      ctx.fillText('×'+ String(com_card_num[1].b),com3[1].x+playerpic[1].width*1.5/3+card_ura.width*1.5/3, com3[1].y+card_ura.height/6);
    
      ctx.textAlign = "right";
      ctx.fillText('×'+ String(com_card_num[1].c),com3[2].x-playerpic[2].width*0.5/3, com3[2].y+card_ura.height/6);

    }else if(com_num==4){
      ctx.drawImage(playerpic[i], com4[i].x ,com4[i].y,com4[i].w,com4[i].h);
      ctx.drawImage(card_ura,com4[0].x+playerpic[0].width*1.5/3,com4[0].y,card_ura.width/3,card_ura.height/3);
      ctx.drawImage(card_ura,com4[1].x+playerpic[1].width*1.5/3,com4[1].y,card_ura.width/3,card_ura.height/3);
      ctx.drawImage(card_ura,com4[2].x-playerpic[2].width*0.5/3-100-card_ura.width*1.5/3,com4[2].y,card_ura.width/3,card_ura.height/3);
      ctx.drawImage(card_ura,com4[3].x-playerpic[3].width*0.5/3-100-card_ura.width*1.5/3,com4[3].y,card_ura.width/3,card_ura.height/3);
    
      ctx.fillText('×'+ String(com_card_num[2].a),com4[0].x+playerpic[0].width*1.5/3+card_ura.width*1.5/3, com4[0].y+card_ura.height/6);
      ctx.fillText('×'+ String(com_card_num[2].b),com4[1].x+playerpic[1].width*1.5/3+card_ura.width*1.5/3, com4[1].y+card_ura.height/6);
    
      ctx.textAlign = "right";
      ctx.fillText('×'+ String(com_card_num[2].c),com4[2].x-playerpic[2].width*0.5/3, com4[2].y+card_ura.height/6);
      ctx.fillText('×'+ String(com_card_num[2].d),com4[3].x-playerpic[3].width*0.5/3, com4[3].y+card_ura.height/6);

    }else if(com_num==5){
      ctx.drawImage(playerpic[i], com5[i].x ,com5[i].y,com5[i].w,com5[i].h);
      ctx.drawImage(card_ura,com5[0].x+playerpic[0].width*1.5/3,com5[0].y,card_ura.width/3,card_ura.height/3);
      ctx.drawImage(card_ura,com5[1].x+playerpic[1].width*1.5/3,com5[1].y,card_ura.width/3,card_ura.height/3);
      ctx.drawImage(card_ura,com5[2].x+playerpic[2].width*1.5/3,com5[2].y,card_ura.width/3,card_ura.height/3);
      ctx.drawImage(card_ura,com5[3].x-playerpic[3].width*0.5/3-50-card_ura.width*1.5/3,com5[3].y,card_ura.width/3,card_ura.height/3);
      ctx.drawImage(card_ura,com5[4].x-playerpic[4].width*0.5/3-50-card_ura.width*1.5/3,com5[4].y,card_ura.width/3,card_ura.height/3);
    
      ctx.fillText('×'+ String(com_card_num[3].a),com5[0].x+playerpic[0].width*1.5/3+card_ura.width*1.5/3, com5[0].y+card_ura.height/6);
      ctx.fillText('×'+ String(com_card_num[3].b),com5[1].x+playerpic[1].width*1.5/3+card_ura.width*1.5/3, com5[1].y+card_ura.height/6);
      ctx.fillText('×'+ String(com_card_num[3].c),com5[2].x+playerpic[2].width*1.2/3+card_ura.width*1.5/3, com5[2].y+card_ura.height/6);
    
      ctx.textAlign = "right";
      ctx.fillText('×'+ String(com_card_num[3].d),com5[3].x-playerpic[3].width*0.5/3, com5[3].y+card_ura.height/6);
      ctx.fillText('×'+ String(com_card_num[3].e),com5[4].x-playerpic[4].width*0.5/3, com5[4].y+card_ura.height/6);

    }else if(com_num==6){
      ctx.drawImage(playerpic[i], com6[i].x ,com6[i].y,com6[i].w,com6[i].h);
      ctx.drawImage(card_ura,com6[0].x+playerpic[0].width*1.5/3,com6[0].y,card_ura.width/3,card_ura.height/3);
      ctx.drawImage(card_ura,com6[1].x+playerpic[1].width*1.5/3,com6[1].y,card_ura.width/3,card_ura.height/3);
      ctx.drawImage(card_ura,com6[2].x+playerpic[2].width*1.5/3,com6[2].y,card_ura.width/3,card_ura.height/3);
      ctx.drawImage(card_ura,com6[3].x-playerpic[3].width*0.5/3-100-card_ura.width*1.5/3,com6[3].y,card_ura.width/3,card_ura.height/3);
      ctx.drawImage(card_ura,com6[4].x-playerpic[4].width*0.5/3-100-card_ura.width*1.5/3,com6[4].y,card_ura.width/3,card_ura.height/3);
      ctx.drawImage(card_ura,com6[5].x-playerpic[5].width*0.5/3-100-card_ura.width*1.5/3,com6[5].y,card_ura.width/3,card_ura.height/3);
    
      ctx.fillText('×'+ String(com_card_num[4].a),com6[0].x+playerpic[0].width*1.5/3+card_ura.width*1.5/3, com6[0].y+card_ura.height/6);
      ctx.fillText('×'+ String(com_card_num[4].b),com6[1].x+playerpic[1].width*1.5/3+card_ura.width*1.5/3, com6[1].y+card_ura.height/6);
      ctx.fillText('×'+ String(com_card_num[4].c),com6[2].x+playerpic[2].width*1.5/3+card_ura.width*1.5/3, com6[2].y+card_ura.height/6);
    
      ctx.textAlign = "right";
      ctx.fillText('×'+ String(com_card_num[4].d),com6[3].x-playerpic[3].width*0.5/3, com6[3].y+card_ura.height/6);
      ctx.fillText('×'+ String(com_card_num[4].e),com6[4].x-playerpic[4].width*0.5/3, com6[4].y+card_ura.height/6);
      ctx.fillText('×'+ String(com_card_num[4].f),com6[5].x-playerpic[5].width*0.5/3, com6[5].y+card_ura.height/6);

    } 
  }
}

//プレイ画面ボタン編
function play_buttons(){

  //ボタン全体設定
  ctx.fillStyle = 'white';

  //カードを出すボタン
  decide_button = new Image();
  decide_button.src="images/button/decide.png";
  ctx.drawImage(decide_button, decide_x ,decide_y,decide_w,decide_h);

  //パスボタン
  pass_button = new Image();
  pass_button.src="images/button/pass.png";
  ctx.drawImage(pass_button, pass_x ,pass_y,pass_w,pass_h);

}

//表示
function loop(){
  if(!stop_title_flag){
    ctx.fillStyle = "#005731";
    ctx.globalAlpha = 1.0;
    ctx.fillRect(0, 0, c.width, c.height);
    first_display();    
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
    space.draw();
    player_num();
    play_buttons();
    requestAnimationFrame(loop);
  }
}

loop();