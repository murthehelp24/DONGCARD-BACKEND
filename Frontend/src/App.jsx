import { AuthProvider } from './utils/authContext'
import AppRouter from './routes/AppRouter'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <ToastContainer containerId="login-modal" position="top-center" />
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </>
  )
}

export default App