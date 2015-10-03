/**
 * @author: Daniel Knobe
 * @copyright: Daniel Knobe
 *
 * @file
 */
/**
 * @class MenuState
 *
 * Used by the StateManager
 */
var MenuState = function(guiManager, soundManager) {
  /**
   * Return the name of the State
   */
  this.getStateName = function() {
    return "MenuState";
  }

  /**
   * Mainloop of State
   */
  this.run = function() {
    /*if (this.HumanVsHuman.pressed()) {
      this.guiManager.deleteAllGUIElements();
      playerHuman = 1;
      resetKeys();
      stateManager.showGame();
    }*/
    if (this.HumanVsCPU.pressed()) {
      this.guiManager.deleteAllGUIElements();
      playerHuman = 0;
      resetKeys();
      stateManager.showGame();
    }
    /*if (this.MuteSound.pressed()) {
      if (this.MuteSound.innerHTML == 'Unmute Sound') {
        this.MuteSound.innerHTML = 'Mute Sound';
        this.soundManager.muteSound(false);
      } else {
        this.MuteSound.innerHTML = 'Unmute Sound';
        this.soundManager.muteSound(true);
      }
    }*/
  };

  /**
   * @constructor
   *
   * Create GUI-Elements and draws the background
   */
  this.soundManager = soundManager;

  this.guiManager = guiManager;
  guiManager.createText('Header1', 'Menu:', 40, 380);
  this.HumanVsHuman = guiManager.createButton('Button1', 'Human vs Human', 40, 410);
  this.HumanVsCPU = guiManager.createButton('Button2', 'Human vs CPU', 40, 440);
  guiManager.createText('Header2', 'Options:', 40, 480);

  var isSoundMutedText = 'Mute Sound';
 /* if (soundManager.isSoundMuted() == true) {
    isSoundMutedText = 'Unmute Sound';
  }*/

  this.MuteSound = guiManager.createButton('Button3', isSoundMutedText, 40, 510);
  guiManager.createText('Header3', 'Keys:', 400, 380);
  guiManager.createText('Text3', 'a, w, d - control left blobby', 400, 410);
  guiManager.createText('Text4', 'h, u, k - control right blobby', 400, 440);
  guiManager.createText('Text4', 'Version 1.5 Daniel Knobe &copy;', 520, 550);

  guiManager.selectFirstSelectable();

  drawMenu();
}

module.exports = MenuState