// Фильтрация объявлений
'use strict';

(function () {

  window.filters = function () {
    var filters = document.querySelectorAll('.map__filter');
    var filtersArray = Array.from(filters);
    var filteredAnnouncements = window.data.slice(0);
    var typeSelect = document.querySelector('#housing-type');
    var priceSelect = document.querySelector('#housing-price');
    var roomsSelect = document.querySelector('#housing-rooms');
    var guestsSelect = document.querySelector('#housing-guests');
    var selectedOptions = {
      type: '',
      price: '',
      rooms: '',
      guests: '',
      features: []
    };
    var features = document.querySelectorAll('[name="features"]');
    var featuresArray = Array.from(features);

    // Добавление веса объявлению при наибольшей схожести
    var getRank = function (announcement) {
      var rank = 0;
      if (announcement.offer.type === selectedOptions.type) {
        rank += 1;
        // console.log('Совпал тип');
      }

      if (announcement.offer.price < 10000 && selectedOptions.price === 'low') {
        rank += 1;
        // console.log('Совпала стоимость');
      } else if ((announcement.offer.price >= 10000 || announcement.offer.price < 50000) && selectedOptions.price === 'middle') {
        rank += 2;
        // console.log('Совпала стоимость');
      } else if (announcement.offer.price >= 50000 && selectedOptions.price === 'high') {
        rank += 3;
        // console.log('Совпала стоимость');
      }

      if (+announcement.offer.guests === +selectedOptions.guests) {
        rank += 1;
        // console.log('Совпало количество гостей');
      }

      if (+announcement.offer.rooms === +selectedOptions.rooms) {
        rank += 1;
        // console.log('Совпало количество комнат');
      }
      return rank;
    };

    // Обновление и перерисовка карточек с метками на карте
    var updateAnnouncements = function () {
      var result = filteredAnnouncements.sort(function (left, right) {
        var rangDiff = getRank(right) - getRank(left);
        return rangDiff;
      });
      if (result.length < 5) {
        result = result.concat(window.data);
      }
      window.pin.addAnnouncementsLabelInDOM(result);
      window.card.addAnnouncementsTextInDOM(result);
      // result.forEach(function (it) {
      //   console.log('Тип: - ' +  it.offer.type);
      //   console.log('Цена: - ' +  it.offer.price);
      //   console.log('Комнаты: - ' +  it.offer.rooms);
      //   console.log('Гости: - ' +  it.offer.guests);
      //   console.log('Фичи: - ' +  it.offer.features);
      // });
    };

    // Добавляю изменения в фильтрах в объект текущего состояния фмльтра
    featuresArray.forEach(function (item) {
      item.addEventListener('click', function (evt) {
        if (evt.target.checked) {
          selectedOptions.features.push(evt.target.value);
        } else if (evt.target.checked === false) {
          var filteredFeatures = selectedOptions.features.filter(function (elem) {
            return elem !== evt.target.value;
          });
          selectedOptions.features = filteredFeatures;
        }
        updateAnnouncements();
      });
    });

    typeSelect.addEventListener('change', function (evt) {
      selectedOptions.type = evt.target.options[evt.target.selectedIndex].value;
      updateAnnouncements();
      // console.log(selectedOptions);
    });

    priceSelect.addEventListener('change', function (evt) {
      selectedOptions.price = evt.target.options[evt.target.selectedIndex].value;
      updateAnnouncements();
      // console.log(selectedOptions);
    });

    roomsSelect.addEventListener('change', function (evt) {
      selectedOptions.rooms = evt.target.options[evt.target.selectedIndex].value;
      updateAnnouncements();
      // console.log(selectedOptions);
    });

    guestsSelect.addEventListener('change', function (evt) {
      selectedOptions.guests = evt.target.options[evt.target.selectedIndex].value;
      updateAnnouncements();
      // console.log(selectedOptions);
    });
  };
})();
