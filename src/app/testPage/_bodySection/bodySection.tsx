import { Box, Center, Flex, Heading, Text } from '@chakra-ui/react';
import React  from 'react';

const BodySection = () => {
  return (
    <Box>
     <Box>
      {/* タイトル */}
      <Center >
      <Heading as="h2" size="2xl" maxW="80%" wordBreak="break-word">sampleWords</Heading>
      </Center>

      {/* ステップ */}
      <Flex justifyContent="center" gap="4"m={12}>
        <Center w="15%" h="100px"   borderRadius="md"m={24}>
        Contact us for a trial account or to purchase a plan that suits your needs.
        </Center>
        <Center w="15%" h="100px"   borderRadius="md"m={24}>
        Contact us for a trial account or to purchase a plan that suits your needs.
        </Center>
        <Center w="15%" h="100px"   borderRadius="md"m={24}>
        Contact us for a trial account or to purchase a plan that suits your needs.
        </Center>
      </Flex>
    </Box>
    </Box>
  );
};

export default BodySection;