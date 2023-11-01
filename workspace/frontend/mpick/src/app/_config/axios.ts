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
    }
    return config;
  },
  (error) => {
    // 요청 전에 에러가 발생한 경우 처리하는 로직을 구현합니다.
    return Promise.reject(error);
  }
);

export default instance;
