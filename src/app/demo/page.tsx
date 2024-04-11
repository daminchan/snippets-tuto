'use client';
import React, { useState } from 'react';
import ExampleContainer from './_exampleContainer/exampleContainer';
import HeroSection from '@/components/HeroSection/HeroSection';

const page = () => {
  // const [showTryOut,setShowTryOut] = useState(true);
  // const handlePreviewButtonClick=()=>{
  //   setShowTryOut(true);
  // }
  return (
    <div>
      <HeroSection />
      <ExampleContainer />
    </div>
  );
};

export default page;
