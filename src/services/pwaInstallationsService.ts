import api from './api';

/** Resumo de instalações do app (PWA) por tenant — GET /pwa/installations/summary */
export interface TenantInstallationsSummary {
  tenantId: number;
  tenantName: string;
  tenantSlug: string;
  domain?: string;
  customDomain?: string;
  logoMini?: string;
  total: number;
  students: number;
  active: number;
  mobile: number;
  desktop: number;
  android: number;
  ios: number;
}

export interface PwaInstallation {
  id: number;
  tenantId: number;
  userId: number;
  userName: string | null;
  userEmail: string | null;
  installId: string;
  deviceClass: 'mobile' | 'desktop';
  platform: 'android' | 'ios' | 'ipados' | 'windows' | 'macos' | 'linux' | 'outro';
  browser: string | null;
  source: 'appinstalled' | 'standalone';
  firstSeenAt: string;
  lastSeenAt: string;
  active: boolean;
}

export interface PaginatedInstallations {
  data: PwaInstallation[];
  total: number;
  page: number;
  take: number;
  activeWindowDays: number;
}

export const getInstallationsSummary = async (): Promise<{
  activeWindowDays: number;
  tenants: TenantInstallationsSummary[];
}> => {
  const response = await api.get('/pwa/installations/summary');
  return response.data;
};

export const getTenantInstallations = async (
  tenantId: number,
  params: { page?: number; take?: number; search?: string } = {}
): Promise<PaginatedInstallations> => {
  const response = await api.get(`/pwa/installations/tenant/${tenantId}`, { params });
  return response.data;
};
