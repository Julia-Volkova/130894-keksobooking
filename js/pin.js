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

    // Добавление 5ти меток объявлений в дерево на основе данных с сервера или выбранных фильтров
    addAnnouncementsLabelInDOM: function (announcements) {
      var fragmentLabel = document.createDocumentFragment();
      for (var i = 0; i <= 5; i++) {
        if (announcements[i]) {
          fragmentLabel.appendChild(renderAnnouncementLabel(announcements[i]));
        }
      }

      window.pin.ListAnnouncementLabel.appendChild(fragmentLabel);
    }
  };
})();
