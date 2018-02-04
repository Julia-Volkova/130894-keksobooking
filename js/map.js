'use strict';

var ANNOUNCEMENTS_COUNT = 8;
var ANNOUNCEMENTS_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var ANNOUNCEMENTS_TYPE = ['flat', 'house', 'bungalo'];
var ANNOUNCEMENTS_TIME = ['12:00', '13:00', '14:00'];
var ANNOUNCEMENTS_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var ANNOUNCEMENTS_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var announcements = [];
var duplicateAnnouncementTemplate = document.querySelector('#duplicate-announcement-template').content;
var dublicateListAnnouncementElement = document.querySelector('.map__pins');

// Получаю рандомный элемент массива
var generateRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Получаю рандомный элемент массива c нулем вначале
var getRandomNumberWithZero = function (min, max) {
  var random = Math.floor(Math.random() * (max - min + 1)) + min;
  return '0' + random;
};

// Генерация случайного числа от ... до ...
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


// Случайный порядок элементов в массиве
var setRandomElementInArray = function (array) {
  return array.concat().sort(function () {
    return 0.5 - Math.random();
  });
};

// Генерация случайного размера массива на основе конкретного массива
var generateRandomLengthArray = function (features) {
  var newArray = [];
  for (var c = 0; c <= Math.floor(Math.random() * features.length); c++) {
    newArray[c] = generateRandomElement(features);
  }
  return newArray;
};

// Генерация одного объявления и добавление в массив
var generateRandomAnnouncement = function () {
  for (var i = 0; i < ANNOUNCEMENTS_COUNT; i++) {
    var locationX = getRandomNumber(300, 900) - document.querySelector('.map__pin img').getAttribute('height') / 2;
    var locationY = getRandomNumber(150, 500) - document.querySelector('.map__pin img').getAttribute('height');
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

// Копирование из шаблона во фрагмент и занесение в DOM
var renderAnnouncement = function (announcement) {
  var announcementElement = duplicateAnnouncementTemplate.cloneNode(true);
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
    announcementElement.querySelector('.popup__pictures li img').setAttribute('src', announcement.offer.photos[j]);
  }
  announcementElement.querySelector('.popup__avatar').setAttribute('src', announcement.author.avatar);
  announcementElement.querySelector('.map__pin img').src = announcement.author.avatar;
  announcementElement.querySelector('.map__pin img').style.left = announcement.location.x;
  announcementElement.querySelector('.map__pin img').style.top = announcement.location.y;
  return announcementElement;
};

var renderAnnouncementLabel = function (announcement) {
  var announcementElement = duplicateAnnouncementTemplate.cloneNode(true);
  announcementElement.querySelector('.map__pin img').src = announcement.author.avatar;
  announcementElement.querySelector('.map__pin img').style.left = announcement.location.x;
  announcementElement.querySelector('.map__pin img').style.top = announcement.location.y;
  return announcementElement;
};

var addAnnouncementsInDOM = function () {
  var fragment = document.createDocumentFragment();
  generateRandomAnnouncement();
  // for (var j = 0; j < announcements.length; j++) {
  fragment.appendChild(renderAnnouncement(announcements[0]));
  // }
  dublicateListAnnouncementElement.appendChild(fragment);
  document.querySelector('.map').insertBefore(dublicateListAnnouncementElement, document.querySelector('.map__filters-container'))
};

addAnnouncementsInDOM();
