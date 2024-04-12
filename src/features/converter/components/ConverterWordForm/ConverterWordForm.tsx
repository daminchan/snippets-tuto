'use client';
import React from 'react';
import {
  VStack,
  HStack,
  Box,
  Text,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  IconButton,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

interface WordFormProps {
  word: string;
  caseFormat: string;
  inputOrder: number;
  id: string;
  onWordChange: (value: string) => void;
  onCaseFormatChange: (value: string) => void;
  onInputOrderChange: (value: number, id: string) => void;
  onRemove: (id: string) => void;
}

const ConverterWordForm: React.FC<WordFormProps> = ({
  word,
  caseFormat,
  inputOrder,
  id,
  onWordChange,
  onCaseFormatChange,
  onInputOrderChange,
  onRemove,
}) => (
  <VStack spacing={4} align="stretch">
    <HStack spacing={4} alignItems="center">
      <Box mt={3}>
        <Text fontSize="sm" fontWeight="semibold">
          変換したい単語
        </Text>
        <Input
          value={word}
          onChange={(e) => onWordChange(e.target.value)}
          placeholder="変換したい単語"
          size="sm"
          sx={{ width: '150px' }}
        />
      </Box>
      <Box>
        <Text fontSize="sm" fontWeight="semibold">
          変換形式
        </Text>
        <Select
          value={caseFormat}
          onChange={(e) => onCaseFormatChange(e.target.value)}
          size="sm"
          sx={{ width: '120px' }}
        >
          <option value="default">Default</option>
          <option value="Pascal">Pascal</option>
          <option value="Choice">Choice</option>
        </Select>
      </Box>
      <Box>
        <Text fontSize="sm" fontWeight="semibold">
          順序
        </Text>
        <NumberInput
          value={inputOrder}
          onChange={(_valueAsString, valueAsNumber) => onInputOrderChange(valueAsNumber, id)}
          min={1}
          max={10}
          size="sm"
          sx={{ width: '90px' }}
        >
          <NumberInputField placeholder="#1" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Box>
      <IconButton
        aria-label="削除"
        icon={<DeleteIcon />}
        size="sm"
        onClick={() => onRemove(id)}
        sx={{
          width: '40px',
          height: '30px',
          top: '12px',
        }}
      />
    </HStack>
  </VStack>
);

export default ConverterWordForm;
