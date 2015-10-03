/**
 * @author: Daniel Knobe
 * @copyright: Daniel Knobe
 *
 * @file
 */

/**
 * @class GameState
 *
 * Used by the StateManager
 */
var GameState = function(guiManager, soundManager) {
  /**
   * Return the name of the State
   */
  this.getStateName = function() {
    return "GameState";
  }

  /**
   * Mainloop of State
   */
  this.run = function() {console.log('step')

    var playerwin = step();

    if(true || playerHuman == 0) {
      if (ballDown == false) {
        playerInput[RIGHT_PLAYER].up = 1;
        if(ballPosition.x + 40 < blobPosition[RIGHT_PLAYER].x) {
          playerInput[RIGHT_PLAYER].left = 1;
        } else {
          playerInput[RIGHT_PLAYER].left = 0;
        }
        if(ballPosition.x + 20 > blobPosition[RIGHT_PLAYER].x) {
          playerInput[RIGHT_PLAYER].right = 1;
        } else {
          playerInput[RIGHT_PLAYER].right = 0;
        }

      } else {
        playerInput[RIGHT_PLAYER].up = 0;
        if(600 < blobPosition[RIGHT_PLAYER].x) {
          playerInput[RIGHT_PLAYER].left = 1;
        } else {
          playerInput[RIGHT_PLAYER].left = 0;
        }
        if(630 > blobPosition[RIGHT_PLAYER].x) {
          playerInput[RIGHT_PLAYER].right = 1;
        } else {
          playerInput[RIGHT_PLAYER].right = 0;
        }
      }
    }

    if(playerwin != -1) {
      this.guiManager.deleteAllGUIElements();
      stateManager.showWin(playerwin);
    }
    if(false && this.close.pressed()) {
      this.guiManager.deleteAllGUIElements();
      stateManager.showMenu();
    }
  };

  /**
   * @constructor
   *
   * Set the state to game
   * Inject some depencies and connect them with the state by reference
   */
  this.guiManager = guiManager;
  this.close = guiManager.createButton('Button1', 'Close', 700, 550);

  guiManager.selectFirstSelectable();
}

module.exports = GameState
