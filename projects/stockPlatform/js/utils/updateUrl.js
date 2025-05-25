'use strict';

import { urlEncode } from './urlEncode.js';

export const updateUrl = (filterObj, searchType) => {
  setTimeout(() => {
    try {
      const root = window.location.origin;
      const searchQuery = urlEncode(filterObj);
      const path = window.location.pathname.split('/').slice(0, -1).join('/');

      window.location = `${root}/projects/stockPlatform/pages/${searchType}/${searchType}.html?${searchQuery}`;
    } catch (error) {
      console.error('Error updating URL:', error);
    }
  }, 500);
};