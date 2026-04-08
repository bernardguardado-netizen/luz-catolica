import React, { useState, useRef } from 'react';

const RadioPlayer = () => {
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [station, setStation] = useState('https://dreamsiteradiocp6.com/proxy/rmmessico'); // Radio Maria Mexico (Secure Proxy)
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
      audioRef.current.play()
        .then(() => {
          setPlaying(true);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error al reproducir audio:", err);
          setPlaying(false);
          setLoading(false);
          setError("No se pudo conectar con esta estación.");
        });
    }
  };

  const changeStation = (name, url) => {
    setStation(url);
    setStationName(name);
    setPlaying(false);
    setLoading(false);
    setError(null);
    if (audioRef.current) {
        audioRef.current.load();
    }
  };

  return (
    <div className="glass-panel" style={{ 
      position: 'fixed', 
      bottom: '20px', 
      right: '20px', 
      zIndex: 1000, 
      width: '280px', 
      padding: 'var(--spacing-md)',
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
      border: '2px solid var(--color-accent)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--spacing-sm)',
      backgroundColor: 'rgba(255, 255, 255, 0.95)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
        <button 
          onClick={togglePlay}
          disabled={loading}
          style={{ 
            width: '50px', 
            height: '50px', 
            borderRadius: '50%', 
            border: 'none', 
            backgroundColor: loading ? 'var(--color-border)' : 'var(--color-primary)', 
            color: 'white',
            cursor: loading ? 'wait' : 'pointer',
            fontSize: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s'
          }}
        >
          {loading ? '⏳' : (playing ? '⏸' : '▶')}
        </button>
        <div style={{ flex: 1 }}>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-accent)', fontWeight: 'bold', display: 'block' }}>RADIO EN VIVO</span>
          <span style={{ fontSize: 'var(--text-sm)', fontWeight: '600' }}>{stationName}</span>
          {error && <span style={{ fontSize: '10px', color: '#e74c3c', display: 'block' }}>{error}</span>}
          {loading && <span style={{ fontSize: '10px', color: 'var(--color-primary)', display: 'block' }}>Conectando...</span>}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 'var(--spacing-xs)' }}>
        <button 
          className="btn" 
          onClick={() => changeStation('Radio María', 'https://dreamsiteradiocp6.com/proxy/rmmessico')}
          style={{ fontSize: '10px', padding: '6px 8px', flex: 1, backgroundColor: stationName === 'Radio María' ? 'var(--color-accent)' : 'var(--color-surface)', opacity: stationName === 'Radio María' ? 1 : 0.7 }}
        >
          Radio María
        </button>
        <button 
          className="btn" 
          onClick={() => changeStation('EWTN Español', 'https://ewtn-ice.streamguys1.com/spanish-radio')}
          style={{ fontSize: '10px', padding: '6px 8px', flex: 1, backgroundColor: stationName === 'EWTN Español' ? 'var(--color-accent)' : 'var(--color-surface)', opacity: stationName === 'EWTN Español' ? 1 : 0.7 }}
        >
          EWTN Radio
        </button>
      </div>

      <audio 
        ref={audioRef} 
        src={station} 
        preload="none" 
        onEnded={() => setPlaying(false)}
        onError={() => {
          setError("Error de conexión");
          setLoading(false);
          setPlaying(false);
        }}
      />
    </div>
  );
};

export default RadioPlayer;
