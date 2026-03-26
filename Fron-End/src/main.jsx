import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UserContext from './context/UserContext.jsx'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  // <ToastContainer >
  <BrowserRouter>
    <UserContext>
      <App />
    </UserContext>
  </BrowserRouter>
  // </ToastContainer>
)
