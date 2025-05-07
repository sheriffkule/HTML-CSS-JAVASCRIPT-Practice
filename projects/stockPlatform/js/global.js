'use strict';

import { addEventOnElements } from './utils/event.js';
import { ripple } from './utils/ripple.js';

const $header = document.querySelector('[data-header]');

window.addEventListener('scroll', () => {
    $header.classList[window.scrollY > 100 ? 'add' : 'remove']('active');
});

const $rippleElems = document.querySelectorAll('[data-ripple]');

$rippleElems.forEach($rippleElem => ripple($rippleElem));

const $navTogglers = document.querySelectorAll('[data-nav-toggler]');
const $navbar = document.querySelector('[data-navigation]');
const $scrim = document.querySelector('[data-scrim]');

addEventOnElements($navTogglers, 'click', function() {
    $navbar.classList.toggle('show');
    $scrim.classList.toggle('active');
})

window.filterObj = {};

if (!window.localStorage.getItem('favorite')) {
    const favoriteObj = {
        photos: {},
        videos: {}
    }

    window.localStorage.setItem('favorite', JSON.stringify(favoriteObj))
}