// Validate form
'use strict';

(function () {
  var validateForm = function () {
    var timein = window.map.noticeForm.querySelector('#timein');
    var timeout = window.map.noticeForm.querySelector('#timeout');
    var realtyType = window.map.noticeForm.querySelector('#type');
    var realtyCostPerNight = window.map.noticeForm.querySelector('#price');
    var roomsCount = window.map.noticeForm.querySelector('#room_number');
    var guestsCount = window.map.noticeForm.querySelector('#capacity');

    var selectChangeTimeSettlementsHandler = function (time, evt) {
      var selectedOptionValue = evt.target.options[evt.target.selectedIndex].value;
      for (var j = 0; j < time.options.length; j++) {
        if (time.options[j].value === selectedOptionValue) {
          time.selectedIndex = j;
        }
      }
    };

    timeout.addEventListener('change', function (evt) {
      selectChangeTimeSettlementsHandler(timein, evt);
    });
    timein.addEventListener('change', function (evt) {
      selectChangeTimeSettlementsHandler(timeout, evt);
    });

    // Проверка цены в зависимости от типа жилья
    var inputKeydownRealtyCostHandler = function () {
      var value = +realtyCostPerNight.value;
      var attr = +realtyCostPerNight.getAttribute('min');
      if (value < attr) {
        realtyCostPerNight.setCustomValidity('Значение не должно быть меньше ' + (attr).toLocaleString('ru'));
      } else {
        realtyCostPerNight.setCustomValidity('');
      }
    };

    var realtyTypeObject = {
      bungalo: 0,
      flat: 1000,
      house: 5000,
      palace: 10000
    };

    var selectChangeRealtyTypeHandler = function () {
      realtyCostPerNight.setAttribute('min', '0');
      var selectedOptionValue = realtyType.options[realtyType.selectedIndex].value;
      for (var i in realtyTypeObject) {
        if (selectedOptionValue === i) {
          realtyCostPerNight.setAttribute('min', realtyTypeObject[i].toString());
          inputKeydownRealtyCostHandler();
        }
      }
    };
    selectChangeRealtyTypeHandler();

    realtyType.addEventListener('change', selectChangeRealtyTypeHandler);
    realtyCostPerNight.addEventListener('blur', inputKeydownRealtyCostHandler);


    // Установка зависимости кол-ва гостей от кол-ва комнат
    var selectChangeGuestsCountHandler = function () {
      var guestsSelectedOption = guestsCount[guestsCount.selectedIndex];
      if (guestsSelectedOption.disabled === false) {
        guestsCount.setCustomValidity('');
      }
    };

    var selectChangeRoomsCountHandler = function () {
      var selectedOptionValue = roomsCount[roomsCount.selectedIndex].value;
      var guestsOptionArray = Array.from(guestsCount.options);
      var guestsData = {
        1: [1],
        2: [1, 2],
        3: [1, 2, 3],
        100: [0]
      };

      guestsOptionArray.forEach(function (option) {
        var roomCountArray = guestsData[selectedOptionValue];
        if (roomCountArray.indexOf(+option.value) !== -1) {
          option.disabled = false;
        } else {
          option.disabled = true;
        }
      });
      guestsCount.setCustomValidity('Количество гостей не поместится в стольких комнатах, выберите другой вариант');
      selectChangeGuestsCountHandler();
    };
    selectChangeRoomsCountHandler();

    var validateFieldsHandler = function () {
      roomsCount.className = 'js-validate';
      guestsCount.className = 'js-validate';
    };

    roomsCount.addEventListener('change', selectChangeRoomsCountHandler);
    roomsCount.addEventListener('focus', validateFieldsHandler);
    guestsCount.addEventListener('change', selectChangeGuestsCountHandler);
  };
  validateForm();
})();
