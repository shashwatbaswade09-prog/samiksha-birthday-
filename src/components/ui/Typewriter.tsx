import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface TypewriterProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
}

export const Typewriter = ({ text, speed = 50, onComplete, className = '' }: TypewriterProps) => {
  const [displayedText, setDisplayedText] = useState('');
  
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let i = 0;
    setDisplayedText('');
    
    const timer = setInterval(() => {
      if (i <= text.length) {
        setDisplayedText(text.substring(0, i));
        i++;
      } else {
        clearInterval(timer);
        if (onCompleteRef.current) onCompleteRef.current();
      }
    }, speed);
    
    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <motion.span 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={className}
    >
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="inline-block ml-1 w-[2px] h-[1em] bg-current align-middle"
      />
    </motion.span>
  );
};
