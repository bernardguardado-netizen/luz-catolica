import React, { useState } from 'react';
import AudioReader from './AudioReader';

const mandamientos = [
  {
    num: "I",
    titulo: "Amarás a Dios sobre todas las cosas",
    preguntas: [
      "¿He dedicado tiempo a la oración todos los días?",
      "¿He puesto otras cosas (dinero, trabajo, placer) por delante de mi fe?",
      "¿He dudado voluntariamente de la fe o de las enseñanzas de la Iglesia?"
    ]
  },
  {
    num: "II",
    titulo: "No tomarás el nombre de Dios en vano",
    preguntas: [
      "¿He usado el nombre de Dios, de la Virgen o de los santos sin respeto?",
      "¿He jurado en falso o sin necesidad?"
    ]
  },
  {
    num: "III",
    titulo: "Santificarás las fiestas",
    preguntas: [
      "¿He faltado a Misa de forma voluntaria los domingos o días de precepto?",
      "¿He trabajado innecesariamente en domingo dificultando mi descanso y oración?"
    ]
  },
  {
    num: "IV",
    titulo: "Honrarás a tu padre y a tu madre",
    preguntas: [
      "¿He sido despectivo o desobediente con mis padres o superiores?",
      "¿He descuidado mis deberes hacia mi familia y seres queridos?"
    ]
  },
  {
    num: "V",
    titulo: "No matarás",
    preguntas: [
      "¿He guardado rencor o deseos de venganza contra alguien?",
      "¿He lastimado a otros con mis palabras o acciones?",
      "¿He descuidado mi propia salud o la de otros?"
    ]
  },
  {
    num: "VI y IX",
    titulo: "Pureza de corazón y acciones",
    preguntas: [
      "¿He buscado pensamientos, miradas o acciones impuras?",
      "¿He respetado la dignidad de mi propio cuerpo y la de los demás?"
    ]
  },
  {
    num: "VII y X",
    titulo: "No robarás ni codiciarás lo ajeno",
    preguntas: [
      "¿He tomado algo que no me pertenece?",
      "¿He sido envidioso de los bienes o éxitos de los demás?"
    ]
  },
  {
    num: "VIII",
    titulo: "No dirás falso testimonio ni mentirás",
    preguntas: [
      "¿He mentido para ocultar mis faltas o para dañar a otros?",
      "¿He hablado mal de los demás a sus espaldas (chisme)?"
    ]
  }
];

const ExamenConciencia = () => {
  const [paso, setPaso] = useState(-1); // -1: Inicio, 0-7: Mandamientos, 8: Final
  const [mejoras, setMejoras] = useState([]);

  const toggleMejora = (pregunta) => {
    if (mejoras.includes(pregunta)) {
      setMejoras(mejoras.filter(m => m !== pregunta));
    } else {
      setMejoras([...mejoras, pregunta]);
    }
  };

  const irInicio = () => setPaso(-1);
  const siguiente = () => setPaso(paso + 1);
  const anterior = () => setPaso(paso - 1);

  if (paso === -1) {
    return (
      <div className="animate-fade-in glass-panel text-center" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ fontSize: 'var(--text-3xl)', color: 'var(--color-primary)' }}>Guía para la Confesión</h2>
        <p style={{ fontSize: 'var(--text-lg)', margin: 'var(--spacing-xl) 0' }}>
          Este examen de conciencia es una herramienta privada y compasiva para prepararte para el sacramento de la Reconciliación. 
          Nada de lo que selecciones se guardará en internet.
        </p>
        <button className="btn btn-primary" onClick={siguiente} style={{ fontSize: 'var(--text-xl)' }}>
          Comenzar Examen
        </button>
      </div>
    );
  }

  if (paso >= 0 && paso < mandamientos.length) {
    const current = mandamientos[paso];
    return (
      <div className="animate-fade-in glass-panel" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-lg)' }}>
          <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>Mandamiento {current.num}</span>
          <span style={{ color: 'var(--color-text-muted)' }}>{paso + 1} / {mandamientos.length}</span>
        </div>
        <h3 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--spacing-xl)' }}>{current.titulo}</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
          {current.preguntas.map((pregunta, i) => (
            <div 
              key={i} 
              onClick={() => toggleMejora(pregunta)}
              style={{ 
                padding: 'var(--spacing-md)', 
                backgroundColor: mejoras.includes(pregunta) ? 'var(--color-accent)' : 'var(--color-surface)',
                color: mejoras.includes(pregunta) ? 'var(--color-primary)' : 'inherit',
                borderRadius: 'var(--border-radius-sm)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontWeight: mejoras.includes(pregunta) ? 'bold' : 'normal',
                border: '1px solid var(--color-border)'
              }}
            >
              {pregunta}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-xxl)' }}>
          <button className="btn" onClick={anterior} style={{ flex: 1 }}>Anterior</button>
          <button className="btn btn-primary" onClick={siguiente} style={{ flex: 2 }}>
            {paso === mandamientos.length - 1 ? 'Ver Resumen' : 'Siguiente'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in glass-panel" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ fontSize: 'var(--text-3xl)', textAlign: 'center' }}>Resumen de Meditación</h2>
      
      {mejoras.length > 0 ? (
        <div style={{ marginTop: 'var(--spacing-xl)' }}>
          <p style={{ fontSize: 'var(--text-lg)' }}>Te sugiero reflexionar sobre estos puntos para tu próxima confesión:</p>
          <ul style={{ padding: 'var(--spacing-lg)', backgroundColor: 'var(--color-surface)', borderRadius: 'var(--border-radius-sm)' }}>
            {mejoras.map((m, i) => <li key={i} style={{ marginBottom: 'var(--spacing-sm)', fontSize: 'var(--text-lg)' }}>• {m}</li>)}
          </ul>
        </div>
      ) : (
        <p style={{ textAlign: 'center', fontSize: 'var(--text-xl)', margin: 'var(--spacing-xl) 0' }}>
          ¡Gloria a Dios! Sigues el camino con mucha devoción. Prepárate para agradecer su misericordia.
        </p>
      )}

      <div style={{ borderTop: '2px solid var(--color-accent)', marginTop: 'var(--spacing-xl)', paddingTop: 'var(--spacing-xl)' }}>
        <h3 style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>Acto de Contrición</h3>
        <AudioReader 
          title="Acto de Contrición" 
          text="Señor mío Jesucristo, Dios y Hombre verdadero, Creador, Padre y Redentor mío; por ser Vos quien sois, Bondad infinita, y porque os amo sobre todas las cosas, me pesa de todo corazón haberos ofendido; también me pesa porque podéis castigarme con las penas del infierno. Ayudado de vuestra divina gracia, propongo firmemente no volver a pecar, confesarme y cumplir la penitencia que me fuera impuesta. Amén." 
        />
        <p style={{ fontStyle: 'italic', fontSize: 'var(--text-xl)', marginTop: 'var(--spacing-md)', lineHeight: '1.8' }}>
          "Señor mío Jesucristo, Dios y Hombre verdadero, Creador, Padre y Redentor mío; por ser Vos quien sois, Bondad infinita, y porque os amo sobre todas las cosas, me pesa de todo corazón haberos ofendido... propongo firmemente no volver a pecar."
        </p>
      </div>

      <button className="btn btn-primary" onClick={irInicio} style={{ width: '100%', marginTop: 'var(--spacing-xl)' }}>
        Reiniciar (Borrar todo)
      </button>
    </div>
  );
};

export default ExamenConciencia;
