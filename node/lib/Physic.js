/**
 * @author: Daniel Knobe
 * @copyright: Daniel Knobe
 */

var Vector = require('./Vector')

var blobVelocity = [new Vector(0.0,0.0), new Vector(0.0,0.0)];
var blobPosition = [new Vector(0.0,0.0), new Vector(0.0,0.0)];

var ballPosition = new Vector(0.0,0.0);
var ballVelocity = new Vector(0.0,0.0);

var currentBlobbyAnimationSpeed = [0.0,0.0];
GLOBAL.currentBlobbyAnimationSpeed = currentBlobbyAnimationSpeed
var blobState = [0.0,0.0];
GLOBAL.blobState = blobState

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

//Ball Settings
var BALL_RADIUS = 31.5;
GLOBAL.BALL_RADIUS = BALL_RADIUS

var GROUND_PLANE_HEIGHT_MAX = 500.0;
var GROUND_PLANE_HEIGHT = GROUND_PLANE_HEIGHT_MAX - BLOBBY_HEIGHT / 2.0;

//Border Settings
var LEFT_PLANE = 0.0;
var RIGHT_PLANE = 800.0;

// Gamefeeling relevant constants
var BLOBBY_ANIMATION_SPEED = 0.5;
var BLOBBY_JUMP_ACCELERATION = 15.1;
var BLOBBY_SPEED = 4.5;

// This is exactly the half of the gravitation
var BLOBBY_JUMP_BUFFER = 0.44;
var GRAVITATION = 0.88;
var BALL_GRAVITATION = 0.28;
var STANDARD_BALL_ANGULAR_VELOCITY = 0.1;
var STANDARD_BALL_HEIGHT = 269.0 + BALL_RADIUS;

var BALL_COLLISION_VELOCITY = 13.125;

// Other
var isGameRunning = 0;
var isBallValid = 1;
var lastHitIntensity = 0;
var ballHitByBlob = [false, false];
var timeSinceBallout = 0;

var Physic = function()
{
  //@todo: move physiclogic here
  //@todo: move animations from physic to renderer
  //@todo: check ways to improve performence
};





