import React, { useState, useRef } from 'react';

const RadioPlayer = () => {
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [station, setStation] = useState('https://dreamsiteradiocp6.com/8120/stream'); // Radio Maria Mexico (Direct Stream)
  const [stationName, setStationName] = useState('Radio María');
  const [error, setError] = useState(null);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      setLoading(true);
      setError(null);
      // Forzar carga de la fuente antes de reproducir
      audioRef.current.load();
      audioRef.current.play()
        .then(() => {
          setPlaying(true);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error al reproducir audio:", err);
          setPlaying(false);
          setLoading(false);
          setError("Estación no disponible ahora.");
        });
    }
  };

  const changeStation = (name, url) => {
    setStation(url);
    setStationName(name);
    setPlaying(false);
    setLoading(false);
    setError(null);
  };

  if (!isVisible) return null;

  if (minimized) {
    return (
      <div 
        onClick={() => setMinimized(false)}
        className="animate-fade-in"
        style={{ 
          position: 'fixed', bottom: '20px', right: '20px', zIndex: 1001,
          width: '60px', height: '60px', borderRadius: '50%', 
          backgroundColor: 'var(--color-primary)', display: 'flex', 
          alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          boxShadow: 'var(--shadow-lg)', border: '2px solid var(--color-accent)'
        }}
      >
        <span style={{ fontSize: '24px' }}>{playing ? '🎵' : '📻'}</span>
        {playing && (
          <div style={{ 
            position: 'absolute', top: '-5px', right: '-5px', 
            width: '20px', height: '20px', borderRadius: '50%', 
            backgroundColor: '#2ecc71', border: '2px solid white' 
          }} />
        )}
      </div>
    );
  }

  return (
    <div className="glass-panel animate-fade-in" style={{ 
      position: 'fixed', 
      bottom: '20px', 
      right: '20px', 
      zIndex: 1000, 
      width: '300px', 
      padding: 'var(--spacing-md)',
      boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
      border: '2px solid var(--color-accent)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--spacing-sm)',
      backgroundColor: 'rgba(255, 255, 255, 0.98)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-accent)', fontWeight: 'bold' }}>RADIO LUZ EN VIVO</span>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => setMinimized(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}>─</button>
          <button onClick={() => setIsVisible(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}>×</button>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
        <button 
          onClick={togglePlay}
          disabled={loading}
          style={{ 
            width: '54px', 
            height: '54px', 
            borderRadius: '50%', 
            border: 'none', 
            backgroundColor: loading ? 'var(--color-border)' : 'var(--color-primary)', 
            color: 'white',
            cursor: loading ? 'wait' : 'pointer',
            fontSize: '22px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
          }}
        >
          {loading ? '⏳' : (playing ? '⏸' : '▶')}
        </button>
        <div style={{ flex: 1 }}>
          <span style={{ fontSize: 'var(--text-sm)', fontWeight: '700', color: 'var(--color-text-main)' }}>{stationName}</span>
          {error && <span style={{ fontSize: '11px', color: '#e74c3c', display: 'block', fontWeight: '500' }}>{error}</span>}
          {loading && <span style={{ fontSize: '11px', color: 'var(--color-primary)', display: 'block' }}>Sintonizando...</span>}
          {playing && !loading && <span style={{ fontSize: '11px', color: '#2ecc71', display: 'block' }}>● Transmitiendo</span>}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 'var(--spacing-xs)', marginTop: '4px' }}>
        <button 
          className="btn" 
          onClick={() => changeStation('Radio María', 'https://dreamsiteradiocp6.com/8120/stream')}
          style={{ fontSize: '11px', padding: '8px', flex: 1, backgroundColor: stationName === 'Radio María' ? 'var(--color-accent)' : '#f0f0f0', color: 'var(--color-primary)', fontWeight: 'bold' }}
        >
          Radio María
        </button>
        <button 
          className="btn" 
          onClick={() => changeStation('EWTN Español', 'https://ewtn-ice.streamguys1.com/spanish-radio')}
          style={{ fontSize: '11px', padding: '8px', flex: 1, backgroundColor: stationName === 'EWTN Español' ? 'var(--color-accent)' : '#f0f0f0', color: 'var(--color-primary)', fontWeight: 'bold' }}
        >
          EWTN Radio
        </button>
      </div>

      <audio 
        key={station}
        ref={audioRef} 
        src={station} 
        preload="none" 
        onEnded={() => setPlaying(false)}
        onError={() => {
          setError("Error de señal. Reintente.");
          setLoading(false);
          setPlaying(false);
        }}
      />
    </div>
  );
};

export default RadioPlayer;
