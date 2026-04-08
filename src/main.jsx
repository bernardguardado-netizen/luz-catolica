import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AccessProvider } from './contexts/AccessContext'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AccessProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AccessProvider>
  </StrictMode>,
)
