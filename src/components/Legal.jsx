import React from 'react';

const Legal = () => {
  return (
    <div className="animate-fade-in glass-panel" style={{ maxWidth: '800px', margin: '0 auto', borderTop: '5px solid var(--color-primary)' }}>
      <h2 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--spacing-md)', textAlign: 'center' }}>
        Aviso Legal y de Privacidad
      </h2>
      <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-lg)', textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
        Última actualización: Abril de 2026.
      </p>

      <div style={{ lineHeight: '1.8', fontSize: 'var(--text-lg)' }}>
        <h3 style={{ fontSize: 'var(--text-2xl)', color: 'var(--color-primary)' }}>1. Información del Sitio</h3>
        <p>
          "Luz Católica" es una aplicación web de propósito espiritual sin fines de lucro, diseñada para acompañar en la vida diaria a la comunidad cristiana, enfocándose en la accesibilidad para el adulto mayor.
        </p>
        <p>
          <strong>Responsable y Autor del proyecto:</strong> Bernardo Guardado López<br/>
          <strong>Correo electrónico:</strong> bernarguardado@gmail.com<br/>
          <strong>Contacto telefónico (México):</strong> 311 740 6885
        </p>

        <h3 style={{ fontSize: 'var(--text-2xl)', color: 'var(--color-primary)', marginTop: 'var(--spacing-xl)' }}>2. Responsabilidad de la "Guía Espiritual" (Inteligencia Artificial)</h3>
        <p>
          La función denominada "Guía Espiritual" utiliza tecnología de modelos de Inteligencia Artificial (especialmente impulsados por Google Gemini) para generar respuestas autogeneradas en formato conversacional simulado.
        </p>
        <p style={{ fontWeight: 'bold' }}>
          ATENCIÓN: Ningún contenido generado por nuestra Inteligencia Artificial sustituye la guía sacramental, moral o teológica brindada directamente por un Sacerdote oficial u Obispo de la Iglesia Católica, ni sustituye ningún tipo de acompañamiento psicológico o médico profesional.
        </p>
        <p>
          Dado que los modelos algorítmicos carecen de intervención humana inmediata, Bernardo Guardado López se exime de cualquier responsabilidad civil derivada de posibles inexactitudes litúrgicas, doctrinales o consejos interpretados de manera adversa por los sistemas automatizados. 
        </p>

        <h3 style={{ fontSize: 'var(--text-2xl)', color: 'var(--color-primary)', marginTop: 'var(--spacing-xl)' }}>3. Uso de Almacenamiento Local (Cookies)</h3>
        <p>
          Al igual que la gran mayoría de sitios web modernos, Luz Católica utiliza almacenamiento puramente técnico ("Cookies de sesión" y "LocalStorage") exclusivamente en tu propio dispositivo. No recopilamos listas de seguimiento comercial ni compartimos tus perfiles de navegación con empresas de marketing. Las cookies se usan únicamente para:
        </p>
        <ul>
          <li style={{ marginLeft: 'var(--spacing-lg)' }}>Recordar si tienes encendido el "Modo Noche" o la Configuración de Tamaño de Letra grande.</li>
          <li style={{ marginLeft: 'var(--spacing-lg)' }}>Evitar que te salgan notificaciones legales repetitivamente en futuras visitas.</li>
        </ul>

        <h3 style={{ fontSize: 'var(--text-2xl)', color: 'var(--color-primary)', marginTop: 'var(--spacing-xl)' }}>4. Publicidad y Terceros (Google AdSense)</h3>
        <p>
          Este sitio web utiliza Google AdSense, un servicio de publicidad proporcionado por Google, Inc. AdSense utiliza "cookies" para mostrar anuncios basados en las visitas anteriores del usuario a este u otros sitios web.
        </p>
        <p>
          Los usuarios pueden inhabilitar la publicidad personalizada visitando la Configuración de anuncios de Google. Bernardo Guardado López no tiene control sobre las cookies que Google AdSense utiliza para mostrar publicidad personalizada.
        </p>

        <h3 style={{ fontSize: 'var(--text-2xl)', color: 'var(--color-primary)', marginTop: 'var(--spacing-xl)' }}>5. Datos Personales en el Muro de Intenciones</h3>
        <p>
          El "Muro de Intenciones" consta de participación libre, comunitaria y pública (apoyado mediante Google Firebase). Te solicitamos no proporcionar nombres completos identificables, datos bancarios, domicilios u otra información sensible. Toda la información enviada al muro pasa a ser de carácter de publicación anónima general.
        </p>
      </div>
      
      <div style={{ marginTop: 'var(--spacing-xl)', textAlign: 'center' }}>
        <p style={{ fontSize: 'var(--text-xl)', color: 'var(--color-primary)', fontStyle: 'italic' }}>
          "Para mayor gloria de Dios."
        </p>
      </div>
    </div>
  );
};

export default Legal;
