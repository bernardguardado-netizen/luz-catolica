import React, { useState, useRef } from 'react';

const RadioPlayer = () => {
  const [playing, setPlaying] = useState(false);
  const [station, setStation] = useState('https://stream.radiomaria.org/mexico'); // Radio Maria Mexico
  const [stationName, setStationName] = useState('Radio María');
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.error("Error al reproducir audio:", err));
    }
    setPlaying(!playing);
  };

  const changeStation = (name, url) => {
    setStation(url);
    setStationName(name);
    setPlaying(false);
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
      boxShadow: 'var(--shadow-lg)',
      border: '2px solid var(--color-accent)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--spacing-sm)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
        <button 
          onClick={togglePlay}
          style={{ 
            width: '50px', 
            height: '50px', 
            borderRadius: '50%', 
            border: 'none', 
            backgroundColor: 'var(--color-primary)', 
            color: 'white',
            cursor: 'pointer',
            fontSize: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {playing ? '⏸' : '▶'}
        </button>
        <div style={{ flex: 1 }}>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-accent)', fontWeight: 'bold', display: 'block' }}>RADIO EN VIVO</span>
          <span style={{ fontSize: 'var(--text-sm)', fontWeight: '600' }}>{stationName}</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 'var(--spacing-xs)' }}>
        <button 
          className="btn" 
          onClick={() => changeStation('Radio María', 'https://stream.radiomaria.org/mexico')}
          style={{ fontSize: '10px', padding: '4px 8px', flex: 1, backgroundColor: stationName === 'Radio María' ? 'var(--color-accent)' : 'transparent' }}
        >
          Radio María
        </button>
        <button 
          className="btn" 
          onClick={() => changeStation('EWTN Español', 'https://ewtn-ice.streamguys1.com/spanish-radio')}
          style={{ fontSize: '10px', padding: '4px 8px', flex: 1, backgroundColor: stationName === 'EWTN Español' ? 'var(--color-accent)' : 'transparent' }}
        >
          EWTN Radio
        </button>
      </div>

      <audio ref={audioRef} src={station} preload="none" />
    </div>
  );
};

export default RadioPlayer;
