/**
 * @author: Daniel Knobe
 * @copyright: Daniel Knobe
 *
 * @file
 */
var GUIManager = require('./GUIManager')
var guiManager = new GUIManager();
GLOBAL.guiManager = guiManager

var Global = require('./Global')
var GameLogic = require('./Gamelogic')

var StateManager = require('./StateManager')
var RenderManager = require('./RenderManager')
var MenuState = require('./MenuState')
var Physic = require('./Physic')
var Input = require('./Input')
/**
 * Structure to get the whole thing running
 * Create all needed Manager and inject them.
 */

var  stateManager = new StateManager(guiManager, null);
GLOBAL.stateManager = stateManager;
var renderManager = new RenderManager; // TODO: set var when render Manager will be injected correct
GLOBAL.renderManager = renderManager;

//stateManager.showGame()

stateManager.currentState.run();

/*
setInterval(function(){
  stateManager.currentState.run()

},500) */


module.exports = {
  stateManager: stateManager,
  renderManager: renderManager
}