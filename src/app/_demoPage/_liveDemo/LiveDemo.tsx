'use client';
import { Box } from '@chakra-ui/react';
import React, { useState } from 'react';
import FadeIn from '@/components/animation/fadeIn';
import ZoomIn from '@/components/animation/ZoomIn';
import { motion, AnimatePresence } from 'framer-motion';
import DemoCodeDisplayComponents from './_demoCodeDisplayComponents/DemoCodeDisplayComponents';
import DemoCompletionCTA from './_demoCompletionCTA/DemoCompletionCTA';
import AppPageLinkButton from './_appPageLinkButton/AppPageLinkButton';

// DemoCodeDisplayComponentsは、デモフォームを扱うコンポーネント

// DemoCompletionCTAは、デモ完了後にユーザーをアプリケーションの特定ページへ誘導するためのコンポーネントです。
// このコンポーネントは、デモの終了と同時にオーバーレイと共に表示され、ユーザーに次のアクションを促します。

// AppPageLinkButtonは、デモの前後にユーザーが利用できるナビゲーションリンクです。
// ユーザーがオーバーレイをクリックして閉じた後、画面の右下に再度表示されることで、
// ユーザーがアプリケーション内の他のセクションへ簡単に移動できるようにします。

const LiveDemo = () => {
  const [showDemoCompletionCTA, setShowDemoCompletionCTA] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showAppPageLinkButton, setShowAppPageLinkButton] = useState(true);

  //複数のUiを管理するStateを作成する場合
  // const [uiState,setUiState]= useState({
  //   showDemoCompletionCTA:false,
  //   showOverlay:false,
  //   showAppPageLinkButton:true,

  //オーバーレイをクリックするとオーバーレイと表示されたアプリページへの誘導コンポーネントが消えて
  //右下に誘導コンポーネントを表示させる関数
  const handleSetOverLay = () => {
    setShowOverlay(false);
    setShowDemoCompletionCTA(false);
    setShowAppPageLinkButton(true);
  };

  return (
    <Box>
      <DemoCodeDisplayComponents
        onButtonClick={() => {
          setShowDemoCompletionCTA(true);
        }}
        onOverLay={() => {
          setShowOverlay(true);
        }}
        onAppPageLinkButton={() => {
          setShowAppPageLinkButton(false);
        }}
      />
      <AnimatePresence>
        {showOverlay && (
          <>
            {/* オーバーレイ */}
            {/* motion.divではなく外部にコンポーネントとして作成して読み込んだ方がいい？ */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              transition={{
                duration: 0.8,
                delay: 6,
                ease: 'easeInOut',
              }}
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
            <Box
              m="9"
              style={{
                position: 'fixed',
                top: '86%',
                left: '48%',
                transform: 'translate(-50%, -50%)',
                zIndex: 2,
              }}
            >
              <ZoomIn>
                <DemoCompletionCTA />
              </ZoomIn>
            </Box>
          </>
        )}
      </AnimatePresence>
      <AnimatePresence>{showAppPageLinkButton && <AppPageLinkButton />}</AnimatePresence>
    </Box>
  );
};

export default LiveDemo;
