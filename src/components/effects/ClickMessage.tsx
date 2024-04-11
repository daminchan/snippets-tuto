import React from 'react';
import { Image, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const ClickMessage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // 初期位置をボタンの上に設定
      style={{
        position: 'absolute', // 絶対位置
        top: '0px', // 上方向に20px（ボタンの上）
        zIndex: 10, // 他の要素より前面に
        transform: 'translateX(50%)', // X軸の中心を基点にする
        left: '80%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      animate={{ opacity: [1, 0, 1] }} // 点滅アニメーションを定義
      transition={{ repeat: Infinity, duration: 1 }} // 無限に繰り返し、1秒ごとに点滅
    >
      <VStack>
        <Text
          sx={{
            transform: 'rotate(10deg) translateX(10px)', // 10度に傾ける
            display: 'inline-block', // transform を適用するために必要
          }}
        >
          click here!!
        </Text>
        <Image src="/22332633.png" alt="適切な説明文" width={50} height={50}></Image>
      </VStack>
    </motion.div>
  );
};

export default ClickMessage;
