import { Routes, Route, Link } from 'react-router-dom'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import Rosary from './components/Rosary'
import Prayers from './components/Prayers'
import Gospel from './components/Gospel'
import Novenas from './components/Novenas'
import IntentsWall from './components/IntentionsWall'
import SaintsHistory from './components/SaintsHistory'
import Advisor from './components/Advisor'
import AccessWidget from './components/AccessWidget'
import Legal from './components/Legal'
import VerseGenerator from './components/VerseGenerator'
import ExamenConciencia from './components/ExamenConciencia'
import './index.css'

function App() {
  return (
    <div className="app-container">
      <Header />
      <AccessWidget />
      <main className="container" style={{ padding: 'var(--spacing-xl) var(--spacing-md)', minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/rosario" element={<Rosary />} />
          <Route path="/oraciones" element={<Prayers />} />
          <Route path="/evangelio" element={<Gospel />} />
          <Route path="/novenas" element={<Novenas />} />
          <Route path="/muro" element={<IntentsWall />} />
          <Route path="/santos" element={<SaintsHistory />} />
          <Route path="/consejero" element={<Advisor />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/compartir" element={<VerseGenerator />} />
          <Route path="/examen" element={<ExamenConciencia />} />
        </Routes>
      </main>
      <footer style={{ textAlign: 'center', padding: 'var(--spacing-md)', color: 'var(--color-primary)', borderTop: '1px solid var(--color-border)' }}>
        <p style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--spacing-sm)' }}>Luz Católica - Hecho con amor para la comunidad.</p>
        <Link to="/legal" style={{ display: 'inline-block', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', textDecoration: 'underline' }}>
          Aviso Legal y Políticas de Privacidad
        </Link>
      </footer>
    </div>
  )
}

export default App
