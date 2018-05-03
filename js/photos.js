'use strict';

(function () {
  var sourceElement = document.querySelector('.ad-form__upload input[type=file]');

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
          targetElement.style.backgroundImage = 'url(' + reader.result + ')';
        });

        reader.readAsDataURL(file);
      }
    }
  });
})();
