'use strict';

(function () {
  var FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var OFFER_TYPES = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом'
  };

  var setupProperties = function (data) {
    var properties = [];
    data.forEach(function (property, id) {
      property.id = id;
      properties.push(property);
    });
    window.data.properties = properties;
  };

  window.backend.load(setupProperties, window.utils.showError);

  window.data = {
    properties: [],

    features: FEATURES,

    typesMapper: function (key) {
      return (key in OFFER_TYPES) ? OFFER_TYPES[key] : key;
    }
  };
})();