function physicStep()
{
  console.log('did physics')
  // Compute independent actions
  handleBlob(LEFT_PLAYER);
  handleBlob(RIGHT_PLAYER);

  // Ball Gravitation
  if (isGameRunning)
  {
    ballVelocity.y += BALL_GRAVITATION;
  }

  // move ball
  ballPosition.y += ballVelocity.y;
  ballPosition.x += ballVelocity.x;


  // Collision detection
  if(isBallValid)
  {
    checkBlobbyBallCollision(LEFT_PLAYER);
    checkBlobbyBallCollision(RIGHT_PLAYER);
  }
  // Ball to ground Collision
  else if (ballPosition.y + BALL_RADIUS > 500.0)
  {
    ballVelocity = ballVelocity.reflectY().scaleY(0.5);
    ballVelocity = ballVelocity.scaleX(0.55);
    ballPosition.y = 500.0 - BALL_RADIUS;
  }

  if (ballHitPlayer(LEFT_PLAYER) || ballHitPlayer(RIGHT_PLAYER))
  {
    isGameRunning = true;
  }

  // Border Collision
  if (ballPosition.x - BALL_RADIUS <= LEFT_PLANE && ballVelocity.x < 0.0)
  {
    ballVelocity = ballVelocity.reflectX();
  }
  else if (ballPosition.x + BALL_RADIUS >= RIGHT_PLANE && ballVelocity.x > 0.0)
  {
    ballVelocity = ballVelocity.reflectX();
  }
  else if (ballPosition.y > NET_SPHERE_POSITION &&
    Math.abs(ballPosition.x - NET_POSITION_X) < BALL_RADIUS + NET_RADIUS)
  {
    ballVelocity = ballVelocity.reflectX();
    ballPosition = ballPosition.addVector(ballVelocity);
  }
  else
  {
    // Net Collisions
    var tmp = new Vector(0,0);
    tmp.vectorByDots(ballPosition, new Vector(NET_POSITION_X, NET_SPHERE_POSITION));
    var ballNetDistance = tmp.getLength();

    if (ballNetDistance < NET_RADIUS + BALL_RADIUS)
    {
      tmp.vectorByDots(ballPosition, new Vector(NET_POSITION_X, NET_SPHERE_POSITION));
      tmp = tmp.normalise();
      ballVelocity = ballVelocity.reflect(tmp);
      ballVelocity = ballVelocity.scale(0.75);
      while (ballNetDistance < NET_RADIUS + BALL_RADIUS)
      {
        ballPosition = ballPosition.addVector(ballVelocity);
        tmp.vectorByDots(ballPosition, new Vector(NET_POSITION_X, NET_SPHERE_POSITION));
        ballNetDistance = tmp.getLength();
      }
    }
  }
  // Collision between blobby and the net
  if ((blobPosition[LEFT_PLAYER].x + BLOBBY_LOWER_RADIUS) > NET_POSITION_X - NET_RADIUS)
  {
    blobPosition[LEFT_PLAYER].x = NET_POSITION_X - NET_RADIUS - BLOBBY_LOWER_RADIUS;
  }

  if ((blobPosition[RIGHT_PLAYER].x - BLOBBY_LOWER_RADIUS) < NET_POSITION_X + NET_RADIUS)
  {
    blobPosition[RIGHT_PLAYER].x = NET_POSITION_X + NET_RADIUS + BLOBBY_LOWER_RADIUS;
  }

  // Collision between blobby and the border
  if (blobPosition[LEFT_PLAYER].x < LEFT_PLANE)
  {
    blobPosition[LEFT_PLAYER].x = LEFT_PLANE;
  }

  if (blobPosition[RIGHT_PLAYER].x > RIGHT_PLANE)
  {
    blobPosition[RIGHT_PLAYER].x = RIGHT_PLANE;
  }

  GLOBAL.ballPosition = ballPosition
  GLOBAL.blobPosition = blobPosition
}

function blobbyHitGround(player)
{
  if (player == LEFT_PLAYER)
  {
    if (getBlob(LEFT_PLAYER).y >= GROUND_PLANE_HEIGHT)
      return true;
    else
      return false;
  }
  else if (player == RIGHT_PLAYER)
  {
    if (getBlob(RIGHT_PLAYER).y >= GROUND_PLANE_HEIGHT)
      return true;
    else
      return false;
  }
  else
    return false;
}

function resetAreaClear()
{
  if (blobbyHitGround(LEFT_PLAYER) && blobbyHitGround(RIGHT_PLAYER))
    return true;
  return false;
}

function reset(player)
{
  if (player == LEFT_PLAYER)
  {
    ballPosition = new Vector(200.0, STANDARD_BALL_HEIGHT);
  }
  else
  if (player == RIGHT_PLAYER)
  {
    ballPosition = new Vector(600.0, STANDARD_BALL_HEIGHT);
  }
  else
  {
    mBallPosition = new Vector(400.0, 450.0);
  }

  ballVelocity.clear();

  blobState[LEFT_PLAYER] = 0.0;
  blobState[RIGHT_PLAYER] = 0.0;

  isGameRunning = false;
  isBallValid = true;

  lastHitIntensity = 0.0;
}

function resetPlayer()
{
  blobPosition[LEFT_PLAYER].x = 200.0;
  blobPosition[LEFT_PLAYER].y = GROUND_PLANE_HEIGHT;
  blobPosition[RIGHT_PLAYER].x = 600.0;
  blobPosition[RIGHT_PLAYER].y = GROUND_PLANE_HEIGHT;
}

function ballHitRightGround()
{
  if(isBallValid)
  {
    if ((ballPosition.y > GROUND_PLANE_HEIGHT) && (ballPosition.x > NET_POSITION_X))
    {
      return true;
    }
  }
  return false;
}

