import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { PhonesProvider } from './context/phones.context.jsx'
import { AuthProvider } from './context/auth.context.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <PhonesProvider>
        <App />
      </PhonesProvider>
    </AuthProvider>
  </BrowserRouter>
)
