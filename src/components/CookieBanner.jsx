import React, { useState, useEffect } from 'react';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verificar si el usuario ya aceptó las cookies previamente
    const consent = localStorage.getItem('cookiesAccepted');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '0',
      left: '0',
      width: '100%',
      backgroundColor: 'var(--color-primary)',
      color: '#ffffff',
      padding: 'var(--spacing-md) var(--spacing-xl)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 -4px 10px rgba(0,0,0,0.2)',
      zIndex: 10000,
      flexWrap: 'wrap',
      gap: 'var(--spacing-md)'
    }}>
      <div style={{ flex: 1, minWidth: '300px' }}>
        <p style={{ margin: 0, fontSize: 'var(--text-base)' }}>
          <strong>Aviso de Cookies:</strong> Este sitio utiliza almacenamiento local para recordar tu configuración visual (letras grandes y tema oscuro) y ofrecerte una experiencia cálida. Al navegar, consideraremos que aceptas nuestras <a href="/legal" style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>Políticas de Privacidad</a>.
        </p>
      </div>
      <div>
        <button 
          onClick={handleAccept}
          style={{
            backgroundColor: 'var(--color-accent)',
            color: 'var(--color-primary)',
            border: 'none',
            padding: '10px 24px',
            fontSize: 'var(--text-base)',
            fontWeight: 'bold',
            borderRadius: 'var(--border-radius-sm)',
            cursor: 'pointer'
          }}
        >
          Entendido, aceptar
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
