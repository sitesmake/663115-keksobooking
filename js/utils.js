'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;

  window.utils = {
    IMAGE_FILE_TYPES: ['gif', 'jpg', 'jpeg', 'png'],

    isOutOfBox: function (container, element, position) {
      return (
        (position.left < 0) || (position.top + element.scrollHeight < 150)
        || (position.left + element.scrollWidth > container.width)
        || (position.top + element.scrollHeight > 700)
      );
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
