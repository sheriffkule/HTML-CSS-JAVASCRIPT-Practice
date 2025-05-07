'use strict';

import { urlEncode } from './utils/urlEncode.js';

const API_KEY = 'rpHhi6l4VlMV1xYfm1R0Or9DnJHH1VAHDVB3dc7N2Hw7fKvgaNVEJk7j';

const headers = new Headers();
headers.append('Authorization', API_KEY);

const requestOptions = { headers };

const fetchData = async function (url, successCallback) {
  const response = await fetch(url, requestOptions);
  try {
    if (response.ok) {
      const data = await response.json();
      successCallback(data);
    } else {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
  } catch (error) {
    globalThis.console.error(`Error fetching data: ${error.message}`);
  }
};

let requestUrl = '';

const root = {
  default: 'https://api.pexels.com/v1/',
  videos: 'https://api.pexels.com/videos/',
};

export const client = {
  photos: {
    search(parameters, callback) {
      requestUrl = `${root.default}search?${urlEncode(parameters)}`;
      fetchData(requestUrl, callback);
    },

    curated(parameters, callback) {
      fetchData(`${root.default}curated?${urlEncode(parameters)}`, callback);
    },

    detail(id, callback) {
      fetchData(`${root.default}photos/${id}`, callback);
    },
  },

  videos: {
    search(parameters, callback) {
      requestUrl = `${root.videos}search?${urlEncode(parameters)}`;
      fetchData(requestUrl, callback);
    },

    popular(parameters, callback) {
      fetchData(`${root.videos}popular?${urlEncode(parameters)}`, callback);
    },

    detail(id, callback) {
      fetchData(`${root.videos}videos/${id}`, callback);
    },
  },

  collections: {
    featured(parameters, callback) {
      requestUrl = `${root.default}collections/featured?${urlEncode(parameters)}`;
      fetchData(requestUrl, callback);
    },

    detail(id, parameters, callback) {
      requestUrl = `${root.default}/collections/${id}?${urlEncode(parameters)}`;
      fetchData(requestUrl, callback);
    },
  },
};
