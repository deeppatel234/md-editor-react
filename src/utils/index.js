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

export const shallowCompare = (obj1, obj2) =>
  Object.keys(obj1).length === Object.keys(obj2).length &&
  Object.keys(obj1).every(key => obj1[key] === obj2[key]);

export const compareMenuList = (arr1, arr2) => {
  console.log(arr1, arr2);
  if (arr1.length !== arr2.length) {
    return false;
  }
  let isSame = true;
  for (let i = 0; i < arr1.length; i += 1) {
    if (arr1[i].id !== arr2[i].id) {
      isSame = false;
      break;
    }
  }
  return isSame;
};
