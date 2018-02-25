// Source data
'use strict';

(function () {
  window.announcements = [];

  var ANNOUNCEMENTS_COUNT = 8;
  var ANNOUNCEMENT_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var ANNOUNCEMENT_TYPES = ['flat', 'house', 'bungalo'];
  var ANNOUNCEMENTS_TIME = ['12:00', '13:00', '14:00'];
  var ANNOUNCEMENTS_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var ANNOUNCEMENTS_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var locationX;
  var locationY;
  var EMPTY_SPACE_ON_MAP = 150;
  var LABEL_WIDTH = 50;
  var LABEL_HEIGHT = 70;

  // Вспомогательные функции
  var generateRandomElement = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
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
      var featuresItem = generateRandomElement(features);
      if (newArray.indexOf(featuresItem) !== -1) {
        continue;
      }
      newArray.push(featuresItem);
    }
    return newArray;
  };

  // Генерация рандомных объектов объявлений в массив (8)
  var generateRandomAnnouncement = function () {
    for (var i = 0; i < ANNOUNCEMENTS_COUNT; i++) {
      locationX = getRandomNumber(300, 900) + LABEL_WIDTH / 2;
      locationY = getRandomNumber(150, 500) + LABEL_HEIGHT - EMPTY_SPACE_ON_MAP;
      window.announcements[i] = {
        'author': {
          'avatar': 'img/avatars/user0' + getRandomNumber(1, 8) + '.png'
        },
        'offer': {
          'title': generateRandomElement(ANNOUNCEMENT_TITLES),
          'address': locationX + ', ' + locationY,
          'price': getRandomNumber(1000, 1000000),
          'type': generateRandomElement(ANNOUNCEMENT_TYPES),
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
    return window.announcements;
  };

  // Геренация массива объявлений и добавление всех элементов в дерево
  window.announcements = generateRandomAnnouncement();
})();
