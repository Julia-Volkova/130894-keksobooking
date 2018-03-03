'use strict';

(function () {
  var SUCCESS = 200;
  var TIMEOUT = 10000;
  var xhr = new XMLHttpRequest();

  var createXHR = function (onLoad, onError) {
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
  };

  window.backend = {
    load: function (onLoad, onError) {
      createXHR(onLoad, onError);
      xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      createXHR(data, onLoad, onError);
      xhr.open('POST', 'https://js.dump.academy/keksobooking');
      xhr.send(data);
    }
  };
})();
