'use strict';

(function () {
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var OFFER_TYPES = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом'
  };

  var properties = [];

  var setupProperties = function (data) {
    data.forEach(function (property, index) {
      property.id = index;
      properties.push(property);
    });
  };

  window.backend.load(setupProperties, window.utils.showError);

  window.data = {
    properties: properties,
    features: FEATURES,
    typesMapper: function (key) {
      if (key in OFFER_TYPES) {
        return OFFER_TYPES[key];
      } else {
        return key;
      }
    }
  };
})();
