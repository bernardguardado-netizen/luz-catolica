import React, { useState } from 'react'

const oraciones = [
  {
    titulo: "Padre Nuestro",
    texto: "Padre nuestro que estás en el cielo, santificado sea tu Nombre; venga a nosotros tu reino; hágase tu voluntad en la tierra como en el cielo. Danos hoy nuestro pan de cada día; perdona nuestras ofensas, como también nosotros perdonamos a los que nos ofenden; no nos dejes caer en la tentación, y líbranos del mal. Amén."
  },
  {
    titulo: "Ave María",
    texto: "Dios te salve, María; llena eres de gracia; el Señor es contigo; bendita Tú eres entre todas las mujeres, y bendito es el fruto de tu vientre, Jesús. Santa María, Madre de Dios, ruega por nosotros pecadores, ahora y en la hora de nuestra muerte. Amén."
  },
  {
    titulo: "Gloria",
    texto: "Gloria al Padre, y al Hijo, y al Espíritu Santo. Como era en el principio, ahora y siempre, y por los siglos de los siglos. Amén."
  },
  {
    titulo: "Credo (Símbolo de los Apóstoles)",
    texto: "Creo en Dios, Padre todopoderoso, Creador del cielo y de la tierra. Creo en Jesucristo, su único Hijo, nuestro Señor, que fue concebido por obra y gracia del Espíritu Santo, nació de Santa María Virgen, padeció bajo el poder de Poncio Pilato, fue crucificado, muerto y sepultado, descendió a los infiernos, al tercer día resucitó de entre los muertos, subió a los cielos y está sentado a la derecha de Dios, Padre todopoderoso. Desde allí ha de venir a juzgar a vivos y muertos. Creo en el Espíritu Santo, la santa Iglesia católica, la comunión de los santos, el perdón de los pecados, la resurrección de la carne y la vida eterna. Amén."
  },
  {
    titulo: "La Salve",
    texto: "Dios te salve, Reina y Madre de misericordia, vida, dulzura y esperanza nuestra; Dios te salve. A Ti llamamos los desterrados hijos de Eva; a Ti suspiramos, gimiendo y llorando, en este valle de lágrimas. Ea, pues, Señora, abogada nuestra, vuelve a nosotros esos tus ojos misericordiosos; y después de este destierro muéstranos a Jesús, fruto bendito de tu vientre. ¡Oh clementísima, oh piadosa, oh dulce Virgen María! Ruega por nosotros, Santa Madre de Dios, para que seamos dignos de alcanzar las promesas de Nuestro Señor Jesucristo. Amén."
  },
  {
    titulo: "Ángelus",
    texto: "El Ángel del Señor anunció a María. Y concibió por obra del Espíritu Santo. (Ave María). He aquí la esclava del Señor. Hágase en mí según tu palabra. (Ave María). Y el Verbo se hizo carne. Y habitó entre nosotros. (Ave María). Ruega por nosotros, Santa Madre de Dios, para que seamos dignos de alcanzar las promesas de nuestro Señor Jesucristo. Amén."
  },
  {
    titulo: "Alma de Cristo",
    texto: "Alma de Cristo, santifícame. Cuerpo de Cristo, sálvame. Sangre de Cristo, embriágame. Agua del costado de Cristo, lávame. Pasión de Cristo, confórtame. ¡Oh, buen Jesús!, óyeme. Dentro de tus llagas, escóndeme. No permitas que me aparte de Ti. Del enemigo maligno, defiéndeme. En la hora de mi muerte, llámame. Y mándame ir a Ti. Para que con tus santos te alabe. Por los siglos de los siglos. Amén."
  },
  {
    titulo: "Oración a San Miguel Arcángel",
    texto: "San Miguel Arcángel, defiéndenos en la batalla. Sé nuestro amparo contra la perversidad y asechanzas del demonio. Reprímale Dios, pedimos suplicantes, y tú príncipe de la milicia celestial arroja al infierno con el divino poder a Satanás y a los otros espíritus malignos que andan dispersos por el mundo para la perdición de las almas. Amén."
  }
];

const Prayers = () => {
  const [seleccionada, setSeleccionada] = useState(null);

  if (seleccionada) {
    return (
      <div className="animate-fade-in glass-panel" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <button 
          onClick={() => setSeleccionada(null)}
          style={{ 
            background: 'none', border: 'none', color: 'var(--color-primary)', 
            fontSize: 'var(--text-lg)', cursor: 'pointer', marginBottom: 'var(--spacing-md)',
            fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px'
          }}
        >
          ← Volver a la lista
        </button>
        <h2 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--spacing-lg)' }}>
          {seleccionada.titulo}
        </h2>
        <p style={{ fontSize: 'var(--text-xl)', lineHeight: '1.8' }}>
          {seleccionada.texto}
        </p>
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      <h2 style={{ fontSize: 'var(--text-3xl)', textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
        Oraciones Comunes
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--spacing-lg)' }}>
        {oraciones.map((oracion, index) => (
          <div 
            key={index} 
            className="glass-panel" 
            style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
            onClick={() => setSeleccionada(oracion)}
          >
            <h3 style={{ margin: 0, fontSize: 'var(--text-2xl)', textAlign: 'center' }}>
              {oracion.titulo}
            </h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Prayers
