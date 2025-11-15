import { useState, useEffect, useCallback, useRef } from 'react';

export const useTextToSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Check if speech synthesis is available
  const isAvailable = typeof window !== 'undefined' && 'speechSynthesis' in window;

  useEffect(() => {
    if (!isAvailable) {
      console.warn('Speech Synthesis API is not available in this browser.');
    }
  }, [isAvailable]);

  const speak = useCallback((text: string) => {
    if (!isAvailable) {
      console.warn('Speech Synthesis not available');
      return;
    }

    // Stop any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.lang = 'en-US';

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsSpeaking(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [isAvailable]);

  const stop = useCallback(() => {
    if (!isAvailable) return;
    
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [isAvailable]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isAvailable) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isAvailable]);

  return {
    speak,
    stop,
    isSpeaking,
  };
};
