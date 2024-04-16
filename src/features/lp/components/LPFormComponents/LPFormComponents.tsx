'use client';
import 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-okaidia.css';
import { highlight, languages } from 'prismjs/components/prism-core';

import React from 'react';
import { Box, Flex, Text, Divider } from '@chakra-ui/react';
import CustomButton from '@/components/Elements/Button/CustomButton';
import WordInputForm from '@/components/Form/WordInputForm';
import { AnimatePresence } from 'framer-motion';
import Editor from 'react-simple-code-editor';
import ClickMessage from '@/components/Effects/ClickMessage';

interface LPFromComponentsProps {
  codeValue: string;
  isButtonDisabled: boolean;
  isMessageVisible?: boolean;
  updateCode: () => void;
  onCodeChange: (code: string) => void;
  title: string;
  description: string;
  textColor: string;
}

const LPFromComponents: React.FC<LPFromComponentsProps> = ({
  codeValue,
  isButtonDisabled,
  isMessageVisible = false,
  updateCode,
  onCodeChange,
  title,
  description,
  textColor,
}) => (
  <Box as="form">
    <Flex justifyContent="space-between" flex="1">
      <Box>
        <Text fontSize="lg" fontWeight="semibold" color={textColor}>
          {title}
        </Text>
        <Text fontSize="lg" fontWeight="normal" fontStyle="italic" color="gray.600" mt={2} textAlign="left">
          {description}
        </Text>
      </Box>
      <Flex flex="1" justifyContent="flex-end" position="relative">
        <CustomButton onClick={updateCode} isDisabled={isButtonDisabled} isDemo={true}>
          変換
        </CustomButton>
      </Flex>
    </Flex>
    <Divider my={4} sx={{ borderColor: 'gray.400' }} />
    <WordInputForm isDemo={true} />
    {isMessageVisible && (
      <AnimatePresence>
        <ClickMessage />
      </AnimatePresence>
    )}
    <Editor
      value={codeValue}
      onValueChange={onCodeChange}
      highlight={(code) => highlight(code, languages.js, 'javascript')}
      padding={10}
      readOnly={true}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 15,
        minHeight: '24rem',
        overflow: 'auto',
        backgroundColor: '#2D2D2D',
        color: '#fff',
        borderRadius: '15px',
        width: '100%',
        marginTop: '16px',
      }}
    />
  </Box>
);

export default LPFromComponents;
