import React, { useState, useEffect } from 'react';

const CatholicNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "Noticias del Mundo Católico - Luz Católica";
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    try {
      // Usando allorigins como proxy para evitar CORS
      const rssUrl = encodeURIComponent('https://www.vaticannews.va/es.rss.xml');
      const response = await fetch(`https://api.allorigins.win/get?url=${rssUrl}`);
      const data = await response.json();
      
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data.contents, "text/xml");
      const items = xmlDoc.querySelectorAll("item");
      
      const newsItems = Array.from(items).slice(0, 10).map(item => {
        // Extraer imagen de enclosure o media:content
        let imageUrl = '';
        const enclosure = item.querySelector('enclosure');
        if (enclosure) {
          imageUrl = enclosure.getAttribute('url');
        } else {
          // Fallback simple o imagen religiosa genérica
          imageUrl = 'https://images.unsplash.com/photo-1548625361-195fe2062a42?auto=format&fit=crop&q=80&w=400';
        }

        return {
          title: item.querySelector("title")?.textContent,
          link: item.querySelector("link")?.textContent,
          description: item.querySelector("description")?.textContent?.replace(/<[^>]*>?/gm, '').substring(0, 150) + "...",
          pubDate: new Date(item.querySelector("pubDate")?.textContent).toLocaleDateString('es-ES', {
            day: 'numeric', month: 'long', year: 'numeric'
          }),
          image: imageUrl
        };
      });

      setNews(newsItems);
      setLoading(false);
    } catch (err) {
      console.error("Error al cargar noticias:", err);
      setError("No pudimos conectar con el servicio de noticias del Vaticano. Por favor, intenta más tarde.");
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
        <h2 style={{ fontSize: 'var(--text-4xl)', color: 'var(--color-primary)', marginBottom: 'var(--spacing-sm)' }}>
          Actualidad de la Iglesia 📰
        </h2>
        <p style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-muted)' }}>
          Las últimas noticias desde el Vaticano y el mundo católico.
        </p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 'var(--spacing-xxl)' }}>
          <div className="spinner" style={{ marginBottom: 'var(--spacing-md)' }}></div>
          <p style={{ fontSize: 'var(--text-xl)' }}>Sintonizando con el Vaticano...</p>
        </div>
      ) : error ? (
        <div className="glass-panel text-center" style={{ borderTop: '4px solid #e74c3c' }}>
          <p style={{ fontSize: 'var(--text-xl)', color: '#e74c3c' }}>{error}</p>
          <button className="btn btn-primary" onClick={fetchNews} style={{ marginTop: 'var(--spacing-md)' }}>Reintentar</button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--spacing-xl)' }}>
          {news.map((item, index) => (
            <div key={index} className="glass-panel card-hover" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: 0, overflow: 'hidden' }}>
              <div style={{ width: '100%', height: '200px', overflow: 'hidden' }}>
                <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: 'var(--spacing-lg)', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-accent)', fontWeight: 'bold', marginBottom: 'var(--spacing-xs)' }}>
                  {item.pubDate}
                </span>
                <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--spacing-md)', color: 'var(--color-primary)', lineHeight: '1.4' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-main)', marginBottom: 'var(--spacing-xl)', flexGrow: 1, lineHeight: '1.6' }}>
                  {item.description}
                </p>
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-primary" 
                  style={{ textAlign: 'center', fontSize: 'var(--text-sm)' }}
                >
                  Leer Noticia Completa
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: 'var(--spacing-xxl)', borderTop: '1px solid var(--color-border)', paddingTop: 'var(--spacing-xl)' }}>
        <p style={{ fontStyle: 'italic', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
          Fuente: Vatican News - El servicio de información de la Santa Sede.
        </p>
      </div>
    </div>
  );
};

export default CatholicNews;
