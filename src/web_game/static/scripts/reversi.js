// reversi.py
// Description:
// "reversi.py" provide access of reversi UI and logic.
// Copyright 2019 NOOXY. All Rights Reserved.

"use strict";
const debug = true;
let UI = {
  BluePointer: [0,0],
  RedPointer: [0,0],
  ShowBluePointer: true,
  ShowRedPointer: true,
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
    x.innerHTML = "<div class=\"reversi-board-red\"></div>";
  },
  setBlueChess: (position)=> {
    let x=document.getElementById('r'+position[0]+'c'+position[1]);
    x.innerHTML = "<div class=\"reversi-board-blue\"></div>";
  },
  setEmptyChess: (position)=> {
    let x=document.getElementById('r'+position[0]+'c'+position[1]);
    x.innerHTML = " ";
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
    if(UI.ShowRedPointer&&0<=position[0]&&position[0]<=7&&0<=position[0]&&position[1]<=7) {
      let x=document.getElementById('r'+UI.RedPointer[0]+'c'+UI.RedPointer[1]);
      x.innerHTML = x.innerHTML.replace("<div class=\"reversi-board-red-pointer\"></div>", "");
      UI.RedPointer = position;
      let y=document.getElementById('r'+position[0]+'c'+position[1]);
      y.innerHTML += "<div class=\"reversi-board-red-pointer\"></div>";
    }
  },
  setBluePointer: (position)=> {
    if(UI.ShowBluePointer&&0<=position[0]&&position[0]<=7&&0<=position[0]&&position[1]<=7) {
      let x=document.getElementById('r'+UI.BluePointer[0]+'c'+UI.BluePointer[1]);
      x.innerHTML = x.innerHTML.replace("<div class=\"reversi-board-blue-pointer\"></div>", "");
      UI.BluePointer = position;
      let y=document.getElementById('r'+position[0]+'c'+position[1]);
      y.innerHTML += "<div class=\"reversi-board-blue-pointer\"></div>";
    }
  },
  showBluePointer: ()=> {
    UI.ShowBluePointer = true;
    let y=document.getElementById('r'+UI.BluePointer[0]+'c'+UI.BluePointer[1]);
    y.innerHTML += "<div class=\"reversi-board-blue-pointer\"></div>";
  },
  hideBluePointer: ()=> {
    UI.ShowBluePointer = false;
    let x=document.getElementById('r'+UI.BluePointer[0]+'c'+UI.BluePointer[1]);
    x.innerHTML = x.innerHTML.replace("<div class=\"reversi-board-blue-pointer\"></div>", "");
  },
  showRedPointer: ()=> {
    UI.ShowRedPointer = true;
    let y=document.getElementById('r'+UI.RedPointer[0]+'c'+UI.RedPointer[1]);
    y.innerHTML += "<div class=\"reversi-board-red-pointer\"></div>";
  },
  hideRedPointer: ()=> {
    UI.ShowRedPointer = false;
    let x=document.getElementById('r'+UI.RedPointer[0]+'c'+UI.RedPointer[1]);
    x.innerHTML = x.innerHTML.replace("<div class=\"reversi-board-red-pointer\"></div>", "");
  },
  renderBoard: (board)=> {

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
  let turn_positon;

  let processMove = (position, player, vector, do_reverse)=> {
    next_position = [position[0]+vector[0], position[1]+vector[1]];
    // if() {
    //
    // }
  };

  this.cansetForPlayer = (player)=> {};
  this.cansetForPlayerAndPosition = (player, position)=> {};
  this.newBoard = (player)=> {};
  this.setPosition = (player, position)=> {};
  this.getBoard = ()=> {

  };
};

let debugFunctions = {
  initailize: ()=> {
    window.document.onkeydown = (evt)=> {
      evt = evt || window.event;
      let charCode = evt.keyCode || evt.which;
      let charStr = String.fromCharCode(charCode).toLowerCase();
      if(charStr=='w') {
        UI.setRedPointer([UI.RedPointer[0]-1, UI.RedPointer[1]]);
      }
      else if(charStr=='a') {
        UI.setRedPointer([UI.RedPointer[0], UI.RedPointer[1]-1]);
      }
      else if(charStr=='s') {
        UI.setRedPointer([UI.RedPointer[0]+1, UI.RedPointer[1]]);
      }
      else if(charStr=='d') {
        UI.setRedPointer([UI.RedPointer[0], UI.RedPointer[1]+1]);
      }
      else if(charCode==38) {
        UI.setBluePointer([UI.BluePointer[0]-1, UI.BluePointer[1]]);
      }
      else if(charCode==37) {
        UI.setBluePointer([UI.BluePointer[0], UI.BluePointer[1]-1]);
      }
      else if(charCode==40) {
        UI.setBluePointer([UI.BluePointer[0]+1, UI.BluePointer[1]]);
      }
      else if(charCode==39) {
        UI.setBluePointer([UI.BluePointer[0], UI.BluePointer[1]+1]);
      }
      else if(charStr=='b') {
        if(UI.ShowBluePointer) {
          UI.hideBluePointer();
        }
        else {
          UI.showBluePointer();
        }
      }
      else if(charStr=='r') {
        if(UI.ShowRedPointer) {
          UI.hideRedPointer();
        }
        else {
          UI.showRedPointer();
        }
      }
    };
  }
};

let emitRequest = {
  reset: ()=> {}
};

//initailize
function initailizeReversi () {
  UI.initBoard();
  UI.showLoadingStatus('connecting to IoTtalk server...');
  setTimeout(()=> {
    UI.setRedPointer([0, 0]);
    UI.setBluePointer([0, 7]);
    UI.setBoardStatus('Red\'s turn');
    UI.setRightScore(0);
    UI.setLeftScore(0);
    UI.setBlueMeta('Player 1', 'waiting player...');
    UI.setRedMeta('Player 2', 'waiting player...');
    UI.hideLoadingStatus();

    if(debug) {
      debugFunctions.initailize();
    };
  }, 300);
}
