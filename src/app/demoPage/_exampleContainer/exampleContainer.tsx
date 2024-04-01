"useClient"
import { Box, Flex, Text } from '@chakra-ui/react';
import React, { useState }  from 'react';
import PreviewContainer from '../_previewContainer/PreviewContainer';
import FadeIn from '@/components/animation/fadeIn';
import TryItOutLinkContainer from '../_tryItoutLinkContainer/tryItOutLinkContainer';
import ZoomIn from '@/components/animation/zoomIn';
import { motion, AnimatePresence } from 'framer-motion';
import TryItOutLinkSideContainer from '../_tryItoutLinksideContainer/tryItoutLinksideContainer';


const ExampleContainer = () => {
  const [showTryOut,setShowTryOut] = useState(false);
  const [showOverLay,setOverLay] = useState(false);
  const [showTryOutSidebar,setShotTryOutSidebar] = useState(true);
  const [showTryOutSidebarDefault,setShotTryOutSidebarDefault] = useState(true);

  const handleSetOverLay=()=>{
    setOverLay(false);
    setShowTryOut(false);
    handleSetTryOutSidebar();

  }
  const handleSetTryOutSidebar =()=>{
    setShotTryOutSidebar(true);
  }

  const handlePreviewButtonClick=()=>{
    setShowTryOut(true);
  }
  const handleOnOverLay=()=>{
    setOverLay(true);
  }

  return (
    <Box>
    <FadeIn delay={0}><PreviewContainer onButtonClick={()=>{
    setShowTryOut(true);
  }} onOverLay={()=>{
    setOverLay(true);
  }}
    onSidebar={()=>{
      setShotTryOutSidebar(false)
    }}
  
  /></FadeIn>
    <AnimatePresence>
        {showOverLay && (
          <>
            {/* オーバーレイ */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              transition={{ 
                duration: 0.8, // アニメーションの持続時間を1秒に設定
                delay:6, // ここでアニメーション開始までの遅延時間を設定
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
              onClick={handleSetOverLay} 
            />
              <Box m="9" style={{
                  position: 'fixed', // 要素をビューポートに対して固定
                  top: '86%', // 上から50%の位置
                  left: '48%', // 左から50%の位置
                  transform: 'translate(-50%, -50%)', // 要素の中心を正確にビューポートの中央に合わせる
                  zIndex: 2, // オーバーレイより上に表示
                 }}>
                <ZoomIn><TryItOutLinkContainer /></ZoomIn>
              </Box>
          </>
        )}
      </AnimatePresence>
      <AnimatePresence>
      {showTryOutSidebar && (<TryItOutLinkSideContainer/>)}
      </AnimatePresence>
    </Box>
      );
    };

export default ExampleContainer;
