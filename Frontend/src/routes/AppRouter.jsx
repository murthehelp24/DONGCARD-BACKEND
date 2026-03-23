import { createBrowserRouter, RouterProvider } from "react-router";
import ProtectRouter from "./ProtectRouter";
import Layout from '../layouts/Layout'
import LayoutUser from '../layouts/LayoutUser'
import Home from '../pages/public/Home'
import CardDetail from '../pages/user/CardDetail'
import Cart from '../pages/user/Cart'
import Checkout from '../pages/user/Checkout'
import History from '../pages/user/History'
import HomeUser from '../pages/user/HomeUser'
import Payment from '../pages/user/Payment'
import Wishlist from '../pages/user/Wishlist'
import Dashboard from '../pages/admin/Dashboard'
import ManageCard from '../pages/admin/ManageCard'
import ManageOrder from '../pages/admin/ManageOrder'
import NotFound from '../pages/error/NotFound'


const router = createBrowserRouter([
  // PUBLIC 
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'home', element: <Home /> },
      
    ]
  },

  {
    // USER
    element: <ProtectRouter allowRoles={['USER', 'ADMIN']} />,
    children: [
      {
        path: '/card',
        element: <LayoutUser />,
        children: [
          { index: true, element: <HomeUser /> },
          { path: ':id', element: <CardDetail /> },
          { path: 'cart', element: <Cart /> },
          { path: 'checkout', element: <Checkout /> },
          { path: 'history', element: <History /> },
          { path: 'wishlist', element: <Wishlist /> },
          { path: 'payment/:orderId', element: <Payment /> },
        ]
      }
    ]
  },

  {
    path: '/admin',
    element: <ProtectRouter allowRoles={['ADMIN']} />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'manage-cards', element: <ManageCard /> },
      { path: 'manage-orders', element: <ManageOrder /> },
    ]
  },
  { path: '*', element: <NotFound/> }
])


const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter