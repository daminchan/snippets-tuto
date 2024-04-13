'use client';
import React from 'react';
import { Button, HStack } from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';
import CustomButton from '@/components/test/Button/CustomButton';

interface ActionButtonsProps {
  onClear: () => void;
  onCopy: () => void;
}

const ConverterClearCopyButton: React.FC<ActionButtonsProps> = ({ onClear, onCopy }) => {
  return (
    <HStack>
      <CopyIcon onClick={onCopy} boxSize="32px" color="blue.500" _hover={{ color: 'red.500', cursor: 'pointer' }} />
      <CustomButton onClick={onClear}>クリア</CustomButton>
    </HStack>
  );
};

export default ConverterClearCopyButton;
