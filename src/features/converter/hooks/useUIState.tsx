import React, { createContext, useContext, useState, ReactNode } from 'react';
//converterコンポーネントにだけかけているが、アイコンは他のページでも使うので全体にかけてもいいかな
interface UIStateContextType {
  isLoading: boolean;
  isUpdated: boolean;
  isIconVisible: boolean;
  isIconVisibleTwo: boolean;
  isIconVisibleThree: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  setIsIconVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setIsIconVisibleTwo: React.Dispatch<React.SetStateAction<boolean>>;
  setIsIconVisibleThree: React.Dispatch<React.SetStateAction<boolean>>;
}

const UIStateContext = createContext<UIStateContextType | undefined>(undefined);
interface UIStateProviderProps {
  children: ReactNode;
}

export const UIStateProvider: React.FC<UIStateProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isIconVisible, setIsIconVisible] = useState(true);
  const [isIconVisibleTwo, setIsIconVisibleTwo] = useState(false);
  const [isIconVisibleThree, setIsIconVisibleThree] = useState(false);

  const value = {
    isLoading,
    isUpdated,
    isIconVisible,
    isIconVisibleTwo,
    isIconVisibleThree,
    setIsLoading,
    setIsUpdated,
    setIsIconVisible,
    setIsIconVisibleTwo,
    setIsIconVisibleThree,
  };

  return <UIStateContext.Provider value={value}>{children}</UIStateContext.Provider>;
};

export const useUIState = () => {
  const context = useContext(UIStateContext);
  if (context === undefined) {
    throw new Error('useUIState must be used within a UIStateProvider');
  }
  return context;
};
