import React  from 'react';
import { Image, Text, VStack } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

//無理やり対応している。
//初期値にアイコンが変な所に出ているためアニメーションの開始を遅らせて対応
const StepTwoAnimationMessage = () => {
  return (
    <motion.div
    initial={{ opacity: 0, }} // 初期位置をボタンの上に設定
    style={{ 
    position: 'absolute', // 絶対位置
    bottom: '93%',
    left:'100%', // 上方向に20px（ボタンの上）
    zIndex: 9, // 他の要素より前面に
    transform: 'translateX(50%)', // X軸の中心を基点にする
   
    justifyContent: 'center',
    alignItems: 'center',
}}
    animate={{ opacity: [0, 1, 0] }} // 点滅アニメーションを定義
    transition={{ repeat: Infinity, duration: 1 ,delay:0}} // 無限に繰り返し、1秒ごとに点滅
    
  >
    <VStack>
      <Text
       sx={{
        transform: 'rotate(-15deg) translateX(-15px)', // 10度に傾ける
        display: 'inline-block', // transform を適用するために必要
      }}
      >Step.2!!</Text>
      <Image src='/22332633.png' width={50} height={50}></Image>
      </VStack>
    </motion.div>
  );
};

export default StepTwoAnimationMessage;