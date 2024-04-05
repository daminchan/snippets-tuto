"use client"
import React from 'react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
  Select,
  Stack,
  Box,
  VStack,
  Text,
  RadioGroup,
  Radio,
  HStack,
  Textarea,
  Flex,
  NumberInput,
  NumberInputField,
  Link,
} from '@chakra-ui/react'



const Header = () => {
  return (
    <Box bg="#212121">
      <Flex  p={32} justifyContent="space-between" alignItems="center"gap={4} >
      <Link href="/"  color="teal.500" fontWeight="bold">
      <Text color="#F7FAFC">Home</Text>
      </Link>
        <Flex  gap={4}>
          <HStack spacing={32}>
          <Link href="/demoPage"><Button><Text color="#F7FAFC">About</Text></Button></Link>
            <Text color="#F7FAFC">Dashboard</Text>
          </HStack>
        </Flex> 
          </Flex>
    </Box>

  )
}

export default Header


