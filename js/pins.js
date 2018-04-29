'use strict';

(function () {
  var SHOW_PROPERTIES_NUMBER = 5;
  var mapElement = document.querySelector('.map');
  var template = document.querySelector('template');
  var pinTemplate = template.content.querySelector('.map__pin');
  var offerTemplate = template.content.querySelector('article');
  var adFormElement = document.querySelector('.ad-form');
  var mainPinElement = document.querySelector('.map__pin--main');
  var mapWidth = document.querySelector('.map__overlay').clientWidth;
  var mapHeight = document.querySelector('.map__overlay').clientHeight;
  var mainPinWidth = mainPinElement.querySelector('img').width;
  var mainPinHeight = mainPinElement.querySelector('img').height;
  var mainPinInitialLeft = mainPinElement.style.left;
  var mainPinInitialTop = mainPinElement.style.top;

  var makePin = function (pinObject) {
    var pinNode = pinTemplate.cloneNode(true);
    var img = pinNode.querySelector('img');
    pinNode.style.left = pinObject.location.x - img.width / 2 + 'px';
    pinNode.style.top = pinObject.location.y - img.height + 'px';
    img.src = pinObject.author.avatar;
    img.alt = pinObject.offer.title;
    pinNode.dataset.id = pinObject.id;
    pinNode.classList.add('offer');
    return pinNode;
  };

  var generateFragment = function (properties) {
    var fragment = document.createDocumentFragment();
    properties.forEach(function (property) {
      fragment.appendChild(makePin(property));
    });
    return fragment;
  };

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
    offerNode.querySelector('.popup__type').textContent = window.data.typesMapper(offerObject.offer.type);
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

  var removeOffers = function () {
    var elements = document.querySelectorAll('.offer');
    elements.forEach(function (node) {
      node.parentNode.removeChild(node);
    });
  };

  var setDefaultAddressValue = function () {
    var mainPinElementX = parseInt(mainPinElement.style.left, 10) + mainPinWidth / 2;
    var mainPinElementY = parseInt(mainPinElement.style.top, 10) + mainPinHeight;
    adFormElement.querySelector('#address').value = parseInt(mainPinElementX, 10) + ',' + parseInt(mainPinElementY, 10);
  };

  window.pins = {
    generateOffers: function (properties) {
      removeOffers();
      document.querySelector('.map__pins').appendChild(generateFragment(properties.slice(0, SHOW_PROPERTIES_NUMBER)));
    }
  };

  var setActiveState = function () {
    mapElement.classList.remove('map--faded');
    adFormElement.classList.remove('ad-form--disabled');
    window.pins.generateOffers(window.data.properties);
    setDefaultAddressValue();
    mainPinElement.removeEventListener('mouseup', setActiveState);
  };

  var setDisabledState = function () {
    removeOldPopup();
    removeOffers();

    adFormElement.reset();
    adFormElement.classList.add('ad-form--disabled');
    mapElement.classList.add('map--faded');

    mainPinElement.style.left = mainPinInitialLeft;
    mainPinElement.style.top = mainPinInitialTop;
    setDefaultAddressValue();
    mainPinElement.addEventListener('mouseup', setActiveState);
  };

  mainPinElement.addEventListener('mouseup', setActiveState);

  document.querySelector('.ad-form__reset').addEventListener('click', setDisabledState);

  var removeOldPopup = function () {
    var oldPopupElement = document.querySelector('.map__pins .map__card.popup');
    if (oldPopupElement) {
      oldPopupElement.remove();
    }
  };

  var showNewPopup = function (offerId) {
    document.querySelector('.map__pins').appendChild(makeOffer(window.data.properties[offerId]));
    document.querySelector('.popup__close').addEventListener('click', function () {
      document.querySelector('.map__pins .map__card.popup').remove();
    });
  };

  var mapPinMouseUpHandler = function (evt) {
    var clickedElement = evt.target.closest('.map__pin');
    if (clickedElement) {
      removeOldPopup();
      var offerId = clickedElement.dataset.id;
      if (offerId) {
        showNewPopup(offerId);
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
      setDefaultAddressValue();
    };

    var mouseUpHandler = function (moveEvt) {
      moveEvt.preventDefault();
      setDefaultAddressValue();
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });


  adFormElement.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(adFormElement), function () {
      adFormElement.reset();
    }, function (errorMessage) {
      window.utils.showError(errorMessage);
    });
    evt.preventDefault();
  });
})();
