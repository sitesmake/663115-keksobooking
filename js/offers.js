'use strict';

(function () {
  var SHOW_PROPERTIES_NUMBER = 5;
  var template = document.querySelector('template');
  var pinTemplate = template.content.querySelector('.map__pin');
  var offerTemplate = template.content.querySelector('article');

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

  window.offers = {
    generateOffers: function (properties) {
      window.offers.removeOffers();
      document.querySelector('.map__pins').appendChild(generateFragment(properties.slice(0, SHOW_PROPERTIES_NUMBER)));
    },

    removeOffers: function () {
      var elements = document.querySelectorAll('.offer');
      elements.forEach(function (node) {
        node.parentNode.removeChild(node);
      });
    },

    showNewPopup: function (offerId) {
      window.offers.removeOldPopup();
      document.querySelector('.map__pins').appendChild(makeOffer(window.data.properties[offerId]));
      document.querySelector('.popup__close').addEventListener('click', function () {
        document.querySelector('.map__pins .map__card.popup').remove();
      });
    },

    removeOldPopup: function () {
      var oldPopupElement = document.querySelector('.map__pins .map__card.popup');
      if (oldPopupElement) {
        oldPopupElement.remove();
      }
    }
  };
})();
