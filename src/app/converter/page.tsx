'use client';
import React from 'react';
import { Box } from '@chakra-ui/react';
import ConversionComponents from '../../features/converter/components/ConversionComponents/ConversionComponents';
import { UIStateProvider } from '@/features/converter/hooks/useUIState';
import Section from '@/components/section/Section';
import Fade from '@/components/effects/Fade';
import { FormStateProvider } from '@/features/converter/hooks/useFormState';

const page = () => {
  return (
    <Box bg="gray.50" minHeight="100vh">
      <Section />
      <Fade delay={0.33}>
        <UIStateProvider>
          <FormStateProvider>
            <ConversionComponents />
          </FormStateProvider>
        </UIStateProvider>
      </Fade>
    </Box>
  );
};
export default page;
