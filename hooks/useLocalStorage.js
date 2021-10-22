export const useLocalStorage = () => {
  const setItem = (key, value) => globalThis?.localStorage?.setItem(key, value);
  const getItem = (key) => globalThis?.localStorage?.getItem(key);
  const removeItem = (key) => globalThis?.localStorage?.removeItem(key);
  const clearStorage = () => globalThis?.localStorage?.clear();

  return { setItem, getItem, removeItem, clearStorage };
};
