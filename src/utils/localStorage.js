import isNil from 'lodash/fp/isNil';

export const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = (key) => {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    if (!isNil(value)) return value;
    return null;
  } catch {
    return null;
  }
};

export const removeItem = (key) => localStorage.removeItem(key);
