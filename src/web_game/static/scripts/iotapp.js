
let iottalk_endpoint = localStorage.getItem('iottalk_endpoint');;

let setIoTtalkEndpoint = ()=> {
  iottalk_endpoint = prompt("Please enter your url", iottalk_endpoint);
  localStorage.setItem('iottalk_endpoint', iottalk_endpoint);
  window.location.reload();
};

let profile = {
  'dm_name': 'ReversiTalk',
  'idf_list':[ReversiMonitor],
  'odf_list':[ReversiRedController, ReversiBlueController],
  'd_name': undefined,
};

function init (data) {
  console.log(profile, data);
  ReversiAPI.UI.setDescriptionStatus((profile.d_name?'Connected as "'+profile.d_name+'". ':"Connect Failed. ")+'<br/><span onClick="setIoTtalkEndpoint()">Click to set IoTtalk endpoint</span>.');
  ReversiAPI.on('BoardUpdated', (data)=> {
    dan.push('ReversiMonitor', {event: 'BoardUpdated', data: data});
  });
  ReversiAPI.on('PointerMoved', (data)=> {
    dan.push('ReversiMonitor', {event: 'PointerMoved', data: data});
  });
  ReversiAPI.on('move', ()=> {

  });
  setTimeout(()=> {ReversiAPI.UI.flashStatus('Connected to IoTtalk as '+profile.d_name);}, 1000)
}

function ReversiBlueController (data) {
  let command_code = data[0];
  if(data[1].status) {

  }
  else {
    ReversiAPI.UI.setBlueMeta('IoTPlayerBlue', 'IoTtalk controller.');
  }
  console.log(data);
  // left
  if(command_code === 1) {
    ReversiAPI.UI.setBluePointer([ReversiAPI.UI.BluePointer[0], ReversiAPI.UI.BluePointer[1]-1]);
  }
  // right
  else if(command_code === 2) {
    ReversiAPI.UI.setBluePointer([ReversiAPI.UI.BluePointer[0], ReversiAPI.UI.BluePointer[1]+1]);
  }
  // up
  else if(command_code === 3) {
    ReversiAPI.UI.setBluePointer([ReversiAPI.UI.BluePointer[0]-1, ReversiAPI.UI.BluePointer[1]]);
  }
  // down
  else if(command_code === 4) {
    ReversiAPI.UI.setBluePointer([ReversiAPI.UI.BluePointer[0]+1, ReversiAPI.UI.BluePointer[1]]);
  }
  // set
  else if(command_code === 0) {
    RequestEmmiter.setPosition(1, ReversiAPI.UI.BluePointer);
  }
}

function ReversiRedController (data) {
  let command_code = data[0];
  console.log(data);
  if(data[1].status) {

  }
  else {
    ReversiAPI.UI.setBlueMeta('IoTPlayerRed', 'IoTtalk controller.');
  }
  // left
  if(command_code === 1) {
    ReversiAPI.UI.setRedPointer([ReversiAPI.UI.RedPointer[0], ReversiAPI.UI.RedPointer[1]-1]);
  }
  // right
  else if(command_code === 2) {
    ReversiAPI.UI.setRedPointer([ReversiAPI.UI.RedPointer[0], ReversiAPI.UI.RedPointer[1]+1]);
  }
  // up
  else if(command_code === 3) {
    ReversiAPI.UI.setRedPointer([ReversiAPI.UI.RedPointer[0]-1, ReversiAPI.UI.RedPointer[1]]);
  }
  // down
  else if(command_code === 4) {
    ReversiAPI.UI.setRedPointer([ReversiAPI.UI.RedPointer[0]+1, ReversiAPI.UI.RedPointer[1]]);
  }
  // set
  else if(command_code === 0) {
    RequestEmmiter.setPosition(-1, ReversiAPI.UI.RedPointer);
  }
}

function ReversiMonitor (data) {

}


csmapi.set_endpoint(iottalk_endpoint);

dai(profile,  {
    'ida_init': init,
});
