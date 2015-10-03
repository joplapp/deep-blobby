/**
 * @author: Daniel Knobe
 * @copyright: Daniel Knobe
 */

var Canvas = require('canvas')
  , Image = Canvas.Image
  , canvas = new Canvas(50, 32)
  , ctx = canvas.getContext('2d');

var fs = require('fs')

// faster data transfer
ctx.scale(1/16,1/16)

var RenderManager = function()
{
  this.canvas = canvas //document.getElementById("screen");
  this.context2D = ctx //this.canvas.getContext("2d");
}


var TIMEOUT_MAX = 2.5;

//Blobby Settings
var BLOBBY_HEIGHT = 89.0;
var BLOBBY_WIDTH = 75.0;
var BLOBBY_UPPER_SPHERE = 19.0;
var BLOBBY_UPPER_RADIUS = 25.0;
var BLOBBY_LOWER_SPHERE = 13.0;
var BLOBBY_LOWER_RADIUS = 33.0;

// Volley Ball Net
var NET_POSITION_X = 400.0;
var NET_POSITION_Y = 438.0;
var NET_RADIUS = 7.0;
var NET_SPHERE = 154.0;
var NET_SPHERE_POSITION = 284.0;

// load blobby images
var blobby1Img = new Array(5);
var blobby2Img = new Array(5);
for(var i = 0; i < 5; i++)
{
  blobby1Img[i] = new Image();
  blobby2Img[i] = new Image();
  blobby1Img[i].src = "img/" + i + "b.png";
  blobby2Img[i].src = "img/" + i + "r.png";
}

// load font
var fontImg = new Array(11);
for(var i = 0; i < 11; i++)
{
  fontImg[i] = new Image();
  //fontImg[i].src = "img/f" + i + ".png";
}

var backgroundImg = new Image();
backgroundImg.src = "img/strand1.png";

var ballImg = new Image();
ballImg.src = "img/ball01.png";

var pokalImg = new Image();
pokalImg.src = "img/pokal.png";

var titleImg = new Image();
titleImg.src = "img/titel.png";

function drawMenu()
{
  //var canvas = document.getElementById("screen");
  var canvas = ctx //canvas.getContext("2d");
  canvas.fillStyle = "rgb(0, 0, 0)";
  canvas.fillRect(0, 0, 800, 600);
  canvas.globalAlpha = 0.2;
  canvas.drawImage(backgroundImg, 0, 0);
  canvas.globalAlpha = 1;
  canvas.drawImage(titleImg, 20, 80);
  console.log('drawmenu')
}

function drawWin()
{
  this.drawMenu();
  canvas.drawImage(pokalImg, 30, 200);
}

function drawGame()
{
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.fillRect(0,0,800,600)
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillRect(ballPosition.x - 2, 5, 5, 5);
  ctx.drawImage(ballImg, ballPosition.x - BALL_RADIUS, ballPosition.y - BALL_RADIUS);
  ctx.drawImage(
    blobby1Img[Math.round(blobState[LEFT_PLAYER])],
    blobPosition[LEFT_PLAYER].x - BLOBBY_WIDTH / 2,
    blobPosition[LEFT_PLAYER].y - BLOBBY_HEIGHT / 2);

  ctx.drawImage(
    blobby2Img[Math.round(blobState[RIGHT_PLAYER])],
    blobPosition[RIGHT_PLAYER].x - BLOBBY_WIDTH / 2,
    blobPosition[RIGHT_PLAYER].y - BLOBBY_HEIGHT / 2);

  ctx.fillStyle = "rgb(255, 255, 255)";

 /* if(rightScore > 9) {
    canvas.drawImage(fontImg[1], 724, 20);
    canvas.drawImage(fontImg[rightScore - 10], 748, 20);
  } else {
    canvas.drawImage(fontImg[0], 724, 20);
    canvas.drawImage(fontImg[rightScore], 748, 20);
  }

  if(leftScore > 9)
  {
    canvas.drawImage(fontImg[1], 44, 20);
    canvas.drawImage(fontImg[leftScore - 10], 68, 20);
  } else 		{
    canvas.drawImage(fontImg[0], 44, 20);
    canvas.drawImage(fontImg[leftScore], 68, 20);
  }*/

  //canvas.fillText  (leftScore, 30, 20);
  //canvas.fillText  (rightScore, 740, 20);
  /*if(servingPlayer == RIGHT_PLAYER)
    canvas.drawImage(fontImg[10], 700, 20);
  else if(servingPlayer == LEFT_PLAYER)
    canvas.drawImage(fontImg[10], 20, 20);*/
}

function getDataUrl(){
  return canvas.toDataURL();
}

var pixelArray = []  // reuse array
function getPixelArray(){
  var data = ctx.getImageData(0,0, canvas.width, canvas.height);

  // drop alpha values
  for(var i = 0; i<data.length; i+=4){
    pixelArray[i*3] = data[i*4];
    pixelArray[i*3+1] = data[i*4+1];
    pixelArray[i*3+2] = data[i*4+2];
  }

  return pixelArray;
}

GLOBAL.drawGame = drawGame
GLOBAL.drawMenu = drawMenu
GLOBAL.drawWin = drawWin
GLOBAL.getPixelArray = getPixelArray
GLOBAL.getDataUrl = getDataUrl

module.exports = RenderManager
