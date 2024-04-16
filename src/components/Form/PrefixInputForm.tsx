'use client';
import React from 'react';
import { Flex, Box, Text, Input } from '@chakra-ui/react';
interface PrefixInputFormProps {
  prefix?: string;
  snippetName?: string;
  onPrefixChange?: (value: string) => void;
  onSnippetChange?: (value: string) => void;
  //childrenを二つ渡す時の型定義
  prefixLabel?: React.ReactNode;
  snippetNameLabel?: React.ReactNode;
}
const PrefixInputForm: React.FC<PrefixInputFormProps> = ({
  prefix,
  snippetName,
  onPrefixChange,
  onSnippetChange,
  prefixLabel = '',
  snippetNameLabel = '',
}) => (
  <Flex alignItems="center" gap="4">
    <Box>
      <Text fontSize="sm" fontWeight="semibold">
        {prefixLabel}
      </Text>
      <Input
        value={prefix}
        onChange={(e) => (onPrefixChange ? onPrefixChange(e.target.value) : null)}
        placeholder="Prefix"
        size="sm"
        sx={{ width: '150px' }}
      />
    </Box>
    <Box>
      <Text fontSize="sm" fontWeight="semibold">
        {snippetNameLabel}
      </Text>
      <Input
        value={snippetName}
        onChange={(e) => (onSnippetChange ? onSnippetChange(e.target.value) : null)}
        placeholder="Snippet"
        size="sm"
        sx={{ width: '120px' }}
      />
    </Box>
  </Flex>
);
export default PrefixInputForm;
