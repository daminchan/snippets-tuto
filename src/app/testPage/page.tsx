"use client"
import React, { useState } from 'react'
import { Box, Button, Flex, HStack, Heading, Text, VStack } from '@chakra-ui/react'
import ExampleContainer from '../demoPage/_exampleContainer/exampleContainer';
import ExampleContainerHero from './_exampleContainerHero/exampleContainerHero';
import BodySection from './_bodySection/bodySection';


const page = () => {
  const [sampleWords,setSampleWords] = useState(["Lorem", "ipsum", "dolor", "consectetur", "adipiscing", "elit"]);
  const [showTryOut,setShowTryOut] = useState(false);
  const [showOverLay,setOverLay] = useState(false);
  const [showTryOutSidebar,setShotTryOutSidebar] = useState(true);
  const [showTryOutSidebarDefault,setShotTryOutSidebarDefault] = useState(true);

  const handleSetOverLay=()=>{
    setOverLay(false);
    setShowTryOut(false);
    handleSetTryOutSidebar();

  }
  const handleSetTryOutSidebar =()=>{
    setShotTryOutSidebar(true);
  }

  const handlePreviewButtonClick=()=>{
    setShowTryOut(true);
  }
  const handleOnOverLay=()=>{
    setOverLay(true);
  }

 
  const generateDummyText = (wordCount:number) => {
    let newSampleWords = [...sampleWords];

    for (let i = 0; i < wordCount; i++) {
     
       newSampleWords = [...sampleWords,...newSampleWords] 
    }
   setSampleWords(newSampleWords)
  }




  return (
    <Box width="100%"  h="100vh">
      <Flex  h="100vh" p={24}  width="100%" >
          <VStack spacing={4} align="flex-start" mt={32}>
            <Heading as="h1" size="4xl" maxW="80%" wordBreak="break-word">{sampleWords}</Heading>
            <Text fontSize="lg">{sampleWords}</Text>
              <HStack>
                  <Button colorScheme="blue">ボタン1</Button>
                  <Button colorScheme="green">ボタン2</Button>
              </HStack>    
          </VStack>
          <Box  maxW="50%" mr={24} >
          <Heading as="h2"  maxW="60%" size="4xl" wordBreak="break-word" color="blue.500"  fontFamily="body"pl={12}>Sample</Heading>
          <ExampleContainerHero onButtonClick={()=>{
              setShowTryOut(true);
            }} onOverLay={()=>{
              setOverLay(true);
            }}
              onSidebar={()=>{
                setShotTryOutSidebar(false)
              }}/>
          </Box>
      </Flex>
      <BodySection/>
    </Box>
    
  )
}

export default page
