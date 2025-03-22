'use strict';

window.ACCESS_POINT = 'https://api.edamam.com/api/recipes/v2/';
const APP_ID = '1c0259ea';
const API_KEY = '3fe6fee8e7cf0daa8413f52eb08a4f64';
const TYPE = 'public';

export const fetchData = async function (queries, successCallback) {
  const query = queries
    ?.join('&')
    .replace(/,/g, '=')
    .replace(/ /g, '%20')
    .replace(/\+/g, '%2B');

  const url = `${ACCESS_POINT}?app_id=${APP_ID}&app_key=${API_KEY}&type=${TYPE}${
    query ? `${query}` : ''
  }`;

  //   const response = await fetch(url);

  //   if (response.ok) {
  //     const data = await response.json();
  //     successCallback(data);
  //   }

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
