import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import { WorkIndexPage } from '../pages/WorkIndexPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WorkIndexPage />
  </StrictMode>,
)
