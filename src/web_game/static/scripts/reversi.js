// reversi.py
// Description:
// "reversi.py" provide access of reversi UI and logic.
// Copyright 2019 NOOXY. All Rights Reserved.

"use strict";
const debug = true;
let UI = {
  BluePointer: [0,0],
  RedPointer: [0,0],
  EnableBluePointer: true,
  EnableRedPointer: true,
  initBoard: ()=> {
    let ReversiBoard1 = document.getElementById('reversi-board-1');
    let inner = "";
    for (let x=0; x<8; x++) {
      for (let y=0; y<8; y++) {
        if((x+y)%2) {
          inner=inner+'<div id="r'+x+'c'+y+'" class="reversi-board-block-0"> </div>';
        }
        else {
          inner=inner+'<div id="r'+x+'c'+y+'" class="reversi-board-block"> </div>';
        }

      }
    }
    ReversiBoard1.innerHTML = inner;
  },
  setEmphasizedRedChess: (position)=> {
    let x=document.getElementById('r'+position[0]+'c'+position[1]);
    x.innerHTML = "<div class=\"reversi-board-red-emphasize\"></div>";
  },
  setEmphasizedBlueChess: (position)=> {
    let x=document.getElementById('r'+position[0]+'c'+position[1]);
    x.innerHTML = "<div class=\"reversi-board-blue-emphasize\"></div>";
  },
  setRedChess: (position)=> {
    let x=document.getElementById('r'+position[0]+'c'+position[1]);
    x.innerHTML = x.innerHTML.replace("<div class=\"reversi-board-red\"></div>", "");
    x.innerHTML = x.innerHTML.replace("<div class=\"reversi-board-blue\"></div>", "");
    x.innerHTML += "<div class=\"reversi-board-red\"></div>";
  },
  setBlueChess: (position)=> {
    let x=document.getElementById('r'+position[0]+'c'+position[1]);
    x.innerHTML = x.innerHTML.replace("<div class=\"reversi-board-red\"></div>", "");
    x.innerHTML = x.innerHTML.replace("<div class=\"reversi-board-blue\"></div>", "");
    x.innerHTML += "<div class=\"reversi-board-blue\"></div>";
  },
  setEmptyChess: (position)=> {
    let x=document.getElementById('r'+position[0]+'c'+position[1]);
    x.innerHTML = x.innerHTML.replace("<div class=\"reversi-board-red\"></div>", "");
    x.innerHTML = x.innerHTML.replace("<div class=\"reversi-board-blue\"></div>", "");
  },
  setRightScore: (point)=> {
    let x=document.getElementById("point-right");
    x.innerHTML = point;
  },
  setLeftScore: (point)=> {
    let x=document.getElementById("point-left");
    x.innerHTML = point;
  },
  setBlueMeta: (name, status)=> {
    document.getElementById("p1-username").innerHTML =name;
    document.getElementById("p1-status").innerHTML =status;
  },
  setRedMeta: (name, status)=> {
    document.getElementById("p2-username").innerHTML =name;
    document.getElementById("p2-status").innerHTML =status;
  },
  setRedPointer: (position)=> {
    if(UI.EnableRedPointer&&0<=position[0]&&position[0]<=7&&0<=position[1]&&position[1]<=7) {
      let x=document.getElementById('r'+UI.RedPointer[0]+'c'+UI.RedPointer[1]);
      x.innerHTML = x.innerHTML.replace("<div class=\"reversi-board-red-pointer\"></div>", "");
      UI.RedPointer = position;
      let y=document.getElementById('r'+position[0]+'c'+position[1]);
      y.innerHTML += "<div class=\"reversi-board-red-pointer\"></div>";
    }
  },
  setBluePointer: (position)=> {
    if(UI.EnableBluePointer&&0<=position[0]&&position[0]<=7&&0<=position[1]&&position[1]<=7) {
      let x=document.getElementById('r'+UI.BluePointer[0]+'c'+UI.BluePointer[1]);
      x.innerHTML = x.innerHTML.replace("<div class=\"reversi-board-blue-pointer\"></div>", "");
      UI.BluePointer = position;
      let y=document.getElementById('r'+position[0]+'c'+position[1]);
      y.innerHTML += "<div class=\"reversi-board-blue-pointer\"></div>";
    }
  },
  enableBluePointer: ()=> {
    UI.EnableBluePointer = true;
    let x=document.getElementById('r'+UI.BluePointer[0]+'c'+UI.BluePointer[1]);
    x.innerHTML = x.innerHTML.replace("<div class=\"reversi-board-blue-pointer-hide\"></div>", "<div class=\"reversi-board-blue-pointer\"></div>");
  },
  disableBluePointer: ()=> {
    UI.EnableBluePointer = false;
    let x=document.getElementById('r'+UI.BluePointer[0]+'c'+UI.BluePointer[1]);
    x.innerHTML = x.innerHTML.replace("<div class=\"reversi-board-blue-pointer\"></div>", "<div class=\"reversi-board-blue-pointer-hide\"></div>");
  },
  enableRedPointer: ()=> {
    UI.EnableRedPointer = true;
    let x=document.getElementById('r'+UI.RedPointer[0]+'c'+UI.RedPointer[1]);
    x.innerHTML = x.innerHTML.replace("<div class=\"reversi-board-red-pointer-hide\"></div>", "<div class=\"reversi-board-red-pointer\"></div>");
  },
  disableRedPointer: ()=> {
    UI.EnableRedPointer = false;
    let x=document.getElementById('r'+UI.RedPointer[0]+'c'+UI.RedPointer[1]);
    x.innerHTML = x.innerHTML.replace("<div class=\"reversi-board-red-pointer\"></div>", "<div class=\"reversi-board-red-pointer-hide\"></div>");
  },
  renderBoard: (board)=> {
    for (let x=0; x<8; x++) {
    for (let y=0; y<8; y++) {
      switch (board[x*8+y]) {
        case 1:
          UI.setBlueChess([x, y]);
          break;
        case -1:
          UI.setRedChess([x, y]);
          break;
        case 0:
          UI.setEmptyChess([x, y]);
          break;
      }
    }
  }
  },
  flashStatus: (status)=> {
    let flasher=document.getElementById("flash");
    flasher.classList.remove("style-hidden");
    let box=document.getElementById("flash-status-box");
    box.classList.remove("style-hidden");
    document.getElementById("flash-status").innerHTML = status;
    setTimeout(()=>{
      box=document.getElementById("flash-status-box");
      box.classList.add("style-hidden");
      flasher.classList.add("style-hidden");
    }, 1000);
  },
  setBoardStatus: (status)=> {
    let board_status = document.getElementById("board-status");
    board_status.innerHTML = status;
  },
  showLoadingStatus: (status)=> {
    let coverer=document.getElementById("coverer");
    let coverer_loader=document.getElementById("coverer-loader");
    coverer.classList.remove("style-hidden");
    coverer_loader.classList.remove("style-hidden");
    document.getElementById("status").innerHTML = status;
  },
  hideLoadingStatus: ()=> {
    let coverer=document.getElementById("coverer");
    let coverer_loader=document.getElementById("coverer-loader");
    coverer.classList.add("style-hidden");
    coverer_loader.classList.add("style-hidden");
  }
}

