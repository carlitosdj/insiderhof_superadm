import api from './api'

export interface PaymentGateway {
  id: number
  tenantId: number
  gatewayName: string
  displayName: string
  gatewayPublicKey: string
  gatewayAccessToken: string
  gatewayBin?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface CreatePaymentGatewayData {
  gatewayName: string
  displayName: string
  gatewayPublicKey: string
  gatewayAccessToken: string
  gatewayBin?: string
  isActive?: boolean
}

export interface UpdatePaymentGatewayData {
  gatewayName?: string
  displayName?: string
  gatewayPublicKey?: string
  gatewayAccessToken?: string
  gatewayBin?: string
  isActive?: boolean
}

// Get all gateways for a tenant
export const getTenantPaymentGateways = (tenantId: number) => {
  const url = `/tenant-payment-gateway/superadmin/tenant/${tenantId}/gateways`
  console.log('🌐 [PaymentGatewaysService] GET:', url)
  return api.get<PaymentGateway[]>(url)
}

// Create new gateway for a tenant
export const createPaymentGateway = (tenantId: number, data: CreatePaymentGatewayData) => {
  const url = `/tenant-payment-gateway/superadmin/tenant/${tenantId}/gateways`
  console.log('🌐 [PaymentGatewaysService] POST:', url, data)
  return api.post<PaymentGateway>(url, data)
}

// Update gateway
export const updatePaymentGateway = (gatewayId: number, data: UpdatePaymentGatewayData) => {
  const url = `/tenant-payment-gateway/superadmin/gateways/${gatewayId}`
  console.log('🌐 [PaymentGatewaysService] PATCH:', url, data)
  return api.patch<PaymentGateway>(url, data)
}

// Activate gateway (deactivates others)
export const activatePaymentGateway = (tenantId: number, gatewayId: number) => {
  const url = `/tenant-payment-gateway/superadmin/tenant/${tenantId}/gateways/${gatewayId}/activate`
  console.log('🌐 [PaymentGatewaysService] PATCH (activate):', url)
  return api.patch<PaymentGateway>(url, {})
}

// Delete gateway
export const deletePaymentGateway = (gatewayId: number) => {
  const url = `/tenant-payment-gateway/superadmin/gateways/${gatewayId}`
  console.log('🌐 [PaymentGatewaysService] DELETE:', url)
  return api.delete(url)
}
