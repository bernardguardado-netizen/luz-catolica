import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const VerseGenerator = () => {
  const location = useLocation();
  const canvasRef = useRef(null);
  const [style, setStyle] = useState('navy'); // navy, gold, purple
  
  const saintData = location.state?.saint;
  const type = saintData ? 'saint' : 'verse';

  const content = type === 'saint' ? {
    text: saintData.specialPrayer || saintData.history.substring(0, 150) + "...",
    ref: saintData.name
  } : {
    text: "El Señor es mi pastor, nada me falta. En verdes pastos me hace descansar.",
    ref: "Salmo 23, 1-2"
  };

  const styles = {
    navy: { bg: ['#051937', '#004d7a'], text: '#FFFFFF', accent: '#E5C158' },
    gold: { bg: ['#8B7235', '#E5C158'], text: '#111A24', accent: '#FFFFFF' },
    purple: { bg: ['#2D0B3D', '#4B0082'], text: '#FFFFFF', accent: '#FFD700' }
  };

  const drawCard = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const currentStyle = styles[style];

    // Fondo
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, currentStyle.bg[0]);
    gradient.addColorStop(1, currentStyle.bg[1]);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Borde Decorativo
    ctx.strokeStyle = currentStyle.accent;
    ctx.lineWidth = 15;
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

    // Título / App Name
    ctx.fillStyle = currentStyle.accent;
    ctx.font = 'bold 30px Lora, serif';
    ctx.textAlign = 'center';
    ctx.fillText("Luz Católica", canvas.width / 2, 100);

    // Versículo (Wrap text)
    ctx.fillStyle = currentStyle.text;
    ctx.font = 'italic 45px Lora, serif';
    
    const words = content.text.split(' ');
    let line = '';
    let y = canvas.height / 2 - 40;
    const maxWidth = canvas.width - 200;
    const lineHeight = 60;

    for (let n = 0; n < words.length; n++) {
      let testLine = line + words[n] + ' ';
      let metrics = ctx.measureText(testLine);
      let testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, canvas.width / 2, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, canvas.width / 2, y);

    // Referencia
    ctx.fillStyle = currentStyle.accent;
    ctx.font = 'bold 35px Inter, sans-serif';
    ctx.fillText(content.ref, canvas.width / 2, y + 100);

    // Marca de agua
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.font = '22px Inter, sans-serif';
    ctx.fillText("www.luz-catolica.com", canvas.width / 2, canvas.height - 120);
  };

  useEffect(() => {
    drawCard();
  }, [style]);

  const downloadImage = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = `LuzCatolica_${type === 'saint' ? 'Santo' : 'Bendicion'}_${new Date().toLocaleDateString()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="animate-fade-in" style={{ textAlign: 'center' }}>
      <h2 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--spacing-md)' }}>
        Crea tu Tarjeta de Bendición 🖼️
      </h2>
      <p style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--spacing-xl)' }}>
        Personaliza el diseño y descárgala para compartirla en tus estados de WhatsApp o Facebook.
      </p>

      <div style={{ marginBottom: 'var(--spacing-lg)', display: 'flex', justifyContent: 'center', gap: 'var(--spacing-md)' }}>
        <button className="btn" onClick={() => setStyle('navy')} style={{ backgroundColor: '#051937', color: 'white' }}>Noche Azul</button>
        <button className="btn" onClick={() => setStyle('gold')} style={{ backgroundColor: '#E5C158', color: '#111A24' }}>Gualda Sacro</button>
        <button className="btn" onClick={() => setStyle('purple')} style={{ backgroundColor: '#4B0082', color: 'white' }}>Cuaresma</button>
      </div>

      <div style={{ overflowX: 'auto', marginBottom: 'var(--spacing-xl)' }}>
        <canvas 
          ref={canvasRef} 
          width={800} 
          height={800} 
          style={{ 
            maxWidth: '100%', 
            borderRadius: 'var(--border-radius-md)', 
            boxShadow: 'var(--shadow-lg)' 
          }}
        />
      </div>

      <button className="btn btn-primary" onClick={downloadImage} style={{ fontSize: 'var(--text-xl)', padding: 'var(--spacing-md) var(--spacing-xxl)' }}>
        📥 Descargar Imagen para WhatsApp
      </button>
    </div>
  );
};

export default VerseGenerator;
