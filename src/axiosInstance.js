import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // ✅ 쿠키 자동 전송 허용
  headers: {
    "Content-Type": "application/json",
  },
});

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
