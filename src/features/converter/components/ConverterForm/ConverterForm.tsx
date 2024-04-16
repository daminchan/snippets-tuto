'use client';
//ConversionComponentsからpropsをもらう

import React, { useRef } from 'react';
import { Flex, Text, HStack, Divider, Box, IconButton, Toast, useToast } from '@chakra-ui/react';
import PrefixInputForm from '@/components/Form/PrefixInputForm';
import WordInputForm from '@/components/Form/WordInputForm';
import CustomButton from '@/components/Elements/Button/CustomButton';
import { AddIcon } from '@chakra-ui/icons';

// WordsToReplace の型定義
interface Word {
  word: string;
  caseFormat: string;
  inputOrder: number;
  id: string;
}

// ConverterFormProps の型定義
interface ConverterFormProps {
  isLoading: boolean;
  addForm: () => void;
  prefix: string;
  snippetName: string;
  handlePrefixChange: (prefix: string) => void;
  handleSnippetChange: (snippetName: string) => void;
  wordsToReplace: Word[];
  handleWordChange: (index: number, value: string) => void;
  handleCaseFormatChange: (index: number, value: string) => void;
  handleInputOrderChange: (value: number, id: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  removeForm: (id: string) => void;
}

const ConverterForm: React.FC<ConverterFormProps> = ({
  isLoading,
  addForm,
  prefix,
  snippetName,
  handlePrefixChange,
  handleSnippetChange,
  wordsToReplace,
  handleWordChange,
  handleCaseFormatChange,
  handleInputOrderChange,
  handleSubmit,
  removeForm,
}) => {
  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Flex justifyContent="space-between">
        <Text fontSize="lg" fontWeight="semibold">
          変換フォーム
        </Text>
        <HStack>
          <CustomButton isLoading={isLoading} type="submit">
            {isLoading ? '処理中...' : '変換'}
          </CustomButton>
          <IconButton _hover={{ cursor: 'pointer' }} aria-label="追加" icon={<AddIcon />} size="sm" onClick={addForm} />
        </HStack>
        {/* <Converter.ConverterAddUpdateButton isLoading={isLoading} onAddForm={addForm} onUpdateCode={updateCode} /> */}
      </Flex>
      <Divider my={4} sx={{ borderColor: 'gray.400' }} />
      <PrefixInputForm
        prefixLabel={'Prefix'}
        snippetNameLabel={'スニペット名'}
        prefix={prefix}
        snippetName={snippetName}
        onPrefixChange={handlePrefixChange}
        onSnippetChange={handleSnippetChange}
      />
      {wordsToReplace.map((word, index) => (
        <WordInputForm
          key={word.id}
          word={word.word}
          caseFormat={word.caseFormat}
          inputOrder={word.inputOrder}
          id={word.id}
          onWordChange={(value) => handleWordChange(index, value)}
          onCaseFormatChange={(value) => handleCaseFormatChange(index, value)}
          onInputOrderChange={(value, id) => handleInputOrderChange(value, id)}
          onRemove={() => removeForm(word.id)}
        />
      ))}
    </Box>
  );
};

export default ConverterForm;
