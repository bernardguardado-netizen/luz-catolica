import React, { useState } from 'react';
import AudioReader from './AudioReader';

const novenaData = {
  "Novena a San Judas Tadeo": {
    description: "Para causas difíciles y desesperadas.",
    oracionInicial: "Apóstol gloriosísimo de Nuestro Señor Jesucristo, aclamado por los fieles con el dulce título de abogado de los casos desesperados, hazme sentir tu poderosa intercesión aliviando la gravísima necesidad en que me encuentro. Amén.",
    dias: {
      1: "Día 1: San Judas Tadeo, tú que fuiste llamado por Jesús para seguirle, concédeme la gracia de responder con fidelidad a mi vocación cristiana. (Pide tu gracia).",
      2: "Día 2: Oh Apóstol glorioso, que sellaste con tu sangre tu fe en Jesucristo, obténme la gracia de estar dispuesto a sufrir por amor a Dios. (Pide tu gracia).",
      3: "Día 3: San Judas, maestro de la verdad, líbrame del error y ayúdame a propagar la verdadera fe. (Pide tu gracia).",
      4: "Día 4: Compasivo San Judas, alivia mis penas y enséñame a consolar a los que sufren. (Pide tu gracia).",
      5: "Día 5: Tú que fuiste pariente divino de Jesús y María, consígueme una gran devoción a los Sagrados Corazones. (Pide tu gracia).",
      6: "Día 6: Santo modelo de humildad, ayúdame a imitar a Jesús manso y humilde de corazón. (Pide tu gracia).",
      7: "Día 7: Castísimo Apóstol, consígueme la pureza de cuerpo y alma necesaria para ver a Dios. (Pide tu gracia).",
      8: "Día 8: Desapegado de todo lo terreno, alcánzame la virtud de la pobreza de espíritu. (Pide tu gracia).",
      9: "Día 9: Protector de los que confían en ti, acompáñame todos los días de mi vida y en la hora de mi muerte. (Pide tu gracia)."
    }
  },
  "Novena al Espíritu Santo": {
    description: "Para pedir sus siete dones maravillosos.",
    oracionInicial: "Ven, Oh Espíritu Santo, llena los corazones de tus fieles y enciende en ellos el fuego de tu amor. Envía tu Espíritu y todo será creado y renovarás la faz de la tierra. Amén.",
    dias: {
      1: "Día 1: Espíritu Santo, don del Padre para alabarlo: ven y enséñanos a rezar de corazón.",
      2: "Día 2: Espíritu de Temor de Dios, fortaléceme para que nunca me separe de ti.",
      3: "Día 3: Espíritu de Piedad, inspírame a tratar a Dios como un buen Padre.",
      4: "Día 4: Espíritu de Ciencia, ilumíname para ver a Dios en el mundo y no ser engañado por lo efímero.",
      5: "Día 5: Espíritu de Fortaleza, dame el valor de superar todos los obstáculos de la vida.",
      6: "Día 6: Espíritu de Consejo, guíame en mis decisiones para que siempre elija la voluntad de Dios.",
      7: "Día 7: Espíritu de Entendimiento, abre mi mente para comprender los misterios sublimes de la fe.",
      8: "Día 8: Espíritu de Sabiduría, dirígeme siempre hacia el verdadero camino, la verdad y la vida.",
      9: "Día 9: Oh divino Espíritu, mora eternamente en mí y haz mi corazón dócil a tus divinas inspiraciones."
    }
  },
  "Novena a la Virgen del Carmen": {
    description: "Por la protección de su Santo Escapulario.",
    oracionInicial: "Oh Virgen María, Madre de Dios y Madre de los pecadores, y especial Protectora de los que visten tu sagrado Escapulario, te ruego me alcances de tu amado Hijo el perdón de mis pecados. Amén.",
    dias: {
      1: "Día 1: Oh Reina del Cielo, alcánzanos una pureza inmaculada como la de tu propio corazón.",
      2: "Día 2: Madre del Carmelo, líbranos de la pereza y el letargo en nuestras prácticas espirituales.",
      3: "Día 3: Estrella del Mar, condúcenos siempre hacia el puerto seguro que es Jesucristo.",
      4: "Día 4: Refugio en las tentaciones, cúbrenos con el manto de tu protección maternal.",
      5: "Día 5: Consuelo de los afligidos, sé luz en nuestras horas de mayor oscuridad.",
      6: "Día 6: Patrona de los atribulados, escúchanos e intercede por la petición que hoy te hacemos.",
      7: "Día 7: Socorro invariable, enséñanos a vivir con paciencia todas nuestras pruebas.",
      8: "Día 8: Intercesora nuestra, no nos abandones en el momento crucial de nuestro encuentro final con Dios.",
      9: "Día 9: Oh bondadosa Virgen del Carmen, haznos dignos de ser contados entre tus hijos para siempre."
    }
  }
};

