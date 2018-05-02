'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var adFormElement = document.querySelector('.ad-form');
  var mainPinElement = document.querySelector('.map__pin--main');
  var mainPinInitialLeft = mainPinElement.style.left;
  var mainPinInitialTop = mainPinElement.style.top;

  window.map = {
    setActiveState: function () {
      mapElement.classList.remove('map--faded');
      adFormElement.classList.remove('ad-form--disabled');
      window.offers.generateOffers(window.data.properties);
      window.mainPin.setDefaultAddressValue();
      mainPinElement.removeEventListener('mouseup', window.map.setActiveState);
    },

    setDisabledState: function () {
      window.offers.removeOldPopup();
      window.offers.removeOffers();

      adFormElement.reset();
      adFormElement.classList.add('ad-form--disabled');
      mapElement.classList.add('map--faded');

      mainPinElement.style.left = mainPinInitialLeft;
      mainPinElement.style.top = mainPinInitialTop;
      window.mainPin.setDefaultAddressValue();
      mainPinElement.addEventListener('mouseup', window.map.setActiveState);
    }
  };
})();
