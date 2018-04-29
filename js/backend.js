'use strict';

(function () {
  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var SEND_URL = 'https://js.dump.academy/keksobooking';

  var request = function (url, method, onSuccess, onFailure, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onFailure('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onFailure('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onFailure('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 5000;

    xhr.open(method, url);
    if (data) {
      xhr.send(data);
    } else {
      xhr.send();
    }
  };

  window.backend = {
    load: function (onLoad, onError) {
      request(LOAD_URL, 'GET', onLoad, onError);
    },

    save: function (data, onLoad, onError) {
      request(SEND_URL, 'POST', onLoad, onError, data);
    }
  };
})();
