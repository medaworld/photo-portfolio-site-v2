import { Dispatch, SetStateAction, createContext } from 'react';

interface GlobalStateContextProps {
  showMain: boolean;
  setShowMain: Dispatch<SetStateAction<boolean>>;
}

export const GlobalStateContext = createContext<GlobalStateContextProps>({
  showMain: false,
  setShowMain: undefined,
});
