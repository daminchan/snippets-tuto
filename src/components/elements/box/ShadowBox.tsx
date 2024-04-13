import React from 'react';
import { Box } from '@chakra-ui/react';

interface ShadowBoxLayoutProps {
  children: React.ReactNode;
  width?: string;
  maxWidth?: string;
  shadowBoxHeight?: string;
  shadowBoxWidth?: string;
  shadowBoxBorder?: string;
  shadowBoxLeft?: string;
  shadowBoxTop?: string;
}
const ShadowBox: React.FC<ShadowBoxLayoutProps> = ({
  children,
  width = '700px', // デフォルト値
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
    width, // 外部から渡される値
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
      <Box sx={shadowOverlayBoxStyles} />
      <Box sx={detailedBoxStyles}>{children}</Box>
    </Box>
  );
};

export default ShadowBox;