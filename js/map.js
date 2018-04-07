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

var randomItem = function (items) {
  return items[Math.floor(Math.random() * items.length)];
};

var randomNumber = function (min, max) {
  return min + Math.round(Math.random() * (max - min));
};

var mockAvatar = function () {
  var x = randomNumber(1, PROPERTIES_SIZE);
  return 'img/avatars/user0' + x + '.png';
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
  var featuresData = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'].sort(function () {
    return 0.5 - Math.random();
  });
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
  return ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
      .sort(function () {
        return 0.5 - Math.random();
      });
};

var convertType = function (type) {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalo':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    default:
      return 'Тип жилья не распознан';
  }
};

var properties = [];
for (var i = 0; i < PROPERTIES_SIZE; i++) {
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
map.classList.remove('map--faded');

var template = document.querySelector('template');
var pinTemplate = template.content.querySelector('.map__pin');
var offerTemplate = template.content.querySelector('article');

var makePin = function (pinObject) {
  var pinNode = pinTemplate.cloneNode(true);
  pinNode.style.left = pinObject.location.x - pinNode.querySelector('img').width / 2 + 'px';
  pinNode.style.top = pinObject.location.y - pinNode.querySelector('img').height + 'px';
  pinNode.querySelector('img').src = pinObject.author.avatar;
  pinNode.querySelector('img').alt = pinObject.offer.title;
  return pinNode;
};

var fragment = document.createDocumentFragment();
for (i = 0; i < PROPERTIES_SIZE; i++) {
  fragment.appendChild(makePin(properties[i]));
}
document.querySelector('.map__pins').appendChild(fragment);

var insertFeatures = function (templateNode, parentNodeSelector, data) {
  var featuresFragment = document.createDocumentFragment();
  var parentFeaturesNode = templateNode.querySelector(parentNodeSelector);
  while (parentFeaturesNode.firstChild) {
    parentFeaturesNode.removeChild(parentFeaturesNode.firstChild);
  }
  for (i = 0; i < data.length; i++) {
    var featureItem = document.createElement('li');
    featureItem.classList.add('popup__feature');
    featureItem.classList.add('popup__feature--' + data[i]);
    featuresFragment.appendChild(featureItem);
  }
  parentFeaturesNode.appendChild(featuresFragment);
};

var insertPhotos = function (templateNode, parentNodeSelector, data) {
  var photosFragment = document.createDocumentFragment();
  var parentPhotosNode = templateNode.querySelector(parentNodeSelector);
  while (parentPhotosNode.firstChild) {
    parentPhotosNode.removeChild(parentPhotosNode.firstChild);
  }
  for (i = 0; i < data.length; i++) {
    var photoItem = document.createElement('img');
    photoItem.classList.add('popup__photo');
    photoItem.src = data[i];
    photoItem.alt = 'Фотография жилья';
    photoItem.style.width = '45px';
    photoItem.style.height = '40px';
    photosFragment.appendChild(photoItem);
  }
  parentPhotosNode.appendChild(photosFragment);
};

var makeOffer = function (offerObject) {
  var offerNode = offerTemplate.cloneNode(true);
  offerNode.querySelector('.popup__title').textContent = offerObject.offer.title;
  offerNode.querySelector('.popup__text--address').textContent = offerObject.offer.address;
  offerNode.querySelector('.popup__text--price').textContent = offerObject.offer.price + ' ₽/ночь';
  offerNode.querySelector('.popup__type').textContent = convertType(offerObject.offer.type);
  offerNode.querySelector('.popup__text--capacity').textContent = offerObject.offer.rooms + ' комнаты для ' + offerObject.offer.guests + ' гостей';
  offerNode.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerObject.offer.checkin + ', выезд до ' + offerObject.offer.checkout;
  offerNode.querySelector('.popup__description').textContent = offerObject.offer.description;
  offerNode.querySelector('.popup__avatar').src = offerObject.author.avatar;
  insertFeatures(offerNode, '.popup__features', offerObject.offer.features);
  insertPhotos(offerNode, '.popup__photos', offerObject.offer.photos);
  return offerNode;
};

document.querySelector('.map__pins').appendChild(makeOffer(properties[0]));
