'use strict';

(function () {
  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var SEND_URL = 'https://js.dump.academy/keksobooking';

  window.backend = {
    load: function (onLoad, onError) {
      window.utils.request({
        url: LOAD_URL,
        method: 'GET',
        onSuccess: onLoad,
        onFailure: onError
      });
    },

    save: function (data, onLoad, onError) {
      window.utils.request({
        url: SEND_URL,
        method: 'POST',
        onSuccess: onLoad,
        onFailure: onError,
        data: data
      });
    }
  };
})();
