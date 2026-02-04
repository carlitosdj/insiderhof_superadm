import api from './api'

export interface TenantFilters {
  status?: string
  plan?: string
  search?: string
  page?: number
  take?: number
}

export interface CreateTenantData {
  name: string
  slug: string
  domain?: string
  customDomain?: string
  plan: string
  contactEmail: string
  contactPhone?: string
  description?: string
  logo?: string
  logoDark?: string
  logoMini?: string
  logoMiniDark?: string
  primaryColor?: string
  secondaryColor?: string
}

export interface UpdateTenantData {
  name?: string
  slug?: string
  domain?: string
  customDomain?: string
  plan?: string
  status?: string
  contactEmail?: string
  contactPhone?: string
  description?: string
  logo?: string
  logoDark?: string
  logoMini?: string
  logoMiniDark?: string
  primaryColor?: string
  secondaryColor?: string
}

// Get all tenants
export const getTenants = (filters?: TenantFilters) => {
  const params = new URLSearchParams()

  if (filters?.status) {
    params.append('status', filters.status)
  }
  if (filters?.plan) {
    params.append('plan', filters.plan)
  }
  if (filters?.search) {
    params.append('search', filters.search)
  }
  if (filters?.page) {
    params.append('page', String(filters.page))
  }
  if (filters?.take) {
    params.append('take', String(filters.take))
  }

  const url = `/tenants?${params.toString()}`;
  console.log('🌐 [TenantsService] Chamando API:', url, 'com filtros:', filters);

  return api.get(url).then(response => {
    console.log('🌐 [TenantsService] Resposta recebida:', response);
    return response;
  }).catch(error => {
    console.error('🌐 [TenantsService] Erro na requisição:', error);
    throw error;
  });
}

// Get single tenant
export const getTenant = (id: number) => {
  return api.get(`/tenants/${id}`)
}

// Get tenant by domain
export const getTenantByDomain = (domain: string) => {
  return api.get(`/tenants/by-domain/${domain}`)
}

// Create tenant
export const createTenant = (data: CreateTenantData) => {
  return api.post('/tenants', data)
}

// Update tenant
export const updateTenant = (id: number, data: UpdateTenantData) => {
  return api.patch(`/tenants/${id}`, data)
}

// Delete tenant
export const deleteTenant = (id: number) => {
  return api.delete(`/tenants/${id}`)
}

// Get tenant metrics
export const getTenantMetrics = (id: number) => {
  return api.get(`/tenants/${id}/metrics`)
}
