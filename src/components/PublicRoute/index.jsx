import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
    // 로그인 상태 확인 (localStorage 사용)
    const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';

    // 로그인 되어있으면 메인 페이지로 리다이렉트, 아니면 해당 페이지(로그인/회원가입) 보여줌
    return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
