'use strict';

window.ACCESS_POINT = 'https://api.edamam.com/api/recipes/v2';
const APP_ID = '776edce8';
const API_KEY = '62f63c10f389e61f1857903a2ec470c5';
const TYPE = 'public';

export const fetchData = async function (queries, successCallback) {
  const query = queries
    ?.join('&')
    .replace(/,/g, '=')
    .replace(/ /g, '%20')
    .replace(/\+/g, '%2B');

  const url = `${ACCESS_POINT}?${[
    `app_id=${APP_ID}`,
    `app_key=${API_KEY}`,
    `type=${TYPE}`,
    query && `query=${query}`,
  ].filter(Boolean).join('&')}`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      successCallback(data);
    } else {
      throw new Error(`Error fetching data: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
