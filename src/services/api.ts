import axios from 'axios'

//console.log("AXIOS", axios.defaults.headers.common)
const api = axios.create({
  baseURL: 'https://api.insiderhof.com.br' 
  //baseURL: 'http://localhost:3000',
})

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('TOKEN');
    if (token) {
      config.headers!.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api
