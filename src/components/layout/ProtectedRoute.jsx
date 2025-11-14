// src/components/ProtectedRoute.jsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const ProtectedRoute = () => {
  const accessToken = localStorage.getItem('accessToken');
  const location = useLocation(); // 현재 경로 정보

  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
