import axios from 'axios'

const api = axios.create({
  // PRODUÇÃO: API roda no Docker (porta 4001), Nginx faz proxy para api.insiderhof.com.br
  baseURL: 'https://api.insiderhof.com.br'

  // DEV LOCAL: Descomentar para desenvolvimento (API no Docker em localhost:4001)
  // baseURL: 'http://localhost:4001',
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
      config.headers!['x-project-id'] = currentProjectId;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

export default api

// User UTM Tracking API
export const getUserUTMHistory = (userId: number) => {
  return api.get(`/user/${userId}/utm`)
}

// User Lead History API
export const getUserLeadHistory = (userId: number) => {
  return api.get(`/user/${userId}/lead-history`)
}
