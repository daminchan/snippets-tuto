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
  import DynamicForms from '../form/DynamicForms';
  import { DeleteIcon, AddIcon } from '@chakra-ui/icons';
  import PreviewContainer from '../previewContainer/PreviewContainer';
  import 'prismjs/themes/prism-okaidia.css';
  import ExamplePage from '../examplePage/examplePage';

  interface wordsToReplace{
    word:string;
    caseFormat:string;
    id:string;//uuidがstring型を求めているため
    inputOrder?:number
  }

//  const createCaseFormat =(caseFormat:'pascal'|'default',inputNumber:number)=>{
//     switch(caseFormat){
//         case 'pascal':
//             return  `\${${ inputNumber}/(.*)/\${${ inputNumber}:/pascalcase}/}`;
//         case 'default':
//             return`\${${inputNumber}}`;
//     }
//  }

  // const state ={
  //   case:'pascal',
  //   inputNumber:1,
  //   target:'user'
  // }


  const page = () => {
    const [sampleCode,setSampleCode] =useState( `
    import React  from 'react';
  
    const user = () => {
      return (
        <div>
          { Content}
        </div>
      );
    };`)
    const [code, setCode] = useState(sampleCode);
    const [inputCode,setInputCode] = useState('');
    const [wordsToReplace,setWordsToReplace] = useState<wordsToReplace[]>([{word:'',caseFormat:'default',id:uuidv4(),inputOrder:1}]);
    const [inputOrder,setInputOrder] = useState(1);
    const [prefix,setPrefix] = useState('');
    const [description,setDescription] = useState('');
    const [snippetOutput,setSnippetOutput] = useState('');
    const [isUpdated,setIsUpdated] = useState(false);
    const [jsonCode,setJsonCode] = useState('');
    //変更したいコードを読み込む記述
    //Editorコンポーネント内のcode=>{inputCode(code)}が読み込む記述
    
    
    
    
    //フォーム関連（indexを使用）シンプルな書きかた（indexを使用）
    //疑問：ChakraUIのフォームコンポーネントでも同じ書きかたでいいのか？inputOderのくだりでその疑問が出来た
    //検索する文字の状態変更関数     
    const handleWordChange =(index:number,value:string)=>{
      const newWord = [...wordsToReplace]
      newWord[index].word=value;
      setWordsToReplace(newWord);
     
    };

    //セレクトフォーム関連 セレクト値の状態変更関数
    const handleCaseFormatChange =(index:number,value:string)=>{
      const newWord = [...wordsToReplace]
      newWord[index].caseFormat=value;
      setWordsToReplace(newWord);
    };
    //inputOrderフォーム関連 inputOrderの入力を整数値に変えて入力できるように
    //ChangeEventはReactに備わっているイベントハンドラに対応する型定義
    //なぜ(parseInt())を使用して整数値に変換する？→通常のままだと数値として扱われないから。parseInt()の使い方はディスコードで。
    // const handleInputOrderChange =(e:ChangeEvent<HTMLInputElement>)=>{
    //   setInputOrder(parseInt(e.target.value,10));
    // }

    //chakraUIのNumberInputコンポーネントでは変更された値を直接引数として受け取るので（イベントオブジェクトにならない）
    //parseIntを使用しなくてよい
    const handleInputOrderChange = (valueAsNumber: number,id:string)=>{
      const newNumber = wordsToReplace.map((word)=>{
        if(word.id===id){
          return{...word,inputOrder:valueAsNumber}
       }else{
        return word;
       }
      });
      setWordsToReplace(newNumber)
      console.log(newNumber)
    }


    const createCaseFormat =(wordsToReplace:wordsToReplace)=>{
        //ワード置換処理
        switch(wordsToReplace.caseFormat){
            case 'pascal':
                return  `\${${wordsToReplace.inputOrder}/(.*)/\${${wordsToReplace.inputOrder}:/pascalcase}/}`;
                
            case 'default':
                return  `\${${wordsToReplace.inputOrder}}`;
            }
    }
    const addForm=()=>{
      const newWordsToReplace:wordsToReplace={id:uuidv4(),word:'',caseFormat:'default',inputOrder:1}
      setWordsToReplace([...wordsToReplace,newWordsToReplace])
    }
    const removeForm=(id:string)=>{
      setWordsToReplace(wordsToReplace.filter(wordsToReplace => wordsToReplace.id !== id))
    }

    //Json形式に変換する関数
    const convertToJSON = (createToJsonText:string)=>{
      const snippetTemplate = {
        [prefix]: {
          "prefix": prefix,
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
          }, 1);
        }
      };
      addCharacter(0);
    }


    const updateCode =()=>{
      let newCode = inputCode;
      //作成されたwordsToReplace達に対してひとつひとつ処理を行う(forEach)
      //今回の場合はwordsToReplace 配列内のすべての要素(word,caseFormat,id)
      //処理を行いたい単語とその単語が何番目か特定する為のindexを引数として受け取る
      wordsToReplace.forEach((wordsToReplace)=>{
       //正規表現 (テキスト内で特定のパターンや文字列を見つけるための強力なツール)を記述
       //今回の場合はwordToReplace.wordを見つけ出すための方法です。inputCode内からwordsToReplaceの文字を見つけ出すという事
       const regex = new RegExp(wordsToReplace.word,'g')
       const replacement = createCaseFormat(wordsToReplace)|| '';
       newCode = newCode.replace(regex,replacement)
      })
      convertToJSON(newCode)
      setIsUpdated(true);
    }
    return (
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="row" bg="gray.50">
        <Box p={5}  minHeight="auto">

        
          <ExamplePage></ExamplePage>


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
