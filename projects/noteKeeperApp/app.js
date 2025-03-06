'use strict';

import { addEventOnElements } from "./utils.js";

const $sidebar = document.querySelector('[data-sidebar]');
const $sidebarTogglers = document.querySelectorAll('[data-sidebar-toggler]');
const $overlay = document.querySelector('[data-sidebar-overlay]');

addEventOnElements($sidebarTogglers, 'click', function(){
    $sidebar.classList.toggle('active');
    $overlay.classList.toggle('active');
})