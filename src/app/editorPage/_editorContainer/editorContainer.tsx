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
    IconButton,
    Divider,
    useToast,
  } from '@chakra-ui/react'
  import { Input } from '@chakra-ui/react'
  import Editor from 'react-simple-code-editor';
  import { highlight, languages } from 'prismjs/components/prism-core';
  import Prism from 'prismjs';
  import 'prismjs/components/prism-clike';
  import 'prismjs/components/prism-javascript';
  import 'prismjs/themes/prism-okaidia.css';
  import { DeleteIcon, AddIcon , CopyIcon } from '@chakra-ui/icons';
  import StepOneAnimationMessage from '@/components/animation/stepOneAnimationMessage';
  import StepTwoAnimationMessage from '@/components/animation/stepTwoAnimationMessage';
  import StepThreeAnimationMessage from '@/components/animation/stepThreeAnimationMessage';
  import { AnimatePresence ,motion,useAnimation } from 'framer-motion';

import ActionButton from './_codeDisplayComponents/_actionButton/ActionButton';
import CodeEditor from './_codeDisplayComponents/_codeEditor/CodeEditor';
import ConversionInput from './_conversionFormComponents/conversionInput/ConversionInput';
import WordForm from './_conversionFormComponents/wordForm/WordForm';
import ConversionButton from './_conversionFormComponents/conversionButton/ConversionButton';

  


  interface wordsToReplace{
    word:string;
    caseFormat:string;
    id:string;//uuidがstring型を求める為
    inputOrder: number;
  }


const EditorContainer = () => {
    
    //エディターに表示・読み込ませるためのコードを管理
    const [snippetOutput,setSnippetOutput]=useState('');
    const [inputCode,setInputCode]=useState('');
    //変換フォームを管理
    const [wordsToReplace,setWordsToReplace]=useState<wordsToReplace[]>([{word:'',caseFormat:'default',id:uuidv4(),inputOrder:1}]);
    //スニペット、prefixを管理
    const [prefix, setPrefix] = useState('');
    const [snippetName, setSnippetName] = useState('');
    //アニメーションアイコンナビの動作・CSSの管理
    const [isIconVisible, setIsIconVisible] = useState(true);
    const [isIconVisibleTwo, setIsIconVisibleTwo] = useState(false);
    const [isIconVisibleThree, setIsIconVisibleThree] = useState(false);
    const [isLoading,setIsLoading] =useState(false);
    const [isUpdated,setIsUpdated]=useState(false);
    //トースト関連を管理
    const toastIdRef = useRef<string | number | undefined>();
    const toast = useToast();

    //アイコンを表示させるための関数
    // const handleValueChange = (code:string) => {
    //   setInputCode(code);
    //   // inputCode が空でない場合はアイコンを非表示にする
    //   setIsIconVisible(code === '');
    //   setIsIconVisibleTwo(code !== '');
    //   setIsIconVisibleThree(false);
    // };


    //ワード更新関数
    //動的なリストの予定なのでindexは不適切…？
    //あとでUUIDを使用してIDで識別して処理する関数が適切？
    const handleWordChange=(index:number,value:string)=>{
      //正規表現で英数字
      const pattern = /^[a-zA-Z0-9]*$/;
      if (pattern.test(value)) {
      // 入力値が英数字のみの場合は、状態を更新
      
      const newWord = [...wordsToReplace];
        newWord[index].word = value;
        setWordsToReplace(newWord);
      //ステップアップちゃんの動作更新  
        setIsIconVisible(false);
        setIsIconVisibleTwo(value === '');
        setIsIconVisibleThree(value !== '');
      } else {
        // 英数字以外が含まれている場合は、何もしない or エラーメッセージを表示
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


    //ケースフォーマット更新関数
    const handleCaseFormatChange=(index:number,value:string)=>{
        const newCaseFormat = [...wordsToReplace]
        newCaseFormat[index].caseFormat =value;
        setWordsToReplace(newCaseFormat)
    };
    //IndexではなくIDを参照して配列のinputOrderを更新
    const handleInputOrderChange=(valueAsNumber: number,id:string)=>{
        const updatedWordSettings = wordsToReplace.map((element)=>{
            if(element.id ===id){
                return {...element,inputOrder:valueAsNumber}
            }else{
                return element;
            }
        })
        setWordsToReplace(updatedWordSettings)
    };

        // Prefixの変更を扱う関数
    const handlePrefixChange = (value: string) => {
      setPrefix(value);
    };
    // スニペット名の変更を扱う関数
    const handleSnippetChange = (value: string) => {
      setSnippetName(value);
    };

    //追加
    const addForm =()=>{
        const newWordsToReplace:wordsToReplace= {word:'',caseFormat:'default',id:uuidv4(),inputOrder: wordsToReplace.length + 1}
        setWordsToReplace([...wordsToReplace,newWordsToReplace])
    };
    //削除
    //あとで復習
    const removeForm =(id:string)=>{
        // 指定されたIDを持つフォームを除外して新しい配列を作成
        const updatedWordsToReplace = wordsToReplace.filter(form => form.id !== id);
        // inputOrderを更新
        const reorderedWordsToReplace = updatedWordsToReplace.map((form, index) => ({
          ...form,inputOrder: index + 1, // 1から始まる連番に更新
        }));
        setWordsToReplace(reorderedWordsToReplace);
    };

    //変換フォーマットを扱う関数
    const createCaseFormat=(wordsToReplace:wordsToReplace)=>{
      switch(wordsToReplace.caseFormat){
            case 'Pascal':
                return  `\${${wordsToReplace.inputOrder}/(.*)/\${${wordsToReplace.inputOrder}:/pascalcase}/}`; 
            case 'default':
                return  `\${${wordsToReplace.inputOrder}}`;
            }
    };

    //Json形式変換を扱う関数
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
            addCharacter(i + 1); 
            //currentCode・・・現在のコード、つまり現在のコードに生成されたJsonStringコードのi番目を渡している。
            //それを繰り返すことで動的にコードが生成されているようにみせている。
          }, 1);
        }else{
          setIsLoading(false)
        }
      };
      addCharacter(0);
      //アニメーション無しの場合はこちら
      // setSnippetOutput(jsonString)
      // setIsLoading(false)
    }

    //変換関数
    const updateCode =()=>{
      //入力催促用のトースト
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
      //置換処理
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
      };

      
    //入力を初期化ボタン
    const clearCode =()=>{
      const newWordsToReplace:wordsToReplace= {word:'',caseFormat:'default',id:uuidv4(),inputOrder:1,}
      setWordsToReplace([newWordsToReplace])
      setInputCode('')
      setSnippetOutput('')
      setPrefix('')
      setSnippetName('')
      setIsUpdated(false)
    }
