// Создание и отрисовка метки
'use strict';

(function () {
  window.pin = {
    dublicateListAnnouncementLabel: document.querySelector('.map__pins'),
    // Добавление 8ми меток объявлений в дерево
    addAnnouncementsLabelInDOM: function () {
      var fragmentLabel = document.createDocumentFragment();
      for (var j = 0; j < window.announcements.length; j++) {
        fragmentLabel.appendChild(renderAnnouncementLabel(window.announcements[j]));
      }
      window.pin.dublicateListAnnouncementLabel.appendChild(fragmentLabel);
    }
  };

  // Копирование разметки метки
  var renderAnnouncementLabel = function (announcement) {
    var announcementLabel = window.card.duplicateAnnouncementTemplate.querySelector('.map__pin').cloneNode(true);
    announcementLabel.querySelector('img').src = announcement.author.avatar;
    announcementLabel.setAttribute('style', 'left: ' + announcement.location.y + 'px; top: ' + announcement.location.x + 'px;');
    return announcementLabel;
  };
})();
