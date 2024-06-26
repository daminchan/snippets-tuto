import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

const Section = () => {
  return (
    <Box>
      <Flex minHeight="auto" direction="column" p={4}>
        <Text fontSize="4xl" fontWeight="bold" textAlign="center">
          Case Converter
        </Text>
        <Text fontWeight="light" textAlign="center" color="gray.500">
          ケースコンバーター
        </Text>
      </Flex>
      <Flex flexDirection="column" alignItems="center" width="100%" padding="12">
        <Box width="100%" maxW="700px">
          <Text fontSize="md" fontWeight="medium" pb={1}>
            このアプリは、ユーザーが入力した単語をコードスニペット構文に自動変換するツールです。
          </Text>
          <Text fontSize="md" fontWeight="medium" pb={1}>
            例えば、変数名や関数名をキャメルケース、スネークケース、パスカルケースなど、指定した形式に即座に変換し、コーディングの効率化をサポートします。
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Section;
