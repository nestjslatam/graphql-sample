import { createContext } from 'react';

export const GlobalContext = {
  data: { id: '', trackId: '' }
};

export const AppGlobalContext = createContext(GlobalContext);
