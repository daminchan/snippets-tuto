'use client';
import React from 'react';
import { Button } from '@chakra-ui/react';

import { CustomButtonLayoutStyle } from './CustomButtonLayoutStyle';

interface CustomButtonProps {
  width?: string;
  height?: string;
  isLoading?: boolean;
  isDemo?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;

  type?: 'button' | 'submit' | 'reset';
}

const CustomButton: React.FC<CustomButtonProps> = ({
  width = '70px', // デフォルト値
  height = '39px', // デフォルト値
  onClick,
  isLoading,
  children,
  type = 'submit',
  isDemo = false,
  isDisabled,
}) => (
  <Button
    isDisabled={isDisabled}
    type={type}
    size="sm"
    onClick={onClick}
    isLoading={isLoading}
    sx={{ ...CustomButtonLayoutStyle, width: '70px', height: '39px' }}
  >
    {children}
  </Button>
);

export default CustomButton;
