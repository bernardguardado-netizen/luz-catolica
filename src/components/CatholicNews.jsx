import React, { useState, useEffect } from 'react';

const CatholicNews = () => {
  const [news, setNews] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingStory, setLoadingStory] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "Noticias del Mundo Católico - Luz Católica";
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const rssUrl = encodeURIComponent('https://www.vaticannews.va/es.rss.xml');
      const response = await fetch(`https://api.allorigins.win/get?url=${rssUrl}`);
      const data = await response.json();
      
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data.contents, "text/xml");
      const items = xmlDoc.querySelectorAll("item");
      
      const newsItems = Array.from(items).slice(0, 15).map(item => {
        // Extraer imagen de media:content (más preciso para Vatican News)
        let imageUrl = '';
        const mediaContent = item.getElementsByTagName('media:content')[0];
        const enclosure = item.querySelector('enclosure');
        
        if (mediaContent) {
          imageUrl = mediaContent.getAttribute('url');
        } else if (enclosure) {
          imageUrl = enclosure.getAttribute('url');
        } else {
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
      setError("No pudimos conectar con el Vaticano. Pulsa para reintentar.");
      setLoading(false);
    }
  };

  const readFullStory = async (article) => {
    setLoadingStory(true);
    setSelectedArticle(article);
    try {
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(article.link)}`;
      const response = await fetch(proxyUrl);
      const data = await response.json();
      
      const parser = new DOMParser();
      const doc = parser.parseFromString(data.contents, "text/html");
      
      // Vaticano usa .section__content o .vatican-news-story__content
      const contentPart = doc.querySelector('.section__content') || doc.querySelector('.vatican-news-story__content') || doc.body;
      const paragraphs = contentPart.querySelectorAll('p');
      
      const text = Array.from(paragraphs)
        .map(p => p.textContent.trim())
        .filter(t => t.length > 50) // Filtrar avisos cortos o menús
        .join('\n\n');
      
      setSelectedArticle({
        ...article,
        fullText: text || "No pudimos extraer el texto completo de esta noticia. Puedes leerla en el sitio oficial."
      });
      setLoadingStory(false);
    } catch (err) {
      console.error("Error al leer la noticia completa:", err);
      setLoadingStory(false);
    }
  };

  if (selectedArticle) {
    return (
      <div className="animate-fade-in glass-panel" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <button 
          onClick={() => setSelectedArticle(null)}
          style={{ 
            background: 'none', border: 'none', color: 'var(--color-primary)', 
            fontSize: 'var(--text-lg)', cursor: 'pointer', marginBottom: 'var(--spacing-lg)',
            fontWeight: 'bold'
          }}
        >
          ← Volver a Noticias
        </button>

        <img 
          src={selectedArticle.image} 
          alt={selectedArticle.title} 
          style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: 'var(--border-radius-md)', marginBottom: 'var(--spacing-xl)' }} 
        />
        
        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-accent)', fontWeight: 'bold' }}>{selectedArticle.pubDate}</span>
        <h2 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--spacing-md)', color: 'var(--color-primary)' }}>{selectedArticle.title}</h2>
        
        <div style={{ marginBottom: 'var(--spacing-xl)' }}>
          <AudioReader title={selectedArticle.title} text={selectedArticle.fullText || selectedArticle.description} />
        </div>
        
        {loadingStory ? (
          <div style={{ textAlign: 'center', padding: 'var(--spacing-xxl)' }}>
            <p>Preparando lectura...</p>
          </div>
        ) : (
          <div style={{ fontSize: 'var(--text-xl)', lineHeight: '1.8', whiteSpace: 'pre-line', color: 'var(--color-text-main)' }}>
            {selectedArticle.fullText}
            <div style={{ marginTop: 'var(--spacing-xxl)', paddingTop: 'var(--spacing-xl)', borderTop: '1px solid var(--color-border)' }}>
              <a href={selectedArticle.link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>
                Leer fuente original en Vatican News
              </a>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
        <h2 style={{ fontSize: 'var(--text-4xl)', color: 'var(--color-primary)', marginBottom: 'var(--spacing-sm)' }}>
          Actualidad de la Iglesia 📰
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--spacing-md)', alignItems: 'center' }}>
            <p style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-muted)', margin: 0 }}>
            Actualidad desde el Vaticano y el mundo católico.
            </p>
            <button key="refresh" onClick={fetchNews} className="btn" style={{ padding: '6px 12px', fontSize: '12px', border: '1px solid var(--color-primary)', fontWeight: 'bold' }}>🔄 Actualizar canal en vivo</button>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 'var(--spacing-xxl)' }}>
          <p style={{ fontSize: 'var(--text-xl)' }}>Conectando con Roma...</p>
        </div>
      ) : error ? (
        <div className="glass-panel text-center">
          <p>{error}</p>
          <button className="btn btn-primary" onClick={fetchNews}>Reintentar</button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--spacing-xl)' }}>
          {news.map((item, index) => (
            <div key={index} className="glass-panel card-hover" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: 0, overflow: 'hidden' }}>
              <div style={{ width: '100%', height: '220px', overflow: 'hidden' }}>
                <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: 'var(--spacing-lg)', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-accent)', fontWeight: 'bold', marginBottom: 'var(--spacing-xs)' }}>
                  {item.pubDate}
                </span>
                <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--spacing-md)', color: 'var(--color-primary)', lineHeight: '1.4' }}>
                  {item.title}
                </h3>
                <button 
                  onClick={() => readFullStory(item)} 
                  className="btn btn-primary" 
                  style={{ width: '100%', fontSize: 'var(--text-sm)' }}
                >
                  Leer Noticia Completa
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CatholicNews;
