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
        
        function closePhoto(e) {
            let target = e.target;
            if (target.matches(fullPhotoSelector) || target.matches('.close')) {
                fullPhoto.classList.remove(activeClass);
            }
        }

        function closePhotoByEsc(e) {
            let code = e.code;
            if (code === 'Escape' && fullPhoto.classList.contains(activeClass)) {
                fullPhoto.classList.remove(activeClass);
            }
        }

        fullPhoto.addEventListener('click', closePhoto);
        document.addEventListener('keydown', closePhotoByEsc); 
    }

    openPhoto('.main__wrapper', '.full-photo', 'full-photo_active');

}); 