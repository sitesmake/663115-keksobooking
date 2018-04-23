'use strict';

(function () {
  var timeinField = document.getElementById('timein');
  var timeoutField = document.getElementById('timeout');

  timeinField.addEventListener('change', function () {
    timeoutField.value = timeinField.value;
  });

  timeoutField.addEventListener('change', function () {
    timeinField.value = timeoutField.value;
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
})();