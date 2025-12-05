import { useState, useEffect, useCallback, useRef } from 'react';

export type VoiceGender = 'male' | 'female';

export const useTextToSpeech = (preferredGender: VoiceGender = 'male') => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Check if speech synthesis is available
  const isAvailable = typeof window !== 'undefined' && 'speechSynthesis' in window;

  useEffect(() => {
    if (!isAvailable) {
      console.warn('Speech Synthesis API is not available in this browser.');
      return;
    }

    // Load voices (some browsers require this)
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };

    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    };
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
    utterance.lang = 'en-GB'; // Set to British English

    // Get available voices and select based on gender preference
    const voices = window.speechSynthesis.getVoices();
    
    let preferredVoice;
    if (preferredGender === 'female') {
      // UK female voice names
      preferredVoice = voices.find(voice => 
        voice.lang.includes('en-GB') && 
        (voice.name.toLowerCase().includes('female') || 
         voice.name.toLowerCase().includes('kate') ||
         voice.name.toLowerCase().includes('serena') ||
         voice.name.toLowerCase().includes('martha') ||
         voice.name.toLowerCase().includes('fiona') ||
         voice.name.toLowerCase().includes('stephanie') ||
         voice.name.toLowerCase().includes('moira'))
      );
    } else {
      // UK male voice names
      preferredVoice = voices.find(voice => 
        voice.lang.includes('en-GB') && 
        (voice.name.toLowerCase().includes('male') || 
         voice.name.toLowerCase().includes('daniel') ||
         voice.name.toLowerCase().includes('arthur') ||
         voice.name.toLowerCase().includes('george'))
      );
    }
    
    // If no specific voice found, try any UK voice
    const ukVoice = preferredVoice || voices.find(voice => voice.lang.includes('en-GB'));
    
    if (ukVoice) {
      utterance.voice = ukVoice;
    }

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
  }, [isAvailable, preferredGender]);

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
