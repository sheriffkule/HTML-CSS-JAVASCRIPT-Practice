'use strict';

import { urlEncode } from "./urlEncode.js";

export const updateUrl = (filterObj, searchType) => {
  setTimeout(() => {
    const root = window.location.origin;
    const searchQuery = urlEncode(filterObj);
    const path = window.location.pathname.split('/').slice(0, -1).join('/');

    window.location = `${root}${path}/pages/${searchType}/${searchType}.html?${searchQuery}`;
  }, 500);
};
