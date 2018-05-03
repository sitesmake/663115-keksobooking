'use strict';

(function () {
  var adFormElement = document.querySelector('.ad-form');
  var timeInField = document.getElementById('timein');
  var timeOutField = document.getElementById('timeout');

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
    } else {
      return 'Допустимое количество гостей: ' + guests.join(', ');
    }
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

  document.querySelector('.ad-form__reset').addEventListener('click', window.map.setDisabledState);

  adFormElement.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(adFormElement), function () {
      adFormElement.reset();
    }, function (errorMessage) {
      window.utils.showError(errorMessage);
    });
    evt.preventDefault();
  });

  window.form = {
    setDefaultAddressValue: function () {
      var mainPinElement = document.querySelector('.map__pin--main');
      var mainPinElementX = parseInt(mainPinElement.style.left, 10) + mainPinElement.querySelector('img').width / 2;
      var mainPinElementY = parseInt(mainPinElement.style.top, 10) + mainPinElement.querySelector('img').height;
      document.querySelector('#address').value = parseInt(mainPinElementX, 10) + ',' + parseInt(mainPinElementY, 10);
    }
  };
})();
