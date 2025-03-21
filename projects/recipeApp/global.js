'use strict';

window.addEventOnElements = ($elements, eventType, callback) => {
    for (const $element of $elements) {
        $element.addEventListener(eventType, callback);
    }
}