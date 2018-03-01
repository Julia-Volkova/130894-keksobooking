// Создание и отрисовка метки
'use strict';

(function () {
  // Копирование разметки метки
  var renderAnnouncementLabel = function (announcement) {
    var announcementLabel = window.card.duplicateAnnouncementTemplate.querySelector('.map__pin').cloneNode(true);
    announcementLabel.querySelector('img').src = announcement.author.avatar;
    announcementLabel.setAttribute('style', 'left: ' + announcement.location.y + 'px; top: ' + announcement.location.x + 'px;');
    return announcementLabel;
  };

  window.pin = {
    dublicateListAnnouncementLabel: document.querySelector('.map__pins'),

    // Добавление 8ми меток объявлений в дерево на основе данных с сервера
    addAnnouncementsLabelInDOM: function () {
      var successHandler = function (pins) {
        var fragmentLabel = document.createDocumentFragment();
        for (var i = 0; i < pins.length; i++) {
          fragmentLabel.appendChild(renderAnnouncementLabel(pins[i]));
        }
        window.pin.dublicateListAnnouncementLabel.appendChild(fragmentLabel);
      };
      var errorHandler = function (errorMessage) {
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

      window.backend.load(successHandler, errorHandler, 'https://js.dump.academy/keksobooking/data', 'GET');
    }
  };
})();
