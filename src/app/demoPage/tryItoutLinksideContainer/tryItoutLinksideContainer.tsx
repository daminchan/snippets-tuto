"use client"
import React from 'react';
import { Box, Button, Text, Link,VStack } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

const TryItOutLinkSideContainer = () => {
  return (
    <Box width="200px"shadow="base"  borderColor="gray.200" borderRadius="15px" p={3}  margin="auto" 
    position="fixed" // 要素をビューポートに対して固定
      bottom="20px" // 下から20pxの位置
      right="20px" // 右から20pxの位置
      // 幅を300pxに設定
    
    >
      
        <Button  bgGradient="linear(to-r, #F58529, #DD2A7B, #8134AF, #515BD4)" variant="solid" as={Link} href="/editorPage"  color="white">
        機能を使ってみる<ExternalLinkIcon mx="2px" />
        </Button>
      
    </Box>
    
   
  );
};

export default TryItOutLinkSideContainer;