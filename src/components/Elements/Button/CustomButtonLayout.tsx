'use client';
import React from 'react';
import { Button, IconButton, HStack } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { CustomButtonLayoutStyle } from './CustomButtonLayoutStyle';

interface CustomButtonProps {
  width?: string;
  height?: string;
  isLoading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  width = '70px', // デフォルト値
  height = '39px', // デフォルト値
  onClick,
  isLoading,
  children,
}) => (
  <Button
    size="sm"
    onClick={onClick}
    isLoading={isLoading}
    sx={{ ...CustomButtonLayoutStyle, width: '70px', height: '39px' }}
  >
    {children}
  </Button>
);

export default CustomButton;