function ReversiGame() {
  let current_board;
  let player_turn = 1;

  let processMove = (position, player, vector, do_reverse)=> {
    let next_position = [position[0]+vector[0], position[1]+vector[1]];
    if(position[0] < 0 || position[0] > 7 || position[1] < 0 || position[1] > 7) {
      return -1;
    }
    if(next_position[0] < 0 || next_position[0] > 7 || next_position[1] < 0 || next_position[1] > 7) {
      return -1;
    }
    let board2d = [];
    for(let x=0; x<8; x++) {
      let row = [];
      for(let y=0; y<8; y++) {
        row.push(current_board[x*8+y]);
      }
      board2d.push(row);
    }
    if((board2d[position[0]+vector[0]])[position[1]+vector[1]] === player && (board2d[position[0]])[position[1]] === -player) {
      return 0;
    }
    else if((board2d[position[0]+vector[0]])[position[1]+vector[1]] === -player) {
      let result = processMove(next_position, player, vector, do_reverse);
      if(result >= 0) {
        if(do_reverse === 1) {
          current_board[(position[0]+vector[0])*8+position[1]+vector[1]] = player;
        }
        return result+1;
      }
      else {
        return -1;
      }
    }
    else {
      return -1;
    }
  };

  this.cansetForPlayer = (player)=> {
    if(player!=player_turn) {
      return 0;
    }
    let result = 0;
    for (let x=0; x<8; x++) {
      for (let y=0; y<8; y++) {
        // console.log(this.cansetForPlayerAndPosition([x, y], player));
        if(this.cansetForPlayerAndPosition(player, [x, y]) > 0) {
          result = 1;
        }
      }
    }
    return result;
  };
  this.cansetForPlayerAndPosition = (player, position)=> {
    if(current_board[(position[0])*8+position[1]] !== 0 || player!=player_turn) {
      return -1;
    }
    else {
      let pointsum = 0;
      let point;
      point = processMove(position, player, [1, 0], 0);
      if(point > 0) {
        pointsum += point;
      }
      point = processMove(position, player, [0, 1], 0)
      if(point > 0) {
        pointsum += point;
      }
      point = processMove(position, player, [1, 1], 0)
      if(point > 0) {
        pointsum += point;
      }
      point = processMove(position, player, [-1, 0], 0)
      if(point > 0) {
        pointsum += point;
      }
      point = processMove(position, player, [0, -1], 0)
      if(point > 0) {
        pointsum += point;
      }
      point = processMove(position, player, [-1, -1], 0)
      if(point > 0) {
        pointsum += point;
      }
      point = processMove(position, player, [1, -1], 0)
      if(point > 0) {
        pointsum += point;
      }
      point = processMove(position, player, [-1, 1], 0)
      if(point > 0) {
        pointsum += point;
      }
      if(pointsum > 0) {
        pointsum += 1;
      }
      if(pointsum > 0) {
        return pointsum;
      }
      else {
        return -1;
      }
    }
  };
  this.newBoard = (player)=> {
    player_turn = 1;
    current_board = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 1, 0, 0, 0, 0, 0, 0, 1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  };
  this.setPosition = (player, position)=> {
    if (current_board[(position[0])*8+position[1]] != 0 || player!=player_turn){
      return -1;
    }
    let pointsum = 0;
    let point;
    point = processMove(position, player, [1, 0], 1);
    if(point > 0) {
      pointsum += point;
    }
    point = processMove(position, player, [0, 1], 1)
    if(point > 0) {
      pointsum += point;
    }
    point = processMove(position, player, [1, 1], 1)
    if(point > 0) {
      pointsum += point;
    }
    point = processMove(position, player, [-1, 0], 1)
    if(point > 0) {
      pointsum += point;
    }
    point = processMove(position, player, [0, -1], 1)
    if(point > 0) {
      pointsum += point;
    }
    point = processMove(position, player, [-1, -1], 1)
    if(point > 0) {
      pointsum += point;
    }
    point = processMove(position, player, [1, -1], 1)
    if(point > 0) {
      pointsum += point;
    }
    point = processMove(position, player, [-1, 1], 1)
    if(point > 0) {
      pointsum += point;
    }
    if(pointsum > 0) {
      pointsum += 1;
    }
    if(pointsum > 0) {
      current_board[(position[0])*8+position[1]] = player;
      player_turn *= -1;
      if(!this.cansetForPlayer(-player)) {
        player_turn *= -1;
      }
      return pointsum;
    }
    else {
      return -1;
    }
  };
  this.returnScores = ()=> {
    let scores = [0, 0];
    for(let x=0; x<64; x++) {
      if(current_board[x] === 1) {
        scores[0] += 1;
      }
      else if(current_board[x] === -1) {
        scores[1] += 1;
      }
    }
    return scores;
  };
  this.returnBoard = ()=> {
    return current_board;
  };
  this.returnPlayerTurn = ()=> {
    return player_turn;
  };
};

