'use client';
import * as LPhooks from '@/features/lp/hooks/index';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Button,
  Select,
  Box,
  VStack,
  Text,
  HStack,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Divider,
} from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-okaidia.css';

import ClickMessage from '@/components/Effects/ClickMessage';
import Fade from '@/components/Effects/Fade';
interface PreviewContainerProps {
  onButtonClick: () => void;
  onOverLay: () => void;
  onSidebar: () => void;
}

const LPDemoComponents: React.FC<PreviewContainerProps> = ({ onButtonClick, onOverLay, onSidebar }) => {
  const { setIsMessageVisible, setIsButtonDisabled, setIsToggled, isToggled, isMessageVisible, isButtonDisabled } =
    LPhooks.useLPUIState();
  const { sampleCode, code, rightCode, newCode, setSampleCode, setCode, setRightCode } = LPhooks.useLPState();

  // const [sampleCode, setSampleCode] = useState(`

  // import React  from 'react';

  // const user = () => {
  //   return (
  //     <div>
  //       { content }
  //     </div>
  //   );
  // };`);
  // //サンプルコードを表示させる
  // const [code, setCode] = useState(sampleCode);
  // //ボタンのboolean制御
  // const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  // //アニメーションの制御
  // const [isToggled, setIsToggled] = useState(false);
  // const [isMessageVisible, setIsMessageVisible] = useState(true);
  // const [rightCode, setRightCode] = useState('');

  // const newCode = `
  // {
  //   "": {
  //     "prefix": "",
  //     "body": [
  //       "  ",
  //       "  import React  from 'React';",
  //       "",
  //       "  const \${1/(.*)/\${1:/pascalcase}/}\ = () => {",
  //       "    return (",
  //       "      <div>",
  //       "        { content }",
  //       "      </div>",
  //       "    );",
  //       "  };"
  //     ],
  //     "description": ""
  //   }
  // }`;

  const updateCode = () => {
    setIsMessageVisible(false);
    setIsButtonDisabled(true);
    onButtonClick();
    onOverLay();
    onSidebar();

    const addCharacter = (i: number) => {
      if (i < newCode.length) {
        setTimeout(() => {
          setRightCode((currentCode) => currentCode + newCode[i]);
          addCharacter(i + 1);
        }, 15);
      }
    };
    addCharacter(0);
    setIsToggled(true);
  };

  return (
    <Box>
      <Flex minHeight="auto" direction="column" p={5}>
        <Fade delay={0}>
          <Text fontSize="2xl" fontWeight="bold" textAlign="center" fontStyle="italic" mb={2}>
            Live Demo
          </Text>
          <Text fontWeight="md" textAlign="center" color="gray.500">
            ライブ デモ
          </Text>
        </Fade>
      </Flex>
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="row" m={6}>
        <Box width="700px">
          <motion.div
            initial={{ scale: 1, x: 0 }}
            animate={{ scale: isToggled ? 0.9 : 1, x: isToggled ? 350 : 0 }}
            transition={{
              delay: 0,
              duration: 0.5,
              ease: 'easeInOut',
            }}
          >
            <Box
              flex="1"
              shadow="base"
              borderColor="gray.200"
              borderRadius="15px"
              p={3}
              m={5}
              bg="gray.50"
              position="relative"
            >
              <Text fontSize="lg" fontWeight="semibold" color="blue.500" fontStyle="italic">
                変換前
              </Text>
              <Text fontSize="lg" fontWeight="normal" fontStyle="italic" color="gray.600" mt={2}>
                userという文字をPascalCaseに変換するデモ
              </Text>
              <Divider my={4} sx={{ borderColor: 'gray.400' }} />{' '}
              {/* DividerはChakra UIに含まれるコンポーネントで、水平線を描画してコンテンツを区切る */}
              {/* LPワードフォーム */}
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
                  <AnimatePresence>{isMessageVisible && <ClickMessage />}</AnimatePresence>
                  {/* Hスタック LPあぷでぼたん */}
                  <Flex flex="1" justifyContent="flex-end" position="relative">
                    <Button
                      onClick={updateCode}
                      isDisabled={isButtonDisabled}
                      size="lg"
                      sx={{
                        backgroundImage:
                          'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                        color: 'white',
                        _hover: {
                          boxShadow: 'md',
                        },
                        _active: {
                          bgGradient:
                            'linear-gradient(45deg, #e6683c 0%, #dc2743 25%, #cc2366 50%, #bc1888 75%, #f09433 100%)',
                          transform: 'scale(0.9)',
                        },
                      }}
                    >
                      変換
                    </Button>
                  </Flex>
                </HStack>
              </VStack>
              <Editor
                value={code}
                onValueChange={(code) => setCode(code)}
                highlight={(code) => highlight(code, languages.js, 'javascript')}
                padding={10}
                readOnly={true}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 15,
                  minHeight: '24rem',
                  overflow: 'auto',
                  backgroundColor: '#2D2D2D',
                  color: '#fff',
                  borderRadius: '15px',
                  width: '100%',
                  marginTop: '16px',
                }}
              />
            </Box>
          </motion.div>
        </Box>
        <Box width="700px">
          <motion.div
            initial={{ scale: 1, x: 0 }}
            animate={{ scale: isToggled ? 1.1 : 1, x: isToggled ? -350 : 0 }}
            transition={{
              delay: 0,
              duration: 0.7,
              ease: 'easeInOut',
            }}
          >
            <Box flex="1" shadow="base" borderColor="gray.200" borderRadius="15px" p={3} m={5} bg="white">
              <Text fontSize="lg" fontWeight="semibold" fontStyle="italic" color="#f09433" pb={2}>
                変換後
              </Text>
              <Text fontSize="lg" fontWeight="normal" fontStyle="italic" color="gray.600" mt={2}>
                userという文字をPascalCaseに変換するデモ
              </Text>
              <Divider my={4} sx={{ borderColor: 'gray.400' }} />{' '}
              {/* DividerはChakra UIに含まれるコンポーネントで、水平線を描画してコンテンツを区切る */}
              {/* LPワードフォーム */}
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
                    <Select isReadOnly placeholder="Pascal" size="sm" sx={{ width: '120px' }}></Select>
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
                  {/* Hスタック */}
                  <Flex flex="1" justifyContent="flex-end" position="relative">
                    <Button
                      onClick={updateCode}
                      isDisabled={isButtonDisabled}
                      size="lg"
                      sx={{
                        backgroundImage:
                          'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                        color: 'white',
                        _hover: { boxShadow: 'md' },
                        _active: {
                          bgGradient:
                            'linear-gradient(45deg, #e6683c 0%, #dc2743 25%, #cc2366 50%, #bc1888 75%, #f09433 100%)',
                          transform: 'scale(0.9)',
                        },
                      }}
                    >
                      変換
                    </Button>
                  </Flex>
                </HStack>
              </VStack>
              <Editor
                value={rightCode}
                onValueChange={(code) => setRightCode(code)}
                highlight={(code) => highlight(code, languages.js, 'javascript')}
                readOnly={true}
                padding={10}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 15,
                  minHeight: '24rem',
                  overflow: 'auto',
                  backgroundColor: '#2D2D2D',
                  color: '#fff',
                  borderRadius: '15px',
                  width: '100%',
                  marginTop: '16px',
                }}
              />
            </Box>
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
};

export default LPDemoComponents;
