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
    },

    request: function (params) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          params.onSuccess(xhr.response);
        } else {
          params.onFailure('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        params.onFailure('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        params.onFailure('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 5000;

      xhr.open(params.method, params.url);
      xhr.send(params.data);
    }
  };
})();
