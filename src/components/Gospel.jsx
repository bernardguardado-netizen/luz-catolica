import React, { useState, useEffect } from 'react';
import AudioReader from './AudioReader';

const Gospel = () => {
  const [gospelText, setGospelText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGospel = async () => {
      try {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const dateStr = `${yyyy}${mm}${dd}`;

        const url = `https://feed.evangelizo.org/v2/reader.php?date=${dateStr}&type=reading&lang=SP&content=GSP`;
        
        // Timeout de 10 segundos
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        // Evangelizo tiene cabeceras CORS '*' así que podemos conectarnos directamente sin proxy engorroso
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        
        if (!response.ok) throw new Error("Network response was not ok");
        
        const rawHtml = await response.text();
        
        if (!rawHtml) throw new Error("Empty contents from API");
        
        // Limpiamos etiquetas HTML sobrantes
        let cleanText = rawHtml
          .replace(/<br\s*\/?>/gi, '\n')
          .replace(/<a href.*<\/a>/gi, '')
          .replace(/Para recibir cada mañana el Evangelio por correo electrónico.*/gi, '')
          .replace(/Extraído de la Biblia: Libro del Pueblo de Dios.*/gi, '')
          .trim();
          
        // Decodificar entidades HTML como &quot; a " y acentos
        const textArea = document.createElement('textarea');
        textArea.innerHTML = cleanText;
        cleanText = textArea.value;
          
        setGospelText(cleanText);
        setLoading(false);
      } catch (error) {
        console.error("Fallo general al cargar evangelio:", error);
        setGospelText("Error al cargar el evangelio de hoy. No se pudo conectar con el servidor litúrgico mundial. Por favor, intenta más tarde o revisa tu conexión a internet.");
        setLoading(false);
      }
    };
    fetchGospel();
  }, []);

  const todayStr = new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="animate-fade-in glass-panel" style={{ maxWidth: '800px', margin: '0 auto', borderTop: '5px solid var(--color-accent)' }}>
      <h2 style={{ fontSize: 'var(--text-3xl)', textAlign: 'center', marginBottom: 'var(--spacing-xs)', textTransform: 'capitalize' }}>
        Evangelio de Hoy
      </h2>
      <p style={{ textAlign: 'center', fontSize: 'var(--text-lg)', color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-xl)', textTransform: 'capitalize' }}>
        {todayStr}
      </p>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>
          <p style={{ fontSize: 'var(--text-xl)' }}>Cargando lectura litúrgica oficial...</p>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--spacing-xl)' }}>
            <AudioReader title={`Evangelio del ${todayStr}`} text={gospelText} />
          </div>
          
          <div style={{ 
            padding: 'var(--spacing-xl)', 
            backgroundColor: 'var(--color-surface)', 
            borderRadius: 'var(--border-radius-md)',
            boxShadow: 'var(--shadow-subtle)',
            fontSize: 'var(--text-xl)',
            lineHeight: '1.9',
            fontFamily: 'var(--font-heading)'
          }}>
            {gospelText.split('\n').map((paragraph, idx) => (
              paragraph.trim() && <p key={idx} style={{ marginBottom: 'var(--spacing-md)' }}>{paragraph}</p>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Gospel;
