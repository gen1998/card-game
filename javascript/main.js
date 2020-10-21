//var readline  = require('readline').createInterface(process.stdin, process.stdout);

const mark = ["S", "C", "H", "D"]; //トランプのマーク
const players = ["Hishinuma", "Tsudo", "Kawasaki", "Inoue"] //ゲームの参加者
const num_players = players.length
const rank = ["　大富豪", "　富豪　", "　貧民　", "　大貧民"]

function remove_card(all_card, rm_card) {
  let newCards = all_card.filter(x => (x.number !== rm_card.number || x.mark !== rm_card.mark))
  return newCards
}

//全員の手札を作成
function set_cards(){
  let all_card = []
  let rm_card = {}
  let players_cards = {}
  let index = 0

  //全カードを作成
  for (let i = 0; i < 13; i++) {
    for (let j = 0; j < mark.length; j++) {
      all_card.push({"number" : i+1, "mark" : j})    
    }
  }
  //all_card.push({"number" : 13, "mark" : 4}) // Joker

  //シャッフル
  for(var i = all_card.length - 1; i > 0; i--){
    var r = Math.floor(Math.random() * (i + 1));
    var tmp = all_card[i];
    all_card[i] = all_card[r];
    all_card[r] = tmp;
  }
  
  //各プレイヤーのobjectを作成
  for (let i = 0; i < players.length; i++) {
    const one = players[i];
    players_cards[one] = []
  }

  //各プレイヤーにカードを配布
  while (all_card.length > 0) {
    rm_card = all_card[0]
    players_cards[players[index%num_players]].push(rm_card)
    all_card = remove_card(all_card, rm_card)
    index += 1
  }
  return players_cards
}

//plyerの手札から指定されたカードをpickする
function pick_card(players_hands, player, play_card){
  if (play_card.length == 0) return players_hands
  let buff = players_hands
  let newPlayershands = players_hands[player].filter(x => (x.number != play_card.number || x.mark != play_card.mark))
  buff[player] = newPlayershands
  return buff
}

//plyerの手札の中で出せるカードを一覧にする
function possible_pick_card(players_hands, player, board_cards){
  //場にカードが存在しない時
  if (board_cards.length == 0) return players_hands[player]

  const num_list = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 1, 2]
  let possible_cards = []
  if (board_cards.number < 3) {
    possible_cards = players_hands[player].filter(x => num_list.slice(board_cards.number+13-2).includes(x.number))
  } else {
    possible_cards = players_hands[player].filter(x => num_list.slice(board_cards.number-2).includes(x.number))
  }
  return possible_cards
}

//randomにカードをピックする
function choose_random(possible_cards) {
  if (possible_cards.length == 0) return []
  let arrayIndex = Math.floor(Math.random() * possible_cards.length);
  return possible_cards[arrayIndex];
}
//sleepさせる
function sleep(waitMsec) {
  var startMsec = new Date();
 
  // 指定ミリ秒間だけループさせる（CPUは常にビジー状態）
  while (new Date() - startMsec < waitMsec);
}

//ゲームに必要な変数の宣言
let board_cards = {} //場のカード
let players_hands = {} //全員の手札
let now_player //番の人
let pass_counter = 0 //パスした人数をcountする
let board_player
let game_players = players //順番・人数などを変更可能なゲームの参加者
let now_player_counter = 0 //今全体で何手目か
let win_players = []

players_hands = set_cards()

now_player = game_players[0]
board_player = now_player
//board_cards = {"number" : 2, "mark" : 3}


while (true){
  console.log('player : ', now_player)
  console.log('others : ', game_players)
  console.log('place : ', board_cards)
  possible_cards = possible_pick_card(players_hands, now_player, board_cards)

  //パスを三人したら場は流れる
  if (board_player == now_player) board_cards = []
  
  //出せるカードがない場合
  if (possible_cards.length == 0){
    console.log('pass')
    //pass_counter += 1
  }
  //出せるカードがある場合
  else{
    //pass_counter = 0
    choose_card = choose_random(possible_cards)
    console.log('choose_cards : ', choose_card)
    board_player = now_player
    players_hands = pick_card(players_hands, now_player, choose_card)
    board_cards = choose_card
  }
  
  
  
  //カードの枚数が0になったら上がり！
  if (players_hands[now_player].length == 0){
    console.log(now_player, "上がり！")
    win_players.push(now_player)

    now_player_counter = game_players.indexOf(now_player)
    game_players = game_players.filter(x => x!=now_player)
    now_player = game_players[now_player_counter%game_players.length]
    board_player = now_player
    
    if (game_players.length == 1){
      console.log(game_players[0],"の負け！")
      win_players.push(game_players[0])
      break
    }
    continue
  }

  //次にplayする人を決める
  now_player_counter += 1
  now_player = game_players[now_player_counter%game_players.length]
  //sleep(1000)
}

for (let index = 0; index < win_players.length; index++) {
  console.log(rank[index], " : ", win_players[index], "!")
}


/*
readline.on('line', function(line) {
  console.log(line)
  for (let i = 0; i < 13; i++) {
    for (let j = 0; index < mark.length; j++) {
      console.log(`${mark[j]}-${i}`)
    }
  }
    
});*/



