'use strict';

window.addEventListener('DOMContentLoaded', () => {
    const gallery = document.querySelector('.main__wrapper'),
        fullPhoto = document.querySelector('.full-photo');

    function openModal(modalSelector, activeClass) {
        modalSelector.classList.add(activeClass);
    }

    function closeModal(modalSelector, activeClass) {
        modalSelector.classList.remove(activeClass);
    }

    gallery.addEventListener('click', (e) => {
        if (e.target.matches('img')) {
            fullPhoto.querySelector('img').src = e.target.src;
            openModal(fullPhoto, 'full-photo_active');
        }
    });

    fullPhoto.addEventListener('click', (e) => {
        if (e.target.matches('.full-photo') || e.target.matches('.close')) {
            closeModal(fullPhoto, 'full-photo_active');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && fullPhoto.classList.contains('full-photo_active')) {
            closeModal(fullPhoto, 'full-photo_active');
        }
    });

    // function openPhoto1(gallerySelector, fullPhotoSelector, activeClass) {
    //     const gallery = document.querySelector(gallerySelector),
    //         fullPhoto = document.querySelector(fullPhotoSelector);
            
    //     gallery.addEventListener('click', (e) => {
    //         if (e.target.matches('img')) {
    //             fullPhoto.querySelector('img').src = e.target.src;
    //             fullPhoto.classList.add(activeClass);
    //         }
    //     });
        
    //     function closePhoto(e) {
    //         let target = e.target;
    //         if (target.matches(fullPhotoSelector) || target.matches('.close')) {
    //             fullPhoto.classList.remove(activeClass);
    //         }
    //     }

    //     function closePhotoByEsc(e) {
    //         let code = e.code;
    //         if (code === 'Escape' && fullPhoto.classList.contains(activeClass)) {
    //             fullPhoto.classList.remove(activeClass);
    //         }
    //     }

    //     fullPhoto.addEventListener('click', closePhoto);
    //     document.addEventListener('keydown', closePhotoByEsc); 
    // }

    // openPhoto('.main__wrapper', '.full-photo', 'full-photo_active');

}); 