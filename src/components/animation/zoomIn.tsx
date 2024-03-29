import { motion } from 'framer-motion';

interface ZoomInProps{
    children:React.ReactNode;
    delay?:number;
}


const ZoomIn : React.FC<ZoomInProps> = ({ children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0,scale: 1,y:0 }} // 初期スケールは1（変更なし）
        animate={{ opacity: 1,scale: 1.5 ,y:-350}} // アニメーションでスケールを1.5に変更（50%拡大）
        transition={{ 
        duration: 0.8, // アニメーションの持続時間を1秒に設定
        delay:7, // ここでアニメーション開始までの遅延時間を設定
        ease: "easeInOut"}} // アニメーションの持続時間は0.5秒
    >
    {children}
    </motion.div>
  );
  
  export default ZoomIn;