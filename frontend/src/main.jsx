import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { PhonesProvider } from './context/phones.context.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <PhonesProvider>
      <App />
    </PhonesProvider>
  </BrowserRouter>
)
