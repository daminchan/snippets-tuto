"use client"
import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import {
    Box,
    Text,
    Flex,
    Divider,
  } from '@chakra-ui/react'
import FadeIn from '@/components/animation/fadeIn';
import DemoCodeEditorComponent from './_demoCodeEditorComponent/DemoCodeEditorComponent';
import DemoConversionFormComponents from './_demoCodeEditorComponent/_demoConversionFormComponents/DemoConversionFormComponents';



interface PreviewContainerProps {
  onButtonClick: () => void; 
  onOverLay:()=>void;
  onAppPageLinkButton:()=>void;
}

interface CodeEditorProps {
  code?: string;
  setCode?: React.Dispatch<React.SetStateAction<string>>;
}

//DemoConversionFormComponentsはインプットフォームとボタン
//DemoCodeEditorComponentsはコードを表示させる場所

const DemoCodeDisplayComponents : React.FC<PreviewContainerProps> = ({onButtonClick,onOverLay,onAppPageLinkButton}) => {
   //サンプルコードを表示させる
   const [code, setCode] = useState(`
  
   import React  from 'react';
 
   const user = () => {
     return (
       <div>
         { content }
       </div>
     );
   };`);
  //変換ボタンのisDisabledのboolean制御
  const [isButtonDisabled,setIsButtonDisabled] = useState(false);
  //変換前後のMotion.divアニメーションの制御
  const [isToggled,setIsToggled] = useState(false);
  //ステップアップちゃんの表示を制御
  const [isMessageVisible, setIsMessageVisible] = useState(true);
  //完成デモの表示を制御
  const [rightCode,setRightCode] =useState('');

  const newCode =  `
  {
    "": {
      "prefix": "",
      "body": [
        "  ",
        "  import React  from 'React';",
        "",
        "  const \${1/(.*)/\${1:/pascalcase}/}\ = () => {",
        "    return (",
        "      <div>",
        "        { content }",
        "      </div>",
        "    );",
        "  };"
      ],
      "description": ""
    }
  }`;


  

  const updateCode =()=>{
    setIsMessageVisible(false);
    setIsButtonDisabled(true);
    onButtonClick();
    onOverLay();
    onAppPageLinkButton();
    

    const addCharacter = (i:number) => {
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

   //タイピングアニメーション風に表示
   //   useEffect(() => {
  //     if (index < sampleCode.length) {
  //       setTimeout(() => {
  //         setCode((currentCode) => currentCode + sampleCode[index]);
  //         setIndex(index + 1);
  //       }, 200); // タイピングの速度を調整
  //     }
  //   }, [index, sampleCode]);
  
  //   return (
  //     <div>
  //       <h3>コード</h3>
  //       <pre><code>{code}</code></pre>
  //       <h3>プレビュー</h3>
  //       {/* ここにコードの実行結果を表示するプレビューを配置 */}
  //       <div style={{ whiteSpace: 'pre-wrap' }}>
  //         {code.includes('console.log') ? 'Hello, world!' : ''}
  //       </div>
  //     </div>
  //   );
  // };
  

    return (
      <Box>
          <Flex minHeight="auto" direction="column" p={5}>
            <Text  fontSize="2xl" fontWeight="bold" textAlign="center" fontStyle="italic" mb={2}>Live Demo</Text>
            <Text fontWeight="md" textAlign="center" color="gray.500" >ライブ デモ</Text>
          </Flex>
              <Box display="flex" justifyContent="center" alignItems="center" flexDirection="row" m={6}>
                <Box width="700px">
                <motion.div
                initial={{ scale: 1, x: 0  }} 
                animate={{ scale: isToggled ? 0.9 : 1 , x: isToggled ? 350 : 0}}
                transition={{ 
                delay:0,
                duration: 0.5,
                ease: "easeInOut"}}>
                <Box flex="1" shadow="base"  borderColor="gray.200" borderRadius="15px" p={3} m={5} bg="gray.50"  position="relative">
                <Text fontSize="lg" fontWeight="semibold" color="blue.500" fontStyle="italic" >変換前</Text>
                  <Text fontSize="lg" fontWeight="normal" fontStyle="italic" color="gray.600" mt={2}>userという文字をPascalCaseに変換するデモ</Text>
                    <Divider my={4} sx={{  borderColor: "gray.400" }}/> {/* DividerはChakra UIに含まれるコンポーネントで、水平線を描画してコンテンツを区切る */}
                      <DemoConversionFormComponents updateCode={updateCode} isDisabled={isButtonDisabled} isMessageVisible={isMessageVisible} />
                      <DemoCodeEditorComponent
                      code={code}
                      setCode={setCode}
                      />
                </Box>
                    </motion.div>
                    </Box>
                  <Box width="700px">
                  <motion.div
                      initial={{ scale: 1 ,x: 0  }}
                      animate={{ scale: isToggled ? 1.1: 1 ,x: isToggled ? -350 : 0}} 
                      transition={{ 
                      delay:0,
                      duration: 0.7, 
                      ease: "easeInOut"}}>
                  <Box flex="1" shadow="base"  borderColor="gray.200" borderRadius="15px" p={3} m={5} bg="white">
                    <Text fontSize="lg" fontWeight="semibold"  fontStyle="italic" color="#f09433" pb={2}>変換後</Text>
                    <Text fontSize="lg" fontWeight="normal" fontStyle="italic" color="gray.600" mt={2}>userという文字をPascalCaseに変換するデモ</Text>
                      <Divider my={4} sx={{  borderColor: "gray.400" }}/> {/* DividerはChakra UIに含まれるコンポーネントで、水平線を描画してコンテンツを区切る */}
                      {/* アニメーションエラーが出たらアニメーションのなしのDemoConversionFormComponentsを作る必要あるかも */}
                      <DemoConversionFormComponents updateCode={updateCode} isDisabled={isButtonDisabled} isMessageVisible={false}/>
                      <DemoCodeEditorComponent
                      code={rightCode}
                      setCode={setRightCode}
                      />
                    </Box>    
                    </motion.div>
                  </Box>
            </Box>
      </Box>
  );
};

export default DemoCodeDisplayComponents;