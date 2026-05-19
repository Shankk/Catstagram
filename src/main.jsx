import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './pages/Router.jsx'
import { UserProvider } from './components/utility/UserGet.jsx'

createRoot(document.getElementById('root')).render(
  <UserProvider>
    <Router />
  </UserProvider>
)