let game = new ReversiGame();

let debugFunctions = {
  initailize: ()=> {
    window.document.onkeydown = (evt)=> {
      evt = evt || window.event;
      let charCode = evt.keyCode || evt.which;
      let charStr = String.fromCharCode(charCode).toLowerCase();
      if(charStr==='w') {
        UI.setRedPointer([UI.RedPointer[0]-1, UI.RedPointer[1]]);
      }
      else if(charStr==='a') {
        UI.setRedPointer([UI.RedPointer[0], UI.RedPointer[1]-1]);
      }
      else if(charStr==='s') {
        UI.setRedPointer([UI.RedPointer[0]+1, UI.RedPointer[1]]);
      }
      else if(charStr==='d') {
        UI.setRedPointer([UI.RedPointer[0], UI.RedPointer[1]+1]);
      }
      else if(charStr===' ') {
        RequestEmmiter.setPosition(-1, UI.RedPointer);
      }
      else if(charCode===38) {
        UI.setBluePointer([UI.BluePointer[0]-1, UI.BluePointer[1]]);
      }
      else if(charCode===37) {
        UI.setBluePointer([UI.BluePointer[0], UI.BluePointer[1]-1]);
      }
      else if(charCode===40) {
        UI.setBluePointer([UI.BluePointer[0]+1, UI.BluePointer[1]]);
      }
      else if(charCode===39) {
        UI.setBluePointer([UI.BluePointer[0], UI.BluePointer[1]+1]);
      }
      else if(charCode===191) {
        RequestEmmiter.setPosition(1, UI.BluePointer);
      }
      else if(charCode===13) {
        RequestEmmiter.setPosition(1, UI.BluePointer);
      }
      else if(charStr==='b') {
        if(UI.EnableBluePointer) {
          UI.disableBluePointer();
        }
        else {
          UI.enableBluePointer();
        }
      }
      else if(charStr=='r') {
        if(UI.EnableRedPointer) {
          UI.disableRedPointer();
        }
        else {
          UI.enableRedPointer();
        }
      }
      else {
        // alert(charCode);
      }
    };
  }
};

