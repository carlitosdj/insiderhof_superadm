import axios from 'axios'
import { getApiUrl } from '../utils/getApiUrl'

const api = axios.create({
  // Detecta pela URL do superadm (igual ao app):
  // superadm.insiderhof.com.br → https://api.insiderhof.com.br
  // localhost → http://localhost:3107 (API do docker-compose.dev.yml)
  baseURL: getApiUrl()
})

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('TOKEN');
    if (token) {
      config.headers!.Authorization = `Bearer ${token}`;
    }

    // Routes that should NOT have tenant filtering (super-admin routes)
    const superAdminRoutes = [
      '/tenants',
      '/tenant-users',
      '/tenant-settings',
    ];

    // Check if this is a super-admin route
    const isSuperAdminRoute = superAdminRoutes.some(route =>
      config.url?.startsWith(route)
    );

    // Add tenant context header if available (but not for super-admin routes)
    const currentTenantId = localStorage.getItem('currentTenantId');
    if (currentTenantId && !isSuperAdminRoute) {
      config.headers!['x-tenant-id'] = currentTenantId;
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
