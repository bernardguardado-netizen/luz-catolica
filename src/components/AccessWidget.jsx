import React from 'react';
import { useAccess } from '../contexts/AccessContext';

export default function AccessWidget() {
  const { isDarkMode, toggleDarkMode, increaseFont, decreaseFont, fontMultiplier } = useAccess();

  return (
    <div 
      className="glass-panel"
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        padding: '10px',
        zIndex: 9999,
        border: '2px solid var(--color-accent)',
        borderRadius: '20px'
      }}
    >
      <button 
        onClick={toggleDarkMode}
        style={{
          background: 'none',
          border: 'none',
          fontSize: '24px',
          cursor: 'pointer',
          color: 'var(--color-primary)'
        }}
        aria-label="Alternar modo oscuro"
        title="Modo Oscuro"
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>

      <div style={{ height: '1px', background: 'var(--color-border)', width: '100%' }}></div>

      <button 
        onClick={increaseFont}
        disabled={fontMultiplier >= 1.4}
        style={{
          background: 'none',
          border: 'none',
          fontSize: '20px',
          fontWeight: 'bold',
          cursor: fontMultiplier >= 1.4 ? 'not-allowed' : 'pointer',
          color: fontMultiplier >= 1.4 ? 'var(--color-border)' : 'var(--color-primary)'
        }}
        aria-label="Aumentar tamaño de letra"
        title="Letra Más Grande"
      >
        A+
      </button>

      <button 
        onClick={decreaseFont}
        disabled={fontMultiplier <= 1.0}
        style={{
          background: 'none',
          border: 'none',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: fontMultiplier <= 1.0 ? 'not-allowed' : 'pointer',
          color: fontMultiplier <= 1.0 ? 'var(--color-border)' : 'var(--color-primary)'
        }}
        aria-label="Reducir tamaño de letra"
        title="Letra Normal"
      >
        A-
      </button>
    </div>
  );
}
