"use client"
import React, { useState } from 'react'
import ExamplePage from '../testPage2/examplePage/examplePage'
import ZoomIn from '@/components/animation/zoomIn';
import { Box, Flex, Text } from '@chakra-ui/react';
import TryItOutLinkContainer from '../testPage2/tryItoutLinkContainer/tryItOutLinkContainer';
import { motion, AnimatePresence } from 'framer-motion';


const page = () => {
    const [showTryOut,setShowTryOut] = useState(true);

    const handlePreviewButtonClick=()=>{
      setShowTryOut(true);
    }
  return (
    <div>
        <ExamplePage></ExamplePage>
    </div>
  )
}

export default page
