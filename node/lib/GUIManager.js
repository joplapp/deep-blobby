/**
 * @author: Daniel Knobe
 * @copyright: Daniel Knobe
 *
 * @file
 */

/**
 * @class GuiManager
 *
 * Manager for Input and Drawing of GUI-Elements
 */
GUIManager = function() {
  /*
   * Set the fontfamily which should be loaded via css beforce
   *
   * @params {String} textFontFamily TextFontFamily
   */
  this.setTextFontFamily = function(textFontFamily) {
    this.textFontFamily = textFontFamily;
  }

  /*
   * Set the font size
   *
   * @params {Number} textSize TextSize
   */
  this.setTextSize = function(textSize) {
    this.textSize = textSize;
  }

  /*
   * Set the font color
   *
   * @params {String} textColor Color of the font
   */
  this.setTextColor = function(textColor) {
    this.textColor = textColor;
  }

  /*
   * Creates a GUI Element for text
   *
   * @params {String} id ID of element
   * @params {String} text Text of the element
   * @params {Number} x X-Coordinate of element
   * @params {Number} y Y-Coordinate of element
   *
   * @returns {Object} textElement GUI-Element
   */
  this.createText = function(id, text, x, y) {
    // TODO remove
    return null;

    var textElement = document.createElement('p');
    textElement.innerHTML = text;
    textElement.setAttribute('id', id);
    document.getElementById('gamediv').appendChild(textElement);
    textElement.style.position = "absolute";
    textElement.style.margin = '0px';
    textElement.style.fontFamily = this.textFontFamily;
    textElement.style.fontSize = this.textSize + 'pt';
    textElement.style.color = this.textColor;
    textElement.style.cursor = 'default';
    textElement.style.MozTransform='matrix(1,0,0,1, ' + x + 'px, ' + y + 'px)';
    textElement.style.WebkitTransform = 'translate(' + x + 'px, ' + y + 'px)';
    textElement.style.OTransform = 'translate(' + x + 'px, ' + y + 'px)';
    textElement.selectable = false;

    this.registerGUIElement(textElement);

    return textElement;
  };

  /*
   * Creates a GUI Element for button
   *
   * @params {String} id ID of element
   * @params {String} text Text of the element
   * @params {Number} x X-Coordinate of element
   * @params {Number} y Y-Coordinate of element
   *
   * @returns {Object} textElement GUI-Element
   */
  this.createButton = function(id, text, x, y) {
    // TODO remove
    return {
      pressed: function(){
        return true
      }
    };

    var buttonElement = document.createElement('p');
    buttonElement.innerHTML = text;
    buttonElement.setAttribute('id', id);
    document.getElementById('gamediv').appendChild(buttonElement);
    buttonElement.style.position = "absolute";
    buttonElement.style.margin = '0px';
    buttonElement.style.fontFamily = this.textFontFamily;
    buttonElement.style.fontSize = this.textSize + 'pt';
    buttonElement.style.color = this.textColor;
    buttonElement.style.cursor = 'default';
    buttonElement.style.MozTransform='matrix(1,0,0,1, ' + x + 'px, ' + y + 'px)';
    buttonElement.style.WebkitTransform = 'translate(' + x + 'px, ' + y + 'px)';
    buttonElement.style.OTransform = 'translate(' + x + 'px, ' + y + 'px)';
    buttonElement.style.cursor = 'pointer';
    buttonElement.selectable = true;
    buttonElement.selected = false;

    buttonElement.textColor = this.textColor;

    buttonElement.select = function() {
      var rnd = Math.round(Math.random() * 255);
      this.style.color = 'rgb(' + rnd + ', 0, ' + (255 - rnd) + ')';
      this.selected = true;
    };

    buttonElement.unselect = function() {
      this.style.color = this.textColor;
      this.selected = false;
    };

    buttonElement.onmouseup = function() {
      buttonElement.pressedBuffer = 1;
    };

    // Schnittstellen
    buttonElement.pressed = function() {
      if (this.pressedBuffer == 1) {
        this.pressedBuffer = 0;
        return true;
      }
      return false;
    };

    this.registerGUIElement(buttonElement);

    return buttonElement;
  };

  /*
   * Will be called, if a GUI relevant key was pressed
   * Does manage the via mouse selected items and manages the input for them too
   *
   * @params {Object} event Eventobject of the event
   */
  this.onKeyDown = function(event) {
    if(event.keyCode == 13) {

      for(var i = 0; i < this.registry.length; i++)
      {
        if(this.registry[i].selectable && this.registry[i].selected) {
          this.registry[i].pressedBuffer = true;
          break;
        }
      }
    }
    // Arrowkeys
    if(event.keyCode == 38) {
      var selectedOld;
      for(var i = 0; i < this.registry.length; i++)
      {
        if(this.registry[i].selectable && this.registry[i].selected) {
          this.registry[i].unselect();
          selectedOld = i;
          break;
        }
      }
      for(var i = 1; i <= this.registry.length; i++)
      {
        if(this.registry[((selectedOld + this.registry.length - i) % this.registry.length)].selectable) {
          this.registry[((selectedOld + this.registry.length - i) % this.registry.length)].select();
          break;
        }
      }

    }

    if(event.keyCode == 40) {
      var selectedOld;
      for(var i = 0; i < this.registry.length; i++)
      {
        if(this.registry[i].selectable && this.registry[i].selected) {
          this.registry[i].unselect();
          selectedOld = i;
          break;
        }
      }
      for(var i = 1; i <= this.registry.length; i++)
      {
        if(this.registry[((selectedOld + i) % this.registry.length)].selectable) {
          this.registry[((selectedOld + i) % this.registry.length)].select();
          break;
        }
      }
    }
  };

  /*
   * Selects the first element if the Gui
   *
   * @params {Object} event Eventobject of the event
   */
  this.selectFirstSelectable = function() {
    for(var i = 0; i < this.registry.length; i++)
    {
      if(this.registry[i].selectable) {
        this.registry[i].select();
        break;
      }
    }
  }


  /*
   * Deletes all existing GUI-Elements
   */
  this.deleteAllGUIElements = function() {
    for(; 0 != this.registry.length;)
    {
      document.getElementById('gamediv').removeChild(this.registry.pop());
    }
  };

  /*
   * Deletes all existing GUI-Elements
   * @params {Object} element GuiElement which we want to register
   */
  this.registerGUIElement = function(element) {
    this.registry.push(element);
  }

  /**
   * @constructor
   *
   * Sets defaults and create registry
   */
  this.textFontFamily = 'Blobby';
  this.textSize = 20;
  this.textColor = '#FFFFFF'

  this.registry = new Array();
}

module.exports = GUIManager