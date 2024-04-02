"use client"
import React, {  useState } from 'react'
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
  import StepOneAnimationMessage from '@/components/animation/stepOneAnimationMessage';
  import StepTwoAnimationMessage from '@/components/animation/stepTwoAnimationMessage';
  import StepThreeAnimationMessage from '@/components/animation/stepThreeAnimationMessage';
  


  interface wordsToReplace{
    word:string;
    caseFormat:string;
    id:string;//uuidがstring型を求めているため
    inputOrder: number,
  }


const EditorContainer = () => {
    const [isUpdated,setIsUpdated]=useState(false);
    const [snippetOutput,setSnippetOutput]=useState('');
    const [inputCode,setInputCode]=useState('');
    //インプットフォームを管理している
    const [wordsToReplace,setWordsToReplace]=useState<wordsToReplace[]>([{word:'',caseFormat:'default',id:uuidv4(),inputOrder:1}]);
    //Json形式に変換する際のスニペット構文のタイトルとdescription管理用
    const [prefix,setPrefix]=useState('');
    const [description,setDescription]=useState('');
    //アニメーションアイコンナビの動作を管理している
    const [isIconVisible, setIsIconVisible] = useState(true);
    const [isIconVisibleTwo, setIsIconVisibleTwo] = useState(false);
    const [isIconVisibleThree, setIsIconVisibleThree] = useState(false);
    const [isLoading,setIsLoading] =useState(false);
    // const handleValueChange = (code:string) => {
    //   setInputCode(code);
    //   // inputCode が空でない場合はアイコンを非表示にする
    //   setIsIconVisible(code === '');
    // };
    //アイコンを表示させるための関数
    const handleValueChange = (code:string) => {
      setInputCode(code);
      // inputCode が空でない場合はアイコンを非表示にする
      setIsIconVisible(code === '');
      setIsIconVisibleTwo(code !== '');
    };

//動的なリストの予定なのでindexは不適切…あとでUUIDを使用してIDで識別して処理する関数に変更予定
    const handleWordChange=(index:number,value:string)=>{
        const newWord = [...wordsToReplace]
        newWord[index].word= value;
        setWordsToReplace(newWord)
        setIsIconVisibleTwo(value === '');
        setIsIconVisibleThree(value !=='')
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
            if(word.id ===id){
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
        
            case 'default':
                return  `\${${wordsToReplace.inputOrder}}`;
            }
    }



    const convertToJSON = (createToJsonText:string)=>{
      const snippetTemplate = {
        [prefix]: {
          "prefix": 'prefix',
          "body": createToJsonText.split('\n'),
          "description": description
        }
      };
      const jsonString =JSON.stringify(snippetTemplate, null, 2)

      const addCharacter = (i:number) => {
        if (i < jsonString.length) {
        
          setTimeout(() => {
            setSnippetOutput((currentCode) => currentCode + jsonString[i]);
            addCharacter(i + 1); // 次の文字を追加するために再帰的に呼び出し
            //currentCode・・・現在のコード、つまり現在のコードに生成されたJsonStringコードのi番目を渡している。
            //それを繰り返すことで動的にコードが生成されているようにみせている。
          }, 1);
        
        }else{
          setIsLoading(false)
        }
      };
      addCharacter(0);
    }


    const updateCode =()=>{
        setSnippetOutput('')
        setIsLoading(true)
        let newCode = inputCode;

        wordsToReplace.forEach((wordsToReplace) =>{
            const regex = new RegExp(wordsToReplace.word,'g')
            const replacement = createCaseFormat(wordsToReplace)|| '';
            newCode = newCode.replace(regex,replacement)
        })
        convertToJSON(newCode)
        setIsUpdated(true);
        setIsIconVisibleThree(false);
     
        
      }

    const clearCode =()=>{
      const newWordsToReplace:wordsToReplace= {word:'',caseFormat:'default',id:uuidv4(),inputOrder:1}
      setWordsToReplace([newWordsToReplace])
      setInputCode('')
      setSnippetOutput('')
      setIsUpdated(false)
    }
   
return (
    <Box>
    <Box display="flex" justifyContent="center"  flexDirection="row" bg="gray.50" as='form' width="100%"  alignItems="flex-start" gap={5}>
      <Box width="700px" maxWidth="700px" p={3} m={0}>
              <Box flex="1" shadow="base"  borderColor="gray.200" borderRadius="15px" bg="white" p={3} m={0} position="relative">
                <Text fontSize="lg" fontWeight="semibold">変換したいコードを張り付ける</Text>
                {isIconVisible && <StepOneAnimationMessage/>}
                <Button  size='sm'
                    onClick={clearCode}
                    sx={{
                      position: 'absolute',
                      top: '10px',
                      right: '20px',
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
                    }} >クリア </Button>
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
                onValueChange={handleValueChange}
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
                }}/>}</Box>
              </Box>
                <Flex flex="1" direction="column" p={3} m={0} maxWidth="700px" >
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
                    {isIconVisibleTwo &&<StepTwoAnimationMessage/>}
                        <Input 
                        value={wordsToReplace.word}
                        onChange={(e)=>{handleWordChange(index,e.target.value)}}
                        placeholder="変換したい単語" size='sm'  sx={{ width: 'auto' }}/>
                    </VStack>    
                    <VStack spacing={1} align="left">
                      <Text fontSize="sm" fontWeight="semibold">変換形式</Text>
                      <Select placeholder="Default" size='sm' onChange={(e)=>{handleCaseFormatChange(index,e.target.value)}}>
                            <option value="Pascal">Pascal</option>
                            <option value="Choice">Choice</option>
                          </Select>
                    </VStack>
                      <VStack spacing={1} align="left">
                      <Text fontSize="sm" fontWeight="semibold">変換順序</Text>
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
                {isIconVisibleThree && <StepThreeAnimationMessage/>}
                  <Button  size='sm'
                    isDisabled={isLoading}
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
                    }} >{isLoading ? '処理中...':'変換'}
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
        </Box>
      </Box>
  )
}

export default EditorContainer
