'use strict';

(function () {
  var filtersForm = document.querySelector('.map__filters-container form');

  var validForCurrentFilters = function (property) {
    var rank = 1;

    var housingType = document.getElementById('housing-type').value;
    if (housingType !== 'any') {
      if (property.offer.type === housingType) {
        rank += 1;
      } else {
        return false;
      }
    }

    var housingPrice = document.getElementById('housing-price').value;
    if (housingPrice !== 'any') {
      if (housingPrice === 'low' && property.offer.price <= 10000) {
        rank += 1;
      } else if (housingPrice === 'middle' && property.offer.price > 10000 && property.offer.price < 50000) {
        rank += 1;
      } else if (housingPrice === 'high' && property.offer.price >= 50000) {
        rank += 1;
      } else {
        return false;
      }
    }

    var housingRooms = document.getElementById('housing-rooms').value;
    if (housingRooms !== 'any') {
      if (property.offer.rooms === parseInt(housingRooms, 10)) {
        rank += 1;
      } else {
        return false;
      }
    }

    var housingGuests = document.getElementById('housing-guests').value;
    if (housingGuests !== 'any') {
      if (property.offer.guests === parseInt(housingGuests, 10)) {
        rank += 1;
      } else {
        return false;
      }
    }

    for (var i = 0; i < window.data.features.length; i++) {
      var feature = window.data.features[i];
      var element = document.getElementById('filter-' + feature);
      if (element.checked) {
        if (property.offer.features.includes(element.value)) {
          rank += 1;
        } else {
          return false;
        }
      }
    }

    return rank;
  };

  var filterOffers = function () {
    var properties = window.data.properties.filter(function (property) {
      return validForCurrentFilters(property);
    });

    window.pins.generateOffers(properties);
  };

  filtersForm.addEventListener('change', function () {
    window.utils.debounce(filterOffers);
  });
})();
