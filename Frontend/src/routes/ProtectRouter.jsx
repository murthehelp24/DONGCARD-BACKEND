import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../utils/authContext'; // นำเข้า Hook

const ProtectRouter = ({ allowRoles }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>; // ป้องกันหน้ากระพริบตอนกำลังโหลด data

  if (!user) {
    return <Navigate to="/" replace />; // หรือไป /login
  }

  if (!allowRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
export default ProtectRouter;