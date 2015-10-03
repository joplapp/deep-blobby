/**
 * @author: Daniel Knobe
 * @copyright: Daniel Knobe
 */

// Ruleset Variables
var leftScore = 0;
var rightScore = 0;

var squishLeft = 0;
var squishRight = 0;

var leftHitcount = 0;
var rightHitcount = 0;

var servingPlayer = -1;
var playerwin = -1;

ballDown = false;

function resetRulevars()
{
  leftScore = 0;
  rightScore = 0;

  squishLeft = 0;
  squishRight = 0;

  leftHitcount = 0;
  rightHitcount = 0;

  servingPlayer = -1;

  blobState[LEFT_PLAYER] = 0;
  blobState[RIGHT_PLAYER] = 0;

  currentBlobbyAnimationSpeed[LEFT_PLAYER] = 0;
  currentBlobbyAnimationSpeed[RIGHT_PLAYER] = 0;

  GLOBAL.rightScore = rightScore
  GLOBAL.leftScore = leftScore
}

function step()
{
  physicStep();

  drawGame();

  // Protection of multiple hit counts when the ball is squeezed
  if (0 === squishLeft)
  {
    if (ballHitPlayer(LEFT_PLAYER))
    {
      //soundManager.playSound('touch');
      leftHitcount++;
      rightHitcount = 0;
      squishLeft = 1;
    }
  }
  else
  {
    squishLeft += 1;
    if(squishLeft > 9)
    {
      squishLeft = 0;
    }
  }

  if(0 === squishRight)
  {
    if (ballHitPlayer(RIGHT_PLAYER))
    {
      //soundManager.playSound('touch');
      rightHitcount++;
      leftHitcount = 0;
      squishRight = 1;
    }
  }
  else
  {
    squishRight += 1;
    if(squishRight > 9)
    {
      squishRight = 0;
    }
  }

  if (ballHitLeftGround() || leftHitcount > 3)
  {
    //soundManager.playSound('whistle');
    if (leftHitcount > 3)
    {
      dampBall();
    }
    if (servingPlayer == 1)
    {
      rightScore++;
    }
    servingPlayer = RIGHT_PLAYER;
    setBallValidity(0);
    ballDown = true;
    rightHitcount = 0;
    leftHitcount = 0;
    squishRight = 0;
    squishLeft = 0;
  }

  if (ballHitRightGround() || rightHitcount > 3)
  {
    //soundManager.playSound('whistle');
    if(rightHitcount > 3)
    {
      dampBall();
    }
    if (servingPlayer === 0)
    {
      leftScore++;
    }
    servingPlayer = LEFT_PLAYER;
    setBallValidity(0);
    ballDown = true;
    rightHitcount = 0;
    leftHitcount = 0;
    squishRight = 0;
    squishLeft = 0;
  }

  if (roundFinished())
  {
    ballDown = false;
    reset(servingPlayer);
  }

  if (leftScore >= 15 && leftScore >= rightScore + 2)
  {
    playerwin = LEFT_PLAYER;
  }
  if (rightScore >= 15 && rightScore >= leftScore + 2)
  {
    playerwin = RIGHT_PLAYER;
  }

  return playerwin;
}

GLOBAL.resetRulevars = resetRulevars
GLOBAL.step = step

