"use client"
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Button,
    Select,
    Stack,
    Box,
    VStack,
    Text,
    RadioGroup,
    Radio,
    HStack,
    Textarea,
    Flex,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Spacer,
    IconButton,
    Divider,
  } from '@chakra-ui/react'
  import { Input } from '@chakra-ui/react'
  import Editor from 'react-simple-code-editor';
  import { highlight, languages } from 'prismjs/components/prism-core';
  import 'prismjs/components/prism-clike';
  import 'prismjs/components/prism-javascript';
  import DynamicForms from './form/DynamicForms';
  import { DeleteIcon, AddIcon } from '@chakra-ui/icons';
  import PreviewContainer from './previewContainer/PreviewContainer';
  import 'prismjs/themes/prism-okaidia.css';

  interface Form {
    id: string; // id の型を string に更新
    value: string;
  }

  const page = () => {
    const [code, setCode] = useState('// ここにコードを入力してください\n');
    const [forms,setForms] =useState<Form[]>([{id:uuidv4(),value:""}]);
    
    const addForm=()=>{
      const newForm:Form={id:uuidv4(),value:''}
      setForms([...forms,newForm])
    }
    const removeForm=(id:string)=>{
      setForms(forms.filter(form => form.id !== id))
    }
    return (
        <Box p={5} bg="gray.50" minHeight="auto">
          <Flex minHeight="auto" direction="column" p={5}>
            <Text fontSize="2xl" fontWeight="bold" mb={5}>ワード変換器</Text>
            <Flex flex="1" gap={4}>
              <Box flex="1" shadow="base"  borderColor="gray.200" borderRadius="15px" p={3} bg="white">
                <Text fontSize="lg" fontWeight="semibold">コードを張り付ける場所</Text>
                <Divider my={4} sx={{  borderColor: "gray.400" }}/> {/* DividerはChakra UIに含まれるコンポーネントで、水平線を描画してコンテンツを区切る */}
                <Editor
                value={code}
                onValueChange={code => setCode(code)}
                highlight={code => highlight(code, languages.js,'javascript')}
                padding={10}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 15,
                  minHeight: '24rem', // エディタの最小高さを設定
                  overflow: 'auto',
                  backgroundColor: '#2D2D2D', // 背景色
                  color: '#fff',
                  borderRadius: '15px', // 角丸
                }}/>
                 </Box>
               <Flex flex="1" direction="column" gap={4}>
                  <Box shadow="base"  borderColor="gray.200" borderRadius="15px" p={3} bg="white" flex="1" position="relative">
                    {/* フォーム */}
                    <Text fontSize="lg" fontWeight="semibold">変換フォーム</Text>
                    <Divider my={4} sx={{  borderColor: "gray.400" }}/>
                {forms.map((form,index)=>(
                    <VStack spacing={4} mt={3} align="stretch" key={form.id}>
                    <HStack spacing={4} alignItems="center">
                    <VStack spacing={1} align="left">
                    <Text fontSize="sm" fontWeight="semibold">変換したい単語</Text>
                        <Input placeholder="変換したい単語" size='sm'  sx={{ width: 'auto' }}/>
                    </VStack>    
                    <VStack spacing={1} align="left">
                      <Text fontSize="sm" fontWeight="semibold">変換形式</Text>
                      <Select placeholder="Default" size='sm'>
                            <option value="Pascal">Pascal</option>
                            <option value="Choice">Choice</option>
                          </Select>
                    </VStack>
                       <VStack spacing={1} align="left">
                       <Text fontSize="sm" fontWeight="semibold">数字</Text>
                       <NumberInput min={0} max={100} defaultValue={1} size='sm' sx={{  width: '90px', }}>
                              <NumberInputField placeholder="#1" />
                              <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                              </NumberInputStepper>
                            </NumberInput>
                       </VStack>
                       <VStack spacing={1} align="left">
                       <Spacer/>
                       <IconButton
                            aria-label="削除"
                            icon={<DeleteIcon />}
                            size='sm'
                            sx={{
                              position: 'absolute',
                              right:'20px',
                              width: '40px',
                              height: '30px',
                            }}
                            onClick={() => removeForm(form.id)}
                              />
                       </VStack>
                    
                     </HStack>
                     
                  
                </VStack>
                ))}
               <Button  size='sm'
                    sx={{
                      position: 'absolute',
                      bottom: '20px',
                      right: '20px',
                      width: '120px',
                      height: '40px',
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
                    }} >変換
                  </Button>
                
                       
                       <IconButton
                           
                            aria-label="追加"
                            icon={<AddIcon/>}
                            size='sm'
                            sx={{
                              position: 'absolute',
                              top: '20px',
                              right:'20px',
                              width: '40px',
                              height: '30px',
                            }}
                            onClick={addForm} />
                      
      </Box>
    </Flex>
    </Flex>
  </Flex>
  {/* <CodeTypingPreview /> */}
  <PreviewContainer/>
</Box>
    )
  }

export default page
