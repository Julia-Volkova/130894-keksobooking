// Source data
'use strict';

(function () {
  // Подгрузка данных с сервера
  var onLoad = function (data) {
    window.data = data;
  };

  var onError = function (message) {
    window.errorMessage(message);
  };

  window.backend.load(onLoad, onError);
})();
