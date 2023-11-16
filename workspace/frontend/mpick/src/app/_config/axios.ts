// axios.js
import axios from "axios";

// 인스턴스 생성
const instance = axios.create();

// 요청 인터셉터 추가
instance.interceptors.request.use(
  (config) => {
    // 요청 전에 처리해야 할 작업을 수행
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      localStorage.clear();
      window.location.href = "/";
      return Promise.reject();
    }
    return config;
  },
  (error) => {
    // 요청 전에 에러가 발생한 경우 처리하는 로직을 구현합니다.
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가
instance.interceptors.response.use(
  (response) => {
    // 응답을 받은 후 처리해야 할 작업을 수행
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    // 토큰이 만료되었거나 유효하지 않은 경우에만 토큰을 재발급 받을 수 있도록 조건을 설정
    if (error.response.status === 403) {
      // 여기서 토큰을 재발급 받는 작업을 수행

      alert("세션이 만료되어 로그아웃 되었습니다");
      localStorage.clear();
      window.location.href = "/";
      return Promise.reject(error);
    } else if (error.response.status === 500) {
      alert("세션이 만료되어 로그아웃 되었습니다");
      localStorage.clear();
      window.location.href = "/";
      return Promise.reject(error);
    } else if (error.response.status === 401) {
      alert("세션이 만료되어 로그아웃 되었습니다");
      localStorage.clear();
      window.location.href = "/";
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default instance;
