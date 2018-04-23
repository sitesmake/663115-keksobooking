'use strict';

(function () {
  var PROPERTIES_SIZE = 8;
  var X_MIN = 300;
  var X_MAX = 900;
  var Y_MIN = 150;
  var Y_MAX = 500;
  var PRICE_MIN = 1000;
  var PRICE_MAX = 1000000;
  var ROOMS_MIN = 1;
  var ROOMS_MAX = 5;
  var OFFER_TYPES = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом'
  };

  var mockTitle = function () {
    return window.utils.randomItem(['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде']);
  };

  var mockAddress = function (x, y) {
    return x + ', ' + y;
  };

  var mockPrice = function () {
    return window.utils.randomNumber(PRICE_MIN, PRICE_MAX);
  };

  var mockType = function () {
    return window.utils.randomItem(['palace', 'flat', 'house', 'bungalo']);
  };

  var mockRooms = function () {
    return window.utils.randomNumber(ROOMS_MIN, ROOMS_MAX);
  };

  var mockGuests = function () {
    return window.utils.randomNumber(ROOMS_MIN, ROOMS_MAX) * 2;
  };

  var mockCheckin = function () {
    return window.utils.randomItem(['12:00', '13:00', '14:00']);
  };

  var mockCheckout = function () {
    return window.utils.randomItem(['12:00', '13:00', '14:00']);
  };

  var mockFeatures = function () {
    var featuresData = window.utils.randomSortArray(['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']);
    var featuresSize = window.utils.randomNumber(1, featuresData.length);
    var features = [];
    for (var i = 0; i < featuresSize; i++) {
      features.push(featuresData[i]);
    }
    return features;
  };

  var mockDescription = function () {
    return '';
  };

  var mockPhotos = function () {
    return window.utils.randomSortArray(['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']);
  };

  var avatarsHelperArray = [];
  for (var i = 1; i <= PROPERTIES_SIZE; i++) {
    avatarsHelperArray.push(i);
  }
  avatarsHelperArray = window.utils.randomSortArray(avatarsHelperArray);

  var mockAvatar = function () {
    var x = avatarsHelperArray.pop();
    return 'img/avatars/user0' + x + '.png';
  };


  var properties = [];

  for (i = 0; i < PROPERTIES_SIZE; i++) {
    var locationX = window.utils.randomNumber(X_MIN, X_MAX);
    var locationY = window.utils.randomNumber(Y_MIN, Y_MAX);
    properties.push({
      author: {
        avatar: mockAvatar()
      },
      offer: {
        title: mockTitle(),
        address: mockAddress(locationX, locationY),
        price: mockPrice(),
        type: mockType(),
        rooms: mockRooms(),
        guests: mockGuests(),
        checkin: mockCheckin(),
        checkout: mockCheckout(),
        features: mockFeatures(),
        description: mockDescription(),
        photos: mockPhotos()
      },
      location: {
        x: locationX,
        y: locationY
      }
    });
  }

  window.data = {
    properties: properties,
    typesMapper: function (key) {
      if (key in OFFER_TYPES) {
        return OFFER_TYPES[key];
      } else {
        return key;
      }
    }
  };
})();
