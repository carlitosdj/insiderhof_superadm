import axios from 'axios';
import apiClient from './apiClient';

export interface TenantDomain {
  id: number;
  tenantId: number;
  domain: string;
  redirectPath: string | null;
  isPrimary: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDomainDto {
  domain: string;
  redirectPath?: string;
  isPrimary?: boolean;
  isActive?: boolean;
}

export interface UpdateDomainDto {
  domain?: string;
  redirectPath?: string;
  isPrimary?: boolean;
  isActive?: boolean;
}

/**
 * Busca todos os domínios de um tenant
 */
export const getTenantDomains = (tenantId: number) => {
  return apiClient.get<TenantDomain[]>(
    `/tenant-domains/superadmin/tenant/${tenantId}/domains`
  );
};

/**
 * Cria um novo domínio para o tenant
 */
export const createDomain = (tenantId: number, data: CreateDomainDto) => {
  return apiClient.post<TenantDomain>(
    `/tenant-domains/superadmin/tenant/${tenantId}/domains`,
    data
  );
};

/**
 * Atualiza um domínio existente
 */
export const updateDomain = (domainId: number, data: UpdateDomainDto) => {
  return apiClient.patch<TenantDomain>(
    `/tenant-domains/superadmin/domains/${domainId}`,
    data
  );
};

/**
 * Deleta um domínio
 */
export const deleteDomain = (domainId: number) => {
  return apiClient.delete(`/tenant-domains/superadmin/domains/${domainId}`);
};
