'use strict';

import { menu } from './menu.js';

export const filter = ($filterWrapper, filterObj, callback) => {
    const $filterClearBtn = $filterWrapper.querySelector('[data-filter-clear]');
    const $filterValue = $filterWrapper.querySelector('[data-filter-value');
    const $filterChip = $filterWrapper.querySelector('[data-filter-chip]');
    const $filterColorField = $filterWrapper.querySelector('[data-color-field]');
    const filterKey = $filterWrapper.dataset.filter;
    const newObj = filterObj;

    menu()
}