'use strict';

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

var typesMapper = function (key) {
  if (key in OFFER_TYPES) {
    return OFFER_TYPES[key];
  } else {
    return key;
  }
};

var randomItem = function (items) {
  return items[Math.floor(Math.random() * items.length)];
};

var randomNumber = function (min, max) {
  return min + Math.round(Math.random() * (max - min));
};

var randomSortArray = function (ary) {
  return ary.sort(function () {
    return 0.5 - Math.random();
  });
};

var mockTitle = function () {
  return randomItem(['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде']);
};

var mockAddress = function (x, y) {
  return x + ', ' + y;
};

var mockPrice = function () {
  return randomNumber(PRICE_MIN, PRICE_MAX);
};

var mockType = function () {
  return randomItem(['palace', 'flat', 'house', 'bungalo']);
};

var mockRooms = function () {
  return randomNumber(ROOMS_MIN, ROOMS_MAX);
};

var mockGuests = function () {
  return randomNumber(ROOMS_MIN, ROOMS_MAX) * 2;
};

var mockCheckin = function () {
  return randomItem(['12:00', '13:00', '14:00']);
};

var mockCheckout = function () {
  return randomItem(['12:00', '13:00', '14:00']);
};

var mockFeatures = function () {
  var featuresData = randomSortArray(['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']);
  var featuresSize = randomNumber(1, featuresData.length);
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
  return randomSortArray(['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']);
};

var avatarsHelperArray = [];
for (var i = 1; i <= PROPERTIES_SIZE; i++) {
  avatarsHelperArray.push(i);
}
avatarsHelperArray = randomSortArray(avatarsHelperArray);

var mockAvatar = function () {
  var x = avatarsHelperArray.pop();
  return 'img/avatars/user0' + x + '.png';
};


var properties = [];

for (i = 0; i < PROPERTIES_SIZE; i++) {
  var locationX = randomNumber(X_MIN, X_MAX);
  var locationY = randomNumber(Y_MIN, Y_MAX);
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

var map = document.querySelector('.map');
var template = document.querySelector('template');
var pinTemplate = template.content.querySelector('.map__pin');
var offerTemplate = template.content.querySelector('article');

var makePin = function (pinObject, id) {
  var pinNode = pinTemplate.cloneNode(true);
  var img = pinNode.querySelector('img');
  pinNode.style.left = pinObject.location.x - img.width / 2 + 'px';
  pinNode.style.top = pinObject.location.y - img.height + 'px';
  img.src = pinObject.author.avatar;
  img.alt = pinObject.offer.title;
  pinNode.dataset.id = id;
  return pinNode;
};

var fragment = document.createDocumentFragment();
for (i = 0; i < PROPERTIES_SIZE; i++) {
  fragment.appendChild(makePin(properties[i], i));
}

var generateFeaturesList = function (data) {
  var featuresFragment = document.createDocumentFragment();
  data.forEach(function (item) {
    var featureItem = document.createElement('li');
    featureItem.classList.add('popup__feature');
    featureItem.classList.add('popup__feature--' + item);
    featuresFragment.appendChild(featureItem);
  });
  return featuresFragment;
};

var generatePhotosList = function (data) {
  var photosFragment = document.createDocumentFragment();
  data.forEach(function (item) {
    var photoItem = document.createElement('img');
    photoItem.classList.add('popup__photo');
    photoItem.src = item;
    photoItem.alt = 'Фотография жилья';
    photoItem.style.width = '45px';
    photoItem.style.height = '40px';
    photosFragment.appendChild(photoItem);
  });
  return photosFragment;
};

var makeOffer = function (offerObject) {
  var offerNode = offerTemplate.cloneNode(true);
  offerNode.querySelector('.popup__title').textContent = offerObject.offer.title;
  offerNode.querySelector('.popup__text--address').textContent = offerObject.offer.address;
  offerNode.querySelector('.popup__text--price').textContent = offerObject.offer.price + ' ₽/ночь';
  offerNode.querySelector('.popup__type').textContent = typesMapper(offerObject.offer.type);
  offerNode.querySelector('.popup__text--capacity').textContent = offerObject.offer.rooms + ' комнаты для ' + offerObject.offer.guests + ' гостей';
  offerNode.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerObject.offer.checkin + ', выезд до ' + offerObject.offer.checkout;
  offerNode.querySelector('.popup__description').textContent = offerObject.offer.description;
  offerNode.querySelector('.popup__avatar').src = offerObject.author.avatar;
  offerNode.querySelector('.popup__features').innerHTML = '';
  offerNode.querySelector('.popup__features').appendChild(generateFeaturesList(offerObject.offer.features));
  offerNode.querySelector('.popup__photos').innerHTML = '';
  offerNode.querySelector('.popup__photos').appendChild(generatePhotosList(offerObject.offer.photos));
  return offerNode;
};


var adForm = document.querySelector('.ad-form');
var mainPin = document.querySelector('.map__pin--main');
var MAIN_PIN_WIDTH = mainPin.querySelector('img').width;
var MAIN_PIN_HEIGHT = mainPin.querySelector('img').height;

var setDefaultAddressValue = function () {
  var mainPinX = parseInt(mainPin.style.left, 10) - MAIN_PIN_WIDTH / 2;
  var mainPinY = parseInt(mainPin.style.top, 10) + MAIN_PIN_HEIGHT / 2;
  adForm.querySelector('#address').value = mainPinX + ',' + mainPinY;
};

var setActiveState = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  document.querySelector('.map__pins').appendChild(fragment);
  setDefaultAddressValue();
};

mainPin.addEventListener('mouseup', function () {
  setActiveState();
});

var removeOldPopup = function () {
  var oldPopup = document.querySelector('.map__pins .map__card.popup');
  if (oldPopup) {
    oldPopup.remove();
  }
};

var MapPinMouseUpHandler = function (evt) {
  var clickedElement = evt.srcElement;
  if (clickedElement.className === 'map__pin') {
    removeOldPopup();
    document.querySelector('.map__pins').appendChild(makeOffer(properties[clickedElement.dataset.id]));
    document.querySelector('.popup__close').addEventListener('click', function () {
      document.querySelector('.map__pins .map__card.popup').remove();
    });
  }
};

document.addEventListener('mouseup', MapPinMouseUpHandler);
