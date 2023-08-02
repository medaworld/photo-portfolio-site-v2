import React, { createContext, useContext, useState } from 'react';

const ShowMainContext = createContext(null);

export const useShowMain = () => {
  const context = useContext(ShowMainContext);
  if (!context) {
    throw new Error('useShowMain must be used within a ShowMainProvider');
  }
  return context;
};

export const ShowMainProvider = ({ children }) => {
  const [showMain, setShowMain] = useState(false);
  return (
    <ShowMainContext.Provider value={{ showMain, setShowMain }}>
      {children}
    </ShowMainContext.Provider>
  );
};
