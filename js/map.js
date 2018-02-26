'use strict';

(function () {
  window.map = {
    workspace: document.querySelector('.map'),
    noticeForm: document.querySelector('.notice__form')
  };

  var mainPin = document.querySelector('.map__pin--main');
  var pinsLabels = '';
  var pinsLabelsArray = [];
  var pinsCards = '';
  var pinsCardsArray = [];
  var fieldset = window.map.noticeForm.querySelectorAll('fieldset');
  var fieldsetArray = Array.from(fieldset);
  var isRenderAnnouncements = false;
  var resetForm = window.map.noticeForm.querySelector('.form__reset');
  var adressInput = document.querySelector('#address');
  var filters = window.map.workspace.querySelector('.map__filters-container');
  var MAP_BORDER_TOP = 135;
  var MAIN_PIN_PADDING = 20;
  var LABEL_WIDTH = 50;
  var LABEL_HEIGHT = 70;

  // Активация карты
  var goToActiveMapState = function () {
    window.map.workspace.classList.remove('map--faded');
    window.map.noticeForm.classList.remove('notice__form--disabled');
    fieldsetArray.forEach(function (item) {
      item.removeAttribute('disabled');
    });
  };

  // Закрытие текущей карточки объявления
  var closeCurrentCard = function () {
    pinsCardsArray.forEach(function (item) {
      if (!item.classList.contains('hidden')) {
        var closeBtn = item.querySelector('.popup__close');
        closeBtn.addEventListener('click', function () {
          item.classList.add('hidden');
        });
      }
    });
  };

  // Просмотр карточки объявления по клику на метку
  var showCurrentCard = function () {
    pinsLabelsArray.forEach(function (item, index) {
      item.addEventListener('click', function () {
        pinsCardsArray.forEach(function (elem) {
          if (!elem.classList.contains('hidden')) {
            elem.classList.add('hidden');
          }
        });
        pinsCardsArray[index].classList.remove('hidden');
        closeCurrentCard();
      });
    });
  };

  // Определяю координату главной метки неактивной карты и записываю в строку адреса
  var setCurrentAddressNotActive = function (element) {
    var coordX = element.offsetLeft;
    var coordY = element.offsetTop;
    adressInput.value = coordX + ', ' + coordY;
  };
  setCurrentAddressNotActive(mainPin);

  // Определяю координату главной метки активной карты и записываю в строку адреса
  var setCurrentAddressActive = function (element) {
    var coordX = element.offsetLeft + LABEL_WIDTH / 2;
    var coordY = element.offsetTop + LABEL_HEIGHT;
    adressInput.value = coordX + ', ' + coordY;
  };

  // Поиск элементов после активации карты
  var searchElements = function () {
    pinsLabels = window.pin.dublicateListAnnouncementLabel.querySelectorAll('.map__pin');
    pinsLabelsArray = Array.from(pinsLabels);
    pinsLabelsArray.forEach(function (item, index) {
      if (item.classList.contains('map__pin--main')) {
        pinsLabelsArray.splice(index, 1);
      }
    });

    pinsCards = window.map.workspace.querySelectorAll('.map__card');
    pinsCardsArray = Array.from(pinsCards);
  };

  // Перетаскивания главной метки и выбор карточки по клику
  var mainPinMoveHandler = function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      if (mainPin.offsetTop > MAP_BORDER_TOP) {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      } else {
        mainPin.style.top = (MAP_BORDER_TOP + 1) + 'px';
      }
      if (mainPin.offsetTop > window.map.workspace.offsetHeight - filters.offsetHeight - (mainPin.offsetHeight - MAIN_PIN_PADDING)) {
        mainPin.style.top = (window.map.workspace.offsetHeight - filters.offsetHeight - (mainPin.offsetHeight - MAIN_PIN_PADDING) - 1) + 'px';
      }

      if (mainPin.offsetLeft > mainPin.offsetWidth / 2) {
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      } else {
        mainPin.style.left = (mainPin.offsetWidth / 2 + 1) + 'px';
      }
      if (mainPin.offsetLeft > window.map.workspace.offsetWidth - mainPin.offsetWidth / 2) {
        mainPin.style.left = (window.map.workspace.offsetWidth - (mainPin.offsetWidth / 2 + 1)) + 'px';
      }
      setCurrentAddressActive(mainPin);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      setCurrentAddressActive(mainPin);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    goToActiveMapState();
    if (isRenderAnnouncements === false) {
      window.pin.addAnnouncementsLabelInDOM();
      window.card.addAnnouncementsTextInDOM();
    }
    isRenderAnnouncements = true;

    setTimeout(function () {
      searchElements();
      showCurrentCard();
    }, 1000);
  };
  mainPin.addEventListener('mousedown', mainPinMoveHandler);

  // Возвращение карты в исходное состояние
  var goToSourceMapState = function () {
    window.map.noticeForm.reset();
    window.map.workspace.classList.add('map--faded');
    window.map.noticeForm.classList.add('notice__form--disabled');
    fieldsetArray.forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
    });

    pinsCards.forEach(function (item) {
      window.map.workspace.removeChild(item);
    });

    for (var i = 1; i < pinsLabels.length; i++) {
      pinsLabels[i].remove();
    }

    isRenderAnnouncements = false;
    mainPin.removeAttribute('style');
  };

  // Сброс карты в исходное состояние
  resetForm.addEventListener('click', goToSourceMapState);

  // Отправка данных о новом объявлении на сервер и ресет формы
  var successLoad = function () {
    window.map.noticeForm.reset();
    window.map.noticeForm.classList.add('notice__form--disabled');
    fieldsetArray.forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
    });
  };

  var errorLoad = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.style.padding = '30px 0';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.map.noticeForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(window.map.noticeForm), successLoad, errorLoad);
  });
})();
