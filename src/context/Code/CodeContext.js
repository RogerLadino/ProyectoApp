import { createContext, useContext } from 'react';

export const CodeContext = createContext(undefined);

export const useCode = () => {
  const context = useContext(CodeContext);
  if (!context) {
    throw new Error('useCode must be used within a CodeProvider');
  }
  return context;
};
