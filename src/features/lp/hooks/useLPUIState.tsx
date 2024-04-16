'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
interface UIStateContextType {
  showTryOut: boolean;
  showOverLay: boolean;
  showTryOutSidebar: boolean;
  showTryOutSidebarDefault: boolean;

  isButtonDisabled: boolean;
  isToggled: boolean;
  isMessageVisible: boolean;
  setShowTryOut: React.Dispatch<React.SetStateAction<boolean>>;
  setOverLay: React.Dispatch<React.SetStateAction<boolean>>;
  setShowTryOutSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  setShowTryOutSidebarDefault: React.Dispatch<React.SetStateAction<boolean>>;
  setIsButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsToggled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const LPUIStateContext = createContext<UIStateContextType | undefined>(undefined);

interface LPUIStateProviderProps {
  children: ReactNode;
}

export const LPUIStateProvider: React.FC<LPUIStateProviderProps> = ({ children }) => {
  const [showTryOut, setShowTryOut] = useState(false);
  const [showOverLay, setOverLay] = useState(false);
  const [showTryOutSidebar, setShowTryOutSidebar] = useState(true);
  const [showTryOutSidebarDefault, setShowTryOutSidebarDefault] = useState(true);

  //ボタンのboolean制御
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  //アニメーションの制御
  const [isToggled, setIsToggled] = useState(false);
  const [isMessageVisible, setIsMessageVisible] = useState(true);

  const value = {
    showTryOut,
    setShowTryOut,
    showOverLay,
    setOverLay,
    showTryOutSidebar,
    setShowTryOutSidebar,
    showTryOutSidebarDefault,
    setShowTryOutSidebarDefault,
    isButtonDisabled,
    setIsButtonDisabled,
    isToggled,
    setIsToggled,
    isMessageVisible,
    setIsMessageVisible,
  };

  return <LPUIStateContext.Provider value={value}>{children}</LPUIStateContext.Provider>;
};

export const useLPUIState = () => {
  const context = useContext(LPUIStateContext);
  if (context === undefined) {
    throw new Error('useUIState must be used within a UIStateProvider');
  }
  return context;
};
