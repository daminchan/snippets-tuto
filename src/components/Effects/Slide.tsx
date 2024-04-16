import { motion } from 'framer-motion';

interface SlideProps {
  children: React.ReactNode;
  isToggled?: boolean;
  toggledScale?: number;
  toggledX?: number;
}

const Slide: React.FC<SlideProps> = ({ children, isToggled, toggledScale = 0.9, toggledX = 350 }) => (
  <motion.div
    initial={{ scale: 1, x: 0 }}
    animate={{ scale: isToggled ? toggledScale : 1, x: isToggled ? toggledX : 0 }}
    transition={{
      delay: 0,
      duration: 0.5,
      ease: 'easeInOut',
    }}
  >
    {children}
  </motion.div>
);

export default Slide;
