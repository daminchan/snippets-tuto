'use client';
import React from 'react';
import { Box, Button, Link } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
const TryItOutLinkSideContainer = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      transition={{ duration: 0.5 }}
    >
      <Box width="200px" p={3} margin="auto" position="fixed" bottom="20px" right="20px">
        <Button
          bgGradient="linear(to-r, #F58529, #DD2A7B, #8134AF, #515BD4)"
          variant="solid"
          as={Link}
          href="/editorPage"
          color="white"
        >
          機能を使ってみる
          <ExternalLinkIcon mx="2px" />
        </Button>
      </Box>
    </motion.div>
  );
};

export default TryItOutLinkSideContainer;
