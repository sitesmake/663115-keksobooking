'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var timeInField = document.getElementById('timein');
  var timeOutField = document.getElementById('timeout');
  var fieldsets = adForm.querySelectorAll('fieldset');

  timeInField.addEventListener('change', function () {
    timeOutField.value = timeInField.value;
  });

  timeOutField.addEventListener('change', function () {
    timeInField.value = timeOutField.value;
  });

  var typeField = document.getElementById('type');
  var priceField = document.getElementById('price');
  var typeToPriceMapper = {
    flat: 1000,
    bungalo: 0,
    house: 5000,
    palace: 10000
  };

  var updatePrice = function () {
    var currentTypeValue = typeField.value;
    var newPrice = typeToPriceMapper[currentTypeValue];
    priceField.min = newPrice;
    priceField.placeholder = newPrice;
  };
  updatePrice();

  typeField.addEventListener('change', updatePrice);

  var roomNumberField = document.getElementById('room_number');
  var capacityField = document.getElementById('capacity');
  var roomNumberToCapacityMapper = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var generateGuestsMessage = function (guests) {
    if (guests.includes('0')) {
      return 'Не для гостей';
    }
    return 'Допустимое количество гостей: ' + guests.join(', ');
  };

  var checkCapacity = function () {
    var roomNumber = roomNumberField.value;
    var currentCapacity = capacityField.value;
    var allowedCapacity = roomNumberToCapacityMapper[roomNumber];
    if (allowedCapacity.includes(currentCapacity)) {
      capacityField.setCustomValidity('');
    } else {
      capacityField.setCustomValidity(generateGuestsMessage(allowedCapacity));
    }
  };
  checkCapacity();

  roomNumberField.addEventListener('change', checkCapacity);
  capacityField.addEventListener('change', checkCapacity);

  document.querySelector('.ad-form__reset').addEventListener('click', function (evt) {
    evt.preventDefault();
    window.map.setDisabledState();
  });

  adForm.addEventListener('reset', function () {
    var photos = document.querySelectorAll('.ad-form__photo');
    photos.forEach(function (photoElement) {
      photoElement.parentNode.removeChild(photoElement);
    });
    var photoMock = document.createElement('div');
    photoMock.classList.add('ad-form__photo');
    document.querySelector('.ad-form__photo-container').appendChild(photoMock);
  });

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.backend.save(
        new FormData(adForm),
        function () {
          window.map.setDisabledState();
          document.querySelector('.success').classList.remove('hidden');
        },
        function (errorMessage) {
          window.utils.showError(errorMessage);
        }
    );
  });

  window.form = {
    reset: function () {
      adForm.reset();
      window.offers.removeOffers();
      window.form.setAddress();
    },

    setAddress: function () {
      var mainPinCoordinates = window.mainPin.getCoordinates();
      document.querySelector('#address').value = mainPinCoordinates.x + ', ' + mainPinCoordinates.y;
    },

    disable: function () {
      fieldsets.forEach(function (fieldset) {
        fieldset.setAttribute('disabled', 'disabled');
      });
    },

    enable: function () {
      fieldsets.forEach(function (fieldset) {
        fieldset.removeAttribute('disabled');
      });
    }
  };

  window.form.setAddress();
})();
