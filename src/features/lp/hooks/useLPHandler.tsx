'use client';

import { useLPUIState } from './useLPUIState';

export const useLPHandler = () => {
  const {
    // showOverLay,
    // showTryOut,
    // showTryOutSidebar,
    // showTryOutSidebarDefault,
    setOverLay,
    setShowTryOut,
    setShowTryOutSidebar,
    setShowTryOutSidebarDefault,
  } = useLPUIState();

  const handleSetOverLay = () => {
    setOverLay(false);
    setShowTryOut(false);
    handleSetTryOutSidebar();
  };
  const handleSetTryOutSidebar = () => {
    setShowTryOutSidebar(true);
  };

  const handlePreviewButtonClick = () => {
    setShowTryOut(true);
  };
  const handleOnOverLay = () => {
    setOverLay(true);
  };

  return {
    handleSetOverLay,
    handleSetTryOutSidebar,
    handleOnOverLay,
    handlePreviewButtonClick,
  };
};
