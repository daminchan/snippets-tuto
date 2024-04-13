'useClient';
import * as LPhooks from '@/features/lp/hooks/index';
import * as Effects from '@/components/test2/index';
import { Box, Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import LPDemoComponents from '../LPDemoComponents/LPDemoComponents';

import { motion, AnimatePresence } from 'framer-motion';

import Fade from '@/components/test2/Fade';
import Zoom from '@/components/test2/Zoom';
import { useUIState } from '@/features/converter/hooks/useUIState';

const LPComponents = () => {
  const {
    showTryOut,
    setShowTryOut,
    showOverLay,
    setOverLay,
    showTryOutSidebar,
    setShowTryOutSidebar,
    showTryOutSidebarDefault,
    setShowTryOutSidebarDefault,
  } = LPhooks.useLPUIState();

  const { handleSetOverLay, handleSetTryOutSidebar, handlePreviewButtonClick, handleOnOverLay } =
    LPhooks.useLPHandler();
  //   const [showTryOut, setShowTryOut] = useState(false);
  //   const [showOverLay, setOverLay] = useState(false);
  //   const [showTryOutSidebar, setShowTryOutSidebar] = useState(true);
  //   const [showTryOutSidebarDefault, setShowTryOutSidebarDefault] = useState(true);

  //   const handleSetOverLay = () => {
  //     setOverLay(false);
  //     setShowTryOut(false);
  //     handleSetTryOutSidebar();
  //   };
  //   const handleSetTryOutSidebar = () => {
  //     setShowTryOutSidebar(true);
  //   };

  //   const handlePreviewButtonClick = () => {
  //     setShowTryOut(true);
  //   };
  //   const handleOnOverLay = () => {
  //     setOverLay(true);
  //   };

  return (
    <Box>
      <Fade delay={0}>
        <LPDemoComponents
          onButtonClick={() => {
            setShowTryOut(true);
          }}
          onOverLay={() => {
            setOverLay(true);
          }}
          onSidebar={() => {
            setShowTryOutSidebar(false);
          }}
        />
      </Fade>
      <AnimatePresence>{showOverLay && <Effects.Overlay></Effects.Overlay>}</AnimatePresence>
      {/* <AnimatePresence>
        {showOverLay && (
          <>
           
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              transition={{
                duration: 0.8,
                delay: 6,
                ease: 'easeInOut',
              }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'black',
                zIndex: 1,
              }}
              onClick={handleSetOverLay}
            />
            
            <Box
              m="9"
              style={{
                position: 'fixed',
                top: '86%',
                left: '48%',
                transform: 'translate(-50%, -50%)',
                zIndex: 2,
              }}
            >
              <Zoom>
                <TryItOutLinkContainer />
              </Zoom>
            </Box>
          </>
        )}
        
      </AnimatePresence>
      <AnimatePresence>{showTryOutSidebar && <TryItOutLinkSideContainer />}</AnimatePresence> */}
    </Box>
  );
};

export default LPComponents;
