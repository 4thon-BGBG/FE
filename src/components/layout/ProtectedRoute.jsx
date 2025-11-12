// src/components/ProtectedRoute.jsx
import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const ProtectedRoute = () => {
  const accessToken = localStorage.getItem('accessToken');
  const location = useLocation(); // 현재 경로 정보

  useEffect(() => {
    console.log(localStorage.getItem('accessToken'));
  }, [accessToken]);

  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
