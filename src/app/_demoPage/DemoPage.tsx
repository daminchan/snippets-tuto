"use client"
import HeroSection from '@/components/heroSection/heroSection';
import React  from 'react';
import UpdateInfo from './_updateInfo/UpdateInfo';
import LiveDemo from './_liveDemo/LiveDemo';
import FadeIn from '@/components/animation/fadeIn';
import { Box } from '@chakra-ui/react';

const DemoPage = () => {
  return (
    <Box>
        <HeroSection/>
        <UpdateInfo/>
        <LiveDemo/>
    </Box>
  );
};

export default DemoPage;