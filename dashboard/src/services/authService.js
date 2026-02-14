import axios from 'axios';

const API_URL = 'http://localhost:3002/api/auth';

// IMPORTANT: This allows cookies to be sent with requests
axios.defaults.withCredentials = true;

const authService = {
  // Get current user
  getMe: async () => {
    const response = await axios.get(`${API_URL}/me`);
    return response.data;
  },

  // Logout user
  logout: async () => {
    const response = await axios.post(`${API_URL}/logout`);
    return response.data;
  }
};

export default authService;
