import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PreguntasProvider } from './contexts/Preguntas.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PreguntasProvider>
      <App />
    </PreguntasProvider>
  </StrictMode>,
)
