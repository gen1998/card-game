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
    players_cards[one] = {}
    for (let j = 0; j < 13; j++) {
      players_cards[one][j+1] = {"count" : 0, "mark" : [0,0,0,0]} // 整数はキーとして使える？
    }
  }

  //各プレイヤーにカードを配布
  while (all_card.length > 0) {
    rm_card = all_card[0]
    ind_mark = rm_card.mark
    ind_number = rm_card.number
    players_cards[players[index%num_players]][ind_number].count += 1
    players_cards[players[index%num_players]][ind_number].mark[ind_mark] = 1
    all_card = remove_card(all_card, rm_card)
    index += 1
  }
  return players_cards
}

//plyerの手札から指定されたカードをpickする
function pick_cards(players_hands, player, play_cards){
  if (!play_cards) return players_hands
  for (let play_ind = 0; play_ind < play_cards.length; play_ind++) {
    card_num = play_cards[play_ind].number
    card_mark = play_cards[play_ind].mark
    players_hands[player][card_num].count -= 1
    players_hands[player][card_num].mark[card_mark] = 0
  }
  return players_hands
}

//plyerの手札から出せるパターンをかえす関数
function get_all_pattern(players_hands, player, board_num=-1, limit_num=0){
  // リストのリストがきて欲しい。例えば、[
  //  [{"number" : 2, "mark" : 2}, {"number" : 2, "mark" : 3}],
  //  [{"number" : 1, "mark" : 2}, {"number" : 1, "mark" : 3}]
  //  ]

  // カードの順列
  const num_list = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 1, 2]
  let ind_number=0
  if (board_num != -1){
    ind_number = num_list.indexOf(board_num)+1
  }
  // かえす候補入れるリスト
  let possible_cards = []
  // かえす数持ってればpossible_cardsに入れていく
  for (let ind_num = ind_number; ind_num < num_list.length; ind_num++) {
    num = num_list[ind_num]
    // 何枚持ってる？
    count = players_hands[player][num].count
    // なんのマーク持ってる？
    let marks = []
    for (let mark = 0; mark < 4; mark++) {
      if (players_hands[player][num].mark[mark] == 1) {
        marks.push(mark)
      }
    }

    // 出し方候補を一時的に格納
    let candidate = []
    if (count > 3 && (limit_num==0 || limit_num==4)) {
      // 4枚出し
      candidate = []
      for (let ind_mark = 0; ind_mark < marks.length; ind_mark++) {
        candidate.push({"number" : num, "mark" : marks[ind_mark]})
      }
      possible_cards.push(candidate)
    }
    if (count > 2 && (limit_num==0 || limit_num==3)) {
      // 3枚出し
      for (let ind_mark = 0; ind_mark < marks.length-2; ind_mark++) {
        for (let ind_mark2 = ind_mark+1; ind_mark2 < marks.length-1; ind_mark2++) {
          for (let ind_mark3 = ind_mark2+1; ind_mark3 < marks.length; ind_mark3++) {
            candidate = []
            candidate.push({"number" : num, "mark" : marks[ind_mark]})
            candidate.push({"number" : num, "mark" : marks[ind_mark2]})
            candidate.push({"number" : num, "mark" : marks[ind_mark3]})
            possible_cards.push(candidate)
          }
        }
      }
    }
    if (count > 1 && (limit_num==0 || limit_num==2)) {
      // 2枚出し
      for (let ind_mark = 0; ind_mark < marks.length-1; ind_mark++) {
        for (let ind_mark2 = ind_mark+1; ind_mark2 < marks.length; ind_mark2++) {
          candidate = []
          candidate.push({"number" : num, "mark" : marks[ind_mark]})
          candidate.push({"number" : num, "mark" : marks[ind_mark2]})
          possible_cards.push(candidate)
        }
      }
    }
    if (count > 0 && (limit_num==0 || limit_num==1)) {
      // 1枚出し
      for (let ind_mark = 0; ind_mark < marks.length; ind_mark++) {
        candidate = []
        candidate.push({"number" : num, "mark" : marks[ind_mark]})
        possible_cards.push(candidate)
      }
    }
  }
  return possible_cards
}

// 現在plyerの手札の中で出せるカードセットをリストにしてかえす
function possible_pick_cards(players_hands, player, board_cards){

  //場にカードが存在しない時
  if (!board_cards.length) {
    return get_all_pattern(players_hands, player)
  } else {
    // 場に出ているカードは？
    board_num = board_cards[0].number
    // 場に出ている枚数は？
    limit_num = board_cards.length

    return get_all_pattern(players_hands, player, board_num=board_num, limit_num=limit_num)
  }
}

//randomにカードをピックする
function choose_random(possible_cards) {
  if (!possible_cards.length) {
    return []
  }
  let arrayIndex = Math.floor(Math.random() * possible_cards.length);
  return possible_cards[arrayIndex];
}

// 出す手の枚数が多い順にソート
function compare(a, b) {
  if (a.length > b.length) {
    return -1;
  }
  if (b.length > a.length) {
    return 1;
  }
  // a は b と等しいはず
  return 0;
}

// 単純なAI。現在出せるカードのうち、なるべく枚数の多いものかつ弱いものを選んで出す。
function choose_weakest(possible_cards) {
  if (!possible_cards.length) {
    return []
  } else {
    possible_cards.sort(function(a, b) {
      return compare(a, b);
    });
    return possible_cards[0]
  }
}

//sleepさせる
function sleep(waitMsec) {
  var startMsec = new Date();
 
  // 指定ミリ秒間だけループさせる（CPUは常にビジー状態）
  while (new Date() - startMsec < waitMsec);
}

//手札枚数を計算
function get_num_of_cards(players_hands, player) {
  let sum_cards = 0
  for (let j = 0; j < 13; j++) {
    sum_cards += players_hands[player][j+1].count
  }
  return sum_cards
}

//ゲームに必要な変数の宣言
let board_cards = [] //場のカード
let players_hands = {} //全員の手札
let now_player //現在のプレイヤー
let board_player //場に最後に出したプレイヤー
let game_players = players //順番・人数などを変更可能なゲームの参加者
let now_player_counter = 0 //今、何手目か
let win_players = []
let total_play_num = 0 //合計で何回めの手番か

players_hands = set_cards()

now_player = game_players[0]
board_player = now_player
//board_cards = [{"number" : 2, "mark" : 2}, {"number" : 2, "mark" : 3}]


while (true){
  total_play_num+=1
  console.log('[第', total_play_num, '手目]')
  console.log('player : ', now_player)
  console.log('num of card : ', get_num_of_cards(players_hands, now_player))
  console.log('board_player : ', board_player)
  console.log('place : ', board_cards)

  //パスを三人したら場は流れる
  if (board_player == now_player) {
    board_cards = []
  }

  possible_cards = possible_pick_cards(players_hands, now_player, board_cards)
  
  //出せるカードがない場合
  if (!possible_cards.length){
    console.log('pass')
  }
  //出せるカードがある場合
  else{
    choose_cards = choose_weakest(possible_cards)
    console.log('choose_weakest_cards : ', choose_cards)
    players_hands = pick_cards(players_hands, now_player, choose_cards)
    board_player = now_player
    board_cards = choose_cards
  }
  
  //カードの枚数が0になったら上がり！
  if (get_num_of_cards(players_hands, now_player) == 0){
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
    console.log('-----------------------------------')
    console.log('')
    continue
  }

  //次にplayする人を決める
  now_player_counter += 1
  now_player = game_players[now_player_counter%game_players.length]
  //sleep(1000)

  console.log('-----------------------------------')
  console.log('')
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

