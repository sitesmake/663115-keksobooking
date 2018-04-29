'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;

  window.utils = {
    randomItem: function (items) {
      return items[Math.floor(Math.random() * items.length)];
    },

    randomNumber: function (min, max) {
      return min + Math.round(Math.random() * (max - min));
    },

    randomSortArray: function (ary) {
      return ary.sort(function () {
        return 0.5 - Math.random();
      });
    },

    isOutOfBox: function (container, element, position) {
      return ((position.left < 0) || (position.top < 0) || (position.left + element.width > container.width) || (position.top + element.height > container.height));
    },

    showError: function (message) {
      var errorNode = document.createTextNode(message);
      document.body.prepend(errorNode);
      window.scrollTo(0, 0);
      setTimeout(function () {
        errorNode.remove();
      }, 2000);
    },

    debounce: function (f) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(f, DEBOUNCE_INTERVAL);
    }
  };
})();