//コピー機能
    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(snippetOutput);
        toast({
          title: 'コピー成功',
          description: "コピー完了!!",
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: "top", 
        });
      } catch (err) {
        console.error('クリップボードへのコピーに失敗しました', err);
        toast({
          title: 'コピー失敗',
          description: "クリップボードへのコピーに失敗しました。",
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: "top", 
        });
      }
    };
//リファクタリング
// CodeEditorコンポーネントに関わる記述
const highlightWithPrism = (code: string) => Prism.highlight(code, Prism.languages.javascript, 'javascript');
const handleCodeChange = (code: string) => {
  if (isUpdated) {
    //復習メモ：if文は真偽値に基づいて条件分岐を行う
    //true であれば、if 文の中のブロックが実行。false の場合は、else ブロック（存在する場合）が実行。
    //この場合はisUpdatedの真偽値を参照
    setSnippetOutput(code);
  } else {
    setInputCode(code);
  }
  setIsIconVisible(code === '');
  setIsIconVisibleTwo(code !== '');
  setIsIconVisibleThree(false);
};

return (
      <Box>
          <Box display="flex" justifyContent="center"  flexDirection="row" bg="gray.50" as='form' width="100%"  alignItems="flex-start" gap={5}>
            <Box width="700px" maxWidth="700px"  position="relative" display="inline-block"p={3} m={0}>
            <Box shadow="lg" borderRadius="sm" position="absolute" zIndex="0" height="96%" width="90%" border="32px solid rgba(74, 74, 74, 0.25)" left="70px" top="30px" />
              <Box shadow="lg" borderColor="gray.200" bg="white" p={10} m={0} position="relative">
                <Flex justifyContent="space-between">
                <Text fontSize="lg" fontWeight="semibold">変換したいコードを張り付ける</Text>
                <AnimatePresence> 
                {isIconVisible && <StepOneAnimationMessage/>}
                {isIconVisibleTwo && <StepTwoAnimationMessage />} 
                {isIconVisibleThree && <StepThreeAnimationMessage/>}
                </AnimatePresence>
                <ActionButton onClear={clearCode} onCopy={copyToClipboard}/>
                </Flex>
                <Divider my={4} sx={{  borderColor: "gray.400" }}/> {/* DividerはChakra UIに含まれるコンポーネントで、水平線を描画してコンテンツを区切る */}
                {/* エディターを扱うコンポーネントだけどわざわざする必要ない気もする。むしろ読む側としてはEditorのままここでCodeEditorコンポーネントをやっている事をした方が分かりやす気もする */}
                <CodeEditor
                  inputCode={inputCode}
                  snippetOutput={snippetOutput}
                  onCodeChange={handleCodeChange}
                  isUpdated={isUpdated}
                  highlight={highlightWithPrism}
                /></Box>
              </Box>
              {/* 変換フォーム */}
              <Flex flex="1" direction="column" p={3} m={0} maxWidth="700px">
            <Box width="500px" position="relative" display="inline-block">
              <Box
                shadow="lg"
                borderRadius="sm"
                position="absolute"
                zIndex="0"
                height="100%" 
                width="100%" 
                border="15px solid rgba(74, 74, 74, 0.25)" 
                left="12px" 
                top="12px" 
              />  
              <Box shadow="lg" borderColor="gray.200" borderRadius="3px" p={10} bg="white" flex="1" position="relative">
                <Flex justifyContent="space-between">
                  <Text fontSize="lg" fontWeight="semibold">変換フォーム</Text>
                  <HStack>
                    <ConversionButton
                      isLoading={isLoading}
                      onAddForm={addForm}
                      onUpdateCode={updateCode}
                    />
                  </HStack>
                </Flex>
                <Divider my={4} sx={{ borderColor: "gray.400" }}/>
                <ConversionInput
                  prefix={prefix}
                  snippetName={snippetName}
                  onPrefixChange={handlePrefixChange}
                  onSnippetChange={handleSnippetChange}
                />
                {wordsToReplace.map((word, index) => (
                  <WordForm
                    key={index}
                    word={word.word}
                    id={word.id}
                    caseFormat={word.caseFormat}
                    inputOrder={word.inputOrder}
                    onWordChange={(value) => handleWordChange(index, value)}
                    onCaseFormatChange={(value) => handleCaseFormatChange(index, value)}
                    onInputOrderChange={(value, id) => handleInputOrderChange(value, id)}
                    onRemove={() => removeForm(word.id)}
                  />
                ))}
              </Box>
            </Box>
          </Flex>
      </Box>
    </Box>
  )
}
export default EditorContainer