function ballHitLeftGround()
{
  if(isBallValid)
  {
    if (ballPosition.y > GROUND_PLANE_HEIGHT && ballPosition.x < NET_POSITION_X)
    {
      return true;
    }
  }
  return false;
}

function setBallValidity(validity)
{
  isBallValid = validity;
}

function roundFinished()
{
  if (resetAreaClear())
  {
    if (!isBallValid)
    {
      if (ballVelocity.y < 1.5 && ballVelocity.y > -1.5 && ballPosition.y > 430)
      {
        return true;
      }
    }
  }
  if (timeSinceBallout > TIMEOUT_MAX)
  {
    return true;
  }
  return false;
}

//commented out since it gets hidden by var lastHitIntensity anyway, looks like this function is unused. -uwolfer
//function lastHitIntensity()
//{
//	var intensity = lastHitIntensity / 25.0;
//	return intensity < 1.0 ? intensity : 1.0;
//}

function playerTopBallCollision(player)
{
  var tmp = new Vector(0.0, 0.0);
  tmp.vectorByDots(ballPosition, new Vector(blobPosition[player].x, blobPosition[player].y - BLOBBY_UPPER_SPHERE));
  if(tmp.getLength() <= BALL_RADIUS + BLOBBY_UPPER_RADIUS)
  {
    return true;
  }
  return false;
}

function playerBottomBallCollision(player)
{
  var tmp = new Vector(0.0, 0.0);
  tmp.vectorByDots(ballPosition, new Vector(blobPosition[player].x, blobPosition[player].y + BLOBBY_LOWER_SPHERE));
  if(tmp.getLength() <= BALL_RADIUS + BLOBBY_LOWER_RADIUS)
    return true;
  return false;
}

function ballHitPlayer(player)
{
  return ballHitByBlob[player];
}

function checkBlobbyBallCollision(player)
{
  var tmp = new Vector(0,0);
  var blobpos;
  var circlepos;
  // Check for bottom circles
  if(playerBottomBallCollision(player))
  {
    tmp.vectorByDots(ballVelocity, blobVelocity[player]);
    lastHitIntensity = tmp.getLength();

    blobpos = blobPosition[player];
    circlepos = new Vector(blobpos.x, blobpos.y + BLOBBY_LOWER_SPHERE);

    tmp.vectorByDots(ballPosition, circlepos);
    tmp.x = -tmp.x;
    tmp.y = -tmp.y;
    ballVelocity = tmp;

    ballVelocity = ballVelocity.normalise();
    ballVelocity = ballVelocity.scale(BALL_COLLISION_VELOCITY);
    ballPosition = ballPosition.addVector(ballVelocity);
    ballHitByBlob[player] = true;
  }
  else if(playerTopBallCollision(player))
  {
    tmp.vectorByDots(ballVelocity, blobVelocity[player]);
    lastHitIntensity = tmp.getLength();

    blobpos = blobPosition[player];
    circlepos = new Vector(blobpos.x, blobpos.y - BLOBBY_UPPER_SPHERE);

    tmp.vectorByDots(ballPosition, circlepos);
    tmp.x = -tmp.x;
    tmp.y = -tmp.y;
    ballVelocity = tmp;

    ballVelocity = ballVelocity.normalise();
    ballVelocity = ballVelocity.scale(BALL_COLLISION_VELOCITY);
    ballPosition = ballPosition.addVector(ballVelocity);
    ballHitByBlob[player] = true;
  }
}

// Animations
function blobbyAnimationStep(player)
{
  if (blobState[player] < 0.0)
  {
    currentBlobbyAnimationSpeed[player] = 0.0;
    blobState[player] = 0.0;
  }
  if (blobState[player] >= 3.5)
  {
    currentBlobbyAnimationSpeed[player] =- BLOBBY_ANIMATION_SPEED;
  }

  blobState[player] += currentBlobbyAnimationSpeed[player];

  if (blobState[player] >= 4.0)
  {
    blobState[player] = 4.0;
  }
}

