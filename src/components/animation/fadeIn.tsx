// components/FadeIn.js
import { motion } from 'framer-motion';

interface FadeInProps {
    children: React.ReactNode;
    delay?: number; // delayはオプショナルプロパティとして定義
  }


const FadeIn : React.FC<FadeInProps> = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0.02, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.9, // デュレーションを1秒に設定
    delay,
    ease: "easeInOut" // イージング関数をeaseInOutに設定
  }}
  >
    {children}
  </motion.div>
);

export default FadeIn;

