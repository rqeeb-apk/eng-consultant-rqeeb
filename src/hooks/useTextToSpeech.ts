import { useState, useEffect, useRef, useCallback } from 'react';

interface UseTextToSpeechOptions {
  language?: 'ar' | 'en';
  onEnd?: () => void;
}

export function useTextToSpeech(options: UseTextToSpeechOptions = {}) {
  const { language = 'ar', onEnd } = options;
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentText, setCurrentText] = useState<string | null>(null);
  const [rate, setRate] = useState<number>(1);
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
  const [isSupported, setIsSupported] = useState<boolean>(true);

  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
      setIsSupported(true);
    } else {
      setIsSupported(false);
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const stop = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setIsSpeaking(false);
    setIsPaused(false);
    setCurrentText(null);
    setActiveItemIndex(null);
  }, []);

  const speak = useCallback(
    (text: string, itemIndex: number | null = null, customRate?: number) => {
      if (!synthRef.current) return;

      // Stop any current speech
      synthRef.current.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utteranceRef.current = utterance;

      // Set language
      utterance.lang = language === 'ar' ? 'ar-SA' : 'en-US';
      utterance.rate = customRate ?? rate;
      utterance.pitch = 1;

      // Try to select a natural voice if available
      const voices = synthRef.current.getVoices();
      if (voices.length > 0) {
        const langPrefix = language === 'ar' ? 'ar' : 'en';
        const matchedVoice = voices.find((v) => v.lang.startsWith(langPrefix));
        if (matchedVoice) {
          utterance.voice = matchedVoice;
        }
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
        setIsPaused(false);
        setCurrentText(text);
        setActiveItemIndex(itemIndex);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
        setCurrentText(null);
        setActiveItemIndex(null);
        if (onEnd) onEnd();
      };

      utterance.onerror = (e) => {
        // Ignore interrupted errors caused by user stopping
        if (e.error !== 'interrupted' && e.error !== 'canceled') {
          console.warn('SpeechSynthesis error:', e);
        }
        setIsSpeaking(false);
        setIsPaused(false);
        setCurrentText(null);
        setActiveItemIndex(null);
      };

      synthRef.current.speak(utterance);
    },
    [language, rate, onEnd]
  );

  const pause = useCallback(() => {
    if (synthRef.current && isSpeaking && !isPaused) {
      synthRef.current.pause();
      setIsPaused(true);
    }
  }, [isSpeaking, isPaused]);

  const resume = useCallback(() => {
    if (synthRef.current && isPaused) {
      synthRef.current.resume();
      setIsPaused(false);
    }
  }, [isPaused]);

  const changeRate = useCallback(
    (newRate: number) => {
      setRate(newRate);
      if (isSpeaking && currentText) {
        speak(currentText, activeItemIndex, newRate);
      }
    },
    [isSpeaking, currentText, activeItemIndex, speak]
  );

  return {
    isSupported,
    isSpeaking,
    isPaused,
    currentText,
    activeItemIndex,
    rate,
    speak,
    stop,
    pause,
    resume,
    changeRate,
  };
}
