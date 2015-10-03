/**
 * @author: Daniel Knobe
 * @copyright: Daniel Knobe
 */

// Struct For Keyinput
var Input = function()
{
  this.left = 0;
  this.right = 0;
  this.up = 0;
};

// Blobby Input
var playerInput = [new Input(), new Input()];
GLOBAL.playerInput = playerInput

//Workarround for KI games!!!
var playerHuman = 1;

// Keyboard Handling
function onKeyDown(event)
{
  if(event.keyCode == 65) {
    playerInput[LEFT_PLAYER].left = 1;
  } else if(event.keyCode == 68) {
    playerInput[LEFT_PLAYER].right = 1;
  } else if(event.keyCode == 87) {
    playerInput[LEFT_PLAYER].up = 1;
  } else if(event.keyCode == 72) {
    if(playerHuman == 1) playerInput[RIGHT_PLAYER].left = 1;
  } else if(event.keyCode == 75) {
    if(playerHuman == 1) playerInput[RIGHT_PLAYER].right = 1;
  } else if(event.keyCode == 85) {
    if(playerHuman == 1) playerInput[RIGHT_PLAYER].up = 1;
  } else {
    stateManager.guiManager.onKeyDown(event);
  }
}

function onKeyUp(event)
{
  if(event.keyCode == 65)
  {
    playerInput[LEFT_PLAYER].left = 0;
  }
  if(event.keyCode == 68)
  {
    playerInput[LEFT_PLAYER].right = 0;
  }
  if(event.keyCode == 87)
  {
    playerInput[LEFT_PLAYER].up = 0;
  }
  if(event.keyCode == 72)
  {
    playerInput[RIGHT_PLAYER].left = 0;
  }
  if(event.keyCode == 75)
  {
    playerInput[RIGHT_PLAYER].right = 0;
  }
  if(event.keyCode == 85)
  {
    playerInput[RIGHT_PLAYER].up = 0;
  }
}

// reset only keys for the current player, not the KI
function resetPlayerKeys(){
  playerInput[LEFT_PLAYER].left = 0;
  playerInput[LEFT_PLAYER].right = 0;
  playerInput[LEFT_PLAYER].up = 0;
}
function resetKeys() {
  playerInput[LEFT_PLAYER].left = 0;
  playerInput[LEFT_PLAYER].right = 0;
  playerInput[LEFT_PLAYER].up = 0;
  playerInput[RIGHT_PLAYER].left = 0;
  playerInput[RIGHT_PLAYER].right = 0;
  playerInput[RIGHT_PLAYER].up = 0;
}

//document.onkeydown = onKeyDown;
//document.onkeyup = onKeyUp;

GLOBAL.resetKeys = resetKeys
GLOBAL.resetPlayerKeys = resetPlayerKeys