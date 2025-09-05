import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.insiderhof.com.br'
  //baseURL: 'http://localhost:3007',
})

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('TOKEN');
    if (token) {
      config.headers!.Authorization = `Bearer ${token}`;
    }
    
    // Add project context header if available
    const currentProjectId = localStorage.getItem('currentProjectId');
    if (currentProjectId) {
      config.headers!['X-Project-Id'] = currentProjectId;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

export default api
