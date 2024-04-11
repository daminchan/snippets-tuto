'use client';
import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import FadeIn from '@/components/Animation/FadeIn';
import HeroSection from '@/components/HeroSection/HeroSection';
import ConversionComponents from '../../features/converter/components/ConversionComponents/ConversionComponents';
import { UIStateProvider } from '@/features/converter/hooks/useUIState';

const page = () => {
  return (
    <Box bg="gray.50" minHeight="100vh">
      <HeroSection />
      <FadeIn delay={0.33}>
        <UIStateProvider>
          <ConversionComponents />
        </UIStateProvider>
      </FadeIn>
    </Box>
  );
};
export default page;
