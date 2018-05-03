'use strict';

(function () {
  var mainPinElement = document.querySelector('.map__pin--main');
  var mapWidth = document.querySelector('.map__overlay').clientWidth;
  var mapHeight = document.querySelector('.map__overlay').clientHeight;
  var mainPinWidth = mainPinElement.querySelector('img').width;
  var mainPinHeight = mainPinElement.querySelector('img').height;

  mainPinElement.addEventListener('mouseup', window.map.setActiveState);

  var mapPinMouseUpHandler = function (evt) {
    var clickedElement = evt.target.closest('.map__pin');
    if (clickedElement) {
      var offerId = clickedElement.dataset.id;
      if (offerId) {
        window.offers.showPopup(offerId);
      }
    }
  };

  document.addEventListener('mouseup', mapPinMouseUpHandler);

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
      if (window.utils.isOutOfBox({width: mapWidth, height: mapHeight}, {width: mainPinWidth, height: mainPinHeight}, {left: leftCoordinate, top: topCoordinate})) {
        return;
      }

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPinElement.style.top = (mainPinElement.offsetTop - shift.y) + 'px';
      mainPinElement.style.left = (mainPinElement.offsetLeft - shift.x) + 'px';
      window.form.setDefaultAddressValue();
    };

    var mouseUpHandler = function (moveEvt) {
      moveEvt.preventDefault();
      window.form.setDefaultAddressValue();
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });
})();
