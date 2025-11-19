import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // ✅ 쿠키 자동 전송 허용
  headers: {
    "Content-Type": "application/json",
  },
});

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      console.warn("인증이 만료되었거나 쿠키가 없습니다.");
      // 로그인 상태 제거
      localStorage.removeItem('isLoggedIn');
      // 필요시 로그인 페이지로 리다이렉트
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;