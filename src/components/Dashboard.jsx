import React from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col animate-fade-in" style={{ gap: 'var(--spacing-xl)' }}>
      
      <section className="glass-panel" style={{ borderTop: '6px solid var(--color-accent)' }}>
        <h2 style={{ fontSize: 'var(--text-2xl)' }}>Versículo de Hoy</h2>
        <p style={{ fontSize: 'var(--text-xl)', fontStyle: 'italic', marginBottom: 'var(--spacing-md)' }}>
          "El Señor es mi pastor, nada me falta. En verdes pastos me hace descansar."
        </p>
        <span style={{ fontSize: 'var(--text-lg)', fontWeight: 'bold', color: 'var(--color-primary)' }}>- Salmo 23, 1-2</span>
        <div style={{ marginTop: 'var(--spacing-lg)' }}>
          <button className="btn" onClick={() => navigate('/evangelio')} style={{ padding: '0.5rem 1rem', fontSize: 'var(--text-sm)', border: '1px solid var(--color-primary)', background: 'transparent', color: 'var(--color-primary)' }}>
            Leer Evangelio y Santoral Completo
          </button>
        </div>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-lg)' }}>
        
        <div className="glass-panel text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderTop: '5px solid var(--color-primary)' }}>
          <h3>Guía Espiritual</h3>
          <p style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--spacing-lg)', flexGrow: 1 }}>
            Tu acompañante personal de fe. Cuéntale tus penas o alegrías y recibe un mensaje de paz y oración.
          </p>
          <button className="btn btn-primary" onClick={() => navigate('/consejero')}>
            Hablar Ahora
          </button>
        </div>

        <div className="glass-panel text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3>Rezar el Rosario</h3>
          <p style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--spacing-lg)', flexGrow: 1 }}>
            Lleva paso a paso el rezo diario con nuestra guía.
          </p>
          <button className="btn btn-primary" onClick={() => navigate('/rosario')}>
            Comenzar a Rezar
          </button>
        </div>

        <div className="glass-panel text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3>Novenas</h3>
          <p style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--spacing-lg)', flexGrow: 1 }}>
            Inicia tus nueve días de oración continua.
          </p>
          <button className="btn btn-primary" onClick={() => navigate('/novenas')}>
            Ver Directorio
          </button>
        </div>

        <div className="glass-panel text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3>Historia de Santos</h3>
          <p style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--spacing-lg)', flexGrow: 1 }}>
            Descubre la biografía y legado de hombres y mujeres de Dios.
          </p>
          <button className="btn btn-primary" onClick={() => navigate('/santos')}>
            Ver Galería
          </button>
        </div>

        <div className="glass-panel text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3>Muro de Intenciones</h3>
          <p style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--spacing-lg)', flexGrow: 1 }}>
            Deja tu petición o reza por la comunidad.
          </p>
          <button className="btn btn-primary" onClick={() => navigate('/muro')}>
            Entrar al Muro
          </button>
        </div>


        <div className="glass-panel text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3>Oraciones Diarias</h3>
          <p style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--spacing-lg)', flexGrow: 1 }}>
            Encuentra consuelo en nuestras oraciones.
          </p>
          <button className="btn btn-primary" onClick={() => navigate('/oraciones')}>
            Ver Oraciones
          </button>
        </div>
      </div>
      
    </div>
  )
}

export default Dashboard
