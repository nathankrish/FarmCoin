export const asyncLocalStorage = {
    setItem: (key, value) => {
      Promise.resolve(localStorage.setItem(key, value));
    },
    getItem: (key) => {
      return Promise.resolve(localStorage.getItem(key));
    }
};