const Novenas = () => {
  const [selectedNovena, setSelectedNovena] = useState(null);
  const [currentDay, setCurrentDay] = useState(1);

  if (selectedNovena) {
    const data = novenaData[selectedNovena];
    return (
      <div className="animate-fade-in glass-panel" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <button 
          onClick={() => setSelectedNovena(null)}
          style={{ 
            background: 'none', border: 'none', color: 'var(--color-primary)', 
            fontSize: 'var(--text-lg)', cursor: 'pointer', marginBottom: 'var(--spacing-lg)',
            fontWeight: 'bold'
          }}
        >
          ← Volver al Directorio
        </button>
        <h2 style={{ fontSize: 'var(--text-3xl)' }}>{selectedNovena}</h2>
        
        <div style={{ display: 'flex', gap: 'var(--spacing-sm)', margin: 'var(--spacing-md) 0', flexWrap: 'wrap' }}>
          {[1,2,3,4,5,6,7,8,9].map(day => (
            <button 
              key={day}
              onClick={() => setCurrentDay(day)}
              className="btn"
              style={{
                padding: 'var(--spacing-sm) var(--spacing-md)',
                backgroundColor: currentDay === day ? 'var(--color-primary)' : 'transparent',
                color: currentDay === day ? '#fff' : 'var(--color-primary)',
                border: '1px solid var(--color-primary)'
              }}
            >
              Día {day}
            </button>
          ))}
        </div>

        <AudioReader
          title={`Novena Día ${currentDay}`}
          text={`Oración inicial: ${data.oracionInicial}. Reflexión del día: ${data.dias[currentDay]}`}
        />

        <div style={{ marginTop: 'var(--spacing-md)', padding: 'var(--spacing-md)', backgroundColor: 'var(--color-surface)', borderRadius: 'var(--border-radius-sm)' }}>
          <h4 style={{ fontSize: 'var(--text-xl)', color: 'var(--color-primary)' }}>Oración Inicial de Todos los Días:</h4>
          <p style={{ fontSize: 'var(--text-lg)', fontStyle: 'italic' }}>{data.oracionInicial}</p>
        </div>
        
        <div style={{ marginTop: 'var(--spacing-xl)' }}>
          <h3 style={{ fontSize: 'var(--text-2xl)' }}>Reflexión del Día {currentDay}</h3>
          <p style={{ fontSize: 'var(--text-lg)', lineHeight: '1.8' }}>
            {data.dias[currentDay]}
          </p>
        </div>
        
        <div style={{ marginTop: 'var(--spacing-xl)', padding: 'var(--spacing-md)', borderTop: '2px solid var(--color-border)' }}>
          <p style={{ fontSize: 'var(--text-lg)', fontWeight: 'bold' }}>
            Rezar un Padre Nuestro, un Ave María y un Gloria en honor a esta Novena.
          </p>
        </div>
      </div>
    );
  }

  const novenaListKeys = Object.keys(novenaData);

  return (
    <div className="animate-fade-in">
      <h2 style={{ fontSize: 'var(--text-3xl)', textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
        Directorio de Novenas
      </h2>
      <p style={{ textAlign: 'center', fontSize: 'var(--text-lg)', marginBottom: 'var(--spacing-xl)' }}>
        Acompaña tu petición con nueve días consecutivos de oración ininterrumpida.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
        {novenaListKeys.map((title, index) => (
          <div 
            key={index} 
            className="glass-panel" 
            style={{ cursor: 'pointer', borderLeft: '4px solid var(--color-primary)' }}
            onClick={() => { setSelectedNovena(title); setCurrentDay(1); }}
          >
            <h3 style={{ margin: 0, fontSize: 'var(--text-2xl)' }}>{title}</h3>
            <p style={{ margin: 'var(--spacing-sm) 0 0 0', fontSize: 'var(--text-lg)', color: 'var(--color-text-muted)' }}>
              {novenaData[title].description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Novenas;
