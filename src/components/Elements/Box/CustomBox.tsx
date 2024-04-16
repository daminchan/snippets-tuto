'use client';
import React from 'react';
import { Box } from '@chakra-ui/react';

interface CustomBoxProps {
  children: React.ReactNode;
  width?: string;
  maxWidth?: string;
  shadowBoxHeight?: string;
  shadowBoxWidth?: string;
  shadowBoxBorder?: string;
  shadowBoxLeft?: string;
  shadowBoxTop?: string;
}
const CustomBox: React.FC<CustomBoxProps> = ({
  children,
  width = '700px',
  maxWidth = '700px',
  shadowBoxHeight = '96%',
  shadowBoxWidth = '90%',
  shadowBoxBorder = '32px solid rgba(74, 74, 74, 0.25)',
  shadowBoxLeft = '70px',
  shadowBoxTop = '30px',
}) => {
  const commonBoxStyles = {
    position: 'relative' as const, // TypeScriptにこの値が変更されないことを伝える
    display: 'inline-block',
    p: 3,
    m: 0,
    width,
    maxWidth,
  };

  const shadowOverlayBoxStyles = {
    position: 'absolute' as const,
    shadow: 'lg',
    borderRadius: 'sm',
    zIndex: '0',

    height: shadowBoxHeight,
    width: shadowBoxWidth,
    border: shadowBoxBorder,
    left: shadowBoxLeft,
    top: shadowBoxTop,
  };

  const detailedBoxStyles = {
    shadow: 'lg',
    borderColor: 'gray.200',
    bg: 'white',
    p: 10,
    m: 0,
    position: 'relative' as const,
  };

  return (
    <Box sx={commonBoxStyles}>
      {/* ボックス影を表現しているカスタムボックス */}
      <Box sx={shadowOverlayBoxStyles} />
      {/* ボックスの本体を表現しているカスタムボックス */}
      <Box sx={detailedBoxStyles}>{children}</Box>
    </Box>
  );
};

export default CustomBox;
