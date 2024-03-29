"useClient"
import { Box, Flex, Text } from '@chakra-ui/react';
import React, { useState }  from 'react';
import PreviewContainer from '../previewContainer/PreviewContainer';
import FadeIn from '@/components/animation/fadeIn';
import TryItOutLinkContainer from '../tryItoutLinkContainer/tryItOutLinkContainer';
import ZoomIn from '@/components/animation/zoomIn';
import { motion, AnimatePresence } from 'framer-motion';


const ExamplePage = () => {
  const [showTryOut,setShowTryOut] = useState(false);
  const [showOverLay,setOverLay] = useState(false);
  



  const handlePreviewButtonClick=()=>{
    setShowTryOut(true);
  }
  const handleOnOverLay=()=>{
    setOverLay(true);
  }

  return (
    <Box>
        <Flex minHeight="auto" direction="column" p={5}>
      <Text  fontSize="4xl" fontWeight="bold" textAlign="center"> Case Converter</Text>
      <Text fontWeight="light" textAlign="center" color="gray.500">ケースコンバーター</Text>
      </Flex>
      <Box mb={4} textAlign="center" color="gray.600">
      <Text fontSize="md" fontWeight="medium">
        このアプリは、ユーザーが入力した単語をコードスニペット構文に自動変換するツールです。
      </Text>
      <Text fontSize="md" fontWeight="medium">
        例えば、変数名や関数名をキャメルケース、スネークケース、パスカルケースなど、指定した形式に即座に変換し、コーディングの効率化をサポートします。
      </Text>
      </Box>
      <Flex minHeight="auto" direction="column" p={5}>
      <Text  fontSize="2xl" fontWeight="bold" textAlign="center" fontStyle="italic">Live Demo</Text>
      <Text fontWeight="md" textAlign="center" color="gray.500" >ライブ デモ</Text>
      </Flex>

     <FadeIn delay={0}><PreviewContainer onButtonClick={()=>{
    setShowTryOut(true);
  }} onOverLay={()=>{
    setOverLay(true);
  }}/></FadeIn>
     
     <AnimatePresence>
        {showOverLay && (
          <>
            {/* オーバーレイ */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 0.8, // アニメーションの持続時間を1秒に設定
                delay:7, // ここでアニメーション開始までの遅延時間を設定
                ease: "easeInOut"}} 
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'black',
                zIndex: 1,
              }}
            />
              <Box m="9" style={{ zIndex: 2, position: 'relative' }}>
                <ZoomIn><TryItOutLinkContainer /></ZoomIn>
              </Box>
          </>
        )}
      </AnimatePresence>
    </Box>
  );
    };

export default ExamplePage;
