import time, random, requests
import DAN
from reversi import *
import nodenet.io as nnio
# debug
import traceback
import sys

# Mode for Loop cycle and control state
Current_mode = 'Waiting' # Controling, Waiting
Control_state = {'CurrentPosition': [0, 0], 'Position': [0, 0]}
Control_Type = 'Direct' # Direct, Moving

# Nodenet AI settings
AI_path = './AI'
Neuralnet = nnio.load_neuralnet(AI_path)
AI_Player = -1 # 1 blue -1 red
AI = reversi.ReversiNeuralNetAI()
AI.loadValueNetwork(Neuralnet)
AI.setPosition(AI_Player)

# IoTtalk settings
ServerURL = 'http://7.iottalk.tw:9999'
Reg_addr = None #if None, Reg_addr = MAC address

DAN.profile['dm_name']='ReversiTalkAI'
DAN.profile['df_list']=['ReversiTalkAIInput', 'ReversiTalkAIOutput']
DAN.profile['d_name']= 'Nodenet reversi AI'

def resume():
    print('Sending information', end='', flush=True)
    i = 3
    while(i):
        i -= 1
        time.sleep(1)
        DAN.push('ReversiTalkAIOutput', -1, {'event': 'updateProfile', 'data':{'title': 'NodenetAI', 'status': 'Controlled by AI'}})
        print('.', end='', flush=True)
    print('Information sent.')
DAN.device_registration_with_retry(ServerURL, Reg_addr, resume)
#DAN.deregister()  #if you want to deregister this device, uncomment this line
#exit()            #if you want to deregister this device, uncomment this line

while True:
    try:
        ODF_data = DAN.pull('ReversiTalkAIInput')
        if ODF_data != None:
            ODF_data = ODF_data[0]

            # update position
            if ODF_data['event'] == 'PointerMoved' and ODF_data['data']['player'] == AI_Player:
                Control_state['CurrentPosition'] = ODF_data['data']['position']
                print('Updated current position to '+str(Control_state['CurrentPosition']))

            if Current_mode == 'Waiting' and ODF_data['event'] == 'BoardUpdated' and ODF_data['data']['turn'] == AI_Player:
                sess = ReversiSessions()
                sess.setBoard(ODF_data['data']['board'])
                print('[[[AI\'s turn]]]')
                reversi.ReversiUtility.printBoard(sess.Boardnow)
                print('AI is thinking.')
                if(sess.cansetBoard(AI_Player)):
                    Control_state['Position'], debug = AI.getaphlabetaDropPoint(sess, 0, 0.01)
                    print('AI decided to move to the location '+str(Control_state['Position'])+'.')
                    # print(debug)
                    if Control_Type == 'Direct':
                        DAN.push('ReversiTalkAIOutput', -1, {'event': 'setPosition', 'data': Control_state['Position']})
                        print('Emitted signal.')
                    elif Control_Type == 'Moving':
                        Current_mode = 'Controling'
                        print('Controlling...')


        if Current_mode == 'Controling':
            if(Control_state['CurrentPosition'] == list(Control_state['Position'])):
                DAN.push('ReversiTalkAIOutput', 0)
                print('Moved to '+str(Control_state['CurrentPosition'])+'! Set position.')
                Current_mode = 'Waiting'
            elif(Control_state['CurrentPosition'] != list(Control_state['Position'])):
                row_offset = Control_state['Position'][0] - Control_state['CurrentPosition'][0]
                col_offset = Control_state['Position'][1] - Control_state['CurrentPosition'][1]
                # left
                if(col_offset<0):
                    DAN.push('ReversiTalkAIOutput', 1)
                    print('[<] ', end='', flush=True)
                    # Control_state['CurrentPosition'] = [Control_state['CurrentPosition'][0], Control_state['CurrentPosition'][1]-1]
                # right
                elif(col_offset>0):
                    DAN.push('ReversiTalkAIOutput', 2)
                    print('[>] ', end='', flush=True)

                    # Control_state['CurrentPosition'] = [Control_state['CurrentPosition'][0], Control_state['CurrentPosition'][1]+1]
                # up
                elif(row_offset<0):
                    DAN.push('ReversiTalkAIOutput', 3)
                    print('[^] ', end='', flush=True)

                    # Control_state['CurrentPosition'] = [Control_state['CurrentPosition'][0]-1, Control_state['CurrentPosition'][1]]
                # down
                elif(row_offset>0):
                    DAN.push('ReversiTalkAIOutput', 4)
                    print('[v] ', end='', flush=True)

                    # Control_state['CurrentPosition'] = [Control_state['CurrentPosition'][0]+1, Control_state['CurrentPosition'][1]]

    except Exception as e:
        exc_info = sys.exc_info()
        traceback.print_exception(*exc_info)
        del exc_info

        if str(e).find('mac_addr not found:') != -1:
            print('Reg_addr is not found. Try to re-register...')
            DAN.device_registration_with_retry(ServerURL, Reg_addr)
        else:
            print('Connection failed due to unknow reasons.')
            time.sleep(1)

    time.sleep(0.5)
