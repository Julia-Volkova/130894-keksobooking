// Validate form
'use strict';

(function () {
  var timein = window.map.noticeForm.querySelector('#timein');
  var timeout = window.map.noticeForm.querySelector('#timeout');
  var realtyType = window.map.noticeForm.querySelector('#type');
  var realtyCostPerNight = window.map.noticeForm.querySelector('#price');
  var roomsCount = window.map.noticeForm.querySelector('#room_number');
  var guestsCount = window.map.noticeForm.querySelector('#capacity');
  var REALTY_TYPE_OBJECT = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };
  var GUESTS_DATA = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  var selectChangeTimeSettlementsHandler = function (time, evt) {
    var selectedOptionValue = evt.target.options[evt.target.selectedIndex].value;
    for (var j = 0; j < time.options.length; j++) {
      if (time.options[j].value === selectedOptionValue) {
        time.selectedIndex = j;
        return;
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

  var selectChangeRealtyTypeHandler = function () {
    realtyCostPerNight.setAttribute('min', '0');
    var selectedOptionValue = realtyType.options[realtyType.selectedIndex].value;
    for (var i in REALTY_TYPE_OBJECT) {
      if (selectedOptionValue === i) {
        realtyCostPerNight.setAttribute('min', REALTY_TYPE_OBJECT[i].toString());
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
    if (guestsSelectedOption.disabled === true) {
      guestsCount.setCustomValidity('Количество гостей не поместится в стольких комнатах, выберите другой вариант');
    } else {
      guestsCount.setCustomValidity('');
    }
  };

  var selectChangeRoomsCountHandler = function () {
    var selectedOptionValue = roomsCount[roomsCount.selectedIndex].value;
    var guestsOptionArray = Array.from(guestsCount.options);

    guestsOptionArray.forEach(function (option) {
      var roomCountArray = GUESTS_DATA[selectedOptionValue];
      if (roomCountArray.indexOf(+option.value) !== -1) {
        option.disabled = false;
      } else {
        option.disabled = true;
      }
    });
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
})();
