// Создание и отрисовка метки
'use strict';

(function () {
  // Копирование разметки метки
  var renderAnnouncementLabel = function (announcement) {
    var announcementLabel = window.card.AnnouncementTemplate.querySelector('.map__pin').cloneNode(true);
    announcementLabel.querySelector('img').src = announcement.author.avatar;
    announcementLabel.setAttribute('style', 'left: ' + announcement.location.y + 'px; top: ' + announcement.location.x + 'px;');
    return announcementLabel;
  };

  window.pin = {
    ListAnnouncementLabel: document.querySelector('.map__pins'),

    // Добавление 8ми меток объявлений в дерево на основе данных с сервера
    addAnnouncementsLabelInDOM: function () {
      var fragmentLabel = document.createDocumentFragment();
      window.data.forEach(function (it) {
        fragmentLabel.appendChild(renderAnnouncementLabel(it));
      });
      window.pin.ListAnnouncementLabel.appendChild(fragmentLabel);
    }
  };
})();
