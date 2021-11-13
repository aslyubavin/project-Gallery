'use strict';

window.addEventListener('DOMContentLoaded', () => {
    //=========================================add/render/delete photo
    const btnOpenAddModal = document.querySelector('[data-button="add-photo"]'),
        modalAdd = document.querySelector('[data-modal="add-photo"]'),
        modalMessage = modalAdd.querySelector('.modal__message'),
        modalForm = modalAdd.querySelector('.modal__form'),
        inputUrl = modalForm.querySelector('[data-input="url"]'),
        inputName = modalForm.querySelector('[data-input="name"]'),
        btnOpenDeleteAllModal = document.querySelector('[data-button="delete-all-photos"]'),
        modalDeleteAll = document.querySelector('[data-modal="delete-all-photos"]'),
        btnCancelDeleteAll = document.querySelector('[data-button="cancel-delete-all-photos"]'),
        btnConfirmDeleteAll = document.querySelector('[data-button="confirm-delete-all-photos"]'),
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
        item.setAttribute('data-name', name);
        item.innerHTML = `
        <div class="main__photo">
            <img src="${url}" alt="photo">
            <span class="icon-delete" data-button="delete-photo"></span>
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

    btnOpenAddModal.addEventListener('click', () => {
        modalForm.reset();
        modalMessage.innerText = '';
        openModal(modalAdd, 'modal_active');
        modalForm.addEventListener('submit', (e) => {
            if (addPhoto(inputName.value.toUpperCase(), inputUrl.value)) {
                closeModal(modalAdd, 'modal_active');
            } else {
                e.preventDefault();
                modalMessage.innerText = 'That name is taken!';
            }
        });
        modalAdd.addEventListener('click', (e) => {
            if (e.target.matches('.modal') || e.target.matches('.close')) {
                closeModal(modalAdd, 'modal_active');
            }
        });
    });

    btnOpenDeleteAllModal.addEventListener('click', () => {
        openModal(modalDeleteAll, 'modal_active');
        btnCancelDeleteAll.addEventListener('click', () => {
            closeModal(modalDeleteAll, 'modal_active');
        });
        btnConfirmDeleteAll.addEventListener('click', () => {
            localStorage.clear();
            gallery.innerHTML = '';
            emptyBlock.style.display = 'block';
            closeModal(modalDeleteAll, 'modal_active');
        });
        modalDeleteAll.addEventListener('click', (e) => {
            if (e.target.matches('.modal') || e.target.matches('.close')) {
                closeModal(modalDeleteAll, 'modal_active');
            }
        });
    });


    //=========================================open full photo
    gallery.addEventListener('click', (e) => {
        if (e.target.matches('img')) {
            fullPhoto.querySelector('img').src = e.target.src;
            openModal(fullPhoto, 'full-photo_active');
        }
        if (e.target.matches('[data-button="delete-photo"]')) {
            const item = e.target.parentElement.parentElement;
            item.remove();
            localStorage.removeItem(item.getAttribute('data-name'));
            if (Object.keys({...localStorage}).length === 0) {
                emptyBlock.style.display = 'block';
            }
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
        if (e.code === 'Escape' && modalAdd.classList.contains('modal_active')) {
            closeModal(modalAdd, 'modal_active');
        }
        if (e.code === 'Escape' && modalDeleteAll.classList.contains('modal_active')) {
            closeModal(modalDeleteAll, 'modal_active');
        }
    });
    
}); 