import { motion } from 'framer-motion';

interface FadeProps {
  children: React.ReactNode;
  delay?: number; // delayはオプショナルプロパティとして定義
}

const Fade: React.FC<FadeProps> = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.6, // デュレーションを1秒に設定
      delay,
      ease: 'easeInOut', // イージング関数をeaseInOutに設定
    }}
  >
    {children}
  </motion.div>
);

export default Fade;
