import api from '../app/axiosConfig';

const authService = {
  login: async (email, password) => {
    return api.post('/auth/login', { email, password });
  },

  register: async (userData) => {
    return api.post('/auth/register', userData);
  },

  forgotPassword: async (email) => {
    return api.post(`/auth/forgot-password?email=${email}`);
  },

  resetPassword: async (token, newPassword) => {
    return api.post(`/auth/reset-password?token=${token}&newPassword=${newPassword}`);
  },

  
};

export default authService;
