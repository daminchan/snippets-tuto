'use client';
import * as LPhooks from '@/features/lp/hooks/index';
import * as Effects from '@/components/Effects/index';
import * as Link from '@/components/Link';
import { Box } from '@chakra-ui/react';
import React from 'react';
import LPDemoComponents from '../LPDemoComponents/LPDemoComponents';
import { AnimatePresence } from 'framer-motion';

const LPComponents = () => {
  const { showOverLay, showTryOutSidebar } = LPhooks.useLPUIState();

  return (
    <Box>
      <Effects.Fade delay={0}>
        <LPDemoComponents />
      </Effects.Fade>
      <AnimatePresence>
        {showOverLay && (
          <Box>
            <Effects.Overlay />
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
              <Effects.Zoom>
                <Link.TryOutLink />
              </Effects.Zoom>
            </Box>
          </Box>
        )}
      </AnimatePresence>
      <AnimatePresence>{showTryOutSidebar && <Link.TryOutSideLink />}</AnimatePresence>
    </Box>
  );
};

export default LPComponents;
