'use strict';

var ANNOUNCEMENTS_COUNT = 8;
var ANNOUNCEMENTS_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var ANNOUNCEMENTS_TYPE = ['flat', 'house', 'bungalo'];
var ANNOUNCEMENTS_TIME = ['12:00', '13:00', '14:00'];
var ANNOUNCEMENTS_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var ANNOUNCEMENTS_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var announcements = [];
var duplicateAnnouncementTemplate = document.querySelector('template').content;
var dublicateListAnnouncementLabel = document.querySelector('.map__pins');
var MAP = document.querySelector('.map');
var locationX;
var locationY;


var generateRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};


var getRandomNumberWithZero = function (min, max) {
  var random = Math.floor(Math.random() * (max - min + 1)) + min;
  return '0' + random;
};


var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


var setRandomElementInArray = function (array) {
  return array.concat().sort(function () {
    return 0.5 - Math.random();
  });
};


var generateRandomLengthArray = function (features) {
  var newArray = [];
  for (var c = 0; c <= Math.floor(Math.random() * features.length); c++) {
    newArray[c] = generateRandomElement(features);
  }
  return newArray;
};


var generateRandomAnnouncement = function () {
  for (var i = 0; i < ANNOUNCEMENTS_COUNT; i++) {
    locationX = getRandomNumber(300, 900) - document.querySelector('.map__pin img').getAttribute('height') / 2;
    locationY = getRandomNumber(150, 500) - document.querySelector('.map__pin img').getAttribute('height');
    announcements[i] = {
      'author': {
        'avatar': 'img/avatars/user' + getRandomNumberWithZero(1, 8) + '.png'
      },
      'offer': {
        'title': generateRandomElement(ANNOUNCEMENTS_TITLE).toString(),
        'address': locationX + ', ' + locationY,
        'price': getRandomNumber(1000, 1000000),
        'type': generateRandomElement(ANNOUNCEMENTS_TYPE),
        'rooms': getRandomNumber(1, 5),
        'guests': getRandomNumber(1, 15),
        'checkin': generateRandomElement(ANNOUNCEMENTS_TIME),
        'checkout': generateRandomElement(ANNOUNCEMENTS_TIME),
        'features': generateRandomLengthArray(ANNOUNCEMENTS_FEATURES),
        'description': '',
        'photos': setRandomElementInArray(ANNOUNCEMENTS_PHOTOS)
      },
      'location': {
        'x': locationX,
        'y': locationY
      }
    };
  }
  return announcements;
};
generateRandomAnnouncement();


var renderAnnouncement = function (announcement) {
  var announcementElement = duplicateAnnouncementTemplate.querySelector('.map__card').cloneNode(true);
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
  for (var i = 0; i < announcement.offer.features; i++) {
    announcementElement.querySelector('.feature--' + announcement.offer.features[i]).textContent = announcement.offer.features[i];
  }
  announcementElement.querySelector('.popup__description').textContent = announcement.offer.description;
  for (var j = 0; j < announcement.offer.photos; j++) {
    announcementElement.querySelector('.popup__pictures li img').src = announcement.offer.photos[j];
  }
  announcementElement.querySelector('.popup__avatar').src = announcement.author.avatar;
  return announcementElement;
};


var renderAnnouncementLabel = function (announcement) {
  var announcementLabel = duplicateAnnouncementTemplate.querySelector('.map__pin').cloneNode(true);
  announcementLabel.querySelector('img').src = announcement.author.avatar;
  announcementLabel.setAttribute('style', 'left: ' + announcement.location.y + 'px; top: ' + announcement.location.x + 'px;');
  return announcementLabel;
};


var addAnnouncementsTextInDOM = function () {
  var fragment = document.createDocumentFragment();
  generateRandomAnnouncement();
  fragment.appendChild(renderAnnouncement(announcements[0]));
  MAP.insertBefore(fragment, document.querySelector('.map__filters-container'))
};


var addAnnouncementsLabelInDOM = function () {
  var fragmentLabel = document.createDocumentFragment();
  generateRandomAnnouncement();
  for (var j = 0; j < announcements.length; j++) {
    fragmentLabel.appendChild(renderAnnouncementLabel(announcements[j]));
  }
  dublicateListAnnouncementLabel.appendChild(fragmentLabel);
};

addAnnouncementsTextInDOM();
addAnnouncementsLabelInDOM();
