'use client';
import React from 'react';
import ExampleContainer from './_exampleContainer/exampleContainer';
import Section from '@/components/section/Section';
import { LPUIStateProvider } from '@/features/lp/hooks/useLPUIState';
import LPComponents from '@/features/lp/components/LPComponents/LPComponents';
import { LPStateProvider } from '@/features/lp/hooks/useLPState';

const page = () => {
  return (
    <div>
      <Section />
      <LPUIStateProvider>
        <LPStateProvider>
          <LPComponents />
        </LPStateProvider>
      </LPUIStateProvider>
    </div>
  );
};

export default page;
