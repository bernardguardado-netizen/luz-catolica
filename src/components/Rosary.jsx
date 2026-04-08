import React, { useState } from 'react';

const misterios = [
  "1. La Resurrección del Hijo de Dios.",
  "2. La Ascensión del Señor al cielo.",
  "3. La Venida del Espíritu Santo.",
  "4. La Asunción de María al cielo.",
  "5. La Coronación de María como Reina del Cielo y de la Tierra."
];

const Rosary = () => {
  const [paso, setPaso] = useState(0);

  const siguiente = () => {
    if (paso < misterios.length) {
      setPaso(paso + 1);
    }
  };

  const anterior = () => {
    if (paso > 0) {
      setPaso(paso - 1);
    }
  };

  return (
    <div className="animate-fade-in flex-col items-center">
      <h2 style={{ fontSize: 'var(--text-3xl)', textAlign: 'center' }}>Misterios Gloriosos</h2>
      <p style={{ fontSize: 'var(--text-xl)', textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
        (Miércoles y Domingo)
      </p>

      <div className="glass-panel" style={{ width: '100%', maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
        {paso === 0 ? (
          <div>
            <h3 style={{ textAlign: 'center', borderBottom: '2px solid var(--color-accent)', paddingBottom: '1rem' }}>
              Inicio del Santo Rosario
            </h3>
            
            <div style={{ marginBottom: 'var(--spacing-xl)' }}>
              <h4 style={{ color: 'var(--color-primary)', fontSize: 'var(--text-xl)' }}>1. Señal de la Cruz</h4>
              <p style={{ fontSize: 'var(--text-lg)', fontStyle: 'italic' }}>
                Por la señal de la Santa Cruz, de nuestros enemigos, líbranos, Señor, Dios nuestro. En el nombre del Padre y del Hijo y del Espíritu Santo. Amén.
              </p>
            </div>

            <div style={{ marginBottom: 'var(--spacing-xl)' }}>
              <h4 style={{ color: 'var(--color-primary)', fontSize: 'var(--text-xl)' }}>2. El Credo</h4>
              <p style={{ fontSize: 'var(--text-lg)', lineHeight: '1.6' }}>
                Creo en Dios, Padre todopoderoso, Creador del cielo y de la tierra. Creo en Jesucristo, su único Hijo, nuestro Señor, que fue concebido por obra y gracia del Espíritu Santo, nació de Santa María Virgen, padeció bajo el poder de Poncio Pilato, fue crucificado, muerto y sepultado, descendió a los infiernos, al tercer día resucitó de entre los muertos, subió a los cielos y está sentado a la derecha de Dios, Padre todopoderoso. Desde allí ha de venir a juzgar a vivos y muertos. Creo en el Espíritu Santo, la santa Iglesia católica, la comunión de los santos, el perdón de los pecados, la resurrección de la carne y la vida eterna. Amén.
              </p>
            </div>

            <div style={{ marginBottom: 'var(--spacing-xl)' }}>
              <h4 style={{ color: 'var(--color-primary)', fontSize: 'var(--text-xl)' }}>3. Acto de Contrición</h4>
              <p style={{ fontSize: 'var(--text-lg)', lineHeight: '1.6' }}>
                Señor mío Jesucristo, Dios y Hombre verdadero, Creador, Padre y Redentor mío; por ser Vos quien sois, Bondad infinita, y porque os amo sobre todas las cosas, me pesa de todo corazón haberos ofendido...
              </p>
            </div>
          </div>
        ) : (
          <div>
            <h3 style={{ textAlign: 'center', fontSize: 'var(--text-2xl)', color: 'var(--color-primary)' }}>
              Misterio {paso}
            </h3>
            <p style={{ fontSize: 'var(--text-xl)', fontWeight: 'bold', margin: 'var(--spacing-md) 0', textAlign: 'center', borderBottom: '2px solid var(--color-accent)', paddingBottom: '1rem' }}>
              {misterios[paso - 1]}
            </p>
            
            <div style={{ display: 'grid', gap: 'var(--spacing-lg)', marginTop: 'var(--spacing-lg)' }}>
              <div style={{ backgroundColor: 'var(--color-surface)', padding: 'var(--spacing-md)', borderRadius: 'var(--border-radius-sm)' }}>
                <h4 style={{ margin: '0 0 var(--spacing-sm) 0', color: 'var(--color-primary)', fontSize: 'var(--text-xl)' }}>Padre Nuestro (Rezar 1 vez)</h4>
                <p style={{ fontSize: 'var(--text-lg)' }}>
                  Padre nuestro, que estás en el cielo, santificado sea tu Nombre; venga a nosotros tu reino; hágase tu voluntad en la tierra como en el cielo. Danos hoy nuestro pan de cada día; perdona nuestras ofensas, como también nosotros perdonamos a los que nos ofenden; no nos dejes caer en la tentación, y líbranos del mal. Amén.
                </p>
              </div>

              <div style={{ backgroundColor: 'var(--color-surface)', padding: 'var(--spacing-md)', borderRadius: 'var(--border-radius-sm)', borderLeft: '4px solid var(--color-accent)' }}>
                <h4 style={{ margin: '0 0 var(--spacing-sm) 0', color: 'var(--color-primary)', fontSize: 'var(--text-xl)' }}>Ave María (Rezar 10 veces)</h4>
                <p style={{ fontSize: 'var(--text-lg)' }}>
                  Dios te salve, María; llena eres de gracia; el Señor es contigo; bendita Tú eres entre todas las mujeres, y bendito es el fruto de tu vientre, Jesús. Santa María, Madre de Dios, ruega por nosotros pecadores, ahora y en la hora de nuestra muerte. Amén.
                </p>
              </div>

              <div style={{ backgroundColor: 'var(--color-surface)', padding: 'var(--spacing-md)', borderRadius: 'var(--border-radius-sm)' }}>
                <h4 style={{ margin: '0 0 var(--spacing-sm) 0', color: 'var(--color-primary)', fontSize: 'var(--text-xl)' }}>Gloria (Rezar 1 vez al final)</h4>
                <p style={{ fontSize: 'var(--text-lg)' }}>
                  Gloria al Padre, y al Hijo, y al Espíritu Santo. Como era en el principio, ahora y siempre, y por los siglos de los siglos. Amén.
                </p>
              </div>
              
              <div style={{ backgroundColor: 'var(--color-surface)', padding: 'var(--spacing-md)', borderRadius: 'var(--border-radius-sm)' }}>
                <h4 style={{ margin: '0 0 var(--spacing-sm) 0', color: 'var(--color-primary)', fontSize: 'var(--text-xl)' }}>Jaculatoria</h4>
                <p style={{ fontSize: 'var(--text-lg)' }}>
                  Oh Jesús mío, perdona nuestros pecados, líbranos del fuego del infierno, lleva al cielo a todas las almas, especialmente a las más necesitadas de tu infinita misericordia.
                </p>
              </div>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-xl)' }}>
          <button 
            className="btn" 
            onClick={anterior} 
            disabled={paso === 0}
            style={{ 
              backgroundColor: 'transparent', 
              border: '2px solid var(--color-primary)', 
              color: 'var(--color-primary)',
              opacity: paso === 0 ? 0.5 : 1
            }}
          >
            Anterior
          </button>
          <button 
            className="btn btn-primary" 
            onClick={siguiente}
            disabled={paso === misterios.length}
            style={{ opacity: paso === misterios.length ? 0.5 : 1 }}
          >
            {paso === misterios.length ? 'Finalizado' : 'Siguiente'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Rosary
