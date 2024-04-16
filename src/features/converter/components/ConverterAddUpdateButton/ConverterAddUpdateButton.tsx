'use client';
import React from 'react';
import { IconButton, HStack } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import CustomButton from '@/components/Elements/Button/CustomButton';

interface ConversionButtonProps {
  isLoading: boolean;
  onAddForm: () => void;
  onUpdateCode: () => void;
  onSubmit?: (e: React.FormEvent<Element>) => void; // この行を追加
}

const ConverterAddUpdateButton: React.FC<ConversionButtonProps> = ({ isLoading, onAddForm, onUpdateCode }) => (
  <HStack>
    <CustomButton isLoading={isLoading} type="submit">
      {isLoading ? '処理中...' : '変換'}
    </CustomButton>
    <IconButton _hover={{ cursor: 'pointer' }} aria-label="追加" icon={<AddIcon />} size="sm" onClick={onAddForm} />
  </HStack>
);

export default ConverterAddUpdateButton;
