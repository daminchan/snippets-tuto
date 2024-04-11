'use client';
import React from 'react';
import { Flex, Box, Text, Input } from '@chakra-ui/react';

interface ConversionInputProps {
  prefix: string;
  snippetName: string;
  onPrefixChange: (value: string) => void;
  onSnippetChange: (value: string) => void;
}

const ConverterPrefixForm: React.FC<ConversionInputProps> = ({
  prefix,
  snippetName,
  onPrefixChange,
  onSnippetChange,
}) => (
  <Flex alignItems="center" gap="4">
    <Box>
      <Text fontSize="sm" fontWeight="semibold">
        Prefix
      </Text>
      <Input
        value={prefix}
        onChange={(e) => onPrefixChange(e.target.value)}
        placeholder="Prefix"
        size="sm"
        sx={{ width: '150px' }}
      />
    </Box>
    <Box>
      <Text fontSize="sm" fontWeight="semibold">
        スニペット名
      </Text>
      <Input
        value={snippetName}
        onChange={(e) => onSnippetChange(e.target.value)}
        placeholder="Snippet"
        size="sm"
        sx={{ width: '120px' }}
      />
    </Box>
  </Flex>
);

export default ConverterPrefixForm;
