import axios from 'axios';

const API_URL = 'https://stockyard-backend-o8uo.onrender.com/api/auth';

axios.defaults.withCredentials = true;

const authService = {
  register: async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  },

  logout: async () => {
    const response = await axios.post(`${API_URL}/logout`);
    return response.data;
  },

  getMe: async () => {
    const response = await axios.get(`${API_URL}/me`);
    return response.data;
  }
};

export default authService;
