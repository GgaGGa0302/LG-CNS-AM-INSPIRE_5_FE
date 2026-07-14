import axiosInstance from './axiosInstance';

export const login = async (credentials) => {
  // 🌟 API 명세에 따라 POST 메서드를 사용하되, 파라미터는 query string으로 전달합니다.
  // post(url, body, config) 형태에서 body는 비워두고(null), config에 params를 전달합니다.
  const response = await axiosInstance.post('/api/auth/login', null, {
    params: credentials,
  });
  return response.data;
};

export const signup = async (userInfo) => {
  const response = await axiosInstance.post('/api/auth/signup', userInfo); // Expects { loginId, password, name }
  return response.data;
};


export const logout = async () => {
  const response = await axiosInstance.post('/api/auth/logout'); // Expects empty body
  return response.data;
};