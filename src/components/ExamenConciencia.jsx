import React, { useState, useEffect } from 'react';
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
  const [respuestas, setRespuestas] = useState({}); // { 'I-0': 'bien' | 'falta' }

  // Cambiar el título dinámicamente según el paso
  useEffect(() => {
    if (paso === -1) document.title = "Preparación para Confesión | Luz Católica";
    else if (paso < mandamientos.length) document.title = `Examen: Mandamiento ${mandamientos[paso].num} | Luz Católica`;
    else document.title = "Resumen de Examen de Conciencia | Luz Católica";
  }, [paso]);

  const setRespuesta = (mandamientoIdx, preguntaIdx, valor) => {
    setRespuestas({
      ...respuestas,
      [`${mandamientoIdx}-${preguntaIdx}`]: valor
    });
  };

  const isPasoCompleto = () => {
    if (paso < 0) return true;
    const currentQuestions = mandamientos[paso].preguntas;
    return currentQuestions.every((_, i) => respuestas[`${paso}-${i}`]);
  };

  const irInicio = () => {
    setRespuestas({});
    setPaso(-1);
  };

  const siguiente = () => setPaso(paso + 1);
  const anterior = () => setPaso(paso - 1);

  if (paso === -1) {
    return (
      <div className="animate-fade-in glass-panel text-center" style={{ maxWidth: '800px', margin: '0 auto', borderTop: '6px solid var(--color-primary)' }}>
        <h2 style={{ fontSize: 'var(--text-4xl)', color: 'var(--color-primary)', marginBottom: 'var(--spacing-lg)' }}>Examen de Conciencia</h2>
        <p style={{ fontSize: 'var(--text-xl)', lineHeight: '1.6', color: 'var(--color-text-main)' }}>
          Esta es una guía de meditación profunda para prepararte para el Sacramento de la Reconciliación. 
        </p>
        <div style={{ padding: 'var(--spacing-xl)', backgroundColor: 'var(--color-surface)', borderRadius: 'var(--border-radius-md)', margin: 'var(--spacing-xl) 0', border: '1px solid var(--color-border)' }}>
          <p style={{ fontSize: 'var(--text-lg)', marginBottom: 0 }}>
            <strong>Privacidad:</strong> Tus respuestas son totalmente privadas y solo se guardan temporalmente en este dispositivo mientras realizas el examen. Al salir o reiniciar, todo se borrará.
          </p>
        </div>
        <button className="btn btn-primary" onClick={siguiente} style={{ fontSize: 'var(--text-2xl)', padding: 'var(--spacing-md) var(--spacing-xxl)' }}>
          Comenzar con el 1er Mandamiento
        </button>
      </div>
    );
  }

  if (paso >= 0 && paso < mandamientos.length) {
    const current = mandamientos[paso];
    const completo = isPasoCompleto();

    return (
      <div className="animate-fade-in glass-panel" style={{ maxWidth: '850px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-xl)', borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--spacing-md)' }}>
          <div>
            <span style={{ color: 'var(--color-accent)', fontWeight: 'bold', fontSize: 'var(--text-lg)' }}>PASO {paso + 1} DE {mandamientos.length}</span>
            <h3 style={{ fontSize: 'var(--text-2xl)', margin: '5px 0' }}>{current.titulo}</h3>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: 'var(--text-3xl)', color: 'var(--color-primary)', fontWeight: 'bold' }}>{current.num}</span>
          </div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
          {current.preguntas.map((pregunta, i) => {
            const res = respuestas[`${paso}-${i}`];
            return (
              <div key={i} style={{ paddingBottom: 'var(--spacing-lg)', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                <p style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--spacing-md)', fontWeight: '500' }}>{pregunta}</p>
                <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                  <button 
                    onClick={() => setRespuesta(paso, i, 'bien')}
                    style={{ 
                      flex: 1, 
                      padding: '12px', 
                      borderRadius: 'var(--border-radius-sm)', 
                      border: res === 'bien' ? '2px solid #2ecc71' : '1px solid var(--color-border)',
                      backgroundColor: res === 'bien' ? '#eafaf1' : 'var(--color-surface)',
                      color: res === 'bien' ? '#27ae60' : 'var(--color-text-muted)',
                      cursor: 'pointer',
                      fontWeight: res === 'bien' ? 'bold' : 'normal',
                      transition: 'all 0.2s'
                    }}
                  >
                    {res === 'bien' ? '✓ He cumplido' : 'He cumplido'}
                  </button>
                  <button 
                    onClick={() => setRespuesta(paso, i, 'falta')}
                    style={{ 
                      flex: 1, 
                      padding: '12px', 
                      borderRadius: 'var(--border-radius-sm)', 
                      border: res === 'falta' ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                      backgroundColor: res === 'falta' ? '#ebf5fb' : 'var(--color-surface)',
                      color: res === 'falta' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                      cursor: 'pointer',
                      fontWeight: res === 'falta' ? 'bold' : 'normal',
                      transition: 'all 0.2s'
                    }}
                  >
                    {res === 'falta' ? '⚠ Debo confesar esto' : 'Necesito mejorar'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-xxl)' }}>
          <button className="btn" onClick={anterior} style={{ flex: 1, backgroundColor: 'transparent', border: '1px solid var(--color-border)' }}>Retroceder</button>
          <button 
            className="btn btn-primary" 
            onClick={siguiente} 
            disabled={!completo}
            style={{ 
              flex: 2, 
              opacity: completo ? 1 : 0.5, 
              cursor: completo ? 'pointer' : 'not-allowed',
              fontSize: 'var(--text-xl)'
            }}
          >
            {paso === mandamientos.length - 1 ? 'Finalizar Examen' : 'Siguiente Mandamiento'}
          </button>
        </div>
        {!completo && (
          <p style={{ textAlign: 'center', color: 'var(--color-primary)', marginTop: 'var(--spacing-md)', fontSize: 'var(--text-sm)', fontStyle: 'italic' }}>
            * Por favor, reflexiona y responde todos los puntos para continuar.
          </p>
        )}
      </div>
    );
  }

  // Vista final resumida
  const faltas = [];
  mandamientos.forEach((m, mIdx) => {
    m.preguntas.forEach((p, pIdx) => {
      if (respuestas[`${mIdx}-${pIdx}`] === 'falta') {
        faltas.push({ mandamiento: m.num, texto: p });
      }
    });
  });

  return (
    <div className="animate-fade-in glass-panel" style={{ maxWidth: '850px', margin: '0 auto', borderTop: '6px solid var(--color-accent)' }}>
      <h2 style={{ fontSize: 'var(--text-3xl)', textAlign: 'center', color: 'var(--color-primary)' }}>Resumen para tu Confesión</h2>
      
      {faltas.length > 0 ? (
        <div style={{ marginTop: 'var(--spacing-xl)' }}>
          <p style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--spacing-lg)' }}>
            Has identificado estos puntos para llevar ante el Señor en el Sacramento. Siéntete en paz, Dios te ama y te perdona:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
            {faltas.map((f, i) => (
              <div key={i} style={{ padding: 'var(--spacing-md)', backgroundColor: 'var(--color-surface)', borderRadius: 'var(--border-radius-sm)', borderLeft: '4px solid var(--color-primary)' }}>
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'bold', color: 'var(--color-primary)' }}>Mandamiento {f.mandamiento}</span>
                <p style={{ fontSize: 'var(--text-lg)', margin: '5px 0' }}>{f.texto}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: 'var(--spacing-xxl)' }}>
          <p style={{ fontSize: 'var(--text-2xl)', color: '#27ae60' }}>¡Bendito sea Dios!</p>
          <p style={{ fontSize: 'var(--text-xl)' }}>No has marcado faltas graves en este examen. ¡Sigue adelante con gozo!</p>
        </div>
      )}

      <div style={{ borderTop: '2px solid var(--color-accent)', marginTop: 'var(--spacing-xxl)', paddingTop: 'var(--spacing-xl)' }}>
        <h3 style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>Acto de Contrición (Audio)</h3>
        <AudioReader 
          title="Acto de Contrición" 
          text="Señor mío Jesucristo, Dios y Hombre verdadero, Creador, Padre y Redentor mío; por ser Vos quien sois, Bondad infinita, y porque os amo sobre todas las cosas, me pesa de todo corazón haberos ofendido; también me pesa porque podéis castigarme con las penas del infierno. Ayudado de vuestra divina gracia, propongo firmemente no volver a pecar, confesarme y cumplir la penitencia que me fuera impuesta. Amén." 
        />
        <div style={{ backgroundColor: 'var(--color-surface)', padding: 'var(--spacing-xl)', borderRadius: 'var(--border-radius-md)', marginTop: 'var(--spacing-lg)' }}>
          <p style={{ fontStyle: 'italic', fontSize: 'var(--text-xl)', textAlign: 'center', lineHeight: '1.9' }}>
            "Señor mío Jesucristo, Creador y Redentor mío; me pesa de todo corazón haberos ofendido... propongo firmemente no volver a pecar y cumplir la penitencia impuesta. Amén."
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-xxl)' }}>
        <button className="btn" onClick={() => window.print()} style={{ flex: 1, backgroundColor: 'var(--color-surface)' }}>🖨️ Imprimir Resumen</button>
        <button className="btn btn-primary" onClick={irInicio} style={{ flex: 2 }}>Reiniciar y Borrar Datos</button>
      </div>
    </div>
  );
};

export default ExamenConciencia;
