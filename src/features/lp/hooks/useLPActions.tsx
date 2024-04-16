import { useLPState, useLPUIState } from '.';

export const useLPActions = () => {
  const { setOverLay, setShowTryOut, setShowTryOutSidebar, setIsMessageVisible, setIsButtonDisabled, setIsToggled } =
    useLPUIState();

  const { newCode, setRightCode } = useLPState();

  const activateTryOut = () => {
    setShowTryOut(true);
  };

  const showOverlay = () => {
    setOverLay(true);
  };

  const disableSidebar = () => {
    setShowTryOutSidebar(false);
  };

  const updateCode = () => {
    setIsMessageVisible(false);
    setIsButtonDisabled(true);
    setShowTryOut(true);
    setOverLay(true);
    setShowTryOutSidebar(false);
    const addCharacter = (i: number) => {
      if (i < newCode.length) {
        setTimeout(() => {
          setRightCode((currentCode) => currentCode + newCode[i]);
          addCharacter(i + 1);
        }, 15);
      }
    };
    addCharacter(0);
    setIsToggled(true);
  };

  return { activateTryOut, showOverlay, disableSidebar, updateCode };
};
