"use client"
import React, {  useEffect, useRef, useState } from 'react'
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
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    useToast,
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
import { AnimatePresence } from 'framer-motion';
  


  interface wordsToReplace{
    word:string;
    caseFormat:string;
    id:string;//uuidがstring型を求めているため
    inputOrder: number;


  }


const EditorContainer = () => {
    const [isUpdated,setIsUpdated]=useState(false);
    const [snippetOutput,setSnippetOutput]=useState('');
    const [inputCode,setInputCode]=useState('');
    //インプットフォームを管理している
    const [wordsToReplace,setWordsToReplace]=useState<wordsToReplace[]>([{word:'',caseFormat:'default',id:uuidv4(),inputOrder:1}]);
    //Json形式に変換する際のスニペット構文のタイトルとdescription管理用
    const [description,setDescription]=useState('');
    //アニメーションアイコンナビの動作を管理している
    const [isIconVisible, setIsIconVisible] = useState(true);
    const [isIconVisibleTwo, setIsIconVisibleTwo] = useState(false);
    const [isIconVisibleThree, setIsIconVisibleThree] = useState(false);
    const [isLoading,setIsLoading] =useState(false);
    const [prefix, setPrefix] = useState('');
    const [snippetName, setSnippetName] = useState('');


    const toastIdRef = useRef<string | number | undefined>();
    const toast = useToast();
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
      setIsIconVisibleThree(code === '');
    };

//動的なリストの予定なのでindexは不適切…あとでUUIDを使用してIDで識別して処理する関数に変更予定
    // const handleWordChange=(index:number,value:string)=>{
      
    //     const newWord = [...wordsToReplace]
    //     newWord[index].word= value;
    //     setWordsToReplace(newWord)
    //     setIsIconVisibleTwo(value === '');
    //     setIsIconVisibleThree(value !=='')
    // };
    
    const handleWordChange=(index:number,value:string)=>{
      const pattern = /^[a-zA-Z0-9]*$/;
      if (pattern.test(value)) {
        // 入力値が英数字のみの場合は、状態を更新
        const newWord = [...wordsToReplace];
        newWord[index].word = value;
        setWordsToReplace(newWord);
        // setIsIconVisible(false);
        setIsIconVisibleTwo(value === '');
        setIsIconVisibleThree(value !== '');
      } else {
        // 英数字以外が含まれている場合は、何もしない or エラーメッセージを表示
         // 英数字以外が含まれている場合
         const toastId = 'only-ascii'; 
          if (!toastIdRef.current || !toast.isActive(toastIdRef.current)) {
              toastIdRef.current = toast({
              id: toastId,
              title: '半角英数字のみを入力してください',
              description: "クリップボードへのコピーに失敗しました。",
              status: 'error',
              duration: 5000,
              isClosable: true,
              position: "top",
            });
          }
      }
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

        // Prefixの変更を扱う関数
    const handlePrefixChange = (value: string) => {
      setPrefix(value);
    };

    // スニペット名の変更を扱う関数
    const handleSnippetChange = (value: string) => {
      setSnippetName(value);
    };


    const addForm =()=>{
        const newWordsToReplace:wordsToReplace= {word:'',caseFormat:'default',id:uuidv4(),inputOrder: wordsToReplace.length + 1}
        setWordsToReplace([...wordsToReplace,newWordsToReplace])
    }

    const removeForm =(id:string)=>{
        // 指定されたIDを持つフォームを除外して新しい配列を作成
        const updatedWordsToReplace = wordsToReplace.filter(form => form.id !== id);
        // inputOrderを更新
        const reorderedWordsToReplace = updatedWordsToReplace.map((form, index) => ({
          ...form,inputOrder: index + 1, // 1から始まる連番に更新
        }));
        setWordsToReplace(reorderedWordsToReplace);
    };
    const createCaseFormat=(wordsToReplace:wordsToReplace)=>{


      switch(wordsToReplace.caseFormat){
            case 'Pascal':
                return  `\${${wordsToReplace.inputOrder}/(.*)/\${${wordsToReplace.inputOrder}:/pascalcase}/}`; 
        
            case 'default':
                return  `\${${wordsToReplace.inputOrder}}`;
            }
    }



    const convertToJSON = (createToJsonText:string,prefix: string,snippet:string)=>{
      const snippetTemplate = {
        [snippet]: {
          "prefix": prefix,
          "body": createToJsonText.split('\n'),
        }
      };
      let jsonString =JSON.stringify(snippetTemplate, null, 2)
      jsonString = jsonString.slice(1, -1).trim();
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

      // setSnippetOutput(jsonString)
      // setIsLoading(false)
    }


    const updateCode =()=>{
      // const hasEmptyFields = wordsToReplace.some(item => !item.word.trim() || !item.caseFormat.trim());

      // if (hasEmptyFields) {
      //   toast({
      //     title: "エラー",
      //     description: "すべてのフィールドを入力してください。",
      //     status: "error",
      //     duration: 5000,
      //     isClosable: true,
      //     position: "top", // トーストを上部に表示
      //   });
      //   return;
      // }
        setSnippetOutput('')
        setIsLoading(true)
        let newCode = inputCode;
        wordsToReplace.forEach((wordsToReplace) =>{
          if (wordsToReplace.word.trim() !== '') {
            const regex = new RegExp(wordsToReplace.word,'g')
            const replacement = createCaseFormat(wordsToReplace)|| '';
            newCode = newCode.replace(regex,replacement)}
        })
        convertToJSON(newCode,prefix,snippetName)
        setIsUpdated(true);
        setIsIconVisibleThree(false);
      }

    const clearCode =()=>{
      const newWordsToReplace:wordsToReplace= {word:'',caseFormat:'default',id:uuidv4(),inputOrder:1,}
      setWordsToReplace([newWordsToReplace])
      setInputCode('')
      setSnippetOutput('')
      setPrefix('')
      setSnippetName('')
      setIsUpdated(false)
    }
    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(snippetOutput);
        // 成功時のトースト
        toast({
          title: 'コピー成功',
          description: "コピー完了!!",
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: "top", // または "bottom" など、好みに応じて位置を設定
        });
      } catch (err) {
        console.error('クリップボードへのコピーに失敗しました', err);
        // エラー時のトースト
        toast({
          title: 'コピー失敗',
          description: "クリップボードへのコピーに失敗しました。",
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: "top", // または "bottom" など、好みに応じて位置を設定
        });
      }
    };
