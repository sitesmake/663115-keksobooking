'use strict';

(function () {
  var filtersForm = document.querySelector('.map__filters');

  var validForCurrentFilters = function (property) {
    var housingType = document.getElementById('housing-type').value;
    if (housingType !== 'any') {
      if (property.offer.type !== housingType) {
        return false;
      }
    }

    var housingPrice = document.getElementById('housing-price').value;
    if (housingPrice !== 'any') {
      if (housingPrice === 'low' && property.offer.price > 10000) {
        return false;
      } else if (housingPrice === 'middle' && (property.offer.price <= 10000 || property.offer.price >= 50000)) {
        return false;
      } else if (housingPrice === 'high' && property.offer.price < 50000) {
        return false;
      }
    }

    var housingRooms = document.getElementById('housing-rooms').value;
    if (housingRooms !== 'any') {
      if (property.offer.rooms !== parseInt(housingRooms, 10)) {
        return false;
      }
    }

    var housingGuests = document.getElementById('housing-guests').value;
    if (housingGuests !== 'any') {
      if (property.offer.guests !== parseInt(housingGuests, 10)) {
        return false;
      }
    }

    for (var i = 0; i < window.data.features.length; i++) {
      var feature = window.data.features[i];
      var element = document.getElementById('filter-' + feature);
      if (element.checked) {
        if (!property.offer.features.includes(element.value)) {
          return false;
        }
      }
    }

    return true;
  };

  var filterOffers = function () {
    var properties = window.data.properties.filter(function (property) {
      return validForCurrentFilters(property);
    });

    window.offers.generateOffers(properties);
    window.offers.removePopup();
  };

  filtersForm.addEventListener('change', function () {
    window.utils.debounce(filterOffers);
  });
})();
