/**
 * @author: Daniel Knobe
 * @copyright: Daniel Knobe
 *
 * @file
 */

/**
 * @class Soundfile
 *
 * Mangages all available states of the game
 */


var GameState = require('./GameState')
var MenuState = require('./MenuState')
var WinState = require('./WinState')

var StateManager = function(guiManager, soundManager) {
  /*
   * Changes to Game State
   */
  this.showGame = function() {
    if(this.currentState.getStateName() != "GameState")  {
      console.log('showgame')
      cleanPhysic();
      resetRulevars();
      resetPlayer();
      reset(LEFT_PLAYER);
      playerwin = - 1;
      delete this.currentState;
      this.currentState = new GameState(this.guiManager, this.soundManager);
    }
  };

  /*
   * Changes to Menu State
   */
  this.showMenu = function() {
    if(this.currentState.getStateName() != "MenuState") {
      delete this.currentState;
      this.currentState = new MenuState(this.guiManager, this.soundManager);
    }
  };

  /*
   * Changes to WinScreen State
   *
   * @params {Number} player Player ID
   */
  this.showWin = function(player) {
    delete this.currentState;
    console.log('player won!!')
    console.log(player)
    //this.currentState = new WinState(this.guiManager, player);
  }

  /**
   * @constructor
   *
   * Set the state to menu
   * Inject some depencies and connect them with the state by reference
   */
  this.guiManager = guiManager;
  this.soundManager = soundManager;

  this.currentState = new MenuState(this.guiManager, this.soundManager);
}


module.exports = StateManager

