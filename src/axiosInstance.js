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
    // 로그인 요청에서의 401 에러는 인터셉터에서 처리하지 않음
    const isLoginRequest = err.config?.url?.includes("/auth/login");

    if (err.response?.status === 401 && !isLoginRequest) {
      console.warn("인증이 만료되었거나 쿠키가 없습니다.");
      // 로그인 상태 제거
      localStorage.removeItem("isLoggedIn");
      // 세션 만료 플래그 설정
      localStorage.setItem("sessionExpired", "true");
      // 필요시 로그인 페이지로 리다이렉트
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
