'use client';
import 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-okaidia.css';
import React from 'react';
import * as LPhooks from '@/features/lp/hooks/index';
import * as Effects from '@/components/Effects';
import { Box, Text, Flex } from '@chakra-ui/react';
import CustomBox from '@/components/Elements/Box/CustomBox';
import LPFromComponents from '../LPFormComponents/LPFormComponents';

const LPDemoComponents = () => {
  const { isToggled, isMessageVisible, isButtonDisabled } = LPhooks.useLPUIState();
  const { code, rightCode, setCode, setRightCode } = LPhooks.useLPState();
  const { updateCode } = LPhooks.useLPActions();

  return (
    <Box>
      <Flex minHeight="auto" direction="column" p={5}>
        <Effects.Fade delay={0}>
          <Text fontSize="2xl" fontWeight="bold" textAlign="center" fontStyle="italic" mb={2}>
            Live Demo
          </Text>
          <Text fontWeight="md" textAlign="center" color="gray.500">
            ライブ デモ
          </Text>
        </Effects.Fade>
      </Flex>
      {/* フォーム */}
      <Flex justifyContent="center" alignItems="center" flexDirection="row" m={6}>
        <Box>
          <Effects.Slide isToggled={isToggled}>
            <CustomBox>
              <LPFromComponents
                codeValue={code}
                isButtonDisabled={isButtonDisabled}
                isMessageVisible={isMessageVisible}
                updateCode={updateCode}
                onCodeChange={setCode}
                title="変換前"
                description=" userという文字をPascalCaseに変換するデモ"
                textColor="#000000"
              ></LPFromComponents>
            </CustomBox>
          </Effects.Slide>
        </Box>
        <Box>
          <Effects.Slide isToggled={isToggled} toggledScale={1.1} toggledX={-350}>
            <CustomBox>
              <LPFromComponents
                codeValue={rightCode}
                isButtonDisabled={isButtonDisabled}
                isMessageVisible={false}
                updateCode={updateCode}
                onCodeChange={setRightCode}
                title="変換後"
                description=" userという文字をPascalCaseに変換するデモ"
                textColor="#f09433"
              ></LPFromComponents>
            </CustomBox>
          </Effects.Slide>
        </Box>
      </Flex>
    </Box>
  );
};

export default LPDemoComponents;

{
  /* <Box width="700px"> */
}
{
  /* <motion.div
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
          
              <VStack spacing={4} mt={3} align="stretch">
                <HStack spacing={4} alignItems="center">
                
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
              
                  <Box>
                    <Text fontSize="sm" fontWeight="semibold">
                      変換形式
                    </Text>
                    <Select placeholder="Pascal" size="sm" sx={{ width: '120px' }}></Select>
                  </Box>
             
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
          </motion.div> */
}
{
  /* </Box> */
}

{
  /*        
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
             
              <VStack spacing={4} mt={3} align="stretch">
                <HStack spacing={4} alignItems="center">
             
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
             
                  <Box>
                    <Text fontSize="sm" fontWeight="semibold">
                      変換形式
                    </Text>
                    <Select isReadOnly placeholder="Pascal" size="sm" sx={{ width: '120px' }}></Select>
                  </Box>
             
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
        </Box> */
}
