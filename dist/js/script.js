'use strict';

window.addEventListener('DOMContentLoaded', () => {
    

    function openPhoto(gallerySelector, fullPhotoSelector, activeClass) {
        const gallery = document.querySelector(gallerySelector),
            fullPhoto = document.querySelector(fullPhotoSelector);
            
        gallery.addEventListener('click', (e) => {
            if (e.target.matches('img')) {
                fullPhoto.querySelector('img').src = e.target.src;
                fullPhoto.classList.add(activeClass);
            }
        });
    }

    openPhoto('.main__wrapper', '.full-photo', 'full-photo_active');
}); 