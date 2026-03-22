import { AuthProvider } from './utils/authContext'
import AppRouter from './routes/AppRouter'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { CartProvider } from './utils/CartContext'

function App() {
  return (
    <>
      <ToastContainer containerId="login-modal" position="top-center" />
      <AuthProvider>
        <CartProvider>
          <AppRouter />
        </CartProvider>
      </AuthProvider>
    </>
  )
}

export default App