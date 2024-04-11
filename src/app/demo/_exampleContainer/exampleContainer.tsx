'useClient';
import { Box, Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import PreviewContainer from '../_previewContainer/PreviewContainer';
import FadeIn from '@/components/animation/FadeIn';
import TryItOutLinkContainer from '../_tryItoutLinkContainer/tryItOutLinkContainer';
import ZoomIn from '@/components/animation/ZoomIn';
import { motion, AnimatePresence } from 'framer-motion';
import TryItOutLinkSideContainer from '../_tryItoutLinksideContainer/tryItoutLinksideContainer';

const ExampleContainer = () => {
  const [showTryOut, setShowTryOut] = useState(false);
  const [showOverLay, setOverLay] = useState(false);
  const [showTryOutSidebar, setShotTryOutSidebar] = useState(true);
  const [showTryOutSidebarDefault, setShotTryOutSidebarDefault] = useState(true);

  const handleSetOverLay = () => {
    setOverLay(false);
    setShowTryOut(false);
    handleSetTryOutSidebar();
  };
  const handleSetTryOutSidebar = () => {
    setShotTryOutSidebar(true);
  };

  const handlePreviewButtonClick = () => {
    setShowTryOut(true);
  };
  const handleOnOverLay = () => {
    setOverLay(true);
  };

  return (
    <Box>
      <FadeIn delay={0}>
        <PreviewContainer
          onButtonClick={() => {
            setShowTryOut(true);
          }}
          onOverLay={() => {
            setOverLay(true);
          }}
          onSidebar={() => {
            setShotTryOutSidebar(false);
          }}
        />
      </FadeIn>
      <AnimatePresence>
        {showOverLay && (
          <>
            {/* オーバーレイ */}
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
              <ZoomIn>
                <TryItOutLinkContainer />
              </ZoomIn>
            </Box>
          </>
        )}
      </AnimatePresence>
      <AnimatePresence>{showTryOutSidebar && <TryItOutLinkSideContainer />}</AnimatePresence>
    </Box>
  );
};

export default ExampleContainer;
