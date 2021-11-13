'use strict';

window.addEventListener('DOMContentLoaded', () => {
    //=========================================add/render photo
    const btnOpenAddModal = document.querySelector('[data-function="open-modal"]'),
        modal = document.querySelector('.modal'),
        modalMessage = modal.querySelector('.modal__message'),
        modalForm = modal.querySelector('.modal__form'),
        inputUrl = modalForm.querySelector('[data-input="url"]'),
        inputName = modalForm.querySelector('[data-input="name"]'),
        emptyBlock = document.querySelector('.main__empty'),
        gallery = document.querySelector('.main__wrapper'),
        fullPhoto = document.querySelector('.full-photo');

    function firstRenderPhoto() {
        if (Object.keys({...localStorage}).length !== 0) {
            emptyBlock.style.display = 'none';
            let data = {};
            Object.keys({...localStorage}).sort().forEach(key => {
                data[key] = {...localStorage}[key];
                return data;
            });
            for (let name in data) {
                renderPhoto(name, data[name]);
            }
        }
    }

    firstRenderPhoto();

    function renderPhoto(name, url) {
        if (Object.keys({...localStorage}).length !== 0) {
            emptyBlock.style.display = 'none';
        }
        const item = document.createElement('div');
        item.classList.add('main__item');
        item.innerHTML = `
        <div class="main__photo">
            <img src="${url}" alt="photo">
        </div>
        <div class="main__name"><p>${name}</p></div> 
        `;
        gallery.appendChild(item);
    }

    function addPhoto(name, url) {
        const conditions = [null, undefined, ''];
        if (!conditions.includes(name) && !conditions.includes(url)) {
            if (!Object.keys({...localStorage}).includes(name)) {
                localStorage.setItem(name, url);
                renderPhoto(name, url);
                return true;
            } else {
                return false;
            }
        } return false;
    }

    function openModal(modalSelector, activeClass) {
        modalSelector.classList.add(activeClass);
    }

    function closeModal(modalSelector, activeClass) {
        modalSelector.classList.remove(activeClass);
    }

    btnOpenAddModal.addEventListener('click', (e) => {
        modalForm.reset();
        modalMessage.innerText = '';
        openModal(modal, 'modal_active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target.matches('.modal') || e.target.matches('.close')) {
            closeModal(modal, 'modal_active');
        }
    });

    modalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (addPhoto(inputName.value.toUpperCase(), inputUrl.value)) {
            closeModal(modal, 'modal_active');
        } else {
            modalMessage.innerText = 'That name is taken!';
        }
    });

    //=========================================open full photo
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

    //=========================================close popup by esc
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && fullPhoto.classList.contains('full-photo_active')) {
            closeModal(fullPhoto, 'full-photo_active');
        }
        if (e.code === 'Escape' && modal.classList.contains('modal_active')) {
            closeModal(modal, 'modal_active');
        }
    });
    
}); 