'use client';
import React from 'react';
import { Box } from '@chakra-ui/react';
import FadeIn from '@/components/animation/FadeIn';
import ConversionComponents from '../../features/converter/components/ConversionComponents/ConversionComponents';
import { UIStateProvider } from '@/features/converter/hooks/useUIState';
import Section from '@/components/section/Section';

const page = () => {
  return (
    <Box bg="gray.50" minHeight="100vh">
      <Section />
      <FadeIn delay={0.33}>
        <UIStateProvider>
          <ConversionComponents />
        </UIStateProvider>
      </FadeIn>
    </Box>
  );
};
export default page;
