"use client"
import React from 'react';
import { Box, Button, Text, Link, useColorModeValue, VStack } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

const TryItOutLinkContainer = () => {
//   const bgColor = useColorModeValue('blue.500', 'blue.200'); // ライトモードとダークモードで背景色を変える
//   const textColor = useColorModeValue('white', 'gray.800'); // ライトモードとダークモードでテキスト色を変える

  return (
  
 <Box width="600px"shadow="base"  borderColor="gray.200" borderRadius="15px" p={3} bg="white" margin="auto" 
    
    >
      <VStack spacing={4}>
        <Text fontSize="xl" fontWeight="bold" >
          実際に利用してみよう！
        </Text>
        <Text fontSize="md">
          以下のリンクから本番ページへと進んで、さらなる機能を体験してみましょう。
        </Text>
        <Button  bgGradient="linear(to-r, #F58529, #DD2A7B, #8134AF, #515BD4)" variant="solid" as={Link} href="/editorPage"  color="white">
        機能を使ってみる<ExternalLinkIcon mx="2px" />
        </Button>
      </VStack>
    </Box>
    
   
  
  );
};

export default TryItOutLinkContainer;
