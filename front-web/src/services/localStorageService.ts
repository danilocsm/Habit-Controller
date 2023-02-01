const getItem = (key: string) => {
  return localStorage.getItem(key);
};

const saveItem = (key: string, token: string) => {
  localStorage.setItem(key, token);
};

const removeItem = (key: string) => {
  localStorage.removeItem(key);
};

export { getItem, saveItem, removeItem };
