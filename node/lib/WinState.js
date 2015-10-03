/**
 * @author: Daniel Knobe
 * @copyright: Daniel Knobe
 *
 * @file
 */

/**
 * @class WinState
 *
 * Used by the StateManager
 */
var WinState = function(guiManager, player) {
  /**
   * Return the name of the State
   */
  this.getStateName = function() {
    return "WinState";
  }

  /**
   * Mainloop of State
   */
  this.run = function() {
    if(this.returnToMainmenu.pressed()) {
      this.guiManager.deleteAllGUIElements();
      stateManager.showMenu();
    }
  };
  /**
   * @constructor
   *
   * Sets the player who has won the match and draw the background
   */
  this.guiManager = guiManager;
  guiManager.createText('Text1', (player == 0 ? 'left ' : 'right ') + 'player has won the match!!!', 300, 400);
  this.returnToMainmenu = guiManager.createButton('Button1', 'Return to mainmenu', 330, 450);
  guiManager.createText('Text4', 'Version 1.5 Daniel Knobe &copy;', 520, 550);

  guiManager.selectFirstSelectable();

  drawWin();
}
