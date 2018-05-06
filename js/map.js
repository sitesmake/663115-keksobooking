'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var adFormElement = document.querySelector('.ad-form');
  var mainPinElement = document.querySelector('.map__pin--main');

  window.map = {
    setActiveState: function () {
      mapElement.classList.remove('map--faded');
      adFormElement.classList.remove('ad-form--disabled');
      window.offers.generateOffers(window.data.properties);
      window.form.setAddress();
      window.form.enable();
      mainPinElement.removeEventListener('mouseup', window.map.setActiveState);
    },

    setDisabledState: function () {
      window.offers.removePopup();
      window.offers.removeOffers();

      window.form.reset();
      window.form.disable();
      adFormElement.classList.add('ad-form--disabled');
      mapElement.classList.add('map--faded');

      window.mainPin.reset();
      window.form.setAddress();
      mainPinElement.addEventListener('mouseup', window.map.setActiveState);
    },
  };
})();
