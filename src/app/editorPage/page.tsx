"use client"
import React, { useEffect, useState ,ChangeEvent} from 'react'
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
  import { DeleteIcon, AddIcon } from '@chakra-ui/icons';
  import 'prismjs/themes/prism-okaidia.css';
 


  interface wordsToReplace{
    word:string;
    caseFormat:string;
    id:string;//uuidがstring型を求めているため
    inputOrder: number,
  }


const page = () => {
    const [isUpdated,setIsUpdated]=useState(false);
    const [snippetOutput,setSnippetOutput]=useState('');
    const [inputCode,setInputCode]=useState('');
    const [wordsToReplace,setWordsToReplace]=useState<wordsToReplace[]>([{word:'',caseFormat:'default',id:uuidv4(),inputOrder:1}])
    // const [inputOrder,setInputOrder]=useState(1)

//動的なリストの予定なのでindexは不適切…あとでUUIDを使用してIDで識別して処理する関数に変更予定
    const handleWordChange=(index:number,value:string)=>{
        const newWord = [...wordsToReplace]
        newWord[index].word= value;
        setWordsToReplace(newWord)
    };
    const handleCaseFormatChange=(index:number,value:string)=>{
        const newCaseFormat = [...wordsToReplace]
        newCaseFormat[index].caseFormat =value;
        setWordsToReplace(newCaseFormat)
    };

    //ここはChakraUIの記述方法だと思う
    // const handleInputOrderChange=(_valueAsString: string,valueAsNumber: number)=>{
    //     setInputOrder(valueAsNumber)
    // };
    const handleInputOrderChange=(valueAsNumber: number,id:string)=>{
        const newWord = [...wordsToReplace]
        const newWordToReplaceNumber = newWord.map((word)=>{
            if(word.id!==id){
                return {...word,inputOrder:valueAsNumber}
            }else{
                return word;
            }
        })
        setWordsToReplace(newWordToReplaceNumber)
    }

    const addForm =()=>{
        const newWordsToReplace:wordsToReplace= {word:'',caseFormat:'default',id:uuidv4(),inputOrder:1}
        setWordsToReplace([...wordsToReplace,newWordsToReplace])
    }

    const removeForm =(id:string)=>{
        const removeWordToReplace = wordsToReplace.filter(element => element.id !== id)
        setWordsToReplace(removeWordToReplace);
    }

    const createCaseFormat=(wordsToReplace:wordsToReplace)=>{
        
        switch(wordsToReplace.caseFormat){
            case 'Pascal':
                return  `\${${wordsToReplace.inputOrder}/(.*)/\${${wordsToReplace.inputOrder}:/pascalcase}/}`; 
        
            case 'Default':
                return  `\${${wordsToReplace.inputOrder}}`;
            }
    }

    const updateCode =()=>{
        let newCode = inputCode;

        wordsToReplace.forEach((wordsToReplace) =>{
            const regex = new RegExp(wordsToReplace.word,'g')
            const replacement = createCaseFormat(wordsToReplace)|| '';
            newCode = newCode.replace(regex,replacement)
        })}

    
return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="row" bg="gray.50">
      <Box p={5}  minHeight="auto">
      <Box  as='form'>
          <Flex minHeight="auto" direction="column" p={5}>
            <Flex flex="1" gap={4}>
              <Box width="700px">
              <Box flex="1" shadow="base"  borderColor="gray.200" borderRadius="15px" p={3} bg="white">
                <Text fontSize="lg" fontWeight="semibold">変換したいコードを張り付ける</Text>
                <Divider my={4} sx={{  borderColor: "gray.400" }}/> {/* DividerはChakra UIに含まれるコンポーネントで、水平線を描画してコンテンツを区切る */}
                {isUpdated ? 
                 <Editor
                 value={snippetOutput}
                 onValueChange={code => setSnippetOutput(code)}
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
                :  <Editor
                value={inputCode}
                onValueChange={code => setInputCode(code)}
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
                }}/>}
               
                 </Box>
              </Box>
            
               <Flex flex="1" direction="column" gap={4}>
               <Box width="700px">
               <Box shadow="base"  borderColor="gray.200" borderRadius="15px" p={3} bg="white" flex="1" position="relative" >
                    {/* フォーム */}
                    <Text fontSize="lg" fontWeight="semibold">変換フォーム</Text>
                    <Divider my={4} sx={{  borderColor: "gray.400" }}/>
                {wordsToReplace.map((wordsToReplace,index)=>(
                    <VStack spacing={4} mt={3} align="stretch" key={index}>
                    <HStack spacing={4} alignItems="center">
                    <VStack spacing={1} align="left">
                    <Text fontSize="sm" fontWeight="semibold">変換したい単語</Text>
                        <Input 
                        value={wordsToReplace.word}
                        onChange={(e)=>{handleWordChange(index,e.target.value)}}
                        placeholder="変換したい単語" size='sm'  sx={{ width: 'auto' }}
                       />
                    </VStack>    
                    <VStack spacing={1} align="left">
                      <Text fontSize="sm" fontWeight="semibold">変換形式</Text>
                      <Select placeholder="Default" size='sm' onChange={(e)=>{handleCaseFormatChange(index,e.target.value)}}>
                            <option value="pascal">Pascal</option>
                            <option value="Choice">Choice</option>
                          </Select>
                    </VStack>
                       <VStack spacing={1} align="left">
                       <Text fontSize="sm" fontWeight="semibold">数字</Text>
                       <NumberInput key={wordsToReplace.id} onChange={(_valueAsString, valueAsNumber) => handleInputOrderChange( valueAsNumber,wordsToReplace.id)} min={0} max={10} defaultValue={wordsToReplace.inputOrder} size='sm' sx={{  width: '90px', }}>
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
                            onClick={() => removeForm(wordsToReplace.id)}
                              />
                       </VStack>
                     </HStack>
                </VStack>
                ))}
               <Button  size='sm'
                    onClick={updateCode}
                    sx={{
                      position: 'absolute',
                      top: '10px',
                      right: '70px',
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
                    }} >変換
                  </Button>
                       <IconButton
                            aria-label="追加"
                            icon={<AddIcon/>}
                            size='sm'
                            sx={{
                              position: 'absolute',
                              top: '10px',
                              right:'20px',
                              width: '40px',
                              height: '39px',
                            }}
                            onClick={addForm} />
                </Box>
                </Box>
            </Flex>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}

export default page
