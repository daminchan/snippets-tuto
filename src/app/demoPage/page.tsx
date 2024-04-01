"use client"
import React, { useState } from 'react'
import ExampleContainer from './_exampleContainer/exampleContainer';
import HeroSection from '@/components/heroSection/heroSection';
import UpdateInfo from './_updateInfo/updateInfo';


const page = () => {
    const [showTryOut,setShowTryOut] = useState(true);

    const handlePreviewButtonClick=()=>{
      setShowTryOut(true);
    }
  return (
    <div>
        <HeroSection/>
        <UpdateInfo/>
        <ExampleContainer/>
    </div>
  )
}

export default page
