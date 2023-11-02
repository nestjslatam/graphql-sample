import { isNumber } from '../utils/dataTypes';

const appPrefix = 'nestjsexpert';

export const userSettingsKey = 'user.settings';

export const setKey = (key, value) => {
  if (!key) return;
  localStorage.setItem(`${appPrefix}.${key}`, !isNumber(value) ? JSON.stringify(value) : value);
};

export const getKey = (key) => {
  return key ? JSON.parse(localStorage.getItem(`${appPrefix}.${key}`)) : undefined;
};

const checkLocalStorage = () => {
  try {
    const testSetting = '__test_setting_';
    localStorage.setItem(testSetting, testSetting);
    localStorage.removeItem(testSetting);
    return true;
  } catch (e) {
    return false;
  }
};

export const isLocalStorageAvailable = checkLocalStorage();
