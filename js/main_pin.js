'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 81;

  var mainPinElement = document.querySelector('.map__pin--main');
  var defaultPosition = {
    left: mainPinElement.style.left,
    top: mainPinElement.style.top
  };
  var mapWidth = document.querySelector('.map__overlay').clientWidth;
  var mapHeight = document.querySelector('.map__overlay').clientHeight;

  mainPinElement.addEventListener('mouseup', window.map.setActiveState);

  mainPinElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      var leftCoordinate = mainPinElement.offsetLeft - shift.x;
      var topCoordinate = mainPinElement.offsetTop - shift.y;

      if (window.utils.isOutOfBox({width: mapWidth, height: mapHeight}, mainPinElement, {left: leftCoordinate, top: topCoordinate})) {
        return;
      }

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPinElement.style.top = (mainPinElement.offsetTop - shift.y) + 'px';
      mainPinElement.style.left = (mainPinElement.offsetLeft - shift.x) + 'px';
      window.form.setAddress();
    };

    var mouseUpHandler = function (moveEvt) {
      window.form.setAddress();
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
      moveEvt.preventDefault();
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

  window.mainPin = {
    getCoordinates: function () {
      return {
        x: parseInt(mainPinElement.style.left, 10) + Math.floor(MAIN_PIN_WIDTH / 2),
        y: parseInt(mainPinElement.style.top, 10) + MAIN_PIN_HEIGHT
      };
    },

    reset: function () {
      mainPinElement.style.top = defaultPosition.top + 'px';
      mainPinElement.style.left = defaultPosition.left + 'px';
    }
  };
})();
