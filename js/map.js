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

  // Определяю координату метки и записываю в строку адреса
  var setCurrentAddress = function (element) {
    var coordX = element.offsetLeft;
    var coordY = element.offsetTop;
    adressInput.value = coordX + ', ' + coordY;
  };
  setCurrentAddress(mainPin);

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

  // Эмитация перетаскивания главной метки и выбор карточки по клику
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
      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      setCurrentAddress(mainPin);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      setCurrentAddress(mainPin);
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

    searchElements();
    showCurrentCard();
  };
  mainPin.addEventListener('mousedown', mainPinMoveHandler);

  // Возвращение карты в исходное состояние
  var goToSourceMapState = function () {
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
})();