let RequestEmmiter = {
  reset: ()=> {
    game.newBoard();
    UI.setBluePointer([3, 3]);
    UI.setRedPointer([3, 4]);
    document.getElementById('reset-button').blur();
    RequestEmmiter.reflashBoard();
  },
  setPosition: (player, position)=> {
    let result = game.setPosition(player, position);
    if(result>0) {
      RequestEmmiter.reflashBoard();
    }
    else {
      UI.flashStatus('You cannot set here.');
    }
  },
  reflashBoard: ()=> {
    let scores = game.returnScores();
    let player_turn = game.returnPlayerTurn();
    UI.renderBoard(game.returnBoard());
    // console.log(game.returnBoard());
    // try {
    //   throw new Error();
    // } catch (e) {
    //   console.log(e.stack);
    // } finally {
    //
    // }
    UI.setRightScore(scores[0]);
    UI.setLeftScore(scores[1]);

    if(player_turn === 1) {
      UI.setBoardStatus('It is Blue\'s turn');
      UI.disableRedPointer();
      UI.enableBluePointer();
    }
    else if(player_turn === -1){
      UI.setBoardStatus('It is Red\'s turn');
      UI.disableBluePointer();
      UI.enableRedPointer();
    }
  }
};

//initailize
function initailizeReversi () {
  if(debug) {
    debugFunctions.initailize();
  };
  UI.initBoard();
  UI.showLoadingStatus('connecting to IoTtalk server...');
  UI.setBlueMeta('Blue', 'IoTtalk controller not connected');
  UI.setRedMeta('Red', 'IoTtalk controller not connected');

  setTimeout(()=> {
    game.newBoard();
    UI.setBluePointer([3, 3]);
    UI.setRedPointer([3, 4]);
    RequestEmmiter.reflashBoard();
    UI.hideLoadingStatus();
  }, 300);
}
