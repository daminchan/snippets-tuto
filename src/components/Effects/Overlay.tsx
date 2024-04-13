'use client';
import * as LP from '@/features/lp/hooks/index';
import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const Overlay = () => {
  const { handleSetOverLay } = LP.useLPHandler();
  return (
    <Box>
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
    </Box>
  );
};

export default Overlay;
