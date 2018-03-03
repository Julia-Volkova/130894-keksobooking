'use strict';

(function () {
  window.errorMessage = function (message) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.style.padding = '30px 0';
    node.textContent = message;
    document.body.insertAdjacentElement('afterbegin', node);
  };
})();
