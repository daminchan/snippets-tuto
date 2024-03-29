"use client"
import React from 'react'
import EditorContainer from './editorContainer/editorContainer'
import { Box, Flex, Text } from '@chakra-ui/react'
import FadeIn from '@/components/animation/fadeIn'

const page = () => {
  return (
      <Box bg="gray.50" minHeight="100vh">
       <Flex minHeight="auto" direction="column" p={5}>
      <Text  fontSize="4xl" fontWeight="bold" textAlign="center"> Case Converter</Text>
      <Text fontWeight="light" textAlign="center" color="gray.500">ケースコンバーター</Text>
      </Flex>
      <Box mb={4} textAlign="center" color="gray.600">
      <Text fontSize="md" fontWeight="medium">
        このアプリは、ユーザーが入力した単語をコードスニペット構文に自動変換するツールです。
      </Text>
      <Text fontSize="md" fontWeight="medium">
        例えば、変数名や関数名をキャメルケース、スネークケース、パスカルケースなど、指定した形式に即座に変換し、コーディングの効率化をサポートします。
      </Text>
      </Box>
      
      <Flex minHeight="auto" direction="column" p={5}>
      <Text  fontSize="2xl" fontWeight="bold" textAlign="center" fontStyle="italic">Live Application</Text>
      <Text fontWeight="md" textAlign="center" color="gray.500" >ライブ アプリケーション</Text>
      </Flex>
      <FadeIn delay={0}><EditorContainer/></FadeIn> 
      </Box>
  )
}

export default page
