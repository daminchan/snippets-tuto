'use client';
// import HeroSection from '@/components/HeroSection/HeroSection';
import React from 'react';
import UpdateInfo from './_updateInfo/UpdateInfo';
import LiveDemo from './_liveDemo/LiveDemo';
import FadeIn from '@/components/animation/FadeIn';
import { Box } from '@chakra-ui/react';

const DemoPage = () => {
  return (
    <Box>
      <UpdateInfo />
      <LiveDemo />
    </Box>
  );
};

export default DemoPage;
