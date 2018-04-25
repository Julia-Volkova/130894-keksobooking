// Фильтрация объявлений
'use strict';

(function () {
  var filters = document.querySelectorAll('.map__filter');
  var filtersArray = Array.from(filters);
  var filteredAnnouncements = [];

  var updateAnnouncements = function (evt) {

    window.data.forEach(function (it) {
    });
  };

  filtersArray.forEach(function (element) {
    element.addEventListener('change', updateAnnouncements);
  });


})();