function blobbyStartAnimation(player)
{
  if (currentBlobbyAnimationSpeed[player] === 0.0)
  {
    currentBlobbyAnimationSpeed[player] = BLOBBY_ANIMATION_SPEED;
  }
}

function handleBlob(player)
{
  // Reset ball to blobby collision
  ballHitByBlob[player] = false;
  if (playerInput[player].up == 1)
  {
    if (blobbyHitGround(player))
    {
      blobVelocity[player].y = -BLOBBY_JUMP_ACCELERATION;
      blobbyStartAnimation(player);
    }
    blobVelocity[player].y -= BLOBBY_JUMP_BUFFER;
  }
  if ((playerInput[player].left || playerInput[player].right) && blobbyHitGround(player))
  {
    blobbyStartAnimation(player);
  }

  blobVelocity[player].x =
    (playerInput[player].right ? BLOBBY_SPEED : 0.0) -
    (playerInput[player].left ? BLOBBY_SPEED : 0.0);

  // Acceleration Integration
  blobVelocity[player].y = blobVelocity[player].y + GRAVITATION;

  // Compute new position
  blobPosition[player] = blobPosition[player].addVector(blobVelocity[player]);

  if (blobPosition[player].y > GROUND_PLANE_HEIGHT)
  {
    if(blobVelocity[player].y > 3.5)
    {
      blobbyStartAnimation(player);
    }

    blobPosition[player].y = GROUND_PLANE_HEIGHT;
    blobVelocity[player].y = 0.0;
  }
  blobbyAnimationStep(player);
}

function blobbyHitGround(player)
{
  if (player == LEFT_PLAYER)
  {
    if (blobPosition[LEFT_PLAYER].y >= GROUND_PLANE_HEIGHT)
    {
      return true;
    }
    else
    {
      return false;
    }
  }
  else if (player == RIGHT_PLAYER)
  {
    if (blobPosition[RIGHT_PLAYER].y >= GROUND_PLANE_HEIGHT)
    {
      return true;
    }
    else
    {
      return false;
    }
  }
  else
  {
    return false;
  }
}

function dampBall()
{
  ballVelocity = ballVelocity.scale(0.6);
}

function getBlobJump(player)
{
  return !blobbyHitGround(player);
}

function getBallActive()
{
  return isGameRunning;
}

function cleanPhysic()
{
  isGameRunning = 0;
  isBallValid = 1;
  lastHitIntensity = 0;
  ballHitByBlob = [false, false];
  timeSinceBallout = 0;

  blobVelocity[LEFT_PLAYER].x = 0.0;
  blobVelocity[LEFT_PLAYER].y = 0.0;
  blobVelocity[RIGHT_PLAYER].x = 0.0;
  blobVelocity[RIGHT_PLAYER].y = 0.0;

  currentBlobbyAnimationSpeed[LEFT_PLAYER] = 0.0;
  currentBlobbyAnimationSpeed[RIGHT_PLAYER] = 0.0;
  blobState = [0.0,0.0];
}

GLOBAL.dampBall = dampBall;
GLOBAL.getBallActive = getBallActive;
GLOBAL.cleanPhysic = cleanPhysic;
GLOBAL.getBlobJump = getBlobJump;
GLOBAL.ballHitPlayer = ballHitPlayer
GLOBAL.ballHitLeftGround = ballHitLeftGround
GLOBAL.ballHitRightGround = ballHitRightGround
GLOBAL.roundFinished = roundFinished
GLOBAL.blobbyHitGround = blobbyHitGround;
GLOBAL.checkBlobbyBallCollision = checkBlobbyBallCollision;
GLOBAL.playerTopBallCollision = playerTopBallCollision;
GLOBAL.playerBottomBallCollision = playerBottomBallCollision;
GLOBAL.physicStep = physicStep;
GLOBAL.resetAreaClear = resetAreaClear;
GLOBAL.resetPlayer = resetPlayer;
GLOBAL.reset = reset;
GLOBAL.setBallValidity = setBallValidity
