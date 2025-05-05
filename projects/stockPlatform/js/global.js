'use strict';

import { ripple } from './utils/ripple.js';

const $header = document.querySelector('[data-header]');

window.addEventListener('scroll', () => {
    $header.classList[window.scrollY > 100 ? 'add' : 'remove']('active');
});

const $rippleElems = document.querySelectorAll('[data-ripple]');

$rippleElems.forEach($rippleElem => ripple($rippleElem));