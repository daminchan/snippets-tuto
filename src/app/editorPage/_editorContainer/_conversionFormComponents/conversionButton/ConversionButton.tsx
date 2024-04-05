import React from 'react';
import { Button, IconButton, HStack } from '@chakra-ui/react';
import { AddIcon} from '@chakra-ui/icons';

interface ConversionButtonProps {
  isLoading: boolean;
  onAddForm: () => void;
  onUpdateCode: () => void;
}

const ConversionButton: React.FC<ConversionButtonProps> = ({ isLoading, onAddForm, onUpdateCode }) => (
  <HStack>
    <Button
      size='sm'
      _hover={{ cursor: 'pointer' }}
      isDisabled={isLoading}
      onClick={onUpdateCode}
      sx={{
        width: '70px',
        height: '39px',
        transition: "transform 0.9s ease, box-shadow 0.9s ease", 
        backgroundImage: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
        color: "white",
        _hover: {
          boxShadow: "md",
        },
        _active: {
          bgGradient: "linear-gradient(45deg, #e6683c 0%, #dc2743 25%, #cc2366 50%, #bc1888 75%, #f09433 100%)",
          transform: "scale(0.9)",
        }
      }}
    >
      {isLoading ? '処理中...' : '変換'}
    </Button>
    <IconButton
      _hover={{ cursor: 'pointer' }}
      aria-label="追加"
      icon={<AddIcon />}
      size='sm'
      onClick={onAddForm}
    />
  </HStack>
);

export default ConversionButton;