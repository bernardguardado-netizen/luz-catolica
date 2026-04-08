import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const Advisor = () => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Intentamos leer la clave oculta de las variables de entorno
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  useEffect(() => {
    // Add initial greeting on load
    if (chatHistory.length === 0) {
      setChatHistory([{
        role: 'model',
        text: '¡Paz y bien! Soy tu consejero espiritual. Cuéntame, ¿cómo te sientes el día de hoy o qué aflicción tienes en tu corazón?'
      }]);
    }
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const newHistory = [...chatHistory, { role: 'user', text: userInput }];
    setChatHistory(newHistory);
    setUserInput('');
    setLoading(true);

    if (!apiKey) {
      setChatHistory([...newHistory, { role: 'error', text: 'Error del servidor: El creador de la página aún no ha configurado la Llave API general.' }]);
      setLoading(false);
      return;
    }

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

      const prompt = `Eres un consejero espiritual católico sabio, muy compasivo, amoroso y empático. Un usuario te ha dicho estar sintiéndose de esta manera: "${newHistory[newHistory.length-1].text}". 
      Responde en español de forma cortés, dirígete con amor. Dale una reflexión de 2 párrafos. Incluye un versículo bíblico exacto y sugiérele rezar una oración común católica que tenga relación con su dolor o sentimiento. No uses formato raro, solo texto limpio.`;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();

      setChatHistory([...newHistory, { role: 'model', text: responseText }]);
    } catch (error) {
      console.error(error);
      setChatHistory([...newHistory, { role: 'error', text: `Debug Error de Google: ${error.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: 'var(--spacing-md)' }}>
        <h2 style={{ fontSize: 'var(--text-3xl)', margin: 0 }}>Consejería Espiritual</h2>
      </div>
      
      <p style={{ fontSize: 'var(--text-lg)', fontStyle: 'italic', marginBottom: 'var(--spacing-lg)' }}>
        "Confía en el Señor con todo tu corazón..." (Prov. 3:5). Cuéntame tus preocupaciones; estoy aquí para escucharte y guiarte mediante la Palabra Dios.
      </p>

      <div className="glass-panel" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)', maxHeight: '60vh', overflowY: 'auto', marginBottom: 'var(--spacing-lg)', padding: 'var(--spacing-lg)' }}>
        {chatHistory.map((item, index) => (
          <div key={index} style={{ 
            alignSelf: item.role === 'user' ? 'flex-end' : 'flex-start',
            backgroundColor: item.role === 'user' ? 'var(--color-primary)' : (item.role === 'error' ? '#ffeeee' : 'var(--color-surface)'),
            color: item.role === 'user' ? '#ffffff' : (item.role === 'error' ? 'red' : 'var(--color-text-main)'),
            padding: 'var(--spacing-md) var(--spacing-lg)',
            borderRadius: 'var(--border-radius-lg)',
            maxWidth: '85%',
            borderBottomRightRadius: item.role === 'user' ? '0' : 'var(--border-radius-lg)',
            borderBottomLeftRadius: item.role === 'model' || item.role === 'error' ? '0' : 'var(--border-radius-lg)',
            boxShadow: 'var(--shadow-subtle)',
            border: item.role === 'user' ? 'none' : '1px solid var(--color-border)'
          }}>
            <p style={{ margin: 0, fontSize: 'var(--text-lg)', whiteSpace: 'pre-wrap' }}>
              {item.text}
            </p>
          </div>
        ))}
        {loading && (
          <div style={{ alignSelf: 'flex-start', backgroundColor: 'var(--color-surface)', padding: 'var(--spacing-md) var(--spacing-lg)', borderRadius: 'var(--border-radius-lg)' }}>
            <p style={{ margin: 0, fontSize: 'var(--text-lg)', fontStyle: 'italic', color: 'var(--color-text-muted)' }}>Reflexionando...</p>
          </div>
        )}
      </div>

      <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
        <input 
          type="text" 
          placeholder="Escribe cómo te sientes..." 
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          style={{ flexGrow: 1, padding: 'var(--spacing-md)', fontSize: 'var(--text-lg)', borderRadius: 'var(--border-radius-sm)', border: '2px solid var(--color-primary)' }}
          disabled={loading}
        />
        <button type="submit" className="btn btn-primary" disabled={loading || !userInput.trim()}>
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Advisor;
