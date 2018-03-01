'use strict';

(function () {
  var createXHR = function (onLoad, onError, url, method, data) {
    var URL = url;
    var xhr = new XMLHttpRequest();
    var SUCCESS = 200;
    var TIMEOUT = 10000;
    xhr.timeout = TIMEOUT;
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open(method, URL);
    xhr.send(data);
  };

  window.backend = {
    load: function (onLoad, onError, url, method) {
      createXHR(onLoad, onError, url, method);
    },
    save: function (onLoad, onError, url, method, data) {
      createXHR(onLoad, onError, url, method, data);
    }
  };
})();
