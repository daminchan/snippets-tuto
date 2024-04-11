'use client';
import ClickAnimationMessage from '@/components/animation/clickAnimationMessage';
import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';

import React from 'react';

interface ConversionFormProps {
  isMessageVisible: boolean;
  isDisabled: boolean;
  updateCode: () => void;
}

const DemoConversionFormComponents: React.FC<ConversionFormProps> = ({ updateCode, isDisabled, isMessageVisible }) => {
  return (
    <VStack spacing={4} mt={3} align="stretch">
      <HStack spacing={4} alignItems="center">
        {/* 変換したい単語 */}
        <Box>
          <Text fontSize="sm" fontWeight="semibold">
            変換したい単語
          </Text>
          <Input
            isReadOnly
            defaultValue="user"
            size="sm"
            sx={{ width: '150px', fontWeight: 'bold', color: 'gray.800', fontStyle: 'italic' }}
          />
        </Box>
        {/* 変換形式 */}
        <Box>
          <Text fontSize="sm" fontWeight="semibold">
            変換形式
          </Text>
          <Select placeholder="Pascal" size="sm" sx={{ width: '120px' }}></Select>
        </Box>
        {/* 順序 */}
        <Box>
          <Text fontSize="sm" fontWeight="semibold">
            順序
          </Text>
          <NumberInput defaultValue={1} isReadOnly min={1} max={10} size="sm" sx={{ width: '90px' }}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Box>
        <AnimatePresence>{isMessageVisible && <ClickAnimationMessage />}</AnimatePresence>
        <Flex flex="1" justifyContent="flex-end" position="relative">
          <Button
            onClick={updateCode}
            isDisabled={isDisabled}
            size="lg"
            sx={{
              backgroundImage:
                'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
              color: 'white',
              _hover: {
                boxShadow: 'md',
              },
              _active: {
                bgGradient: 'linear-gradient(45deg, #e6683c 0%, #dc2743 25%, #cc2366 50%, #bc1888 75%, #f09433 100%)',
                transform: 'scale(0.9)',
              },
            }}
          >
            変換
          </Button>
        </Flex>
      </HStack>
    </VStack>
  );
};

export default DemoConversionFormComponents;
