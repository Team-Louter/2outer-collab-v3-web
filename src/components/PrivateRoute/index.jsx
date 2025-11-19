import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    // localStorage를 사용하여 로그인 상태 확인
    const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
