import { useState, useEffect } from 'react';
import { getKey, setKey, userSettingsKey, isLocalStorageAvailable } from '../services/localStorage';

import { isBoolean } from '../utils/dataTypes';

const { lightTheme: localLightTheme } = !isLocalStorageAvailable
  ? {}
  : getKey(userSettingsKey) || {};

const useUserSettings = (initialState) => {
  const [lightTheme, setLightTheme] = useState(
    isBoolean(localLightTheme) ? localLightTheme : initialState.lightTheme
  );

  const toggleThemeMode = () => setLightTheme((previousThemeMode) => !previousThemeMode);

  useEffect(() => {
    isLocalStorageAvailable &&
      setKey(userSettingsKey, {
        lightTheme
      });
  }, [lightTheme]);

  return [{ lightTheme }, { toggleThemeMode }];
};

export default useUserSettings;
