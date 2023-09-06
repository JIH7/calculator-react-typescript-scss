import { useEffect } from "react";

interface KeyListenerProps {
    onKeyPress?:Function;
}

function KeyListener({ onKeyPress = () => console.log("No 'onKeyPress' function set.") } : KeyListenerProps) {
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
          onKeyPress(e.key);
        };
    
        window.addEventListener('keydown', handleKeyPress);
    
        return () => {
          window.removeEventListener('keydown', handleKeyPress);
        };
      }, [onKeyPress]);

    return null;
}

export default KeyListener
