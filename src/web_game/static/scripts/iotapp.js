
function init (profile) {
  ReversiAPI.UI.setDescriptionStatus('Connected as "'+profile.d_name+'"');
  setTimeout(()=> {ReversiAPI.UI.flashStatus('Connected to IoTtalk as '+profile.d_name);}, 1000)
}

function ReversiBlueController (data) {
  let command_code = data[0];
  if(data[1].status) {

  }
  else {
    UI.setBlueMeta('IoTPlayerBlue', 'IoTtalk connected.');
  }
  console.log(data);
  // left
  if(command_code === 1) {
    UI.setBluePointer([UI.BluePointer[0], UI.BluePointer[1]-1]);
  }
  // right
  else if(command_code === 2) {
    UI.setBluePointer([UI.BluePointer[0], UI.BluePointer[1]+1]);
  }
  // up
  else if(command_code === 3) {
    UI.setBluePointer([UI.BluePointer[0]-1, UI.BluePointer[1]]);
  }
  // down
  else if(command_code === 4) {
    UI.setBluePointer([UI.BluePointer[0]+1, UI.BluePointer[1]]);
  }
  // set
  else if(command_code === 0) {
    RequestEmmiter.setPosition(1, UI.BluePointer);
  }
}

function ReversiRedController (data) {
  let command_code = data[0];
  console.log(data);
  // left
  if(command_code === 1) {
    UI.setRedPointer([UI.RedPointer[0], UI.RedPointer[1]-1]);
  }
  // right
  else if(command_code === 2) {
    UI.setRedPointer([UI.RedPointer[0], UI.RedPointer[1]+1]);
  }
  // up
  else if(command_code === 3) {
    UI.setRedPointer([UI.RedPointer[0]-1, UI.RedPointer[1]]);
  }
  // down
  else if(command_code === 4) {
    UI.setRedPointer([UI.RedPointer[0]+1, UI.RedPointer[1]]);
  }
  // set
  else if(command_code === 0) {
    RequestEmmiter.setPosition(-1, UI.RedPointer);
  }
}

function ReversiMonitor (data) {

}

dai({
    'dm_name': 'ReversiTalk',
    'df_list': [ReversiRedController, ReversiBlueController, ReversiMonitor],
}, {
    'iot_app': init,
});
