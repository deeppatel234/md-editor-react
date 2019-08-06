/* eslint func-names: 0 */

export const debounce = (func, delay) => {
  let debounceTimer;
  return function(...args) {
    const context = this;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

let idCounter = 0;

export const uniqueId = prefix => {
  idCounter += 1;
  return prefix + idCounter;
};
