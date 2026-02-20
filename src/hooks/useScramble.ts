import { useEffect, useState, useRef } from 'react';

const CHARS = "-_~`!@#$%^&*()+=[]{}|;:,.<>?/0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function useScramble(text: string, speed: number = 40, tickStep: number = 0.3, active: boolean = true) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const iterationRef = useRef(0);

  useEffect(() => {
    if (!active) {
       // eslint-disable-next-line
       setDisplayText(text);
       return;
    }

    // Reset
    iterationRef.current = 0;
    
    intervalRef.current = setInterval(() => {
      setDisplayText(prev => 
        text
          .split("")
          .map((char, index) => {
            if (index < iterationRef.current) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iterationRef.current >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
      
      iterationRef.current += tickStep; // Slow down the reveal
    }, speed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, speed, tickStep, active]);

  return displayText;
}
