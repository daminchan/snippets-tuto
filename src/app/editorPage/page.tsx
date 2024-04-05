"use client"
import React from 'react'
import EditorContainer from './_editorContainer/editorContainer'
import { Box, Flex, Text } from '@chakra-ui/react'
import FadeIn from '@/components/animation/fadeIn'
import HeroSection from '@/components/heroSection/heroSection'
import StepOneAnimationMessage from '@/components/animation/stepOneAnimationMessage'

const page = () => {
  return (
      <Box bg="gray.50" minHeight="100vh">
      <HeroSection/>
      <FadeIn delay={0.33}><EditorContainer/></FadeIn> 
      </Box>
  )
}

export default page
