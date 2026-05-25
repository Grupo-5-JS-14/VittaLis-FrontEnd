import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster
      position="bottom-right"
      richColors
      expand={false}
      closeButton
        toastOptions={{
          style: {
              background: '#FFFFFF',
              border: '1px solid #DCE7E3',
              color: '#12312F',
              borderRadius: '16px',
              padding: '16px',
          },
        }}
    />
  </StrictMode>,
)
