'use client'

import { useState } from 'react'
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  InputLeftAddon,
  InputGroup,
  Textarea,
  FormHelperText,
  InputRightElement,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  IconButton,
} from '@chakra-ui/react'
import { DeleteIcon, AddIcon } from '@chakra-ui/icons';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-okaidia.css';
import { useToast } from '@chakra-ui/react'
import { v4 as uuidv4 } from 'uuid';

interface wordsToReplace{
  word:string;
  caseFormat:string;
  id:string;
  inputOrder:number;
}

const Form1 = () => {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
  const [code, setCode] = useState('// ここにコードを入力してください\n');
  



  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
        Step.1 変換したいコードを張り付ける
      </Heading>
      <Flex>
        <FormControl>
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
                  width: '100%', // 親要素に合わせた横幅
                  marginTop: '16px',
                }}/>
        </FormControl>
      </Flex>
    </>
  )
}

const Form2 = () => {
  const [wordsToReplace,setWordsToReplace]=useState<wordsToReplace[]>([{word:'',caseFormat:'default',id:uuidv4(),inputOrder:1}])
  
  
  const handleWordChange =(value:string,index:number)=>{
    const newWord = [...wordsToReplace]
    newWord[index].word = value;
    setWordsToReplace(newWord)
    console.log(newWord)
  }
  const handleFormatChange=(value:string,index:number)=>{
    const newCaseFormat = [...wordsToReplace]
    newCaseFormat[index].caseFormat = value;
    setWordsToReplace(newCaseFormat)
    console.log(newCaseFormat)
  }
  const handleInputOrderChange=(valueAsNumber:number,id:string)=>{
    const newInputOrder = [...wordsToReplace]


    const newWordToReplaceNumber = newInputOrder.map((newInputOrder)=>{
      if(newInputOrder.id===id){
        return {...newInputOrder,inputOrder:valueAsNumber}
      }else{
        return newInputOrder;
      }
    })
    setWordsToReplace(newWordToReplaceNumber)
    console.log(newWordToReplaceNumber)
  }



  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
        Step.2 変換形式を設定する
      </Heading>
      <Flex  direction="row" gap="4" >
      
    {wordsToReplace.map((wordsToReplace,index)=>(
    <>
      <FormControl>
        <FormLabel
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: 'gray.50',
          }}
          mt="2%">
          変換したい単語
        </FormLabel>
        <Input
          value={wordsToReplace.word}
          onChange={(e)=>{handleWordChange(e.target.value,index)}}
          placeholder=''
          type="text"
          name=""
          id=""
          autoComplete=""
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        />
      </FormControl>
      <FormControl>
        <FormLabel
          htmlFor="変換形式"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: 'gray.50',
          }}
          mt="2%">
         変換形式
        </FormLabel>
        <Select
          name=""
          value={wordsToReplace.caseFormat}
          onChange={(e)=>{handleFormatChange(e.target.value,index)}}
          placeholder="Default"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md">
          <option>Pascal</option>
          <option>Choice</option>
        </Select>
      </FormControl>
      <FormControl >
        <FormLabel
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: 'gray.50',
          }}
          mt="2%">
          編集順序
        </FormLabel>
        <NumberInput min={1} key={wordsToReplace.id} max={10}  defaultValue={wordsToReplace.inputOrder} onChange={(_valueAsString,valueAsNumber)=>handleInputOrderChange(valueAsNumber,wordsToReplace.id)} size='sm' sx={{  width: '90px', }}>
          <NumberInputField placeholder="#1" />
          <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
          </NumberInputStepper>
          </NumberInput>                    
        </FormControl>
        <FormControl >
        <FormLabel
          htmlFor="city"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: 'gray.50',
          }}
          mt="2%">
          追加  /  削除
        </FormLabel>
        <IconButton
          aria-label="削除"
          icon={<AddIcon/>}
          size='sm'
          mr="6%"
          sx={{
                            }}/>
        <IconButton
          aria-label="削除"
          icon={<DeleteIcon />}
          size='sm'
          sx={{
                            }}/>
        </FormControl>                      
    </>   
    ))}
        </Flex>
    </>
  )
}

const Form3 = () => {
  const [code, setCode] = useState('// 大丈夫なら変換ボタン\n');
  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal">
        Step.3 確認画面
      </Heading>
      <SimpleGrid columns={1} spacing={6}>
        <FormControl as={GridItem} colSpan={[3, 2]}>
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
                  width: '100%', // 親要素に合わせた横幅
                  marginTop: '16px',
                }}/>
        </FormControl>

        <FormControl id="email" mt={1}>
          <FormLabel
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: 'gray.50',
            }}>
            入力された項目
          </FormLabel>
          <Textarea
            placeholder=""
            rows={3}
            shadow="sm"
            focusBorderColor="brand.400"
            fontSize={{
              sm: 'sm',
            }}
          />
        </FormControl>
      </SimpleGrid>
    </>
  )
}

export default function Multistep() {
  const toast = useToast()
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(33.33)

  return (
    <>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        m="21px auto"
        as="form">
        <Progress hasStripe value={progress} mb="5%" mx="5%" isAnimated></Progress>
        {step === 1 ? <Form1 /> : step === 2 ? <Form2 /> : <Form3 />}
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={() => {
                  setStep(step - 1)
                  setProgress(progress - 33.33)
                }}
                isDisabled={step === 1}
                colorScheme="teal"
                variant="solid"
                w="7rem"
                mr="5%">
                Back
              </Button>
              <Button
                w="7rem"
                isDisabled={step === 3}
                onClick={() => {
                  setStep(step + 1)
                  if (step === 3) {
                    setProgress(100)
                  } else {
                    setProgress(progress + 33.33)
                  }
                }}
                colorScheme="teal"
                variant="outline">
                Next
              </Button>
            </Flex>
            {step === 3 ? (
              <Button
                w="7rem"
                colorScheme="red"
                variant="solid"
                onClick={() => {
                  toast({
                    title: '変換開始.',
                    description: "しばらくお待ちください。",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                  })
                }}>
                変換
              </Button>
            ) : null}
          </Flex>
        </ButtonGroup>
      </Box>
    </>
  )
}