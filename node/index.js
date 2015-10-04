/**
 * Created by johannes on 03.10.15.
 */
console.log('node application is running')
var _ = require('lodash')

var appC = require('express')();
var appF = require('express')();

var httpC = require('http').Server(appC);
var httpF = require('http').Server(appF);

var socket = require('socket.io')

var ioC = socket(httpC);
var ioF = socket(httpF);

ioC.on('connection', function(socket){
  console.log('a user connected');
  attachMovementEvents(socket)

  socket.on('frame', function(){
    console.log('getframe')
    drawGame()
    socket.emit('frame', JSON.stringify(getPixelArray()))
  })
});

httpC.listen(3001, function(){
  console.log('listening on *:3001');
});


var frontConnections = []
appF.get('/', function(req, res){
  res.sendfile('index.html');
});

ioF.on('connection', function(socket){
  console.log('a user connected to the front end');
  frontConnections.push(socket)
  attachMovementEvents(socket)
});
ioF.on('disconnect', function(socket){
  console.log('a user disconnected to the front end');
  _.pull(frontConnections, socket)
});
httpF.listen(3000, function(){
  console.log('listening on *:3000');
});

function attachMovementEvents(socket){
  socket.on('act', function(msg){
    console.log('act', msg)
    if(msg === 'LEFT') {
      playerInput[LEFT_PLAYER].left = 1;
    } else if(msg === 'RIGHT') {
      playerInput[LEFT_PLAYER].right = 1;
    } else if(msg === 'UP') {
      playerInput[LEFT_PLAYER].up = 1;
    }
    stateManager.currentState.run()

    if(frontConnections.length){
      drawGame()
      var dataUrl = getDataUrl()
      frontConnections.forEach(function(socket){
        socket.emit('canvas', JSON.stringify({
          data: dataUrl,
          leftScore: leftScore,
          rightScore: rightScore
        }))
      })
    }
    resetPlayerKeys()
  });
}



var Start = require('./lib/Start')