return (
    <Box>
    <Box display="flex" justifyContent="center"  flexDirection="row" bg="gray.50" as='form' width="100%"  alignItems="flex-start" gap={5}>
      <Box width="700px" maxWidth="700px" p={3} m={0}>
              <Box flex="1" shadow="base"  borderColor="gray.200" borderRadius="15px" bg="white" p={3} m={0} position="relative">
                <Text fontSize="lg" fontWeight="semibold">変換したいコードを張り付ける</Text>
                <AnimatePresence> {isIconVisible && <StepOneAnimationMessage/>}</AnimatePresence>
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
                        cursor: 'pointer',
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
                  onClick={copyToClipboard}
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
                    cursor: 'pointer',
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
                <Box width="470px">
                {isIconVisibleTwo && <StepTwoAnimationMessage />} 
                {isIconVisibleThree && <StepThreeAnimationMessage/>}
                <Box shadow="base"  borderColor="gray.200" borderRadius="15px" p={3} bg="white" flex="1" position="relative" >
                
                    {/* フォーム */}
                    <Text fontSize="lg" fontWeight="semibold">変換フォーム</Text>
                    <Divider my={4} sx={{  borderColor: "gray.400" }}/>
                      {/* Prefix */}
                      <Flex alignItems="center" gap="4">
                      <Box >
                        <Text fontSize="sm" fontWeight="semibold">Prefix</Text>
                        <Input
                          value={prefix}
                          onChange={(e) => handlePrefixChange(e.target.value)}
                          placeholder="Prefix"
                          size="sm"
                          sx={{  width: '150px', }}
                        />
                      </Box>
                      {/* スニペット名 */}
                      <Box>
                        <Text fontSize="sm" fontWeight="semibold">スニペット名</Text>
                        <Input
                          value={snippetName}
                          onChange={(e) => handleSnippetChange(e.target.value)}
                          placeholder="Snippet"
                          size="sm"
                          sx={{  width: '120px', }}
                        />
                      </Box>
                      </Flex>

                    {wordsToReplace.map((wordsToReplace, index) => (
                  <VStack spacing={4} mt={3} align="stretch" key={index}>
                    <HStack spacing={4} alignItems="center">
                      {/* 変換したい単語 */}
                      <Box >
                        <Text fontSize="sm" fontWeight="semibold">変換したい単語</Text>
                        <Input
                          value={wordsToReplace.word}
                          onChange={(e) => handleWordChange(index, e.target.value)}
                          placeholder="変換したい単語"
                          size="sm"
                          sx={{  width: '150px', }}
                        />
                      </Box>

                      {/* 変換形式 */}
                      <Box >
                        <Text fontSize="sm" fontWeight="semibold">変換形式</Text>
                        <Select
                          placeholder="Default"
                          size="sm"
                          sx={{  width: '120px', }}
                          onChange={(e) => handleCaseFormatChange(index, e.target.value)}
                        >
                          <option value="Pascal">Pascal</option>
                          <option value="Choice">Choice</option>
                        </Select>
                      </Box>

                      {/* 順序 */}
                      <Box >
                        <Text fontSize="sm" fontWeight="semibold">順序</Text>
                        <NumberInput
                          onChange={(_valueAsString, valueAsNumber) => handleInputOrderChange(valueAsNumber, wordsToReplace.id)}
                          min={1}
                          max={10}
                          defaultValue={wordsToReplace.inputOrder}
                          size="sm"
                          sx={{  width: '90px', }}
                        >
                          <NumberInputField placeholder="#1" />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </Box>
               
                          {/* 削除ボタン */}
                          <IconButton
                          aria-label="削除"
                          icon={<DeleteIcon />}
                          size='sm'
                          sx={{
                            right:'10px',
                            width: '40px',
                            height: '30px',
                            top: '9px',
                          }}
                          onClick={() => removeForm(wordsToReplace.id)}
                            />
                    </HStack>
                  </VStack>
                  
                ))}
                
              
                  <Button  size='sm'
                  _hover={{ cursor: 'pointer' }}
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
                  _hover={{ cursor: 'pointer' }}
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
