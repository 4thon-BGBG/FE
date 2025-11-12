import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 기본 URL 설정
  headers: {
    'Content-Type': 'application/json',
  },
});

// 매 요청마다 최신 토큰을 동적으로 설정하고,
// 로그인/회원가입 등 인증 엔드포인트에는 Authorization 헤더를 제거
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('access_token');

  const url = config.url || '';
  const isAuthEndpoint = url.includes('/login') || url.includes('/register');

  if (!config.headers) config.headers = {};

  if (accessToken && !isAuthEndpoint)
    config.headers.Authorization = `Bearer ${accessToken}`;
  else delete config.headers.Authorization;

  return config;
});

// 응답 인터셉터: 401 에러 발생 시 로그아웃 처리
api.interceptors.response.use(
  (response) => {
    // 성공적인 응답은 그대로 반환
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      // 기존의 만료된 access_token을 스토리지에서 제거
      localStorage.removeItem('access_token');

      // 사용자를 로그인 페이지로 리디렉션
      window.location.href = '/login'; // 혹은 사용하는 라우터의 push/replace 메서드 사용
    }
    return Promise.reject(error);
  },
);
export default api;
