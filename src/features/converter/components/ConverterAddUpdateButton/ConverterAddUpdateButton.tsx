'use client';
import React from 'react';
import { Button, IconButton, HStack } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import CustomButton from '@/components/elements/button/CustomButton';

interface ConversionButtonProps {
  isLoading: boolean;
  onAddForm: () => void;
  onUpdateCode: () => void;
}

const ConverterAddUpdateButton: React.FC<ConversionButtonProps> = ({ isLoading, onAddForm, onUpdateCode }) => (
  <HStack>
    <CustomButton isLoading={isLoading} onClick={onUpdateCode}>
      {isLoading ? '処理中...' : '変換'}
    </CustomButton>
    <IconButton _hover={{ cursor: 'pointer' }} aria-label="追加" icon={<AddIcon />} size="sm" onClick={onAddForm} />
  </HStack>
);

export default ConverterAddUpdateButton;
