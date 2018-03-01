// Создание и отрисовка карточки
'use strict';

(function () {
  // Копирование разметки карточки объявления
  var renderAnnouncement = function (announcement) {
    var announcementElement = window.card.duplicateAnnouncementTemplate.querySelector('.map__card').cloneNode(true);
    announcementElement.className = 'map__card popup hidden';
    announcementElement.querySelector('h3').textContent = announcement.offer.title;
    announcementElement.querySelector('small').textContent = announcement.offer.address;
    announcementElement.querySelector('.popup__price').textContent = announcement.offer.price + ' ₽/Ночь';
    if (announcement.offer.type === 'flat') {
      announcementElement.querySelector('h4').textContent = 'Квартира';
    } else if (announcement.offer.type === 'bungalo') {
      announcementElement.querySelector('h4').textContent = 'Бунгало';
    } else {
      announcementElement.querySelector('h4').textContent = 'Дом';
    }
    announcementElement.querySelector('.popup__rooms').textContent = announcement.offer.rooms + ' комнаты для ' + announcement.offer.guests + ' гостей';
    announcementElement.querySelector('.popup__time').textContent = 'Заезд после ' + announcement.offer.checkin + ' , выезд до ' + announcement.offer.checkout;

    var features = announcementElement.querySelector('.popup__features');
    var featureItems = announcementElement.querySelectorAll('.popup__features li');
    for (var a = 0; a < featureItems.length; a++) {
      features.removeChild(featureItems[a]);
    }

    for (var i = 0; i < announcement.offer.features.length; i++) {
      var li = document.createElement('li');
      li.className = 'feature feature--' + announcement.offer.features[i];
      features.appendChild(li);
    }

    announcementElement.querySelector('.popup__description').textContent = announcement.offer.description;

    var photos = announcementElement.querySelector('.popup__pictures');
    var photoItem = announcementElement.querySelector('.popup__pictures li');
    photos.removeChild(photoItem);
    for (var j = 0; j < announcement.offer.photos.length; j++) {
      var newLi = document.createElement('li');
      var newImg = document.createElement('img');
      newImg.src = announcement.offer.photos[j];
      newImg.width = 80;
      newImg.height = 60;
      newLi.appendChild(newImg);
      photos.appendChild(newLi);
    }

    announcementElement.querySelector('.popup__avatar').src = announcement.author.avatar;
    return announcementElement;
  };

  window.card = {
    duplicateAnnouncementTemplate: document.querySelector('template').content,
    addAnnouncementsTextInDOM: function () {
      var successHandler = function (cards) {
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < cards.length; i++) {
          fragment.appendChild(renderAnnouncement(cards[i]));
        }
        window.map.workspace.insertBefore(fragment, document.querySelector('.map__filters-container'));
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
