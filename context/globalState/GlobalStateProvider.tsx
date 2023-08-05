import { useContext, useState } from 'react';
import { GlobalStateContext } from './GlobalStateContext';
import { useRouter } from 'next/router';

export const GlobalStateProvider = ({ children }) => {
  const router = useRouter();
  const [showMain, setShowMain] = useState(router.pathname !== '/');

  return (
    <GlobalStateContext.Provider value={{ showMain, setShowMain }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
