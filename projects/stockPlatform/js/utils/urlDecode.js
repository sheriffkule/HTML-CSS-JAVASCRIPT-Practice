'use strict';

// export const urlDecode = urlString => {
//     return Object.fromEntries(urlString.replace(/%23/g, '#').replace(/%20/g, " ").split('&').map(i => i.split('=')));
// }

export const urlDecode = (urlString) => {
  try {
    return Object.fromEntries(
      urlString
        .replace(/%23/g, '#')
        .replace(/%20/g, ' ')
        .split('&')
        .map((i) => {
          const [key, value] = i.split('=');
          return [decodeURIComponent(key), decodeURIComponent(value)];
        })
    );
  } catch (error) {
    console.error('Error decoding URL string:', error);
    return {};
  }
};
