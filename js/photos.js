'use strict';

(function () {
  var sourceElement = document.querySelector('.ad-form__upload input[type=file]');
  var photosContainer = document.querySelector('.ad-form__photo-container');


  sourceElement.addEventListener('change', function () {
    var files = sourceElement.files;

    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      var fileName = file.name.toLowerCase();

      var matches = window.utils.IMAGE_FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          var photoElement = document.querySelector('.ad-form__photo');
          var targetElement;
          if (photoElement.style.backgroundImage === '') {
            targetElement = photoElement;
          } else {
            targetElement = document.createElement('div');
            targetElement.classList.add('ad-form__photo');
            photoElement.parentNode.appendChild(targetElement);
          }
          targetElement.setAttribute('draggable', true);
          targetElement.style.backgroundImage = 'url(' + reader.result + ')';
        });

        reader.readAsDataURL(file);
      }
    }
  });

  var draggableItem;

  photosContainer.addEventListener('dragstart', function (evt) {
    if (evt.target.classList.contains('ad-form__photo')) {
      draggableItem = evt.target;
    }
  });

  photosContainer.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    if (evt.target.classList.contains('ad-form__photo')) {
      evt.target.style.border = '2px solid #ff0000';
    }
  });

  photosContainer.addEventListener('dragleave', function (evt) {
    evt.preventDefault();
    if (evt.target.classList.contains('ad-form__photo')) {
      evt.target.style.border = 'none';
    }
  });

  photosContainer.addEventListener('drop', function (evt) {
    evt.preventDefault();
    if (evt.target.classList.contains('ad-form__photo')) {
      photosContainer.insertBefore(draggableItem, evt.target);
      evt.target.style.border = 'none';
    }
  });


})();
