import React, { useState, useEffect } from 'react';
import AudioReader from './AudioReader';

const SaintsHistory = () => {
  const [saintsData, setSaintsData] = useState([]);
  const [selectedSaint, setSelectedSaint] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  // Cargar datos estáticos desde el servidor
  useEffect(() => {
    const fetchSaints = async () => {
      try {
        const response = await fetch('/data/santos.json');
        const data = await response.json();
        setSaintsData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar la base de santos:", error);
        setLoading(false);
      }
    };
    fetchSaints();
  }, []);

  const isSearching = searchTerm.trim().length > 0;
  
  let displayedSaints = saintsData;
  if (isSearching) {
    displayedSaints = saintsData.filter(saint => 
      saint.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      saint.patronage.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } else if (!showAll) {
    displayedSaints = saintsData.slice(0, 6);
  }

  if (selectedSaint) {
    return (
      <div className="animate-fade-in glass-panel" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <button 
          onClick={() => setSelectedSaint(null)}
          style={{ 
            background: 'none', border: 'none', color: 'var(--color-primary)', 
            fontSize: 'var(--text-lg)', cursor: 'pointer', marginBottom: 'var(--spacing-lg)',
            fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px'
          }}
        >
          ← Volver a la Galería de Santos
        </button>
        <h2 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--spacing-sm)' }}>
          {selectedSaint.name}
        </h2>
        <p style={{ fontSize: 'var(--text-xl)', color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-xl)', fontStyle: 'italic' }}>
          Festividad: {selectedSaint.feastDate} | Nacimiento: {selectedSaint.birthDate || 'Desconocido'}
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
          <button className="btn" onClick={() => setSelectedSaint(null)} style={{ background: 'var(--color-border)', color: 'var(--color-text-main)' }}>
            ← Volver a la lista
          </button>
        </div>

        <div className="glass-panel animate-fade-in" style={{ borderTop: '5px solid var(--color-accent)' }}>
          <AudioReader 
            title={selectedSaint.name}
            text={`Patronazgo: ${selectedSaint.patronage}. Historia: ${selectedSaint.history}. ${selectedSaint.whatDid ? "Su obra: " + selectedSaint.whatDid : ""}. Oración principal: ${selectedSaint.specialPrayer}`}
          />
          <h2 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--spacing-xs)' }}>{selectedSaint.name}</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-lg)', marginBottom: 'var(--spacing-lg)' }}>
            <strong>Festividad:</strong> {selectedSaint.feastDate} <br/>
            <strong>Patronazgo:</strong> {selectedSaint.patronage}
          </p>
          
          {selectedSaint.whyVenerated && (
            <div style={{ backgroundColor: 'var(--color-surface)', padding: 'var(--spacing-md)', borderRadius: 'var(--border-radius-sm)', marginBottom: 'var(--spacing-lg)' }}>
              <span style={{ fontWeight: 'bold', fontSize: 'var(--text-lg)', color: 'var(--color-primary)' }}>¿Por qué se le venera? </span>
              <span style={{ fontSize: 'var(--text-lg)' }}>{selectedSaint.whyVenerated}</span>
            </div>
          )}

          <h3 style={{ fontSize: 'var(--text-2xl)', marginTop: 'var(--spacing-lg)' }}>Historia</h3>
          <p style={{ fontSize: 'var(--text-xl)', lineHeight: '1.8', marginBottom: 'var(--spacing-md)' }}>
            {selectedSaint.history}
          </p>

          {selectedSaint.whatDid && (
            <p style={{ fontSize: 'var(--text-xl)', lineHeight: '1.8', marginBottom: 'var(--spacing-lg)' }}>
              <strong>Su gran obra:</strong> {selectedSaint.whatDid}
            </p>
          )}

          {selectedSaint.specialPrayer && (
            <div style={{ marginTop: 'var(--spacing-xl)', padding: 'var(--spacing-lg)', borderTop: '4px solid var(--color-accent)', backgroundColor: 'var(--color-surface)', borderRadius: 'var(--border-radius-sm)' }}>
              <h4 style={{ fontSize: 'var(--text-xl)', color: 'var(--color-primary)', marginTop: 0 }}>Oración o Frase Especial</h4>
              <p style={{ fontSize: 'var(--text-lg)', fontStyle: 'italic', marginBottom: 0 }}>
                "{selectedSaint.specialPrayer}"
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <h2 style={{ fontSize: 'var(--text-3xl)', textAlign: 'center', marginBottom: 'var(--spacing-md)' }}>
        Directorio Católico de Santos
      </h2>
      <p style={{ textAlign: 'center', fontSize: 'var(--text-lg)', marginBottom: 'var(--spacing-xl)' }}>
        Explora cientos de historias. Ingresa un nombre o profesión para buscar un santo patrono específico.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--spacing-xl)' }}>
        <input 
          type="text" 
          placeholder="Ej: San Juan, Estudiantes, Animales..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ 
            padding: 'var(--spacing-md)', 
            fontSize: 'var(--text-lg)', 
            width: '100%', 
            maxWidth: '600px',
            borderRadius: 'var(--border-radius-sm)', 
            border: '2px solid var(--color-primary)',
            outline: 'none'
          }}
        />
      </div>

      {!isSearching && !loading && !showAll && (
        <h3 style={{ textAlign: 'center', fontSize: 'var(--text-xl)', marginBottom: 'var(--spacing-md)', color: 'var(--color-text-muted)' }}>
          Algunos Santos Destacados (Usa el buscador o presiona el botón abajo para ver a todos)
        </h3>
      )}

      {loading ? (
        <p style={{ textAlign: 'center', fontSize: 'var(--text-lg)' }}>Cargando registros históricos...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--spacing-lg)' }}>
          {displayedSaints.length > 0 ? (
            displayedSaints.map((saint, index) => (
              <div 
                key={index} 
                className="glass-panel" 
                style={{ cursor: 'pointer', borderTop: '4px solid var(--color-accent)', transition: 'transform 0.2s' }}
                onClick={() => setSelectedSaint(saint)}
              >
                <h3 style={{ margin: '0 0 var(--spacing-sm) 0', fontSize: 'var(--text-2xl)' }}>
                  {saint.name}
                </h3>
                <p style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-muted)', margin: 0 }}>
                  {saint.feastDate}
                </p>
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center', gridColumn: '1 / -1', fontSize: 'var(--text-xl)' }}>
              No se encontraron santos que coincidan con tu búsqueda.
            </p>
          )}
        </div>
      )}

      {!isSearching && !loading && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--spacing-xl)' }}>
          <button 
            className="btn btn-primary" 
            onClick={() => setShowAll(!showAll)}
            style={{ padding: 'var(--spacing-md) var(--spacing-xl)', fontSize: 'var(--text-xl)' }}
          >
            {showAll ? 'Ocultar Directorio Completo' : 'Ver Todos los Santos'}
          </button>
        </div>
      )}
    </div>
  );
};

export default SaintsHistory;
