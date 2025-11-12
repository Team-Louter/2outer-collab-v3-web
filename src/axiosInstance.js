import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // ✅ 쿠키 자동 전송 허용
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터: localStorage 또는 sessionStorage에서 토큰을 찾아 Authorization 헤더에 설정
axiosInstance.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      console.warn('토큰을 읽는 동안 오류가 발생했습니다:', e);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 요청/응답 인터셉터 (선택)
axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      console.warn("인증이 만료되었거나 쿠키가 없습니다.");
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;