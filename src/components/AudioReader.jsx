import React, { useState, useEffect } from 'react';

export default function AudioReader({ text, title }) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Cleanup on unmount or text change
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [text]);

  const togglePlay = () => {
    if (!window.speechSynthesis) {
      alert("Lo sentimos, tu navegador no soporta lectura en voz alta.");
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      // Create new utterance
      const fullText = `${title ? title + '. ' : ''}${text}`;
      const utterance = new SpeechSynthesisUtterance(fullText);
      
      // Try to find a Spanish voice
      const voices = window.speechSynthesis.getVoices();
      const spanishVoice = voices.find(v => v.lang.startsWith('es'));
      if (spanishVoice) {
        utterance.voice = spanishVoice;
      }
      
      utterance.lang = 'es-LA'; // Latin American Spanish
      utterance.rate = 0.9; // Slightly slower for better comprehension by seniors
      utterance.pitch = 1.0;

      utterance.onend = () => {
        setIsPlaying(false);
      };

      utterance.onerror = (e) => {
        console.error("Audio error", e);
        setIsPlaying(false);
      };

      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  return (
    <button 
      onClick={togglePlay}
      className="btn btn-primary"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 16px',
        fontSize: 'var(--text-base)',
        borderRadius: '30px',
        marginBottom: 'var(--spacing-md)',
        backgroundColor: isPlaying ? '#DB4437' : 'var(--color-primary)'
      }}
      aria-label={isPlaying ? "Detener lectura" : "Escuchar lectura"}
    >
      {isPlaying ? '⏹️ Detener Audio' : '🔊 Escuchar Texto'}
    </button>
  );
}
