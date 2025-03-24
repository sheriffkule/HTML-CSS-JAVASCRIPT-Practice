'use strict';

const $accordions = document.querySelectorAll('[data-accordion]');
const initAccordion = function ($element) {
  const $button = $element.querySelector('[data-accordion-btn]');
  let isExpanded = false;

  $button.addEventListener('click', function () {
    isExpanded = isExpanded ? false : true;
    this.setAttribute('aria-expanded', isExpanded);
  });
};

for (const $accordion of $accordions) initAccordion($accordion);

const $filterBar = document.querySelector('[data-filter-bar]');
const $filterTogglers = document.querySelectorAll('[data-filter-toggler]');
const $overlay = document.querySelector('[data-overlay]');

addEventOnElements($filterTogglers, 'click', function () {
  $filterBar.classList.toggle('active');
  $overlay.classList.toggle('active');
  const bodyOverflow = document.body.style.overflow;
  document.body.style.overflow = bodyOverflow === 'hidden' ? 'visible' : 'hidden';
});
